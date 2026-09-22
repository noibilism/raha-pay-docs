# Get balance

GET /v1/balance

Read your available, pending and ledger amounts.

## Parameters

## Success response

```json

{
  "status": "success",
  "message": "Balance retrieved",
  "data": {
    "available": 82450000,
    "pending": 1250000,
    "ledger": 83700000,
    "currency": "KES"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Check the API key for this environment.",
  "data": {
    "code": "unauthorized"
  }
}

```
