# Get a Virtual account

GET /v1/virtual-accounts/{virtual_account_id}

Retrieve one Virtual account and its current lifecycle state.

## Parameters

- `virtual_account_id` (string, required): Virtual account ID in the URL.

## Success response

```json

{
  "status": "success",
  "message": "Virtual account retrieved",
  "data": {
    "id": "rp_va_7Wp3Ls44",
    "reference": "customer_4812",
    "account_number": "0199002211",
    "account_name": "Amina Wanjiku",
    "bank_name": "[PARTNER BANK]",
    "status": "active"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Check the account ID and environment.",
  "data": {
    "code": "virtual_account_not_found"
  }
}

```
