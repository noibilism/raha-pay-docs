# Payouts to M-Pesa and Airtel Money

Send funds to a Kenyan mobile wallet.

## What this is for

A mobile payout sends funds to an M-Pesa or Airtel Money wallet. Raha Pay validates the number and balance, submits the transfer, and reports the destination result asynchronously.

Use mobile payouts for recipients who identify by phone number. Use a bank payout when the recipient needs funds in a bank account or the amount exceeds wallet limits.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Confirm the displayed recipient number, normalize it to 2547XXXXXXXX, set the correct network, and create the payout from your server. Save the rp_po_ ID and do not promise delivery while processing.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

The number can belong to the wrong network, exceed account limits, be inactive or temporarily unreachable. A network acknowledgement can still reverse later.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use the Sandbox numbers for success, insufficient balance, invalid recipient and reversal. Verify your ledger creates compensating entries for reversals.
