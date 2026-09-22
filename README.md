# Rahapay Docs

Build a developer documentation website for Rahapay, a payments API focused on Kenya (KES). This is a static docs site, no backend or database needed.

## Goal

A clean, fast, professional API docs site in the style of Stripe and ReadMe docs. It covers only Kenyan Shilling (KES) products: collections, payouts, virtual accounts, balances, conversions into/out of KES, webhooks and testing. Nothing about other currencies or countries.

## Source reference

Use the Fincra API documentation as the reference for what to cover and how the KES flows work:

- Docs home: https://docs.fincra.com/docs/getting-started

- Machine-readable index (use this first): https://docs.fincra.com/llms.txt

- Any page is available as Markdown by appending .md to its URL

Only use KES-relevant pages. Start with:

- https://docs.fincra.com/docs/api-environments

- https://docs.fincra.com/docs/authentication

- https://docs.fincra.com/docs/ip-whitelisting

- https://docs.fincra.com/docs/test-mobile-numbers

- https://docs.fincra.com/docs/test-accounts-and-mobile-wallets

- https://docs.fincra.com/docs/funding-test-balance

- https://docs.fincra.com/docs/webhooks (plus the payout, collection, charges, conversion and virtual account webhook pages)

- https://docs.fincra.com/docs/validating-webhook

- https://docs.fincra.com/docs/api-rate-limits

- https://docs.fincra.com/docs/payin-overview

- https://docs.fincra.com/docs/checkout-redirect

- https://docs.fincra.com/docs/checkout-standard

- https://docs.fincra.com/docs/payment-links

- https://docs.fincra.com/docs/kes-virtual-account

- https://docs.fincra.com/reference/temporary-virtual-account-api

- https://docs.fincra.com/docs/mobile-money

- https://docs.fincra.com/docs/mobile-money-direct-charge

- https://docs.fincra.com/docs/bank-transfer-direct-charge

- https://docs.fincra.com/docs/handling-underpayments-and-overpayments

- https://docs.fincra.com/docs/payout-overview

- https://docs.fincra.com/docs/making-bank-account-transfers

- https://docs.fincra.com/docs/mobile-money-local-transfers

- https://docs.fincra.com/docs/cross-border-payouts

- https://docs.fincra.com/docs/verify-iban-and-account-numbers

- https://docs.fincra.com/reference/get-balances

- https://docs.fincra.com/docs/conversions

- https://docs.fincra.com/docs/status-responses-and-meanings

- https://docs.fincra.com/docs/payout-errors

- https://docs.fincra.com/docs/virtual-error-codes

Ignore everything for NGN, GHS, TZS, ZAR, CAD, China, FCY/multicurrency accounts, BVN, Pay Attitude, EFT and direct debit mandates.

## Content rules (important)

- Match the reference's coverage: every KES flow, required field, status, webhook event and error there should have an equivalent here.

- Rewrite all prose in Rahapay's own voice. Do not copy sentences from the reference.

- The word "Fincra" must not appear anywhere on the site. Do not mention any other payments company.

- Replace the reference's base URLs, header names and branding with these placeholders, used exactly as written so I can find and replace them later:

  - {{BASE_URL_LIVE}}, {{BASE_URL_SANDBOX}}

  - {{AUTH_HEADER}} (the header name for the API key), {{SECRET_KEY_PREFIX}}, {{PUBLIC_KEY_PREFIX}}

  - {{WEBHOOK_SIGNATURE_HEADER}}, {{SUPPORT_EMAIL}}, {{DASHBOARD_URL}}

- Store all endpoint definitions (method, path, description, request params, response examples, error codes) in a single structured TypeScript data file (src/data/endpoints.ts). Store guide content in separate MDX or TS content files, so content can be edited without touching components.

- Amounts in examples are in KES. Phone numbers use Kenyan format (2547XXXXXXXX). Use realistic but clearly fake names and references.

- Write complete, useful content for every page. No lorem ipsum.

## Information architecture (left sidebar)

GETTING STARTED

- Introduction (what Rahapay does for KES; core concepts: merchant, customer, collection, payout, balance)

- Environments (Live vs Sandbox, base URLs)

- Authentication (API keys, where to find them, secret vs public key, example header)

- IP Whitelisting

- Rate Limits

- Test Credentials (test M-Pesa / mobile money numbers, test bank accounts, test outcomes: success, failed, pending)

- Funding Your Test Balance

WEBHOOKS

- Setting Up Webhooks

- Verifying Webhook Signatures (HMAC SHA512 example in Node, Python, PHP)

- Collection Webhook

- Payout Webhook

- Virtual Account Webhook

- Conversion Webhook

- Retry Policy and Idempotency

COLLECTIONS (PAY-IN)

- Overview (which KES payment methods exist and when to use each)

- Checkout (hosted redirect and inline/standard)

- Payment Links

- M-Pesa and Mobile Money (STK push / direct charge flow, with sequence diagram)

- Pay with Bank Transfer

- KES Virtual Accounts (permanent) and Temporary Virtual Accounts

- Handling Underpayments and Overpayments

PAYOUTS

- Overview

- Bank Transfers to Kenyan Banks (required fields, bank code list endpoint)

- Mobile Money Payouts (M-Pesa, Airtel Money)

- Cross-currency Payouts into KES (quote, then pay)

- Account Verification (resolve a Kenyan bank account before paying)

BALANCES & CONVERSIONS

- Get Balances

- Conversions (get quote, execute conversion, KES pairs only)

REFERENCE

- Transaction Statuses and what each means

- Error Codes (grouped: auth, validation, collections, payouts, virtual accounts)

- Supported Banks and Mobile Networks (KES)

- Changelog

- FAQ

## API Reference section

A separate top-level "API Reference" tab listing every endpoint, grouped as above. Each endpoint page shows:

- Method badge (colored GET/POST/PATCH/DELETE) and path

- Short description

- Request parameters table: name, type, required/optional, description, allowed values

- Example request in cURL, Node.js, Python and PHP (tabbed, with copy button)

- Example success response and example error response (JSON, syntax highlighted)

- Related webhook event, if any

## Layout and design

- Three-column layout on desktop: left nav, center content, right sticky column with code samples on API reference pages and "On this page" anchors on guide pages.

- Top bar: Rahapay text wordmark, tabs for Guides / API Reference / Changelog, search, a Live/Sandbox toggle that swaps base URLs in all code samples, dark/light mode toggle, and a "Dashboard" button linking to {{DASHBOARD_URL}}.

- Cmd+K / Ctrl+K search across page titles, headings and endpoint names.

- Callout components: Note, Warning, Tip.

- Sequence diagrams (Mermaid) for M-Pesa STK push, payout lifecycle and webhook delivery.

- Every heading gets a copyable anchor link. Previous / Next navigation at the bottom of every page, plus "Was this page helpful?".

- Mobile: sidebar collapses to a drawer, code samples stack below content, no horizontal scrolling.

- Visual style: neutral and clean, generous white space, one accent color (deep green), Inter for text, JetBrains Mono for code.

## Build order

1. Layout shell, navigation, search, theme and environment toggles.

2. Getting Started and Webhooks pages, fully written.

3. Collections and Payouts guides.

4. API Reference pages driven from the endpoints data file.

5. Reference pages (statuses, errors, banks) and polish.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://raha-pay-docs.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/26803255-ec37-4689-9a6a-ef4f980bccd4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
