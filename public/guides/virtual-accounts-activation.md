# Activation and KYC

Prepare your business and customer records for Virtual accounts.

## What this is for

Virtual accounts require product activation and verified customer information before account details can be issued. Raha Pay reviews your business use case, expected volumes and customer verification controls with [PARTNER BANK].

Complete activation before integrating account creation in Live. Sandbox creation remains available while your Live review is in progress.

## How to build it

Request activation in the dashboard. For an individual, collect legal_name, national_id, date_of_birth, phone_number and address. For a business, collect registered_name, registration_number, KRA_PIN, registered_address and authorized_representative. Submit only information you are permitted to process.

Keep credentials on your server, store Raha Pay identifiers with your own references, and make each state change safe to apply more than once.

## What can go wrong

Incomplete, expired or inconsistent identity details produce kyc_incomplete or kyc_mismatch. Manual review can take [X] business days. Enhanced checks apply above KES [THRESHOLD].

> **Act on final state:** A transport timeout or accepted request is not proof of the final money movement. Confirm the stored status before taking irreversible action.

## Test it in Sandbox

Use the documented Sandbox KYC values to force approved, pending review and rejected outcomes without using real identity data.
