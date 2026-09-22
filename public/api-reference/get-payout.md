# Get a payout

GET /v1/payouts/{payout_id}

Retrieve one payout and its latest status.

## Parameters

- `payout_id` (string, required): Payout ID in the URL.

## Success response

```json

{
  "status": "success",
  "message": "Payout retrieved",
  "data": {
    "id": "rp_po_3Vn7Lm20",
    "status": "successful",
    "amount": 1250000,
    "reference": "supplies_70121"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Check the payout ID and environment.",
  "data": {
    "code": "payout_not_found"
  }
}

```
