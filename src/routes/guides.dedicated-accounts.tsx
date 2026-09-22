import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route=createFileRoute("/guides/dedicated-accounts")({component:()=> <Navigate to="/guides/$slug" params={{slug:"virtual-accounts"}} replace/>});
