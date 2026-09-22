# Payment links

Create a shareable payment URL for invoices, messages and sales flows.

## What this is for

A payment link gives you a hosted URL without requiring a checkout session in your application. You can send it by email or message, add it to an invoice, or display it as a button.

Use a link when payment begins outside your product or the customer may return later. Use hosted checkout when your application initiates and tracks an active browser session.

## How to build it

Create the link with a clear name, reference and optional fixed amount. Save its ID, share the returned HTTPS URL and listen for standard payment events created from that link.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Links can be shared with the wrong person or opened more than once. Tie fulfilment to the payment reference and customer record, not to a page visit.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Open the link in a private browser, test each enabled rail and confirm that duplicate browser refreshes do not duplicate fulfilment.
