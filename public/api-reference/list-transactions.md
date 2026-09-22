# List transactions

GET /v1/transactions

List payments and payouts with optional filters.

## Parameters

- `type` (string): Filter by payment or payout.

- `status` (string): Filter by transaction status.

- `reference` (string): Filter by your reference.

## Success response

```json

{
  "status": "success",
  "message": "Transactions retrieved",
  "data": [
    {
      "id": "rp_pay_8Kq2Xw91",
      "type": "payment",
      "status": "successful",
      "amount": 1250000,
      "created_at": "2026-09-22T14:05:00+03:00"
    }
  ]
}

```

## Error response

```json

{
  "status": "error",
  "message": "Wait for Retry-After seconds before trying again.",
  "data": {
    "code": "rate_limited"
  }
}

```
