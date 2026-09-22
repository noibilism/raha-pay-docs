import { createFileRoute } from "@tanstack/react-router";
import { DocsShell } from "@/components/docs/docs-shell";
import { GuideContent } from "@/components/docs/doc-content";
import { getGuide } from "@/data/guides";
const guide=getGuide("introduction");
export const Route=createFileRoute("/")({head:()=>({meta:[{title:"Raha Pay API Documentation — KES Payments"},{name:"description",content:"Integrate KES collections, payouts, virtual accounts, balances and conversions with Raha Pay."},{property:"og:title",content:"Raha Pay API Documentation"},{property:"og:description",content:"Developer documentation for Raha Pay's Kenya payments API."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});
function Index(){if(!guide)return null;return <DocsShell currentPath="/" anchors={guide.sections.map(s=>({id:s.id,title:s.title}))}><GuideContent guide={guide}/></DocsShell>}
