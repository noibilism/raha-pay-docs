# Changelog

Track API and documentation changes that may affect your integration.

## What this is for

The changelog records additions, behaviour clarifications, deprecations and migration deadlines. Breaking API changes use a new version and a migration notice.

Review this page during dependency updates and before each planned release.

## How to build it

Subscribe your engineering owner to release notices, record the API version you use and schedule deprecated behaviour before its removal date.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Ignoring a deprecation notice can leave a working integration dependent on retired behaviour. Treat webhook additions as forward-compatible and ignore fields you do not use.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Run your Sandbox regression suite after each relevant entry and before promoting the same release to Live.
