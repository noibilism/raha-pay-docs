import type { Guide } from "./guides";
import type { ApiEndpoint } from "./endpoints";

export function guideMarkdown(guide: Guide) {
  const sections = guide.sections.flatMap((section) => [
    `## ${section.title}`,
    ...(section.paragraphs ?? []),
    ...(section.bullets ?? []).map((bullet) => `- ${bullet}`),
    section.callout ? `> **${section.callout.title}:** ${section.callout.text}` : "",
  ]);
  return [`# ${guide.title}`, guide.description, ...sections].filter(Boolean).join("\n\n") + "\n";
}

export function endpointMarkdown(endpoint: ApiEndpoint) {
  return [
    `# ${endpoint.title}`,
    `${endpoint.method} ${endpoint.path}`,
    endpoint.description,
    "## Parameters",
    ...endpoint.params.map((parameter) => `- \`${parameter.name}\` (${parameter.type}${parameter.required ? ", required" : ""}): ${parameter.description}`),
    "## Success response",
    "```json",
    JSON.stringify(endpoint.success, null, 2),
    "```",
    "## Error response",
    "```json",
    JSON.stringify(endpoint.error, null, 2),
    "```",
  ].join("\n\n") + "\n";
}
