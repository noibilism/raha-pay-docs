# Errors

Search error codes and choose a specific recovery action.

## What this is for

Raha Pay errors use HTTP status for the broad class and data.code for the precise condition. Your application should log the request ID and code, then show a safe action rather than a raw provider message.

Use this catalogue in integration code, operations tooling and support runbooks.

## How to build it

Separate validation failures, authentication failures, conflicts, temporary limits and server failures. Retry only temporary failures, with backoff and the same idempotency key.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Blind retries can duplicate intent, prolong an outage or lock out a customer. Never expose secret values, raw stack traces or sensitive account details in client logs.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Force representative 400, 401, 403, 404, 409, 422, 429 and 500 responses. Assert the customer action and operator log for each class.
