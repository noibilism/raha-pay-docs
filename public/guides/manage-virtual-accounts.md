# Manage Virtual accounts

Retrieve, list, restrict and close customer account mappings.

## What this is for

Management endpoints let support and operations find an account, inspect its current state and stop future credits when the customer relationship changes.

List accounts for operational tooling, retrieve one for a customer detail view, restrict it during review and close it only when the mapping is no longer required.

## How to build it

Use cursor pagination for lists. Treat restriction as reversible and closure as final. Preserve the account and credit history in your ledger after closure.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Transfers sent during restriction may be held or returned. Closing an account while details remain visible to a customer creates avoidable returns, so remove them from the product first.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Create, retrieve, list, restrict and close a Sandbox account. Verify your interface reflects every status and prevents new use after closure.
