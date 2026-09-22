# Rate limits and IP allowlisting

Control Live access and recover safely when request volume is high.

## What this is for

Rate limits protect account and network capacity. IP allowlisting restricts Live API keys to requests from public addresses you register in the dashboard.

Configure allowlisting before launch when your servers have stable egress addresses. Read rate-limit headers for batch jobs and high-volume traffic.

## How to build it

Register every production egress address, monitor remaining capacity, queue bursts and apply exponential backoff with jitter after 429 responses. Honour Retry-After when present.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Autoscaling or third-party workers may use addresses you did not register. Retrying all workers at the same moment creates another spike. Webhook delivery is not restricted by your outbound API allowlist.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Call Live readiness checks from every production region, and load-test Sandbox below and above the documented window.
