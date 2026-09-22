# List Virtual account credits

GET /v1/virtual-accounts/{virtual_account_id}/credits

List incoming KES transfers for one Virtual account.

## Parameters

- `virtual_account_id` (string, required): Virtual account ID in the URL.

- `status` (string): Filter by received, held, credited or returned.

- `cursor` (string): Cursor from the previous page.

## Success response

```json

{
  "status": "success",
  "message": "Credits retrieved",
  "data": [
    {
      "id": "rp_vac_3Md8Pr20",
      "virtual_account_id": "rp_va_7Wp3Ls44",
      "amount": 1250000,
      "currency": "KES",
      "sender_name": "Amina Wanjiku",
      "bank_reference": "FT26092210492",
      "status": "credited",
      "received_at": "2026-09-22T14:05:00+03:00"
    }
  ]
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
