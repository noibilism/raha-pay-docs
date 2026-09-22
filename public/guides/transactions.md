# Transactions

List account activity and retrieve one canonical record.

## What this is for

Transactions provide a consistent ledger view across payments, payouts and dedicated account credits. Use them to reconcile your database and investigate a known Raha Pay ID or merchant reference.

Use events for immediate product updates and transactions for periodic reconciliation or support searches. Avoid aggressive polling for final statuses.

## How to build it

Request pages in a stable order, persist the cursor, and compare each item with your ledger. Retrieve one transaction when resolving a specific discrepancy.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

New records can arrive while you paginate. De-duplicate by Raha Pay ID and use timestamps as ordering hints rather than unique keys.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Create several Sandbox movements with different statuses and references. Verify filters, pagination, duplicate protection and daily totals.
