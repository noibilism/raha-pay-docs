# Create a mobile money payout

POST /v1/payouts

Send money to an M-Pesa or Airtel Money number.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `amount` (integer, required): Amount in cents. Send KES 12,500.00 as 1250000.

- `phone_number` (string, required): Recipient number in 2547XXXXXXXX format.

- `network` (string, required): Recipient wallet.

- `reference` (string, required): Your unique payout reference.

- `narration` (string): Text shown with the payout.

## Success response

```json

{
  "status": "success",
  "message": "Payout created",
  "data": {
    "id": "rp_po_3Vn7Lm20",
    "status": "processing",
    "amount": 320000,
    "reference": "supplier_88219"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Top up your available balance, then retry with the same idempotency key.",
  "data": {
    "code": "insufficient_balance"
  }
}

```
