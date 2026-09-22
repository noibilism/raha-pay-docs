import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/api-reference")({
  component: ApiReferenceLayout,
});

function ApiReferenceLayout() {
  return <Outlet />;
}
