import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route=createFileRoute("/reference")({
 head:()=>({meta:[{title:"API reference — Raha Pay Docs"},{name:"description",content:"Browse Raha Pay API endpoints."},{property:"og:title",content:"API reference — Raha Pay Docs"},{property:"og:description",content:"Browse Raha Pay API endpoints."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}]}),
 component:()=> <Navigate to="/api-reference" replace/>,
});
