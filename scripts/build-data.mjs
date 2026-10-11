// Canonical evaluation records live only in evaluation.md; artifacts are read-only.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import { root } from "./browser-tools.mjs";
import { artifactDigest, parseProtocol, resolveChecks, acceptanceState, validateRecord, validateRecordSession,
  validateSession, validateBrowserEvidence, validateAIReview, sections } from "./evaluation.mjs";

const checkOnly = process.argv.includes("--check");
const errors = [];
const RUN_FIELDS = ["prompt", "prompt_version", "provider", "model", "mode", "harness", "web_access", "turns", "generated_at", "entrypoint"];
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const readText = (path) => readFileSync(join(root, path), "utf8").replace(/\r\n/g, "\n");
const isDir = (path) => existsSync(join(root, path)) && statSync(join(root, path)).isDirectory();
const dirs = (path) => isDir(path) ? readdirSync(join(root, path)).filter((name) => isDir(posix.join(path, name))).sort() : [];
const registry = readJson("data/models.json");
const configs = readJson("data/experiments.json");

function parseRun(text) {
  return Object.fromEntries(text.split("\n").flatMap((line) => {
    const match = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
    return match ? [[match[1], match[2].replace(/^["']|["']$/g, "")]] : [];
  }));
}
function promptVersions(id) {
  return readdirSync(join(root, `prompts/${id}`)).flatMap((name) => {
    const match = name.match(/^prompt-v(\d+)\.md$/);
    return match ? [Number(match[1])] : [];
  }).sort((a, b) => a - b);
}
function buildVersion(config, version) {
  const id = config.id, dir = `results/${id}/v${version}`;
  const promptPath = `prompts/${id}/prompt-v${version}.md`;
  const promptText = readText(promptPath);
  const blocks = [...promptText.matchAll(/^```text[ \t]*\n([\s\S]*?)\n```[ \t]*$/gm)];
  if (blocks.length !== 1) throw new Error(`${promptPath}: 必须有唯一 text 原文代码块`);
  const prompt = blocks[0][1], change = promptText.match(/^\*\*变更\*\*：\s*(.+)$/m)?.[1] ?? null;
  const evaluationPath = existsSync(join(root, dir, "evaluation.md")) ? `${dir}/evaluation.md` : null;
  let evaluation = null;
  if (evaluationPath) {
    const text = readText(evaluationPath), parts = sections(text);
    if (Object.keys(parts).some((name) => name.startsWith("历史") || ["评分维度", "评分结果", "模型点评"].includes(name))) throw new Error(`${evaluationPath}: 不允许历史评分章节`);
    const meta = Object.fromEntries(parts._head.flatMap((line) => {
      const match = line.match(/^- \*\*(.+?)\*\*：\s*(.+)$/);
      return match ? [[match[1], match[2]]] : [];
    }));
    if (!meta.Prompt?.includes(`../../../${promptPath}`)) throw new Error(`${evaluationPath}: Prompt 链接不匹配`);
    evaluation = { ...parseProtocol(text, prompt), date: meta["评测日期"], evaluator: meta["评测者"],
      method: meta["评测方式"], environment: meta["评测环境"], freezeDate: meta["标准冻结日期"],
      conclusion: (parts["评测结论"] ?? []).join("\n").trim().split(/\n{2,}/).filter(Boolean) };
  }
  for (const name of dirs(dir)) if (name !== "outputs") errors.push(`${dir}/${name}: 只允许 outputs/ 与 evaluation.md`);
  const results = [];
  const outputs = `${dir}/outputs`;
  for (const model of dirs(outputs)) {
    const keys = existsSync(join(root, outputs, model, "run.yaml")) ? [model] :
      dirs(`${outputs}/${model}`).filter((name) => /^run-\d+$/.test(name)).map((name) => `${model}/${name}`);
    if (!keys.length) errors.push(`${outputs}/${model}: 缺少 run.yaml`);
    for (const key of keys) {
      const runPath = `${outputs}/${key}/run.yaml`;
      if (!existsSync(join(root, runPath))) { errors.push(`${runPath}: 不存在`); continue; }
      const run = parseRun(readText(runPath));
      for (const field of RUN_FIELDS) if (!run[field]) errors.push(`${runPath}: 缺少 ${field}`);
      if (run.prompt !== id || Number(run.prompt_version) !== version) errors.push(`${runPath}: Prompt 版本不匹配`);
      if (!["yes", "no", "unknown"].includes(run.web_access) || !/^([1-9]\d*|unknown)$/.test(run.turns)) errors.push(`${runPath}: 运行条件无效`);
      if (!run.entrypoint || /[\\/]/.test(run.entrypoint) || run.entrypoint === "..") { errors.push(`${runPath}: 入口无效`); continue; }
      const url = `${outputs}/${key}/${run.entrypoint}`;
      if (!existsSync(join(root, url))) { errors.push(`${runPath}: 入口不存在`); continue; }
      const info = registry.models[model];
      if (!info || !registry.vendors[info.vendor]) errors.push(`data/models.json: 模型 ${model} 或厂商未登记`);
      const thumb = `assets/thumbs/${id}/v${version}/${key.replaceAll("/", "--")}.png`;
      results.push({ key, model, label: info?.label ?? model, run: key.includes("/") ? key.split("/")[1] : null,
        vendor: info?.vendor ?? "unknown", url, thumb: existsSync(join(root, thumb)) ? thumb : null,
        record: run, sha256: artifactDigest(join(root, url)) });
    }
  }
  if (evaluation) {
    const hashes = Object.fromEntries(results.map((result) => [result.key, result.sha256]));
    const attempt = (fn) => { try { fn(); } catch (error) { errors.push(`${evaluationPath}: ${error.message}`); } };
    attempt(() => validateBrowserEvidence(evaluation.browserEvidence, evaluation, hashes));
    for (const item of evaluation.browserEvidence) for (const file of item.files) attempt(() => {
      if (!existsSync(join(root, file.path)) || artifactDigest(join(root, file.path)) !== file.sha256) throw new Error(`证据媒体不匹配：${file.path}`);
    });
    const ids = new Set();
    for (const session of [...evaluation.sessions, ...evaluation.aiReviews]) attempt(() => {
      if (ids.has(session.id)) throw new Error("重复的会话 ID");
      ids.add(session.id);
      if (session.experiment !== id || session.version !== version) throw new Error("会话实验版本无效");
      if (session.source === "ai") validateAIReview(session, evaluation, hashes);
      else validateSession(session, evaluation, hashes);
    });
    for (const record of evaluation.records) attempt(() => {
      validateRecord(record, evaluation, hashes);
      validateRecordSession(record, evaluation);
    });
    for (const result of results) {
      const checks = resolveChecks(evaluation.criteria, evaluation.records, result.key);
      const visual = checks.filter((check) => check.method !== "auto");
      result.acceptance = { status: acceptanceState(checks), checks, total: checks.length,
        checked: checks.filter((check) => check.status !== "pending").length, disputed: checks.filter((check) => check.disputed).length,
        coverage: Object.fromEntries(["pass", "partial", "fail", "pending"].map((status) => [status, checks.filter((check) => check.status === status).length])),
        audit: { reviewed: visual.reduce((sum, check) => sum + Object.values(check.viewports).filter((state) => state.audited).length, 0),
          total: visual.length * 2, aiOnly: visual.filter((check) => check.aiOnly).length } };
    }
  }
  results.sort((a, b) => a.label.localeCompare(b.label) || a.key.localeCompare(b.key));
  const count = (status) => results.filter((item) => item.acceptance?.status === status).length;
  return { version, promptPath, prompt, change, evaluationPath, evaluation,
    stats: { results: results.length, passed: count("pass"), failed: count("fail"), partial: count("partial"),
      pending: results.filter((item) => !item.acceptance || item.acceptance.status === "pending").length }, results };
}
try {
  const experiments = configs.map((config) => {
    if ("promptVersion" in config) throw new Error("当前版本必须自动识别");
    const versions = promptVersions(config.id);
    if (!versions.length) throw new Error(`${config.id}: 缺少 Prompt`);
    for (const name of dirs(`results/${config.id}`)) if (!/^v\d+$/.test(name) || !versions.includes(Number(name.slice(1)))) errors.push(`${config.id}/${name}: 没有对应 Prompt`);
    return { ...config, number: config.id.slice(0, 2), latestVersion: versions.at(-1),
      versions: versions.slice().reverse().map((version) => buildVersion(config, version)) };
  });
  if (errors.length) throw new Error(errors.join("\n"));
  const output = JSON.stringify({ vendors: registry.vendors, experiments }, null, 2) + "\n";
  const path = join(root, "data/lab.json");
  if (checkOnly) {
    if (readText("data/lab.json") !== output) throw new Error("data/lab.json 不是最新的，请运行 npm run build");
  } else writeFileSync(path, output);
  console.log(`ok    ${checkOnly ? "校验" : "生成"} data/lab.json：${experiments.length} 个实验`);
} catch (error) { console.error(`error ${error.message}`); process.exitCode = 1; }
