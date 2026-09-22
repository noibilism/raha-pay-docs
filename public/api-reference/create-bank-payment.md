# Create a bank transfer payment

POST /v1/payments

Create bank details for a customer transfer.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `amount` (integer, required): Amount in cents. Send KES 12,500.00 as 1250000.

- `payment_method` (string, required): Set to bank_transfer.

- `reference` (string, required): Your unique payment reference.

- `customer` (object, required): Customer name, email and phone number.

## Success response

```json

{
  "status": "success",
  "message": "Payment created",
  "data": {
    "id": "rp_pay_4Fm8Qa26",
    "status": "awaiting_customer",
    "account_number": "0199001122",
    "bank_name": "Raha Settlement Bank",
    "expires_at": "2026-09-22T15:05:00+03:00"
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
