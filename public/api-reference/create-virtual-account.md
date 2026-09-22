# Create a Virtual account

POST /v1/virtual-accounts

Create reusable Kenyan bank details for a verified customer.

## Parameters

- `Idempotency-Key` (header, required): A unique key for this create request. Reuse it when retrying the same request.

- `reference` (string, required): Your unique customer reference.

- `account_type` (string, required): Customer legal type.

- `customer` (object, required): Verified customer identity and contact details.

- `kyc` (object, required): Individual fields: legal_name, national_id, date_of_birth, phone_number, address. Business fields: registered_name, registration_number, KRA_PIN, registered_address, authorized_representative.

## Success response

```json

{
  "status": "success",
  "message": "Virtual account created",
  "data": {
    "id": "rp_va_7Wp3Ls44",
    "reference": "customer_4812",
    "account_number": "0199002211",
    "account_name": "Amina Wanjiku",
    "bank_name": "[PARTNER BANK]",
    "status": "active",
    "created_at": "2026-09-22T14:05:00+03:00"
  }
}

```

## Error response

```json

{
  "status": "error",
  "message": "Review the submitted identity fields.",
  "data": {
    "code": "kyc_mismatch"
  }
}

```
