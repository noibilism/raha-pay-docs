import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  initiated: "bg-info-ground text-info", created: "bg-info-ground text-info", awaiting_customer: "bg-info-ground text-info",
  pending: "bg-warning-ground text-warning", processing: "bg-warning-ground text-warning",
  successful: "bg-success-ground text-success", active: "bg-success-ground text-success",
  failed: "bg-danger-ground text-danger", reversed: "bg-danger-ground text-danger", expired: "bg-danger-ground text-danger",
};

export function StatusPill({ status }: { status: string }) {
  return <span className={cn("inline-flex items-center gap-2 rounded-full px-2.5 py-1 font-mono text-xs font-bold", styles[status.toLowerCase()] ?? "bg-muted text-muted-foreground")}><span className="size-1.5 rounded-full bg-current" />{status.replaceAll("_", " ")}</span>;
}