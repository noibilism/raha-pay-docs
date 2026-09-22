import { createFileRoute } from "@tanstack/react-router";
import { guides } from "@/data/guides";
import { endpoints } from "@/data/endpoints";
export const Route=createFileRoute("/llms.txt")({server:{handlers:{GET:()=>new Response(["# Raha Pay developer documentation","",...guides.map((g)=>`- [${g.title}](${g.slug==="introduction"?"/":`/guides/${g.slug}`}): ${g.description}`),"",...endpoints.map((e)=>`- [${e.title}](/api-reference/${e.slug}): ${e.method} ${e.path} — ${e.description}`)].join("\n"),{headers:{"content-type":"text/plain; charset=utf-8"}})}}});
