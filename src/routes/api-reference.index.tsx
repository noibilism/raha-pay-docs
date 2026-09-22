import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DocsShell } from "@/components/docs/docs-shell";
import { endpointGroups, endpoints } from "@/data/endpoints";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/api-reference/")({
  head: () => ({
    meta: [
      { title: "API Reference — Raha Pay Docs" },
      { name: "description", content: "Complete KES endpoint reference for Raha Pay payments, payouts, Virtual accounts, balances and transactions." },
      { property: "og:title", content: "Raha Pay API reference" },
      { property: "og:description", content: "Methods, request fields, examples, responses and errors for every Raha Pay KES endpoint." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApiIndex,
});

function ApiIndex() {
  return (
    <DocsShell currentPath="/api-reference" api>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-ink-muted">API Reference</p>
      <h1 className="font-display text-[28px] font-extrabold leading-9">API reference</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Explore payments, payouts, accounts and reporting endpoints with complete request and response examples.</p>
      <div className="mt-12 space-y-10">
        {endpointGroups.map((group) => (
          <section key={group}>
            <h2 className="font-display text-xl font-bold">{group}</h2>
            <div className="mt-4 divide-y rounded-[10px] border bg-surface-raised">
              {endpoints.filter((endpoint) => endpoint.group === group).map((endpoint) => (
                <Link key={endpoint.slug} to="/api-reference/$slug" params={{ slug: endpoint.slug }} className="group flex items-center gap-4 p-4 hover:bg-accent">
                  <span className={cn("w-11 font-mono text-xs font-bold", endpoint.method === "GET" ? "text-info" : "text-success")}>{endpoint.method}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{endpoint.title}</span>
                    <code className="mt-1 block truncate text-xs text-muted-foreground">{endpoint.path}</code>
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DocsShell>
  );
}
