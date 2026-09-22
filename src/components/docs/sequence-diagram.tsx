import { useEffect, useId, useState } from "react";
import { useDocs } from "./docs-context";

const diagrams = {
  mobile: `sequenceDiagram
    participant Server as Your server
    participant Raha as Raha Pay
    participant Rail as M-Pesa
    participant Phone as Customer's phone
    Server->>Raha: Create payment
    Raha->>Rail: Send STK request
    Rail->>Phone: Show PIN prompt
    Phone-->>Rail: Customer approves
    Rail-->>Raha: Confirm result
    Raha-->>Server: Send signed webhook`,
  airtel: `sequenceDiagram
    participant Server as Your server
    participant Raha as Raha Pay
    participant Rail as Airtel Money
    participant Phone as Customer's phone
    Server->>Raha: Create payment
    Raha->>Rail: Send approval request
    Rail->>Phone: Show confirmation prompt
    Phone-->>Rail: Customer approves
    Rail-->>Raha: Confirm result
    Raha-->>Server: Send signed webhook`,
  bank: `sequenceDiagram
    participant Server as Your server
    participant Raha as Raha Pay
    participant Bank as Bank
    participant Phone as Customer's phone
    Server->>Raha: Create bank payment
    Raha-->>Server: Return account details
    Server-->>Phone: Display transfer instructions
    Phone->>Bank: Customer sends transfer
    Bank-->>Raha: Confirm credit
    Raha-->>Server: Send signed webhook`,
  payout: `sequenceDiagram
    participant Server as Your server
    participant Raha as Raha Pay
    participant Rail as M-Pesa or bank
    participant Phone as Recipient
    Server->>Raha: Create payout
    Raha->>Raha: Validate and reserve funds
    Raha->>Rail: Submit transfer
    Rail-->>Phone: Credit recipient
    Rail-->>Raha: Return final status
    Raha-->>Server: Send signed webhook`,
  virtual: `sequenceDiagram
    participant Customer as Customer
    participant Bank as [PARTNER BANK]
    participant Raha as Raha Pay
    participant Server as Your server
    Server->>Raha: Create Virtual account with KYC
    Raha->>Bank: Issue account details
    Bank-->>Raha: Activate account
    Raha-->>Server: Return rp_va_ account
    Customer->>Bank: Send KES transfer
    Bank-->>Raha: Confirm incoming credit
    Raha-->>Server: Send signed credit event`,
  webhook: `sequenceDiagram
    participant Raha as Raha Pay
    participant Server as Your server
    participant Worker as Your worker
    Raha->>Server: POST signed event
    Server->>Server: Verify raw body
    Server->>Server: Deduplicate event ID
    Server->>Worker: Queue business update
    Server-->>Raha: Return HTTP 200
    Worker->>Worker: Apply update`,
};

export type DiagramType = keyof typeof diagrams;

export function SequenceDiagram({ type }: { type: DiagramType }) {
  const id = useId().replaceAll(":", "");
  const { theme } = useDocs();
  const [svg, setSvg] = useState("");
  useEffect(() => {
    let active = true;
    void import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", fontFamily: "Nunito Sans", themeVariables: {
        primaryColor: theme === "dark" ? "#231B52" : "#EFE8FD", primaryTextColor: theme === "dark" ? "#F2F2FA" : "#0E0F2E",
        primaryBorderColor: theme === "dark" ? "#A57BFF" : "#6E2EDB", lineColor: theme === "dark" ? "#A9ABCB" : "#585A78",
        signalColor: theme === "dark" ? "#A9ABCB" : "#585A78", signalTextColor: theme === "dark" ? "#F2F2FA" : "#0E0F2E",
        actorBkg: theme === "dark" ? "#231B52" : "#EFE8FD", actorBorder: theme === "dark" ? "#A57BFF" : "#6E2EDB",
        actorTextColor: theme === "dark" ? "#F2F2FA" : "#0E0F2E", noteBkgColor: theme === "dark" ? "#14163D" : "#FFFFFF",
      }});
      const result = await mermaid.render(`diagram-${id}`, diagrams[type]);
      if (active) setSvg(result.svg);
    });
    return () => { active = false; };
  }, [id, theme, type]);
  return <div className="my-6 overflow-x-auto rounded-[10px] border bg-surface-raised p-4" role="img" aria-label={`${type} sequence diagram`}><div className="min-w-[620px]" dangerouslySetInnerHTML={{ __html: svg }} /></div>;
}