# How payouts work

Understand the payout lifecycle before sending money.

## What this is for

A payout moves money from your available Raha Pay balance to a mobile wallet or Kenyan bank account. The create response confirms acceptance; the destination network determines the final result.

Use payouts for suppliers, refunds, marketplace sellers and customer withdrawals. Use a payment refund operation when you must return a specific card or wallet payment through its original rail.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Validate the recipient, check your available balance, create the payout with a unique reference and store the returned ID. Keep the recipient view processing until a signed final event arrives.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Insufficient balance stops the payout before submission. A destination can reject incorrect details. A successful payout can later reverse. Reconcile every final status instead of treating processing as delivered.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Test success, insufficient balance, invalid recipient, network failure and reversal. Reuse an idempotency key only for an identical retry after an uncertain response.

## Go live checklist

- Switch to Live API keys and the Live base URL.

- Register the Live webhook URL and secret.

- Verify Raha-Signature before parsing each event.

- Handle every final status without duplicate fulfilment.

- Reconcile your ledger against transactions every day.
