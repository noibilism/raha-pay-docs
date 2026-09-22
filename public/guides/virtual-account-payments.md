# Receive payments

Credit customers safely from transfers into their Virtual accounts.

## What this is for

Each incoming transfer creates a credit record before your product balance changes. Raha Pay compares the mapped customer with sender and transfer details, then emits a credited, held or returned event.

Use this flow whenever your customer shares their Virtual account details with a payer or transfers from their own bank.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Verify the event signature, deduplicate its rp_evt_ ID, match the rp_va_ account, and post the received_amount to your ledger. Store sender_name, bank_reference, received_at and any mismatch reason for operations review.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

If the sender name or amount conflicts with your policy, keep the credit held. Never infer an order from amount alone. Underpayments and overpayments remain separate credits until your written mismatch policy resolves them.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Simulate exact, underpaid, overpaid, sender-mismatch, held and returned credits. Confirm no held transfer changes the spendable customer balance.
