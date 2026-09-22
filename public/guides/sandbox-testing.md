# Sandbox testing

Run repeatable payment and payout tests without moving real funds.

## What this is for

Sandbox mirrors the request shape, response envelope, status transitions and webhook signatures used in Live. Deterministic test details let your automated suite cover outcomes that are difficult or unsafe to force with real money.

Use Sandbox throughout development, CI and release verification. Move to Live only after webhook verification, retries, duplicate handling and reconciliation have been tested.

## How to build it

Create Sandbox keys and a Sandbox webhook endpoint in the dashboard. Use the prescribed phone or account values to select an outcome, then assert both the synchronous response and the later event.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Do not treat a successful create response as a completed movement. Test delayed events, duplicate events and an API timeout after acceptance. Your records should still converge to one final result.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Reset test records by creating a new merchant reference. Simulated balance top-ups are immediate and affect only Sandbox.
