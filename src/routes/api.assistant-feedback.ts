import { createFileRoute } from "@tanstack/react-router";
export const Route=createFileRoute("/api/assistant-feedback")({server:{handlers:{POST:async()=>Response.json({ok:true})}}});
