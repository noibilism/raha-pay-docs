# Hosted checkout

Redirect customers to a Raha Pay page to choose a payment method.

## What this is for

Hosted checkout provides a Raha Pay payment page with the enabled rails for your account. It reduces the interface and validation work in your product while your server keeps control of the order.

Use hosted checkout when you want a quick web integration or several payment methods on one screen. Use direct payments when you need a fully embedded experience.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Create checkout on your server, redirect to checkout_url, and provide an HTTPS callback URL. The callback returns the customer to your product; the signed webhook confirms the money movement.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A browser return can be replayed, skipped or opened before the event reaches you. Never fulfil from query parameters. Retrieve the payment when a returning customer sees a pending state.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Close the checkout, revisit it, complete it twice and exercise an expired session. Confirm that one merchant reference produces one order update.
