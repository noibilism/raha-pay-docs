# Virtual accounts in Sandbox

Test account creation and incoming KES credits deterministically.

## What this is for

Sandbox provides test KYC records and a credit simulation endpoint. It follows the same object, status and event shapes as Live without creating real bank details or moving funds.

Use Sandbox for development, CI and release checks. Never send real customer identity documents to Sandbox.

## How to build it

Create a Sandbox Virtual account, save its ID, then call the simulation endpoint with an amount and scenario. Process the resulting signed event through the same handler used for Live.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Sandbox account numbers cannot receive real transfers. Simulated events can be delayed or replayed so your implementation must remain idempotent.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Run approved, pending review, KYC mismatch, exact credit, held credit, returned credit and duplicate-event scenarios before requesting Live activation.
