# Create a payment link

POST /v1/payment-links

Create a shareable link for one or more payments.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `amount` (integer, required): Amount in cents. Send KES 12,500.00 as 1250000.

- `name` (string, required): Name shown to the customer.

- `reference` (string, required): Your unique link reference.

- `callback_url` (string): HTTPS page shown after payment.

## Success response

```json

{
  "status": "success",
  "message": "Payment link created",
  "data": {
    "id": "rp_link_2Hr6Pk18",
    "status": "active",
    "url": "https://pay.rahapay.example/l/rp_link_2Hr6Pk18"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Use a reference that has not been used before.",
  "data": {
    "code": "duplicate_reference"
  }
}

```
