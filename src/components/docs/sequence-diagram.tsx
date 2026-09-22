import { ArrowRight } from "lucide-react";
const configs = {
  mobile: { actors:["Customer","Merchant","Raha Pay","Mobile network"], steps:[["Merchant","Raha Pay","Create KES charge"],["Raha Pay","Mobile network","Send STK request"],["Mobile network","Customer","Prompt for wallet PIN"],["Customer","Mobile network","Approve payment"],["Mobile network","Raha Pay","Confirm result"],["Raha Pay","Merchant","Signed webhook"]] },
  payout: { actors:["Merchant","Raha Pay","Destination"], steps:[["Merchant","Raha Pay","Create payout"],["Raha Pay","Raha Pay","Validate and reserve"],["Raha Pay","Destination","Submit transfer"],["Destination","Raha Pay","Return final status"],["Raha Pay","Merchant","Signed webhook"]] },
  webhook: { actors:["Raha Pay","Merchant endpoint","Worker"], steps:[["Raha Pay","Merchant endpoint","Signed event"],["Merchant endpoint","Merchant endpoint","Verify and deduplicate"],["Merchant endpoint","Worker","Queue event"],["Merchant endpoint","Raha Pay","Return 2xx"],["Worker","Worker","Apply business update"]] }
};
export function SequenceDiagram({ type }: { type: keyof typeof configs }) {
  const config=configs[type];
  return <div className="my-6 overflow-x-auto rounded-md border bg-muted/35 p-4" role="img" aria-label={`${type} sequence diagram`}>
    <div className="grid min-w-[560px] grid-cols-4 gap-2">{config.actors.map((actor)=><div key={actor} className="rounded border bg-background px-2 py-2 text-center text-xs font-semibold">{actor}</div>)}</div>
    <ol className="mt-4 min-w-[560px] space-y-2">{config.steps.map(([from,to,label],index)=><li key={`${label}-${index}`} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs"><span className="text-right font-medium">{from}</span><span className="flex items-center gap-2 text-muted-foreground"><span className="w-5 text-right font-mono">{index+1}</span><ArrowRight className="size-3.5"/></span><span><strong className="font-medium">{to}</strong><span className="ml-2 text-muted-foreground">{label}</span></span></li>)}</ol>
  </div>;
}
