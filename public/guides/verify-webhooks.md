# Verifying signatures

Verify every event against the untouched request body.

## What this is for

Signature verification proves that the request body was signed with your webhook secret. Verification must happen before JSON parsing and before any transaction or order is changed.

Verify every webhook in both environments. Do not use IP addresses, a user-agent string or an unguessable URL as a substitute for cryptographic verification.

## How the flow works

Follow the sequence from your server to the payment rail. The signed event closes the asynchronous part of the flow.

## How to build it

Read Raha-Signature, calculate HMAC-SHA256 over the exact raw bytes, decode both digests to equal-length buffers, and compare them in constant time. Reject missing or invalid signatures with 401.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Common mistakes are parsing the body first, using normal equality instead of a constant-time comparison, comparing different encodings, or using the other environment's secret.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Replay a valid Sandbox payload, change one byte, remove the header and use a Live secret against a Sandbox event. Only the unchanged body with the correct secret should pass.
