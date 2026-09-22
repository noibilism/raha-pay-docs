# Get a transaction

GET /v1/transactions/{transaction_id}

Retrieve one account transaction.

## Parameters

- `transaction_id` (string, required): Transaction ID in the URL.

## Success response

```json

{
  "status": "success",
  "message": "Transaction retrieved",
  "data": {
    "id": "rp_pay_8Kq2Xw91",
    "type": "payment",
    "status": "successful",
    "amount": 1250000,
    "reference": "order_10492"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Check the transaction ID and environment.",
  "data": {
    "code": "transaction_not_found"
  }
}

```
