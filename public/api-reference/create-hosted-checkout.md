# Create a hosted checkout

POST /v1/payments

Create a Raha Pay checkout page for a customer.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `amount` (integer, required): Amount in cents. Send KES 12,500.00 as 1250000.

- `payment_method` (string, required): Set to hosted_checkout.

- `callback_url` (string, required): HTTPS page to return the customer to.

- `reference` (string, required): Your unique payment reference.

## Success response

```json

{
  "status": "success",
  "message": "Checkout created",
  "data": {
    "id": "rp_pay_6Ts9De42",
    "status": "created",
    "checkout_url": "https://pay.rahapay.example/rp_pay_6Ts9De42"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Use a new reference for this payment.",
  "data": {
    "code": "duplicate_reference"
  }
}

```
