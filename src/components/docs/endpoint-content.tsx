import { ChevronDown, KeyRound } from "lucide-react";
import { useState } from "react";
import type { ApiEndpoint, ApiParameter } from "@/data/endpoints";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { LanguageCodeTabs, requestExamples } from "./code-examples";
import { StatusPill } from "./status-pill";
import { cn } from "@/lib/utils";

const methodStyle: Record<string,string> = { GET:"bg-info-ground text-info", POST:"bg-success-ground text-success", PATCH:"bg-warning-ground text-warning", DELETE:"bg-danger-ground text-danger" };
const statusByGroup: Record<string,string[]> = { Payments:["initiated","awaiting_customer","processing","successful","failed"], Payouts:["initiated","processing","successful","failed","reversed"], "Payment links":["active","expired"], "Virtual accounts":["pending_activation","active","restricted","closed"] };

function exampleFor(parameter: ApiParameter, endpoint: ApiEndpoint) {
  if (parameter.name === "Idempotency-Key") return "request-10492";
  const value = endpoint.request?.[parameter.name];
  if (value !== undefined) return typeof value === "object" ? JSON.stringify(value) : String(value);
  if (parameter.name.endsWith("_id")) return endpoint.path.match(/\{([^}]+)\}/)?.[1] === parameter.name ? `rp_${parameter.name.replace("_id", "")}_example` : "example";
  return parameter.allowed?.split(",")[0]?.trim() ?? "—";
}

function ParameterRows({ endpoint }: { endpoint: ApiEndpoint }) {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (name:string) => setOpen((values) => values.includes(name) ? values.filter((value) => value !== name) : [...values,name]);
  return <tbody>{endpoint.params.map((parameter,index) => {
    const nested = parameter.type === "object";
    const value = endpoint.request?.[parameter.name];
    return <tr key={parameter.name} className={cn("border-t", index % 2 === 1 && "bg-surface")}>
      <td className="px-4 py-3 align-top"><div className="flex items-center gap-1"><code className="break-all font-mono text-xs text-primary">{parameter.name}</code>{nested && <button onClick={() => toggle(parameter.name)} className="rounded p-1 text-muted-foreground hover:text-primary" aria-label={`Show ${parameter.name} fields`}><ChevronDown className={cn("size-3.5 transition-transform",open.includes(parameter.name)&&"rotate-180")}/></button>}</div>{nested&&open.includes(parameter.name)&&Boolean(value)&&typeof value==="object"&&<div className="mt-2 border-l pl-3 font-mono text-xs text-muted-foreground">{Object.keys(value as Record<string, unknown>).map((key)=><div key={key} className="py-1">{parameter.name}.{key}</div>)}</div>}</td>
      <td className="px-3 py-3 align-top font-mono text-xs">{parameter.type}</td>
      <td className="px-3 py-3 align-top"><span className={cn("rounded-full px-2 py-1 text-xs font-bold",parameter.required?"bg-violet-soft text-on-violet-soft":"bg-muted text-muted-foreground")}>{parameter.required?"Required":"Optional"}</span></td>
      <td className="min-w-56 px-3 py-3 align-top text-sm leading-6 text-muted-foreground">{parameter.description}{parameter.allowed&&<span className="mt-1 block">Allowed: <code className="font-mono text-xs">{parameter.allowed}</code></span>}</td>
      <td className="px-4 py-3 align-top"><code className="break-all font-mono text-xs text-foreground">{exampleFor(parameter,endpoint)}</code></td>
    </tr>;
  })}</tbody>;
}

function flatten(value: unknown, prefix=""): Array<[string,string,string]> {
  if (Array.isArray(value)) return value.length ? flatten(value[0], `${prefix}[]`) : [];
  if (value && typeof value === "object") return Object.entries(value as Record<string,unknown>).flatMap(([key,item]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    const row:[string,string,string] = [path, Array.isArray(item)?"array":item===null?"null":typeof item, `Returned ${key.replaceAll("_"," ")}.`];
    return item && typeof item === "object" ? [row,...flatten(item,path)] : [row];
  });
  return [];
}

