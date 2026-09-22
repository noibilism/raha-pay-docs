# Welcome

Accept payments, send payouts and reconcile your Raha Pay account.

## What this is for

Raha Pay connects your server to M-Pesa, Airtel Money and Kenyan banks through one consistent API. Your application creates a payment or payout, stores the returned Raha Pay ID, and receives the final result through a signed event.

Start here if you are choosing an integration path or learning the shared conventions. Use hosted checkout when you want Raha Pay to present payment choices. Use direct payment endpoints when your product owns the customer interface.

## How to build it

Create requests only from a trusted server. Send amounts as integer cents, add your own unique reference, and include an idempotency key on every create operation. Keep the Raha Pay ID beside your internal order or ledger entry.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Network acceptance is not a final result. Keep an operation open while it is awaiting a customer or processing at a bank. Update your records from verified events and reconcile against the transactions endpoint.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Build against Sandbox first. Exercise successful, declined, insufficient-funds and timeout outcomes before switching credentials and webhook secrets.
