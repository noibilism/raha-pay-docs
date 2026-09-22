# Get a payment

GET /v1/payments/{payment_id}

Retrieve one payment and its latest status.

## Parameters

- `payment_id` (string, required): Payment ID in the URL.

## Success response

```json

{
  "status": "success",
  "message": "Payment retrieved",
  "data": {
    "id": "rp_pay_8Kq2Xw91",
    "status": "successful",
    "amount": 1250000,
    "reference": "order_10492",
    "created_at": "2026-09-22T14:05:00+03:00"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Check the payment ID and environment.",
  "data": {
    "code": "payment_not_found"
  }
}

```
