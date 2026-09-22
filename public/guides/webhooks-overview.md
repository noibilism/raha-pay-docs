# Webhooks overview

Receive signed status updates at your HTTPS endpoint.

## What this is for

Webhooks tell your server when an asynchronous payment, payout or dedicated account credit changes state. Raha Pay signs the raw body and retries delivery when your endpoint does not acknowledge it.

Use webhooks for final business updates. Use a GET endpoint when a user actively requests a refresh or your reconciliation job needs to confirm stored state.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Register a public HTTPS endpoint, read the raw request bytes, verify Raha-Signature, store the event ID with a unique constraint, queue the business update and return HTTP 2xx quickly.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Events can arrive more than once, later than expected or out of order. A 2xx response means your server accepted responsibility for the event, not that every downstream job finished.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Raha Pay retries five times over 24 hours with increasing delays. In Sandbox, return a failure deliberately, observe retries, then restore 200 handling and confirm one business update.
