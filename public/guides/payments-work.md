# How payments work

Understand the payment lifecycle before building a collection flow.

## What this is for

A payment records a request to collect money from a customer. The create call starts the flow; M-Pesa, Airtel Money or a bank completes it asynchronously. Your order should follow the payment status rather than the browser session.

Use direct payments when your application controls the amount, customer details and payment rail. Use payment links for invoices and chat-based sales, or hosted checkout when customers should choose a rail on a Raha Pay page.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Create the payment once, save its ID and reference, and show the correct customer action. For STK flows, show a waiting state. For bank transfers, show the exact account details and expiry. Process the signed final event before fulfilment.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Customers can cancel, enter the wrong PIN, run out of funds or let a prompt expire. Network timeouts can happen after acceptance. Retry only with the original idempotency key until you know the first request did not create a payment.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Cover every final status and at least one delayed event. Run a daily comparison between your successful payments and the transactions endpoint to catch missed application updates.

## Go live checklist

- Switch to Live API keys and the Live base URL.

- Register the Live webhook URL and secret.

- Verify Raha-Signature before parsing each event.

- Handle every final status without duplicate fulfilment.

- Reconcile your ledger against transactions every day.
