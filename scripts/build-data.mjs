#!/usr/bin/env node
// Builds data/lab.json from data/*.json, prompts/, run.yaml files and evaluation Markdown.
// Model artifacts are only read, never modified.
// Usage: node scripts/build-data.mjs [--check]
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const checkOnly = process.argv.includes("--check");
const errors = [];
const warnings = [];

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

function latestVersioned(dir, prefix) {
  if (!isDir(dir)) return null;
  const versions = readdirSync(join(root, dir))
    .map((name) => name.match(new RegExp(`^${prefix}-v(\\d+)\\.md$`)))
    .filter(Boolean)
    .map((match) => Number(match[1]));
  return versions.length ? Math.max(...versions) : null;
}

function sections(markdown) {
  const result = {};
  let current = "_head";
  for (const line of markdown.split("\n")) {
    const heading = line.match(/^## (.+?)\s*$/);
    if (heading) current = heading[1];
    else (result[current] ??= []).push(line);
  }
  return result;
}

function tableRows(lines = []) {
  return lines
    .filter((line) => line.trim().startsWith("|"))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
}

const linkTarget = (cell) => cell.match(/\]\(([^)]+)\)/)?.[1] ?? null;
const linkText = (cell) => cell.match(/\[([^\]]+)\]/)?.[1] ?? cell;

// "../outputs/<model>[/run-NN]/<entry>" -> "<model>[/run-NN]"
function resultKeyFromLink(target) {
  const match = target?.match(/outputs\/(.+)\/[^/]+$/);
  return match ? match[1] : null;
}

function bulletList(lines) {
  return lines.filter((line) => /^\s*-\s+/.test(line)).map((line) => line.replace(/^\s*-\s+/, "").trim());
}

