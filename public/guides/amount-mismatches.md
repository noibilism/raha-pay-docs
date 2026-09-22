# Amount mismatches

Handle transfers that differ from the amount you requested.

## What this is for

Bank customers sometimes send less or more than the displayed amount. Raha Pay records the actual credit so your application can apply a predictable policy instead of silently marking the original order paid.

Apply this guidance to bank transfers and one-time account numbers. Wallet prompts normally authorize the exact requested amount and do not use this flow.

## How to build it

Store requested_amount and received_amount separately. Decide whether to hold, partially credit, request the balance or refund an overpayment. Show the decision in your support tools and ledger.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Do not alter the original bank credit. Do not infer the intended order from amount alone. Escalate credits that cannot be matched by account mapping and reference.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Force an underpayment and overpayment in Sandbox. Confirm that neither automatically fulfils an exact-price order unless your written business rule allows it.
