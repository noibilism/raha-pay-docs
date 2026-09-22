# Simulate a Virtual account credit

POST /v1/sandbox/virtual-accounts/{virtual_account_id}/credit

Create a deterministic Sandbox transfer and signed event.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `virtual_account_id` (string, required): Sandbox Virtual account ID in the URL.

- `amount` (integer, required): Simulated amount in cents.

- `sender_name` (string, required): Name attached to the simulated transfer.

- `scenario` (string): Forced result.

## Success response

```json

{
  "status": "success",
  "message": "Credit simulated",
  "data": {
    "id": "rp_vac_3Md8Pr20",
    "virtual_account_id": "rp_va_7Wp3Ls44",
    "amount": 1250000,
    "currency": "KES",
    "status": "credited"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Use this endpoint with Sandbox credentials.",
  "data": {
    "code": "sandbox_only"
  }
}

```
