import { createFileRoute, Navigate } from "@tanstack/react-router";
export const Route=createFileRoute("/guides/amount-mismatches")({component:()=> <Navigate to="/guides/$slug" params={{slug:"virtual-account-payments"}} replace/>});