export function EndpointContent({ endpoint }: { endpoint:ApiEndpoint }) {
  const responseFields = flatten(endpoint.success);
  const statuses = statusByGroup[endpoint.group] ?? [];
  const endpointCode = String((endpoint.error["data"] as {code?:string})?.code ?? "request_failed");
  return <>
    <div className="mb-12"><div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-ink-muted"><span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-violet-soft text-on-violet-soft"><KeyRound className="size-4"/></span>{endpoint.group}</div><div className="flex flex-wrap items-center gap-3"><span className={cn("rounded-full px-2.5 py-1 font-mono text-xs font-bold",methodStyle[endpoint.method])}>{endpoint.method}</span><h1 className="font-display text-[28px] font-extrabold leading-9">{endpoint.title}</h1></div><div className="mt-5 flex overflow-hidden rounded-md border bg-muted/50 font-mono text-sm"><span className="border-r bg-violet-soft px-3 py-3 text-on-violet-soft">{{BASE_URL}}</span><code className="overflow-x-auto px-3 py-3">{endpoint.path}</code></div>{endpoint.slug==="simulate-virtual-account-credit"&&<span className="mt-3 inline-flex rounded-full bg-warning-ground px-2.5 py-1 text-xs font-bold text-warning">Sandbox only</span>}<p className="mt-6 text-lg leading-8 text-muted-foreground">{endpoint.description}</p></div>
    <div className="space-y-12">
      <section><h2 className="font-display text-xl font-bold">Authentication</h2><div className="mt-5 rounded-[10px] border bg-info-ground p-4 text-info"><p className="font-bold">Bearer secret key</p><p className="mt-1 text-sm leading-6">Send <code className="font-mono">Authorization: Bearer sk_test_...</code> from your server. Live calls use <code className="font-mono">sk_live_...</code>.</p></div></section>
      <section><h2 className="font-display text-xl font-bold">{endpoint.method === "GET" ? "Parameters" : "Body parameters"}</h2>{endpoint.params.length?<div className="mt-5 overflow-x-auto rounded-[10px] border bg-surface-raised"><table className="w-full min-w-[780px] text-left"><thead className="sticky top-0 z-10 bg-violet-soft text-xs text-on-violet-soft"><tr><th className="px-4 py-3">Name</th><th className="px-3 py-3">Type</th><th className="px-3 py-3">Requirement</th><th className="px-3 py-3">Description</th><th className="px-4 py-3">Example</th></tr></thead><ParameterRows endpoint={endpoint}/></table></div>:<p className="mt-4 text-muted-foreground">This endpoint has no request parameters.</p>}</section>
      <section><h2 className="font-display text-xl font-bold">Response fields</h2><div className="mt-5 overflow-x-auto rounded-[10px] border bg-surface-raised"><table className="w-full min-w-[620px] text-left"><thead className="sticky top-0 bg-violet-soft text-xs text-on-violet-soft"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Description</th></tr></thead><tbody>{responseFields.map(([name,type,description],index)=><tr key={name} className={cn("border-t",index%2===1&&"bg-surface")}><td className="px-4 py-3 font-mono text-xs text-primary">{name}</td><td className="px-4 py-3 font-mono text-xs">{type}</td><td className="px-4 py-3 text-sm text-muted-foreground">{description}</td></tr>)}</tbody></table></div></section>
      {statuses.length>0&&<section><h2 className="font-display text-xl font-bold">Status values</h2><div className="mt-5 flex flex-wrap gap-2">{statuses.map((status)=><StatusPill key={status} status={status}/>)}</div></section>}
      <section><h2 className="font-display text-xl font-bold">Errors</h2><div className="mt-5 overflow-hidden rounded-[10px] border bg-surface-raised"><table className="w-full text-left text-sm"><thead className="bg-violet-soft text-xs text-on-violet-soft"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">HTTP</th><th className="px-4 py-3">What to do</th></tr></thead><tbody><tr><td className="px-4 py-3 font-mono text-xs">{endpointCode}</td><td className="px-4 py-3">400–422</td><td className="px-4 py-3 text-muted-foreground">{String(endpoint.error["message"])}</td></tr><tr className="border-t bg-surface"><td className="px-4 py-3 font-mono text-xs">unauthorized</td><td className="px-4 py-3">401</td><td className="px-4 py-3 text-muted-foreground">Check the key and environment.</td></tr><tr className="border-t"><td className="px-4 py-3 font-mono text-xs">rate_limited</td><td className="px-4 py-3">429</td><td className="px-4 py-3 text-muted-foreground">Wait for Retry-After, then retry safely.</td></tr></tbody></table></div></section>
    </div>
  </>;
}

export function EndpointCodeRail({ endpoint }: {endpoint:ApiEndpoint}) {
  return <div className="min-w-0"><LanguageCodeTabs examples={requestExamples(endpoint)}/><Tabs defaultValue="success" className="mt-6"><TabsList className="grid w-full grid-cols-2 bg-code-hover"><TabsTrigger value="success" className="text-code-muted data-[state=active]:bg-code data-[state=active]:text-code-foreground">200 response</TabsTrigger><TabsTrigger value="error" className="text-code-muted data-[state=active]:bg-code data-[state=active]:text-code-foreground">4xx response</TabsTrigger></TabsList><TabsContent value="success"><CodeBlock code={JSON.stringify(endpoint.success,null,2)} label="200 response"/></TabsContent><TabsContent value="error"><CodeBlock code={JSON.stringify(endpoint.error,null,2)} label="4xx response"/></TabsContent></Tabs>{endpoint.webhook&&<p className="mt-5 text-sm leading-6 text-code-muted">Final event: <code className="font-mono text-code-key">{endpoint.webhook}</code></p>}</div>;
}
