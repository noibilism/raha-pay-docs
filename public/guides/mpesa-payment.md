# M-Pesa STK push

Prompt a Safaricom customer to approve a payment on their phone.

## What this is for

An STK push opens an M-Pesa approval prompt on a Safaricom phone. The customer checks the business name and amount, enters their PIN, and M-Pesa sends the result back to Raha Pay.

Use STK push when the customer is present and can act on their Safaricom phone. Use a bank transfer or payment link when the payer is remote, uses another network, or needs more time.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Collect the number in local form for display, normalize it to 2547XXXXXXXX on your server, and create one payment. Show an instruction to check the phone. Keep polling light and rely on the signed event for the final result.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

The customer has about 60 seconds to enter their PIN. They can cancel from the phone. Only one STK prompt can be open per number at a time. A timeout is not a failure until Raha Pay returns or emits a final status.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use each Sandbox number to verify customer approval, insufficient funds, cancellation and timeout. Confirm that retries do not create a second charge.
