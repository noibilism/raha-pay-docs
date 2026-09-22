# Virtual accounts overview

Give each verified customer reusable Kenyan bank details for incoming KES transfers.

## What this is for

A Virtual account is a named Kenyan bank account mapped to one customer in your product. Incoming KES transfers are identified automatically and reported through signed events, so you can update a wallet or ledger without asking the sender to copy a reference.

Use a reusable Virtual account for wallets, marketplaces, savings products and repeat customers. Use a one-time bank payment when you expect one exact invoice payment instead.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Activate the product, submit the customer's KYC data, create the account and store its rp_va_ identifier. Display the returned bank name, account name and account number exactly. Credit your customer only after a verified virtual_account.credited event.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A transfer can be held when sender details do not match, returned after review, or received while the account is restricted. Keep one immutable ledger entry per credit and never apply the same event ID twice.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use the Sandbox credit endpoint to simulate matched, mismatched, held and returned transfers. Replay each event to confirm deduplication.
