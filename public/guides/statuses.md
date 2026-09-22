# Status codes and meanings

Map payment and payout states to safe product actions.

## What this is for

Statuses tell you whether an object is waiting, moving or final. Keep non-final records open for later events and ensure a final state cannot be overwritten by an older delivery.

Use this reference when mapping Raha Pay states into order, payout and ledger models.

## How to build it

Store both the current status and its event timestamp. Apply only valid forward transitions, render processing states clearly and make final outcomes visible to support teams.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Do not treat initiated, awaiting_customer or processing as success. A payout can reverse after success, so model reversal as a compensating final outcome.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Feed transitions in order, duplicate them and send them out of order. The stored state should remain correct.
