# Update a Virtual account

PATCH /v1/virtual-accounts/{virtual_account_id}

Restrict, reactivate or close a Virtual account.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `virtual_account_id` (string, required): Virtual account ID in the URL.

- `status` (string, required): Requested lifecycle state.

- `reason` (string): Operational reason for the change.

## Success response

```json

{
  "status": "success",
  "message": "Virtual account updated",
  "data": {
    "id": "rp_va_7Wp3Ls44",
    "status": "restricted",
    "updated_at": "2026-09-22T14:05:00+03:00"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "The requested lifecycle change is not allowed.",
  "data": {
    "code": "invalid_status_transition"
  }
}

```
