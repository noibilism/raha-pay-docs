# List Virtual accounts

GET /v1/virtual-accounts

List Virtual accounts with status and customer filters.

## Parameters

- `status` (string): Filter by lifecycle status.

- `reference` (string): Filter by your customer reference.

- `cursor` (string): Cursor from the previous page.

## Success response

```json

{
  "status": "success",
  "message": "Virtual accounts retrieved",
  "data": [
    {
      "id": "rp_va_7Wp3Ls44",
      "reference": "customer_4812",
      "account_number": "0199002211",
      "status": "active"
    }
  ]
}

```

## Error response

```json

{
  "status": "error",
  "message": "Wait for Retry-After before trying again.",
  "data": {
    "code": "rate_limited"
  }
}

```
