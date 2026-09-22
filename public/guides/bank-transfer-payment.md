# Bank transfer

Give a customer account details for a single bank payment.

## What this is for

A bank transfer payment returns account details tied to one expected amount and reference. Raha Pay matches the incoming credit and sends the payment result to your webhook.

Use this flow for larger payments, customers who prefer a banking app, or a checkout that may outlive a mobile prompt. Use a dedicated account when one customer needs a reusable account number.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Create the payment, display the bank name, account name, account number, amount and expiry exactly as returned, and keep the order pending. Match the final event to the stored payment ID.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Customers can transfer after expiry, use another name, or send less or more than requested. Do not fulfil from a bank screenshot. Use the credited amount in the event and apply your amount-mismatch policy.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use the Sandbox account values to produce exact, underpaid, overpaid and expired results. Verify that your UI removes expired instructions.
