export function siteIndex(lab) {
  return {
    vendors: lab.vendors,
    experiments: lab.experiments.map(({ versions, ...experiment }) => ({
      ...experiment,
      versions: versions.map((version) => ({
        version: version.version,
        dataPath: `data/views/${experiment.id}/v${version.version}.json`,
        promptLength: version.prompt.length,
        evaluation: version.evaluation ? {
          protocol: version.evaluation.protocol,
          dimensions: version.evaluation.dimensions.map(({ id, name, kind, weight }) => ({ id, name, kind, weight }))
        } : null,
        results: version.results.map(({ key, model, label, run, vendor, url, thumb, score, referenceScore }) => ({
          key, model, label, run, vendor, url, thumb,
          desktopThumb: score?.auto?.files.find((file) =>
            file.viewport === "desktop" && file.kind === "frame" && file.label === "初始画面")?.path ?? null,
          mobileThumb: score?.auto?.files.find((file) =>
            file.viewport === "mobile" && file.kind === "frame" && file.label === "初始画面")?.path ?? null,
          ...(score ? { score: { total: score.total, count: score.count } } : {}),
          ...(referenceScore ? { referenceScore } : {})
        }))
      }))
    }))
  };
}

export function siteVersion(version) {
  if (!version.evaluation) return version;
  // The viewer uses derived scores; raw batches remain in lab.json and evaluation.md.
  const { autoChecks, aiReviews, ...evaluation } = version.evaluation;
  return { ...version, evaluation };
}
