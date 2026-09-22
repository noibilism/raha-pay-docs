# Event catalogue

See when every event fires and inspect its complete payload.

## What this is for

The catalogue is the contract between asynchronous Raha Pay operations and your event handler. Subscribe to the events that drive a real business state change and safely acknowledge unknown future event types.

Use this page while designing handlers, tests and monitoring. Use the object-specific guide for the complete payment or payout flow.

## How to build it

Route by type after verification and deduplication. Store the whole event for audit, but update your domain model only from the fields you explicitly support.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

An event type can be delivered more than once and unrelated event types can interleave. Do not depend on delivery order or exhaustively reject a payload because it includes a new field.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Send every catalogue event from Sandbox and replay each one. Confirm unknown types return 200 without changing data.
