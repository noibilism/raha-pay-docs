import { createFileRoute } from "@tanstack/react-router";
import { getGuide } from "@/data/guides";
import { guideMarkdown } from "@/data/markdown";
export const Route=createFileRoute("/guides/$slug.md")({server:{handlers:{GET:({params})=>{const item=getGuide(params.slug);return item?new Response(guideMarkdown(item),{headers:{"content-type":"text/markdown; charset=utf-8"}}):new Response("Not found",{status:404})}}}});
