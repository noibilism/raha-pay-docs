# Banks and mobile networks

Find supported Kenyan banks, bank codes and wallet identifiers.

## What this is for

Destination identifiers are API values, not display labels. Fetch the active bank list when building account selection and send mpesa or airtel_money for mobile operations.

Use this reference for payout forms, account lookup and support tools. Refresh bank data periodically rather than embedding a permanent list in your application.

## How to build it

Cache the banks endpoint briefly, retain the returned bank_code as a string, and display the official bank name. Validate mobile numbers against the selected network before submission.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Banks can be disabled temporarily and codes can contain leading zeroes. Do not convert codes to numbers or infer a network from a phone prefix alone.

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Search the reference table, submit supported and unsupported codes, and confirm a disabled destination cannot be selected.
