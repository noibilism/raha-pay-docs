# Look up an account name

POST /v1/accounts/lookup

Confirm a Kenyan bank account name before creating a payout.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `account_number` (string, required): Recipient account number.

- `bank_code` (string, required): Code returned by the banks endpoint.

## Success response

```json

{
  "status": "success",
  "message": "Account found",
  "data": {
    "account_number": "001234567890",
    "account_name": "Kamau Njoroge",
    "bank_code": "99"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Check the bank code and account number.",
  "data": {
    "code": "account_not_found"
  }
}

```
