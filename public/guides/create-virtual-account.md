# Create a Virtual account

Create reusable Kenyan bank details for a verified customer.

## What this is for

Creating a Virtual account reserves bank details for one verified customer. The account name is generated from the accepted KYC record and should not be edited in your interface.

Create one account after the customer has passed your onboarding checks and your Virtual accounts product is active.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Send a unique customer reference and the correct individual or business KYC object. Store the returned account ID and display [PARTNER BANK], account name and account number together. Never create a replacement just because a response times out; retrieve by reference first.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Creation can pause for manual review or fail when KYC fields conflict. A duplicate customer reference returns the existing mapping or a conflict rather than silently creating another account.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use Sandbox identities to exercise immediate activation, pending review, KYC mismatch and duplicate-reference handling.
