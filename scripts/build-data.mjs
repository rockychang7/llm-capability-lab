#!/usr/bin/env node
// Builds data/lab.json from data/*.json, prompts/, results/<test-id>/v<N>/ and evaluation Markdown.
// The latest prompt version is the highest prompt-vN.md; results are grouped by prompt version.
// Model artifacts are only read, never modified.
// Usage: node scripts/build-data.mjs [--check]
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { artifactDigest, parseProtocol, resolveChecks, acceptanceState, validateRecord, validateSession, sections } from "./evaluation.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const checkOnly = process.argv.includes("--check");
const errors = [];
const warnings = [];

const RUN_FIELDS = ["prompt", "prompt_version", "provider", "model", "mode", "harness", "web_access", "turns", "generated_at", "entrypoint"];
const COVERAGE_DIMENSION = "需求覆盖";

const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const readText = (path) => readFileSync(join(root, path), "utf8").replace(/\r\n/g, "\n");
const isDir = (path) => existsSync(join(root, path)) && statSync(join(root, path)).isDirectory();
const listDirs = (path) => (isDir(path) ? readdirSync(join(root, path)).filter((name) => isDir(posix.join(path, name))).sort() : []);

function parseRunYaml(text) {
  const data = {};
  for (const line of text.split("\n")) {
    const match = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
    if (match) data[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return data;
}

function promptVersions(id) {
  const dir = `prompts/${id}`;
  if (!isDir(dir)) return [];
  return readdirSync(join(root, dir))
    .map((name) => name.match(/^prompt-v(\d+)\.md$/))
    .filter(Boolean)
    .map((match) => Number(match[1]))
    .sort((a, b) => a - b);
}

function parsePrompt(path) {
  const text = readText(path);
  const block = text.match(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/m);
  if (!block) errors.push(`${path}: 未找到 \`\`\`text 原始 Prompt 代码块`);
  return {
    prompt: block ? block[1] : "",
    change: text.match(/^\*\*变更\*\*[：:]\s*(.+)$/m)?.[1].trim() ?? null
  };
}

function tableRows(lines = []) {
  return lines
    .filter((line) => line.trim().startsWith("|"))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
}

const linkTarget = (cell) => cell.match(/\]\(([^)]+)\)/)?.[1] ?? null;

// "outputs/<model>[/run-NN]/<entry>" -> "<model>[/run-NN]"
function resultKeyFromLink(target) {
  const match = target?.match(/outputs\/(.+)\/[^/]+$/);
  return match ? match[1] : null;
}

const isBlank = (value) => value === undefined || value === "" || value === "—" || value === "-";

// A criteria table: fixed leading columns, then one column per result (header links to the artifact).
function criteriaTable(lines, fixed, where, label) {
  const [header = [], ...rows] = tableRows(lines);
  const columns = header.slice(fixed).map((cell) => {
    const key = resultKeyFromLink(linkTarget(cell));
    if (!key) errors.push(`${where}: “${label}”表头“${cell}”缺少指向产物的链接`);
    return key;
  });
  return { rows: rows.map((cells) => ({ fixed: cells.slice(0, fixed), values: cells.slice(fixed) })), columns };
}

