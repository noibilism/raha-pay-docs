# API keys and environments

Authenticate requests and keep Sandbox separate from Live.

## What this is for

Secret keys authenticate server requests. Public keys identify your account in browser-safe flows but cannot create payouts or read private account data. Sandbox and Live have separate credentials, records, webhook secrets and allowlists.

Read this before making your first call or rotating credentials. Use a restricted server key for each deployed service rather than sharing one key across unrelated systems.

## How to build it

Send the secret key as a Bearer token in the Authorization header. Load it from your deployment secret store, never from source control, a browser bundle, a mobile application or a client-visible log.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

A 401 usually means the key is missing, truncated, revoked or sent to the wrong environment. A 403 means the key is valid but the operation or source address is not allowed.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Keep Sandbox and Live values in separate deployment settings. Test key rotation by activating a second key, updating callers, confirming traffic and only then revoking the old key.
