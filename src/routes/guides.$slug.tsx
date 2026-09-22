import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsShell } from "@/components/docs/docs-shell";
import { GuideContent } from "@/components/docs/doc-content";
import { getGuide } from "@/data/guides";
export const Route=createFileRoute("/guides/$slug")({loader:({params})=>{const guide=getGuide(params.slug);if(!guide)throw notFound();return guide},head:({loaderData})=>({meta:[{title:loaderData?`${loaderData.title} — Raha Pay Docs`:"Guide unavailable — Raha Pay Docs"},{name:"description",content:loaderData?.description??"The requested Raha Pay guide is unavailable."},{property:"og:title",content:loaderData?`${loaderData.title} — Raha Pay Docs`:"Guide unavailable — Raha Pay Docs"},{property:"og:description",content:loaderData?.description??"The requested Raha Pay guide is unavailable."},{property:"og:type",content:"article"},{name:"twitter:card",content:"summary_large_image"}]}),component:GuidePage});
function GuidePage(){const guide=Route.useLoaderData();return <DocsShell currentPath={`/guides/${guide.slug}`} anchors={guide.sections.map(s=>({id:s.id,title:s.title}))}><GuideContent guide={guide}/></DocsShell>}
