import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ApiEndpoint } from "@/data/endpoints";
import type { CodeLanguage } from "@/data/config";
import { useDocs } from "./docs-context";
import { CodeBlock } from "./code-block";

export const languageLabels: Record<CodeLanguage, string> = { curl: "cURL", node: "Node.js", python: "Python", php: "PHP" };

function endpointUrl(endpoint: ApiEndpoint) {
  return `{{BASE_URL}}${endpoint.path.replace("{payment_id}", "rp_pay_8Kq2Xw91").replace("{payout_id}", "rp_po_3Vn7Lm20").replace("{transaction_id}", "rp_pay_8Kq2Xw91")}`;
}

export function requestExamples(endpoint: ApiEndpoint): Record<CodeLanguage, string> {
  const url = endpointUrl(endpoint);
  const body = endpoint.request ? JSON.stringify(endpoint.request, null, 2) : "";
  const create = endpoint.method === "POST";
  const headers = `${create ? ` \\\n  -H "Idempotency-Key: request-10492"` : ""}${body ? ` \\\n  -H "Content-Type: application/json"` : ""}`;
  return {
    curl: `curl -X ${endpoint.method} "${url}" \\\n  -H "Authorization: Bearer {{SECRET_KEY_PREFIX}}test_example"${headers}${body ? ` \\\n  -d '${body}'` : ""}`,
    node: `const response = await fetch("${url}", {\n  method: "${endpoint.method}",\n  headers: {\n    Authorization: "Bearer {{SECRET_KEY_PREFIX}}test_example"${create ? ',\n    "Idempotency-Key": "request-10492"' : ""}${body ? ',\n    "Content-Type": "application/json"' : ""}\n  }${body ? `,\n  body: JSON.stringify(${body})` : ""}\n});\n\nconst result = await response.json();`,
    python: `response = requests.${endpoint.method.toLowerCase()}(\n    "${url}",\n    headers={\n        "Authorization": "Bearer {{SECRET_KEY_PREFIX}}test_example"${create ? ',\n        "Idempotency-Key": "request-10492"' : ""}\n    }${body ? `,\n    json=${body.replaceAll("true", "True").replaceAll("false", "False")}` : ""}\n)\n\nresult = response.json()`,
    php: `$response = $client->request('${endpoint.method}', '${url}', [\n  'headers' => [\n    'Authorization' => 'Bearer {{SECRET_KEY_PREFIX}}test_example'${create ? ",\n    'Idempotency-Key' => 'request-10492'" : ""}\n  ]${body ? `,\n  'json' => ${body}` : ""}\n]);`,
  };
}

export function LanguageCodeTabs({ examples, label = "Request" }: { examples: Record<CodeLanguage, string>; label?: string }) {
  const { language, setLanguage } = useDocs();
  return <Tabs value={language} onValueChange={(value) => setLanguage(value as CodeLanguage)}>
    <TabsList className="grid w-full grid-cols-4 bg-code-hover">
      {(Object.keys(languageLabels) as CodeLanguage[]).map((key) => <TabsTrigger key={key} value={key} className="text-code-muted data-[state=active]:bg-code data-[state=active]:text-code-foreground">{languageLabels[key]}</TabsTrigger>)}
    </TabsList>
    {(Object.keys(languageLabels) as CodeLanguage[]).map((key) => <TabsContent key={key} value={key}><CodeBlock code={examples[key]} label={`${languageLabels[key]} ${label.toLowerCase()}`} /></TabsContent>)}
  </Tabs>;
}