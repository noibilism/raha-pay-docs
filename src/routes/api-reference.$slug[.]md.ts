import { createFileRoute } from "@tanstack/react-router";
import { getEndpoint } from "@/data/endpoints";
import { endpointMarkdown } from "@/data/markdown";
export const Route=createFileRoute("/api-reference/$slug.md")({server:{handlers:{GET:({params})=>{const item=getEndpoint(params.slug);return item?new Response(endpointMarkdown(item),{headers:{"content-type":"text/markdown; charset=utf-8"}}):new Response("Not found",{status:404})}}}});
