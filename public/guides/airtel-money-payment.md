# Airtel Money

Prompt an Airtel Money customer to approve a wallet payment.

## What this is for

An Airtel Money payment asks the customer to approve a wallet debit on their Airtel line. The request and event shapes match M-Pesa, while the network value and customer experience differ.

Use this flow for active Airtel Money customers. Use M-Pesa for Safaricom numbers and hosted checkout when your product should let the customer choose.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Normalize the phone number, set network to airtel_money, create the payment with a unique reference and save the returned ID. Tell the customer to approve on the phone, then wait for a final event.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A line may be inactive, registered to another wallet state, short of funds or already handling an approval. Do not infer success from the create response or from a browser redirect.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Exercise successful, insufficient-funds, cancelled and timed-out outcomes. Verify that a duplicate event leaves your order unchanged.