function parseEvaluation(path) {
  const text = readText(path);
  const parts = sections(text);
  const where = `${path}`;
  const meta = {};
  for (const line of parts._head ?? []) {
    const match = line.match(/^- \*\*(.+?)\*\*[：:]\s*(.+)$/);
    if (match) meta[match[1]] = match[2].trim();
  }

  const dimensionRows = tableRows(parts["评分维度"]).slice(1);
  const dimensions = dimensionRows.map(([name, focus, max, weight]) => ({
    name, focus, max: Number(max), weight: Number(weight)
  }));
  if (!dimensions.length) errors.push(`${where}: 缺少“评分维度”表格`);
  for (const dimension of dimensions) {
    if (!(dimension.max > 0) || !(dimension.weight > 0)) errors.push(`${where}: 维度“${dimension.name}”的满分或权重无效`);
  }
  const weightSum = dimensions.reduce((sum, dimension) => sum + dimension.weight, 0);
  if (dimensions.length && weightSum !== 100) errors.push(`${where}: 权重合计为 ${weightSum}，应为 100`);

  const [header = [], ...scoreRows] = tableRows(parts["评分结果"]);
  const headerDimensions = header.slice(1, -1);
  if (headerDimensions.join("|") !== dimensions.map((dimension) => dimension.name).join("|")) {
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
    scores[key] = {
      total,
      dimensions: dimensions.map((dimension, index) => ({ name: dimension.name, value: values[index], max: dimension.max }))
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
    else if (reviewKey && bucket && /^\s*-\s+/.test(line)) reviews[reviewKey][bucket].push(...bulletList([line]));
  }

  const conclusion = (parts["评测结论"] ?? []).join("\n").trim().split(/\n{2,}/).filter(Boolean);
  return {
    date: meta["评测日期"] ?? "unknown",
    method: meta["评测方式"] ?? "unknown",
    environment: meta["评测环境"] ?? "unknown",
    dimensions,
    scores,
    reviews,
    conclusion
  };
}

function extractPrompt(path) {
  const match = readText(path).match(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/m);
  if (!match) errors.push(`${path}: 未找到 \`\`\`text 原始 Prompt 代码块`);
  return match ? match[1] : "";
}

const registry = readJson("data/models.json");
const experimentConfig = readJson("data/experiments.json");

const experiments = experimentConfig.map((config) => {
  const id = config.id;
  const number = id.slice(0, 2);
  const promptPath = `prompts/${id}/prompt-v${config.promptVersion}.md`;
  if (!existsSync(join(root, promptPath))) errors.push(`${id}: Prompt 文件不存在：${promptPath}`);
  const prompt = existsSync(join(root, promptPath)) ? extractPrompt(promptPath) : "";

  const evaluationVersion = latestVersioned(`results/${id}/evaluations`, "evaluation");
  const evaluationPath = evaluationVersion ? `results/${id}/evaluations/evaluation-v${evaluationVersion}.md` : null;
  const evaluation = evaluationPath ? parseEvaluation(evaluationPath) : null;

  const results = [];
  const outputsDir = `results/${id}/outputs`;
  for (const modelDir of listDirs(outputsDir)) {
    const runDirs = listDirs(posix.join(outputsDir, modelDir)).filter((name) => /^run-\d+$/.test(name));
    const keys = existsSync(join(root, outputsDir, modelDir, "run.yaml"))
      ? [modelDir]
      : runDirs.map((run) => `${modelDir}/${run}`);
    if (!keys.length) errors.push(`${outputsDir}/${modelDir}: 缺少 run.yaml`);

    for (const key of keys) {
      const dir = posix.join(outputsDir, key);
      const runPath = posix.join(dir, "run.yaml");
      if (!existsSync(join(root, runPath))) { errors.push(`${dir}: 缺少 run.yaml`); continue; }
      const run = parseRunYaml(readText(runPath));
      for (const field of ["prompt", "prompt_version", "provider", "model", "mode", "generated_at", "entrypoint"]) {
        if (!run[field]) errors.push(`${runPath}: 缺少字段 ${field}`);
      }
      if (run.prompt && run.prompt !== id) errors.push(`${runPath}: prompt 为 ${run.prompt}，应为 ${id}`);
      if (run.prompt_version && Number(run.prompt_version) !== config.promptVersion) {
        errors.push(`${runPath}: prompt_version 为 ${run.prompt_version}，实验当前使用 v${config.promptVersion}`);
      }
      const url = posix.join(dir, run.entrypoint ?? "");
      if (run.entrypoint && !existsSync(join(root, url))) errors.push(`${runPath}: 入口文件不存在：${run.entrypoint}`);

      const info = registry.models[modelDir];
      if (!info) errors.push(`data/models.json: 未登记模型目录 ${modelDir}`);
      else if (!registry.vendors[info.vendor]) errors.push(`data/models.json: ${modelDir} 的 vendor “${info.vendor}” 未登记`);
      const runLabel = key.includes("/") ? ` · ${key.split("/")[1].replace("run-", "Run ")}` : "";

      results.push({
        key,
        model: modelDir,
        label: (info?.label ?? modelDir) + runLabel,
        vendor: info?.vendor ?? "unknown",
        url,
        run,
        score: evaluation?.scores[key] ?? null,
        review: evaluation?.reviews[key] ?? null
      });
    }
  }

  if (evaluation) {
    for (const key of [...Object.keys(evaluation.scores), ...Object.keys(evaluation.reviews)]) {
      if (!results.some((result) => result.key === key)) errors.push(`${evaluationPath}: 引用了不存在的结果 ${key}`);
    }
  }

  results.sort((a, b) => (b.score?.total ?? -1) - (a.score?.total ?? -1) || a.label.localeCompare(b.label));
  const thumb = `assets/thumbs/${id}.png`;

  return {
    ...config,
    number,
    prompt,
    promptPath,
    evaluationPath,
    evaluation: evaluation && {
      date: evaluation.date,
      method: evaluation.method,
      environment: evaluation.environment,
      dimensions: evaluation.dimensions,
      conclusion: evaluation.conclusion
    },
    thumb: existsSync(join(root, thumb)) ? thumb : null,
    results
  };
});

for (const id of listDirs("results")) {
  if (!experimentConfig.some((config) => config.id === id)) warnings.push(`results/${id}: 未在 data/experiments.json 登记，不会展示`);
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
  const total = experiments.reduce((sum, experiment) => sum + experiment.results.length, 0);
  console.log(`ok    已生成 data/lab.json：${experiments.length} 个实验，${total} 份结果`);
}
