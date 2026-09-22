# Create a mobile money payment

POST /v1/payments

Send an STK prompt to an M-Pesa or Airtel Money customer.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `amount` (integer, required): Amount in cents. Send KES 12,500.00 as 1250000.

- `phone_number` (string, required): Customer number in 2547XXXXXXXX format.

- `network` (string, required): Wallet network.

- `reference` (string, required): Your unique payment reference.

- `customer` (object): Customer name and email.

- `metadata` (object): Your custom key-value data.

## Success response

```json

{
  "status": "success",
  "message": "Payment created",
  "data": {
    "id": "rp_pay_8Kq2Xw91",
    "status": "awaiting_customer",
    "amount": 1250000,
    "phone_number": "254712345678",
    "created_at": "2026-09-22T14:05:00+03:00"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Use a Kenyan number in 2547XXXXXXXX format.",
  "data": {
    "code": "invalid_phone_number"
  }
}

```
