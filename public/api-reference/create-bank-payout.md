# Create a bank payout

POST /v1/payouts

Send money to a Kenyan bank account.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `amount` (integer, required): Amount in cents. Send KES 12,500.00 as 1250000.

- `account_number` (string, required): Recipient account number.

- `bank_code` (string, required): Code returned by the banks endpoint.

- `account_name` (string, required): Name returned by account lookup.

- `reference` (string, required): Your unique payout reference.

- `narration` (string): Statement narration.

## Success response

```json

{
  "status": "success",
  "message": "Payout created",
  "data": {
    "id": "rp_po_3Vn7Lm20",
    "status": "processing",
    "amount": 1250000,
    "reference": "supplies_70121"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Run account lookup again and use the returned name.",
  "data": {
    "code": "account_name_mismatch"
  }
}

```
