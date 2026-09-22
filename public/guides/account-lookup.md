# Account name lookup

Confirm a bank account name before creating a payout.

## What this is for

Account lookup asks the selected bank for the name attached to an account number. It helps the sender catch typing mistakes before money leaves your balance.

Run lookup immediately before a bank payout. It is not proof of identity and should not replace your customer verification or fraud controls.

## How to build it

Use the bank code from the banks endpoint and send the account number exactly as entered. Display the returned name and require the sender to confirm it before creating the payout.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Banks can be temporarily unavailable, an account can be closed, or the entered bank code can be wrong. Do not cache a successful lookup indefinitely.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use the Sandbox valid and missing account numbers. Confirm that your payout action remains unavailable until a successful lookup is confirmed.
