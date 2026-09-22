# Retries and idempotency

Make create requests and event handlers safe to repeat.

## What this is for

Distributed systems can lose a response even after work completed. Idempotency lets you repeat the same create request without creating a second payment or payout, while event deduplication prevents repeated delivery from applying an update twice.

Send an Idempotency-Key on every POST that creates money movement. Deduplicate every event by its rp_evt_ ID.

## How to build it

Generate a key for one business attempt, store it with the request body, and reuse both after network uncertainty. Use a database uniqueness rule for event IDs before queueing work.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Reusing a key with a changed body returns idempotency_conflict. Creating a new key after every timeout can duplicate work. Retrying permanent validation errors wastes capacity.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Drop the client connection after sending a Sandbox create call, retry the identical call and confirm the same object ID returns. Replay an event and confirm one ledger update.
