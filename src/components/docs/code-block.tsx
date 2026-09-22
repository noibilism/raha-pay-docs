import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDocs } from "./docs-context";

export function replaceEnvironment(value: string, environment: "sandbox" | "live") {
  return value.replaceAll("{{BASE_URL_SANDBOX}}", environment === "sandbox" ? "{{BASE_URL_SANDBOX}}" : "{{BASE_URL_LIVE}}").replaceAll("{{BASE_URL_LIVE}}", environment === "live" ? "{{BASE_URL_LIVE}}" : "{{BASE_URL_SANDBOX}}");
}

export function CodeBlock({ code, label = "Example" }: { code: string; label?: string }) {
  const { environment } = useDocs();
  const [copied, setCopied] = useState(false);
  const rendered = replaceEnvironment(code, environment);
  const copy = async () => { await navigator.clipboard.writeText(rendered); setCopied(true); window.setTimeout(() => setCopied(false), 1400); };
  const highlighted = rendered.split(/("(?:\\.|[^"\\])*"\s*:|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\/\/.*$|#.*$)/gm);
  return <div className="code-shell my-5 overflow-hidden rounded-[10px] border border-code-border bg-code text-code-foreground">
    <div className="flex h-10 items-center justify-between border-b border-code-border px-4 text-xs text-code-muted"><span>{label}</span><Button variant="ghost" size="icon" className="h-7 w-7 text-code-muted hover:bg-code-hover hover:text-code-foreground" onClick={copy} aria-label="Copy code">{copied ? <Check /> : <Copy />}</Button></div>
    <pre className="overflow-x-auto p-4 text-[13px] leading-6"><code>{highlighted.map((part,index)=>{const key=/^".*"\s*:$/.test(part);const string=/^"/.test(part);const number=/^\d/.test(part);const comment=/^(\/\/|#)/.test(part);return <span key={index} className={key?"text-code-key":string?"text-code-string":number?"text-code-number":comment?"text-code-muted":undefined}>{part}</span>})}</code></pre>
  </div>;
}
