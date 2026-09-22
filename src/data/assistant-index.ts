import { guides } from "./guides";
import { endpoints } from "./endpoints";

export type AssistantChunk = { id:string; title:string; text:string; sourceUrl:string; sourceLabel:string };
const compact = (values:(string | undefined)[]) => values.filter(Boolean).join(" ");

export const assistantChunks: AssistantChunk[] = [
  ...guides.flatMap((guide) => guide.sections.map((section) => ({
    id:`guide:${guide.slug}:${section.id}`,
    title:`${guide.title}: ${section.title}`,
    text:compact([guide.description, ...(section.paragraphs ?? []), ...(section.bullets ?? []), section.callout?.title, section.callout?.text]),
    sourceUrl:guide.slug === "introduction" ? "/" : `/guides/${guide.slug}#${section.id}`,
    sourceLabel:guide.title,
  }))),
  ...guides.flatMap((guide) => (guide.steps ?? []).map((step) => ({
    id:`step:${guide.slug}:${step.id}`, title:`${guide.title}: ${step.title}`,
    text:compact([guide.description, ...step.paragraphs, step.outcome]),
    sourceUrl:`/guides/${guide.slug}#${step.id}`, sourceLabel:guide.title,
  }))),
  ...endpoints.map((endpoint) => ({
    id:`endpoint:${endpoint.slug}`, title:endpoint.title,
    text:compact([endpoint.description, `${endpoint.method} ${endpoint.path}`, ...endpoint.params.map((p)=>`${p.name}: ${p.description} ${p.allowed ?? ""}`), JSON.stringify(endpoint.success), JSON.stringify(endpoint.error), endpoint.webhook]),
    sourceUrl:`/api-reference/${endpoint.slug}`, sourceLabel:endpoint.title,
  })),
];

const words = (value:string) => value.toLowerCase().replace(/[^a-z0-9_]+/g," ").split(/\s+/).filter((word)=>word.length>2);
export function retrieveAssistantChunks(query:string, limit=7) {
  const terms=[...new Set(words(query))];
  return assistantChunks.map((chunk)=>({chunk,score:terms.reduce((score,term)=>score+(chunk.title.toLowerCase().includes(term)?5:0)+(chunk.text.toLowerCase().includes(term)?1:0),0)})).filter((item)=>item.score>0).sort((a,b)=>b.score-a.score).slice(0,limit).map((item)=>item.chunk);
}
