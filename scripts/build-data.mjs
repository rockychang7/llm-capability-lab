// Canonical evaluation records live only in evaluation.md; artifacts are read-only.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { root } from "./browser-tools.mjs";
import { artifactDigest, parseProtocol, parseReferenceScores, validateAutoChecks, validateAIReview, sections } from "./evaluation.mjs";
import { summarizeScore } from "../review.js";
import { siteIndex, siteVersion } from "./site-data.mjs";

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
    if (Object.keys(parts).some((name) => name.startsWith("历史") || ["评分结果", "模型点评"].includes(name))) throw new Error(`${evaluationPath}: 不允许历史评分章节`);
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
    attempt(() => validateAutoChecks(evaluation.autoChecks, evaluation, hashes));
    for (const item of evaluation.autoChecks) for (const file of item.files) attempt(() => {
      if (!existsSync(join(root, file.path)) || artifactDigest(join(root, file.path)) !== file.sha256) throw new Error(`证据媒体不匹配：${file.path}`);
    });
    const ids = new Set();
    for (const session of evaluation.aiReviews) attempt(() => {
      if (ids.has(session.id)) throw new Error("重复的会话 ID");
      ids.add(session.id);
      if (session.experiment !== id || session.version !== version) throw new Error("会话实验版本无效");
      validateAIReview(session, evaluation, hashes);
    });
    const references = parseReferenceScores(readText(evaluationPath), evaluation, hashes);
    for (const result of results) {
      result.score = summarizeScore({ evaluation, results }, result.key);
      const reference = references.find((item) => item.key === result.key);
      if (reference) result.referenceScore = { value: reference.value, note: reference.note };
    }
  }
  results.sort((a, b) => a.label.localeCompare(b.label) || a.key.localeCompare(b.key));
  return { version, promptPath, prompt, change, evaluationPath, evaluation,
    stats: { results: results.length, scored: results.filter((item) => item.score?.total != null).length }, results };
}
function generated(path, data, pretty = false) {
  const output = JSON.stringify(data, null, pretty ? 2 : undefined) + "\n";
  if (checkOnly) {
    if (!existsSync(join(root, path)) || readText(path) !== output) throw new Error(`${path} 不是最新的，请运行 npm run build`);
  } else {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), output);
  }
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
  const lab = { vendors: registry.vendors, experiments };
  generated("data/lab.json", lab, true);
  generated("data/site.json", siteIndex(lab));
  for (const experiment of experiments) for (const version of experiment.versions) {
    generated(`data/views/${experiment.id}/v${version.version}.json`, siteVersion(version));
  }
  console.log(`ok    ${checkOnly ? "校验" : "生成"} 完整数据与按需展示数据：${experiments.length} 个实验`);
} catch (error) { console.error(`error ${error.message}`); process.exitCode = 1; }
