# Quickstart: your first M-Pesa payment in 5 minutes

Send an STK prompt, receive the event and confirm the payment.

## What this is for

This quickstart takes one order from an API key to a confirmed M-Pesa payment. You will create the payment from your server, approve the prompt on a Sandbox number, receive a signed event and fetch the stored payment.

Use this path for a server-rendered checkout or mobile application whose backend controls the order. Choose hosted checkout instead when you do not want to build a payment selection screen.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Use a unique reference that maps to one order. Raha Pay returns an rp_pay_ identifier immediately. Save it before showing the customer a waiting state, because it is the stable key for later retrieval and reconciliation.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A timeout does not prove the payment failed. The customer may have approved while a network response was delayed. Wait for a final event or retrieve the payment before creating a replacement.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use the Sandbox numbers below to force each outcome. Reuse the same idempotency key only when repeating the exact same request after an uncertain network result.

## Go live checklist

- Switch to Live API keys and the Live base URL.

- Register the Live webhook URL and secret.

- Verify Raha-Signature before parsing each event.

- Handle every final status without duplicate fulfilment.

- Reconcile your ledger against transactions every day.
