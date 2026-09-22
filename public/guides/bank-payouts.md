# Payouts to Kenyan bank accounts

Verify a recipient and send funds to a Kenyan bank.

## What this is for

A bank payout credits an account identified by the current Raha Pay bank code and account number. An account lookup reduces mistakes by returning the bank's account name before you send.

Use a bank payout when the recipient gives an account number. Use a mobile payout for M-Pesa or Airtel Money. Never guess a bank code from a display name.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Fetch banks, run account lookup, show the returned name for confirmation, then create the payout using that exact name. Store the ID, reference, beneficiary and amount in your ledger.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A valid-looking account may belong to another person. Banks can reject dormant accounts, limits or unsupported characters in narration. A completed transfer can reverse.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Exercise valid, not-found, name-mismatch, insufficient-balance and reversed outcomes. Verify operators can see the confirmed beneficiary before approval.