function parseEvaluation(path, id, version, override = null) {
  const text = override ?? readText(path);
  const parts = sections(text);
  const where = path;
  const meta = {};
  for (const line of parts._head ?? []) {
    const match = line.match(/^- \*\*(.+?)\*\*[：:]\s*(.+)$/);
    if (match) meta[match[1]] = match[2].trim();
  }
  const promptLink = linkTarget(meta.Prompt ?? "");
  if (!promptLink || !promptLink.endsWith(`prompts/${id}/prompt-v${version}.md`)) {
    errors.push(`${where}: “Prompt”应链接到 prompts/${id}/prompt-v${version}.md`);
  }
  if (meta["评测协议"] === "2") {
    let protocol;
    try {
      protocol = parseProtocol(text, parsePrompt(`prompts/${id}/prompt-v${version}.md`).prompt);
    } catch (error) {
      errors.push(`${where}: ${error.message}`);
      return null;
    }
    const history = (parts["历史评测信息"] ?? []).join("\n") + "\n" +
      Object.entries(parts).filter(([name]) => name.startsWith("历史") && name !== "历史评测信息")
        .map(([name, lines]) => `## ${name.slice(2)}\n${lines.join("\n")}`).join("\n");
    const legacy = parts["历史评分维度"] ? parseEvaluation(path, id, version, history) : null;
    return {
      ...protocol, date: meta["评测日期"] ?? "未评测", evaluator: meta["评测者"] ?? "unknown",
      method: meta["评测方式"] ?? "unknown", environment: meta["评测环境"] ?? "unknown",
      conclusion: (parts["评测结论"] ?? []).join("\n").trim().split(/\n{2,}/).filter(Boolean),
      scores: {}, reviews: {}, hardChecks: [], hardCheckResults: {}, checklist: [], checklistResults: {}, legacy
    };
  }
  if (meta["评测协议"] && meta["评测协议"] !== "1") errors.push(`${where}: 不支持的评测协议`);

  // Dimensions table and per-dimension score levels ("**维度**" followed by "- N：说明").
  const dimensionLines = parts["评分维度"] ?? [];
  const dimensions = tableRows(dimensionLines).slice(1).map(([name, focus, max, weight]) => ({
    name, focus, max: Number(max), weight: Number(weight), levels: []
  }));
  if (!dimensions.length) errors.push(`${where}: 缺少“评分维度”表格`);
  for (const dimension of dimensions) {
    if (!(dimension.max > 0) || !(dimension.weight > 0)) errors.push(`${where}: 维度“${dimension.name}”的满分或权重无效`);
  }
  const weightSum = dimensions.reduce((sum, dimension) => sum + dimension.weight, 0);
  if (dimensions.length && weightSum !== 100) errors.push(`${where}: 权重合计为 ${weightSum}，应为 100`);
  let levelTarget = null;
  for (const line of dimensionLines) {
    const title = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (title) {
      levelTarget = dimensions.find((dimension) => dimension.name === title[1]) ?? null;
      if (!levelTarget) errors.push(`${where}: 评分档位“${title[1]}”不是已定义的维度`);
      continue;
    }
    const level = line.match(/^\s*-\s+(\d+)[：:]\s*(.+)$/);
    if (level && levelTarget) levelTarget.levels.push({ score: Number(level[1]), text: level[2].trim() });
  }

  // Hard checks: | 检查项 | 怎么查 | [模型](outputs/…) … | — cells are “通过” or “不通过：原因”.
  const hard = criteriaTable(parts["硬性检查"], 2, where, "硬性检查");
  const hardChecks = hard.rows.map(({ fixed: [name, how] }) => ({ name, how }));
  const hardCheckResults = {};
  hard.columns.forEach((key, column) => {
    if (!key) return;
    hardCheckResults[key] = hard.rows.map(({ fixed: [name], values }) => {
      const cell = values[column] ?? "";
      if (isBlank(cell)) return { name, status: "unchecked", note: "" };
      const match = cell.match(/^(不通过|通过)\s*(?:[：:]\s*(.*))?$/);
      if (!match) {
        errors.push(`${where}: 硬性检查“${name}”对 ${key} 的结果应写“通过”或“不通过：原因”`);
        return { name, status: "unchecked", note: cell };
      }
      return { name, status: match[1] === "通过" ? "pass" : "fail", note: match[2]?.trim() ?? "" };
    });
  });

  // Requirement checklist: | # | 章节 | 要求 | [模型](outputs/…) … | — cells are 1, 0.5 or 0.
  const list = criteriaTable(parts["需求清单"], 3, where, "需求清单");
  const checklist = list.rows.map(({ fixed: [no, section, text] }) => ({ no: Number(no), section, text }));
  const checklistResults = {};
  list.columns.forEach((key, column) => {
    if (!key) return;
    checklistResults[key] = list.rows.map(({ fixed: [no], values }) => {
      const cell = values[column] ?? "";
      if (isBlank(cell)) return null;
      const value = Number(cell);
      if (![0, 0.5, 1].includes(value)) errors.push(`${where}: 需求清单第 ${no} 条对 ${key} 的记分应为 1、0.5 或 0`);
      return value;
    });
  });
  const coverage = dimensions.find((dimension) => dimension.name === COVERAGE_DIMENSION);
  if (checklist.length && coverage && coverage.max !== checklist.length) {
    errors.push(`${where}: “${COVERAGE_DIMENSION}”满分为 ${coverage.max}，但需求清单有 ${checklist.length} 条`);
  }

  // Score table.
  const [header = [], ...scoreRows] = tableRows(parts["评分结果"]);
  if (header.slice(1, -1).join("|") !== dimensions.map((dimension) => dimension.name).join("|")) {
    errors.push(`${where}: “评分结果”表头和“评分维度”不一致`);
  }
  const scores = {};
  for (const row of scoreRows) {
    const key = resultKeyFromLink(linkTarget(row[0]));
    if (!key) { errors.push(`${where}: 评分行“${row[0]}”缺少指向产物的链接`); continue; }
    const values = row.slice(1, -1).map(Number);
    const total = Number(row.at(-1).replace(/\*/g, ""));
    const computed = dimensions.reduce((sum, dimension, index) => sum + (values[index] / dimension.max) * dimension.weight, 0);
    if (values.some((value, index) => Number.isNaN(value) || value < 0 || value > dimensions[index]?.max)) {
      errors.push(`${where}: ${key} 的维度得分超出范围`);
    }
    if (Math.abs(computed - total) > 0.5) errors.push(`${where}: ${key} 总分写的是 ${total}，按维度计算应为 ${computed.toFixed(1)}`);
    const coverageIndex = dimensions.indexOf(coverage);
    const ticks = checklistResults[key];
    if (coverage && ticks) {
      const sum = ticks.reduce((total, value) => total + (value ?? 0), 0);
      if (ticks.some((value) => value === null)) errors.push(`${where}: ${key} 已评分，但需求清单还有没记分的条目`);
      else if (Math.abs(sum - values[coverageIndex]) > 0.001) {
        errors.push(`${where}: ${key} 的“${COVERAGE_DIMENSION}”写的是 ${values[coverageIndex]}，需求清单合计为 ${sum}`);
      }
    }
    scores[key] = {
      total,
      dimensions: dimensions.map((dimension, index) => ({ name: dimension.name, value: values[index], max: dimension.max, weight: dimension.weight }))
    };
  }

  const reviews = {};
  let reviewKey = null;
  let bucket = null;
  for (const line of parts["模型点评"] ?? []) {
    const heading = line.match(/^### (.+)$/);
    if (heading) {
      reviewKey = resultKeyFromLink(linkTarget(heading[1]));
      if (!reviewKey) errors.push(`${where}: 点评标题“${heading[1]}”缺少指向产物的链接`);
      else reviews[reviewKey] = { strengths: [], weaknesses: [] };
      bucket = null;
      continue;
    }
    if (/^\*\*优点\*\*/.test(line)) bucket = "strengths";
    else if (/^\*\*不足\*\*/.test(line)) bucket = "weaknesses";
    else if (reviewKey && bucket && /^\s*-\s+/.test(line)) reviews[reviewKey][bucket].push(line.replace(/^\s*-\s+/, "").trim());
  }

  const conclusion = (parts["评测结论"] ?? []).join("\n").trim().split(/\n{2,}/).filter(Boolean);
  return {
    date: meta["评测日期"] ?? "unknown",
    protocol: 1,
    evaluator: meta["评测者"] ?? "unknown",
    method: meta["评测方式"] ?? "unknown",
    environment: meta["评测环境"] ?? "unknown",
    dimensions,
    hardChecks,
    checklist,
    hardCheckResults,
    checklistResults,
    scores,
    reviews,
    conclusion
  };
}

function checklistSummary(checklist, ticks) {
  if (!checklist.length || !ticks) return null;
  const bySection = new Map();
  checklist.forEach((item, index) => {
    const entry = bySection.get(item.section) ?? { name: item.section, got: 0, total: 0 };
    entry.got += ticks[index] ?? 0;
    entry.total += 1;
    bySection.set(item.section, entry);
  });
  return {
    got: ticks.reduce((sum, value) => sum + (value ?? 0), 0),
    total: checklist.length,
    sections: [...bySection.values()]
  };
}

const registry = readJson("data/models.json");
const experimentConfig = readJson("data/experiments.json");
const usedModels = new Set();

function buildVersion(config, version) {
  const id = config.id;
  const promptPath = `prompts/${id}/prompt-v${version}.md`;
  const { prompt, change } = parsePrompt(promptPath);
  const dir = `results/${id}/v${version}`;
  const evaluationPath = existsSync(join(root, dir, "evaluation.md")) ? `${dir}/evaluation.md` : null;
  const evaluation = evaluationPath ? parseEvaluation(evaluationPath, id, version) : null;

  for (const name of listDirs(dir)) {
    if (name !== "outputs") errors.push(`${dir}/${name}: 版本目录下只应有 outputs/ 和 evaluation.md`);
  }

  const results = [];
  const outputsDir = `${dir}/outputs`;
  for (const modelDir of listDirs(outputsDir)) {
    const runDirs = listDirs(posix.join(outputsDir, modelDir)).filter((name) => /^run-\d+$/.test(name));
    const keys = existsSync(join(root, outputsDir, modelDir, "run.yaml"))
      ? [modelDir]
      : runDirs.map((run) => `${modelDir}/${run}`);
    if (!keys.length) errors.push(`${outputsDir}/${modelDir}: 缺少 run.yaml`);

    for (const key of keys) {
      const resultDir = posix.join(outputsDir, key);
      const runPath = posix.join(resultDir, "run.yaml");
      if (!existsSync(join(root, runPath))) { errors.push(`${resultDir}: 缺少 run.yaml`); continue; }
      const run = parseRunYaml(readText(runPath));
      for (const field of RUN_FIELDS) {
        if (!run[field]) errors.push(`${runPath}: 缺少字段 ${field}`);
      }
      if (run.prompt && run.prompt !== id) errors.push(`${runPath}: prompt 为 ${run.prompt}，应为 ${id}`);
      if (run.prompt_version && Number(run.prompt_version) !== version) {
        errors.push(`${runPath}: prompt_version 为 ${run.prompt_version}，但它放在 v${version} 目录下`);
      }
      if (run.web_access && !["yes", "no", "unknown"].includes(run.web_access)) errors.push(`${runPath}: web_access 只能是 yes、no 或 unknown`);
      if (run.turns && !/^(\d+|unknown)$/.test(run.turns)) errors.push(`${runPath}: turns 应为数字或 unknown`);
      const url = posix.join(resultDir, run.entrypoint ?? "");
      if (run.entrypoint && !existsSync(join(root, url))) errors.push(`${runPath}: 入口文件不存在：${run.entrypoint}`);

      const info = registry.models[modelDir];
      if (!info) errors.push(`data/models.json: 未登记模型目录 ${modelDir}`);
      else if (!registry.vendors[info.vendor]) errors.push(`data/models.json: ${modelDir} 的 vendor “${info.vendor}” 未登记`);
      usedModels.add(modelDir);
      const runLabel = key.includes("/") ? key.split("/")[1] : null;
      const thumb = `assets/thumbs/${id}/v${version}/${key.replace("/", "--")}.png`;

      results.push({
        key,
        model: modelDir,
        label: info?.label ?? modelDir,
        run: runLabel,
        vendor: info?.vendor ?? "unknown",
        url,
        thumb: existsSync(join(root, thumb)) ? thumb : null,
        record: run,
        sha256: existsSync(join(root, url)) ? artifactDigest(join(root, url)) : null,
        score: evaluation?.scores[key] ?? null,
        review: evaluation?.reviews[key] ?? null,
        hardChecks: evaluation?.hardCheckResults[key] ?? null,
        checklist: evaluation ? checklistSummary(evaluation.checklist, evaluation.checklistResults[key]) : null,
        legacyScore: evaluation?.legacy?.scores[key] ?? (evaluation?.protocol === 1 ? evaluation.scores[key] : null),
        legacyReview: evaluation?.legacy?.reviews[key] ?? (evaluation?.protocol === 1 ? evaluation.reviews[key] : null)
      });
    }
  }

  if (evaluation) {
    const referenced = [
      ...Object.keys(evaluation.scores),
      ...Object.keys(evaluation.reviews),
      ...Object.keys(evaluation.hardCheckResults),
      ...Object.keys(evaluation.checklistResults)
    ];
    if (evaluation.legacy) referenced.push(
      ...Object.keys(evaluation.legacy.scores), ...Object.keys(evaluation.legacy.reviews),
      ...Object.keys(evaluation.legacy.hardCheckResults), ...Object.keys(evaluation.legacy.checklistResults)
    );
    for (const key of new Set(referenced)) {
      if (!results.some((result) => result.key === key)) errors.push(`${evaluationPath}: 引用了不存在的结果 ${key}`);
    }
  }

  if (evaluation?.protocol === 2) {
    const hashes = Object.fromEntries(results.map((result) => [result.key, result.sha256]));
    for (const record of evaluation.records) {
      try { validateRecord(record, evaluation, hashes); }
      catch (error) { errors.push(`${evaluationPath}: ${error.message}`); }
    }
    const sessionIds = new Set();
    for (const session of evaluation.sessions) {
      try {
        if (sessionIds.has(session.id)) throw new Error("重复的人工会话 ID");
        sessionIds.add(session.id);
        if (session.experiment !== id || session.version !== version) throw new Error("比较记录的实验或 Prompt 版本不匹配");
        validateSession(session, evaluation, hashes);
      } catch (error) { errors.push(`${evaluationPath}: ${error.message}`); }
    }
    for (const result of results) {
      const checks = resolveChecks(evaluation.criteria, evaluation.records, result.key);
      result.acceptance = {
        status: acceptanceState(checks), checks,
        checked: checks.filter((check) => check.status !== "pending").length,
        total: checks.length,
        disputed: checks.filter((check) => check.disputed).length
      };
    }
  }
  results.sort((a, b) => a.label.localeCompare(b.label) || a.key.localeCompare(b.key));
  const scored = results.filter((result) => result.acceptance && result.acceptance.status !== "pending").length;
  const countStatus = (status) => results.filter((result) => result.acceptance?.status === status).length;

  return {
    version,
    promptPath,
    prompt,
    change,
    evaluationPath,
    evaluation: evaluation && {
      protocol: evaluation.protocol,
      date: evaluation.date,
      evaluator: evaluation.evaluator,
      method: evaluation.method,
      environment: evaluation.environment,
      dimensions: evaluation.dimensions,
      hardChecks: evaluation.hardChecks,
      checklist: evaluation.checklist,
      conclusion: evaluation.conclusion,
      ...(evaluation.protocol === 2 ? {
        criteria: evaluation.criteria, fingerprint: evaluation.fingerprint, sessions: evaluation.sessions,
        legacy: evaluation.legacy && {
          date: evaluation.legacy.date, evaluator: evaluation.legacy.evaluator, method: evaluation.legacy.method,
          environment: evaluation.legacy.environment, dimensions: evaluation.legacy.dimensions,
          conclusion: evaluation.legacy.conclusion
        }
      } : {})
    },
    stats: { results: results.length, scored, pending: results.length - scored,
      passed: countStatus("pass"), failed: countStatus("fail"), partial: countStatus("partial"),
      historical: results.filter((result) => result.legacyScore).length,
      allScored: false },
    results
  };
}

const experiments = experimentConfig.map((config) => {
  const id = config.id;
  if ("promptVersion" in config) errors.push(`data/experiments.json: ${id} 的 promptVersion 已改为自动识别（取最大的 prompt-vN.md），请删除这个字段`);
  const versions = promptVersions(id);
  if (!versions.length) errors.push(`${id}: prompts/${id}/ 下没有 prompt-vN.md`);

  for (const name of listDirs(`results/${id}`)) {
    const match = name.match(/^v(\d+)$/);
    if (!match) errors.push(`results/${id}/${name}: 结果应按提示词版本放在 results/${id}/v<N>/ 下`);
    else if (!versions.includes(Number(match[1]))) errors.push(`results/${id}/${name}: 没有对应的 prompts/${id}/prompt-${name}.md`);
  }

  return {
    ...config,
    number: id.slice(0, 2),
    latestVersion: versions.at(-1) ?? null,
    versions: versions.slice().reverse().map((version) => buildVersion(config, version))
  };
});

for (const id of listDirs("results")) {
  if (!experimentConfig.some((config) => config.id === id)) warnings.push(`results/${id}: 未在 data/experiments.json 登记，不会展示`);
}
for (const model of Object.keys(registry.models)) {
  if (!usedModels.has(model)) warnings.push(`data/models.json: ${model} 已登记，但没有任何产物`);
}

const output = `${JSON.stringify({ vendors: registry.vendors, experiments }, null, 2)}\n`;
const outputPath = join(root, "data/lab.json");

warnings.forEach((message) => console.warn(`warn  ${message}`));
if (errors.length) {
  errors.forEach((message) => console.error(`error ${message}`));
  process.exit(1);
}
if (checkOnly) {
  const current = existsSync(outputPath) ? readFileSync(outputPath, "utf8").replace(/\r\n/g, "\n") : "";
  if (current !== output) {
    console.error("error data/lab.json 不是最新的，请运行 node scripts/build-data.mjs");
    process.exit(1);
  }
  console.log("ok    data/lab.json 是最新的");
} else {
  writeFileSync(outputPath, output);
  const total = experiments.reduce((sum, experiment) => sum + experiment.versions.reduce((count, version) => count + version.results.length, 0), 0);
  console.log(`ok    已生成 data/lab.json：${experiments.length} 个实验，${total} 份结果`);
}
