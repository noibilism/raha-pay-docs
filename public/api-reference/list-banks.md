# List Kenyan banks

GET /v1/banks

Return active Kenyan banks and their payout codes.

## Parameters

## Success response

```json

{
  "status": "success",
  "message": "Banks retrieved",
  "data": [
    {
      "name": "Example Commercial Bank",
      "bank_code": "99"
    },
    {
      "name": "Sample Community Bank",
      "bank_code": "98"
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
