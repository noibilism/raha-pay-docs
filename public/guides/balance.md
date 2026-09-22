# Balance

Read the funds available for payouts and reconciliation.

## What this is for

The balance endpoint separates funds available to send, funds still pending, and the ledger total. Use these values for operational visibility, not as a replacement for your own transaction ledger.

Read the balance before a payout batch and during reconciliation. Avoid polling it for every page render; cache briefly and refresh after relevant events.

## How to build it

Call the endpoint from your server and display amounts as currency after converting integer cents. Record the read time so operators know how current the value is.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A pending movement can change after the read. A payout may still fail if another process reserves funds first. Handle insufficient_balance from the create call.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Add simulated Sandbox funds, create payouts and compare available, pending and ledger values after each final event.
