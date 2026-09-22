export type CalloutKind = "note" | "warning" | "tip";
export type GuideSection = { id: string; title: string; paragraphs?: string[]; bullets?: string[]; callout?: { kind: CalloutKind; title: string; text: string }; code?: string; diagram?: "mobile" | "payout" | "webhook"; table?: { headers: string[]; rows: string[][] } };
export type Guide = { slug: string; group: string; title: string; description: string; sections: GuideSection[] };
const s=(id:string,title:string,paragraphs:string[],extra:Partial<GuideSection>={}):GuideSection=>({id,title,paragraphs,...extra});
const g=(slug:string,group:string,title:string,description:string,sections:GuideSection[]):Guide=>({slug,group,title,description,sections});

export const guides: Guide[] = [
 g("introduction","Getting started","Introduction","Build collections, payouts and treasury workflows in Kenyan Shillings.",[
  s("what-is-rahapay","One KES integration",["Raha Pay gives Kenyan businesses one API for accepting customer payments, holding funds, paying recipients and moving value into or out of KES. Every request is scoped to your merchant account and every money movement has a unique transaction ID."],{callout:{kind:"note",title:"KES only",text:"This documentation covers Kenyan Shilling products. All amount examples are denominated in KES unless a conversion explicitly names the other side of the pair."}}),
  s("core-concepts","Core concepts",["A merchant is the business integrating Raha Pay. A customer pays the merchant through a collection. A payout moves available funds to a beneficiary. Balances separate available funds from amounts still pending. Conversions exchange funds when one side of the pair is KES."],{table:{headers:["Concept","Meaning"],rows:[["Collection","Money received from a customer"],["Payout","Money sent to a bank account or mobile wallet"],["Available balance","Funds ready to pay out or convert"],["Pending balance","Funds awaiting final confirmation"]]}}),
  s("first-flow","Your first flow",["Start in Sandbox, fund your test KES balance, create a collection, and listen for its webhook. Move to Live only after signature verification, idempotency and reconciliation are working end to end."],{bullets:["Use a unique merchant reference for every write.","Treat API responses as acknowledgements; use webhooks or retrieval endpoints for final status.","Store Raha Pay IDs alongside your own references."]})
 ]),
 g("environments","Getting started","Environments","Use isolated Sandbox and Live environments with separate credentials and balances.",[
  s("base-urls","Base URLs",["Send test traffic to `{{BASE_URL_SANDBOX}}` and production traffic to `{{BASE_URL_LIVE}}`. Paths and payloads are the same in both environments."],{code:"curl {{BASE_URL_SANDBOX}}/balances \\\n  -H \"{{AUTH_HEADER}}: {{SECRET_KEY_PREFIX}}test_example\""}),
  s("isolation","Environment isolation",["Keys, customers, virtual accounts, transactions, webhook endpoints and balances do not cross environments. A Sandbox ID cannot be retrieved in Live."],{callout:{kind:"warning",title:"Keep keys separate",text:"Never send a Live secret key from a browser or commit it to source control."}}),
  s("go-live","Go-live checklist",["Create Live keys in `{{DASHBOARD_URL}}`, whitelist production egress addresses, register a Live webhook URL, confirm signature validation, and run a small-value transaction before increasing volume."])
 ]),
 g("authentication","Getting started","Authentication","Authenticate each request with an environment-specific Raha Pay API key.",[
  s("keys","Secret and public keys",["Secret keys authorize server-to-server requests and begin with `{{SECRET_KEY_PREFIX}}`. Public keys begin with `{{PUBLIC_KEY_PREFIX}}` and are limited to client-safe checkout initialization. Find both in `{{DASHBOARD_URL}}`."],{callout:{kind:"warning",title:"Protect secret keys",text:"Secret keys belong only in server-side secret storage. Rotate a key immediately if it is exposed."}}),
  s("header","Authorization header",["Send your key in the `{{AUTH_HEADER}}` header on every API request."],{code:"curl {{BASE_URL_SANDBOX}}/balances \\\n  -H \"{{AUTH_HEADER}}: {{SECRET_KEY_PREFIX}}test_example\" \\\n  -H \"Accept: application/json\""}),
  s("failures","Authentication failures",["Missing, malformed, revoked or wrong-environment keys return HTTP 401. A valid key without permission for an operation returns HTTP 403."])
 ]),
 g("ip-whitelisting","Getting started","IP Whitelisting","Restrict Live API traffic to your trusted public egress addresses.",[
  s("configure","Configure trusted addresses",["Add fixed IPv4 or IPv6 addresses in `{{DASHBOARD_URL}}`. Raha Pay checks the source address before it authenticates a Live request."],{bullets:["Add every production NAT gateway or proxy address.","Do not add private RFC 1918 addresses.","Keep at least two administrators able to update the list."]}),
  s("rollout","Change addresses safely",["Add the new address first, deploy your network change, confirm requests from the new path, then remove the old address."],{callout:{kind:"note",title:"Sandbox",text:"IP restrictions are optional in Sandbox so teams can test from changing development networks."}})
 ]),
 g("rate-limits","Getting started","Rate Limits","Design clients that remain reliable when request volume rises.",[
  s("limits","How limits work",["Limits apply per merchant, environment and route family. Responses include limit, remaining and reset headers. When the limit is exceeded, Raha Pay returns HTTP 429 with a retry delay."],{table:{headers:["Header","Meaning"],rows:[["X-RateLimit-Limit","Requests allowed in the current window"],["X-RateLimit-Remaining","Requests still available"],["X-RateLimit-Reset","Unix time when the window resets"],["Retry-After","Seconds before another attempt"]]}}),
  s("backoff","Retry safely",["Use exponential backoff with jitter and cap retries. Never retry validation or authentication errors. Reuse the same idempotency key when retrying a write."],{callout:{kind:"tip",title:"Prefer webhooks",text:"Avoid aggressive polling. Webhooks provide faster final-state updates and use fewer requests."}})
 ]),
 g("test-credentials","Getting started","Test Credentials","Exercise success, failure and pending paths without moving real money.",[
  s("mobile-tests","Test mobile numbers",["Use these clearly fictional Sandbox numbers with mobile-money requests."],{table:{headers:["Phone number","Network","Outcome"],rows:[["254700000001","M-Pesa","successful"],["254700000002","M-Pesa","failed"],["254700000003","M-Pesa","pending"],["254700000011","Airtel Money","successful"],["254700000012","Airtel Money","failed"]]}}),
  s("bank-tests","Test bank accounts",["Use bank code `99` and one of the following Sandbox account numbers."],{table:{headers:["Account number","Resolved name","Outcome"],rows:[["0000000001","Amina Wanjiku","successful"],["0000000002","Kamau Njoroge","failed"],["0000000003","Njeri Mwangi","pending"]]}}),
  s("testing-rules","Testing rules",["Test credentials work only with `{{BASE_URL_SANDBOX}}`. They return deterministic outcomes so automated tests can assert status transitions and webhook handling."])
 ]),
 g("fund-test-balance","Getting started","Funding Your Test Balance","Add simulated KES funds before testing payouts and conversions.",[
  s("fund","Add funds",["Open Sandbox in `{{DASHBOARD_URL}}`, choose Balances, select KES, and use Fund test balance. The credit is simulated and cannot leave Sandbox."],{bullets:["Choose KES.","Enter an amount that covers the payout plus fees.","Use a descriptive reference such as `qa_payout_cycle_04`."]}),
  s("reconcile","Confirm the credit",["Retrieve balances and confirm both the ledger and available KES balances. Test credits normally become available immediately."],{callout:{kind:"tip",title:"Reset cleanly",text:"Use a new Sandbox workspace or reference prefix when a test suite needs deterministic opening balances."}})
 ]),
 g("webhooks-setup","Webhooks","Setting Up Webhooks","Receive signed HTTPS notifications when transaction states change.",[
  s("register","Register an endpoint",["Create an HTTPS endpoint in `{{DASHBOARD_URL}}` or through the API, select the events you need, and store the signing secret securely. Use separate endpoints and secrets for Sandbox and Live."],{bullets:["Return a 2xx response quickly.","Queue processing before calling other services.","Log the event ID, type and delivery attempt."]}),
  s("event-envelope","Event envelope",["Every delivery includes a stable event ID, event type, creation time and a data object containing the affected resource."],{code:'{\n  "id": "evt_01J8HOOK",\n  "type": "collection.completed",\n  "createdAt": "2026-09-22T12:15:00Z",\n  "data": { "id": "col_01J8KFAKE", "status": "successful" }\n}'}),
  s("delivery","Delivery lifecycle",["Raha Pay signs the exact raw request body, sends it to your endpoint, and records your response. A non-2xx response or timeout schedules another attempt."],{diagram:"webhook"})
 ]),
 g("verify-webhooks","Webhooks","Verifying Webhook Signatures","Authenticate webhook deliveries before trusting their contents.",[
  s("algorithm","Verification steps",["Read the raw request bytes, calculate an HMAC SHA512 digest with your endpoint secret, and compare it with `{{WEBHOOK_SIGNATURE_HEADER}}` using a constant-time comparison. Parse JSON only after the comparison succeeds."],{callout:{kind:"warning",title:"Use the raw body",text:"Re-serializing JSON can change whitespace and key order, producing a different signature."}}),
  s("node","Node.js",["Use the built-in crypto module."],{code:"const expected = createHmac('sha512', process.env.RAHA_PAY_WEBHOOK_SECRET)\n  .update(rawBody)\n  .digest('hex');\nconst valid = timingSafeEqual(Buffer.from(expected), Buffer.from(signature));"}),
  s("python","Python",["Compare digests without ordinary string equality."],{code:"expected = hmac.new(secret.encode(), raw_body, hashlib.sha512).hexdigest()\nvalid = hmac.compare_digest(expected, signature)"}),
  s("php","PHP",["PHP provides a timing-safe comparison helper."],{code:"$expected = hash_hmac('sha512', $rawBody, $secret);\n$valid = hash_equals($expected, $signature);"})
 ]),
 g("collection-webhook","Webhooks","Collection Webhook","Handle collection progress and final payment outcomes.",[
  s("events","Events",["Subscribe to collection events to update orders and reconcile received funds."],{table:{headers:["Event","When sent"],rows:[["collection.pending","The payment has started but is not final"],["collection.completed","The expected amount settled successfully"],["collection.failed","The collection reached a terminal failure"],["collection.amount_mismatch","The amount received differs from the expected amount"]]}}),
  s("payload","Important fields",["Use `data.id` as the Raha Pay identifier, `data.reference` to join your order, `data.amountReceived` for reconciliation, and `data.status` for state. Never mark an order paid from the event name alone without checking the amount and currency."],{code:'{\n  "id": "evt_01J8COL",\n  "type": "collection.completed",\n  "data": { "id": "col_01J8KFAKE", "reference": "ord_ke_10492", "amount": 2500, "amountReceived": 2500, "currency": "KES", "status": "successful" }\n}'})
 ]),
 g("payout-webhook","Webhooks","Payout Webhook","Track a payout from acceptance to its final delivery state.",[
  s("events","Events",["Payout events can arrive after the create response. Update a payout only when the event is newer than the state already stored."],{table:{headers:["Event","Action"],rows:[["payout.processing","Show the transfer as in progress"],["payout.completed","Mark the beneficiary transfer successful"],["payout.failed","Record the reason and return funds to available balance when applicable"],["payout.reversed","Mark a previously successful transfer as returned"]]}}),
  s("lifecycle","Lifecycle",["A payout moves through queued and processing states before reaching a terminal state."],{diagram:"payout"})
 ]),
 g("virtual-account-webhook","Webhooks","Virtual Account Webhook","Reconcile credits received through KES virtual accounts.",[
  s("events","Events",["Permanent accounts can receive repeated credits. Temporary accounts are tied to an expected amount and expiry."],{table:{headers:["Event","Meaning"],rows:[["virtual_account.created","The account is ready to receive KES"],["virtual_account.payment.received","A bank credit was matched to the account"],["virtual_account.expired","A temporary account can no longer receive a matched payment"],["virtual_account.closed","The account was deactivated"]]}}),
  s("reconciliation","Reconciliation",["Deduplicate by event ID, then credit your customer ledger using the transaction ID. Compare the expected and received amounts and route mismatches for review."])
 ]),
 g("conversion-webhook","Webhooks","Conversion Webhook","Record the result of a KES conversion.",[
  s("events","Events",["A conversion may complete immediately or continue processing. Listen for `conversion.completed` and `conversion.failed`."],{code:'{\n  "type": "conversion.completed",\n  "data": { "id": "cnv_01J8FX", "sourceCurrency": "USD", "sourceAmount": 100, "destinationCurrency": "KES", "destinationAmount": 12840, "status": "successful" }\n}'}),
  s("balances","Balance updates",["On completion, the source balance is debited and the destination balance is credited. Re-fetch balances if your ledger view must show the newest available amount."])
 ]),
 g("retry-idempotency","Webhooks","Retry Policy and Idempotency","Process every event once, even when Raha Pay delivers it more than once.",[
  s("retries","Delivery retries",["Raha Pay retries failed deliveries with increasing delays for up to 24 hours. A timeout, connection failure or non-2xx response counts as failed. Manual replay remains available in `{{DASHBOARD_URL}}`."],{callout:{kind:"note",title:"Duplicates are expected",text:"Network ambiguity can produce duplicate deliveries even after your endpoint returns 2xx."}}),
  s("deduplication","Deduplicate events",["Create a unique constraint on the event ID. In one transaction, record the event, apply your business update, and commit. If the ID already exists, return 2xx without applying the update again."]),
  s("request-idempotency","Idempotent API writes",["Send a stable `Idempotency-Key` header for collection, payout and conversion writes. Reuse the same key and unchanged body after a timeout. A key reused with different data is rejected."])
 ]),
 g("collections-overview","Collections (pay-in)","Overview","Choose the right KES collection method for each customer experience.",[
  s("methods","Payment methods",["Hosted checkout gives the fastest integration. Inline checkout keeps the payment UI in your product. Payment links work without custom checkout screens. Mobile money initiates an STK prompt. Bank transfer and virtual accounts support account-to-account payments."],{table:{headers:["Method","Best for","Confirmation"],rows:[["Hosted checkout","Web and mobile browser payments","Webhook"],["Inline checkout","Controlled in-product experience","Callback plus webhook"],["Payment link","Invoices and social sales","Webhook"],["Mobile money","Fast phone-based checkout","STK prompt then webhook"],["Virtual account","Bank transfer reconciliation","Webhook"]]}}),
  s("states","Collection states",["Treat `successful`, `failed` and `reversed` as terminal. `pending` and `processing` may change. An amount mismatch needs a reconciliation decision."])
 ]),
 g("checkout","Collections (pay-in)","Checkout","Offer a Raha Pay-hosted redirect or inline KES checkout.",[
  s("hosted","Hosted redirect",["Create a checkout on your server, then redirect the customer to the returned URL. After payment, Raha Pay returns the browser to your redirect URL. Verify the collection server-side before fulfilling the order."]),
  s("inline","Inline checkout",["Initialize inline checkout with a `{{PUBLIC_KEY_PREFIX}}` public key and a checkout ID created by your server. The browser callback improves UX but is not proof of payment."],{callout:{kind:"warning",title:"Do not trust the redirect",text:"Customers can close or manipulate browser flows. Fulfil only after a verified webhook or status lookup reports success."}}),
  s("fields","Required data",["Provide amount, currency `KES`, a unique reference, and customer name, email and `2547XXXXXXXX` phone number. Hosted checkout also accepts a redirect URL and allowed payment methods."])
 ]),
 g("payment-links","Collections (pay-in)","Payment Links","Create shareable KES checkout links for one-time or repeated use.",[
  s("types","Link types",["A single-use link closes after its first successful payment. A reusable link remains active until it expires or you disable it. Fixed links define an amount; open links ask the payer to enter one."]),
  s("operations","Manage links",["Create links from the API or `{{DASHBOARD_URL}}`. Store the link ID, not only its URL, so you can disable it and reconcile payments."],{bullets:["Use a clear payer-facing name.","Set an expiry for time-sensitive invoices.","Use a merchant reference prefix to identify the campaign."]})
 ]),
 g("mobile-money","Collections (pay-in)","M-Pesa and Mobile Money","Collect KES through an STK prompt sent to a Kenyan mobile wallet.",[
  s("flow","STK push flow",["Your server creates a charge with the KES amount, Kenyan phone number, network and reference. Raha Pay asks the network to prompt the customer. The customer confirms with their wallet PIN, and Raha Pay sends the final event."],{diagram:"mobile"}),
  s("request","Request rules",["Normalize numbers to `2547XXXXXXXX`; do not include `+`, spaces or a leading zero. Select `MPESA` or `AIRTEL_MONEY`. A pending response means the prompt was accepted for processing, not that funds settled."],{callout:{kind:"tip",title:"Customer messaging",text:"Show the amount and phone number before sending the prompt, then keep the screen in a waiting state while the customer confirms."}}),
  s("outcomes","Common outcomes",["A customer may approve, decline, enter an invalid PIN, lack funds, fail to respond before timeout, or experience network delay. Keep pending transactions reconcilable after the browser session ends."])
 ]),
 g("bank-transfer","Collections (pay-in)","Pay with Bank Transfer","Create transfer instructions and reconcile the incoming KES credit.",[
  s("flow","Transfer flow",["Create a bank-transfer charge with the expected amount and customer. Present the returned bank, account name, account number and expiry exactly as received. The customer completes the transfer in their bank channel."],{callout:{kind:"note",title:"Final confirmation",text:"The transfer screen is not confirmation. Wait for a successful collection webhook."}}),
  s("matching","Matching payments",["Raha Pay matches the bank credit to the generated instruction. Store the collection ID and merchant reference. Compare `amountReceived` with the expected amount before fulfilling."])
 ]),
 g("virtual-accounts","Collections (pay-in)","KES Virtual Accounts","Use permanent customer accounts or temporary transaction accounts to receive KES.",[
  s("permanent","Permanent accounts",["Assign one reusable account to a verified customer. Every incoming credit carries the virtual account ID and transaction details, making it suitable for wallets, recurring customer deposits and marketplaces."]),
  s("temporary","Temporary accounts",["Create a temporary account for one expected payment and choose an expiry from 15 minutes to 24 hours. It is useful for invoices and high-value checkout where the amount is known."],{table:{headers:["Capability","Permanent","Temporary"],rows:[["Reuse","Yes","No"],["Expected amount","Optional","Required"],["Customer verification","Required","Customer details required"],["Expiry","Until closed","15–1440 minutes"]]}}),
  s("display","Present account details",["Show the exact account name, number, receiving bank, amount and expiry. Do not cache account details beyond their lifecycle."])
 ]),
 g("amount-mismatches","Collections (pay-in)","Handling Underpayments and Overpayments","Reconcile a transfer when the received KES amount differs from the expected amount.",[
  s("underpayment","Underpayments",["Keep the order unpaid or partially paid, record the shortfall, and ask the customer to complete payment through a new instruction if your policy allows it. Do not silently change the order total."]),
  s("overpayment","Overpayments",["Record the full received amount, fulfil only the intended order value, and route the excess to your refund or customer-credit process."],{callout:{kind:"warning",title:"Use the received amount",text:"Always reconcile against `amountReceived`; never assume the amount requested is the amount settled."}}),
  s("webhook","Mismatch event",["`collection.amount_mismatch` includes expected amount, received amount, difference, collection ID and merchant reference. Make handlers safe for duplicate delivery."])
 ]),
 g("payouts-overview","Payouts","Overview","Send KES to Kenyan bank accounts and mobile wallets.",[
  s("before","Before paying",["Fund your available KES balance, verify beneficiary details, obtain consent where required, and create a unique payout reference. Use idempotency on every create request."]),
  s("lifecycle","Payout lifecycle",["Raha Pay validates the request, reserves balance, submits it to the destination network, and sends the final result."],{diagram:"payout"}),
  s("states","State handling",["`queued` and `processing` are non-terminal. `successful`, `failed` and `reversed` are terminal. A failed payout normally releases reserved funds; a reversal returns previously delivered funds."])
 ]),
 g("bank-payouts","Payouts","Bank Transfers to Kenyan Banks","Pay a verified account at a supported Kenyan bank.",[
  s("prepare","Prepare the beneficiary",["Fetch the current bank list and keep its code. Resolve the account number with that code. Show the resolved name for operator or customer confirmation before creating the payout."],{callout:{kind:"warning",title:"Do not guess bank codes",text:"Bank codes can change. Use the institutions endpoint rather than a hard-coded production list."}}),
  s("fields","Required fields",["Provide amount, `KES`, account number, bank code, beneficiary name and a unique reference. Narration is optional and may be shortened by the receiving bank."]),
  s("processing","Process the result",["A successful create response usually means processing has begun. Listen for `payout.completed`, `payout.failed` or `payout.reversed` and provide support with the Raha Pay payout ID."])
 ]),
 g("mobile-payouts","Payouts","Mobile Money Payouts","Send KES to M-Pesa and Airtel Money recipients.",[
  s("recipient","Recipient data",["Supply the beneficiary’s name, phone in `2547XXXXXXXX` format, wallet network, amount and unique reference. Validate that the number belongs to the selected network before submitting when your flow collects that information."],{table:{headers:["Network value","Customer channel"],rows:[["MPESA","M-Pesa"],["AIRTEL_MONEY","Airtel Money"]]}}),
  s("delivery","Delivery",["The create response may be `processing`. Use payout webhooks for the final result. Failed wallet payouts include a machine-readable reason such as invalid recipient, insufficient balance, limit exceeded or provider unavailable."])
 ]),
 g("cross-currency-payouts","Payouts","Cross-currency Payouts into KES","Quote the conversion, execute it, then pay the recipient from your KES balance.",[
  s("quote","1. Get a quote",["Request a quote whose destination is KES. The response gives the exchange rate, source amount, KES destination amount, fees and a short expiry."]),
  s("convert","2. Execute before expiry",["Execute the quote once. On success, Raha Pay debits the source balance and credits KES. If the quote expires, request a new one rather than reusing its rate."]),
  s("pay","3. Create the payout",["Create the Kenyan bank or mobile-money payout from the available KES balance. Keep the conversion and payout references linked in your ledger."],{callout:{kind:"note",title:"Two distinct transactions",text:"Conversion success does not mean the beneficiary was paid. Track both conversion and payout statuses."}})
 ]),
 g("account-verification","Payouts","Account Verification","Resolve a Kenyan bank account before creating a payout.",[
  s("resolve","Resolve details",["Send the account number, bank code and `KES`. A successful response returns the account name supplied by the bank. Ask the operator or customer to confirm it."],{callout:{kind:"warning",title:"Verification is not authorization",text:"A resolved name confirms account details but does not prove the requester owns the account."}}),
  s("failures","Failed resolution",["Do not submit a payout when the account cannot be resolved. Ask for corrected details, and avoid repeated attempts that could trigger rate limits."])
 ]),
 g("balances","Balances & conversions","Get Balances","Read available, pending and ledger totals for KES.",[
  s("fields","Balance fields",["Available is spendable now. Pending contains unsettled credits or reserved debits. Ledger is the booked total before pending availability rules."],{table:{headers:["Field","Use"],rows:[["available","Check before payout or conversion"],["pending","Explain funds still processing"],["ledger","Reconcile booked movement"],["currency","Always `KES` in this guide"]]}}),
  s("reconciliation","Reconcile",["Do not use a displayed balance as your transaction ledger. Store individual movements, process webhooks, and periodically compare the aggregate against the balances endpoint."])
 ]),
 g("conversions","Balances & conversions","Conversions","Exchange value when one side of the pair is KES.",[
  s("quote","Create a quote",["Choose source currency, destination currency and source amount. One side must be KES. The response locks the rate and KES result until `expiresAt`."],{callout:{kind:"note",title:"Rates expire",text:"Never execute an expired quote or present its amount as guaranteed after expiry."}}),
  s("execute","Execute once",["Send the quote ID with a unique reference and idempotency key. On success, both balances update atomically. Listen for `conversion.completed` if processing is asynchronous."]),
  s("errors","Conversion errors",["Handle unsupported pair, quote expired, quote already used, insufficient source balance and rate unavailable as distinct outcomes."])
 ]),
 g("statuses","Reference","Transaction Statuses","Interpret transaction states consistently across your product.",[
  s("common","Common states",["Status names are lower-case strings."],{table:{headers:["Status","Meaning","Terminal"],rows:[["pending","Created and awaiting customer or network action","No"],["queued","Accepted and waiting for processing","No"],["processing","Submitted to a payment network","No"],["successful","Completed and confirmed","Yes"],["failed","Could not complete","Yes"],["reversed","A completed movement was returned","Yes"],["cancelled","Stopped before completion","Yes"],["expired","Timed instruction or quote is no longer valid","Yes"]]}}),
  s("transitions","Safe transitions",["Do not move a terminal transaction back to processing. Store event timestamps and ignore older updates. Investigate conflicting terminal events instead of overwriting them silently."])
 ]),
 g("error-codes","Reference","Error Codes","Handle Raha Pay failures with stable machine-readable codes.",[
  s("auth","Authentication",["Authentication errors should not be retried until configuration changes."],{table:{headers:["Code","Meaning"],rows:[["UNAUTHORIZED","Key missing, malformed or invalid"],["FORBIDDEN","Key lacks permission"],["IP_NOT_ALLOWED","Source address is not whitelisted"]]}}),
  s("validation","Validation",["Correct request data before retrying."],{table:{headers:["Code","Meaning"],rows:[["INVALID_REQUEST","Payload could not be accepted"],["VALIDATION_ERROR","One or more fields are invalid"],["DUPLICATE_REFERENCE","Merchant reference already exists"],["IDEMPOTENCY_CONFLICT","Key was reused with different request data"]]}}),
  s("product-errors","Product errors",["Product failures include a code, readable message and request ID."],{table:{headers:["Area","Codes"],rows:[["Collections","CUSTOMER_DECLINED, PAYMENT_EXPIRED, AMOUNT_MISMATCH, PAYMENT_METHOD_UNAVAILABLE"],["Payouts","INSUFFICIENT_BALANCE, INVALID_RECIPIENT, BENEFICIARY_LIMIT_EXCEEDED, PROVIDER_UNAVAILABLE"],["Virtual accounts","CUSTOMER_NOT_VERIFIED, INVALID_EXPIRY, ACCOUNT_CLOSED, ACCOUNT_LIMIT_REACHED"],["Conversions","UNSUPPORTED_PAIR, QUOTE_EXPIRED, QUOTE_ALREADY_USED, RATE_UNAVAILABLE"]]}}),
  s("http","HTTP mapping",["Use 400 for malformed or invalid input, 401 for authentication, 403 for permission or IP restrictions, 404 for unknown resources, 409 for duplicate/idempotency conflicts, 422 for valid requests that cannot be processed, 429 for rate limits, and 5xx for temporary service failures."])
 ]),
 g("institutions","Reference","Supported Banks and Mobile Networks","Discover active KES payout destinations at runtime.",[
  s("banks","Kenyan banks",["Call the banks endpoint with `currency=KES` to retrieve the current institution name, code and availability. The sample names in this documentation are fictional."],{callout:{kind:"tip",title:"Cache briefly",text:"Cache the bank list for a short period, but refresh it regularly and whenever a bank code is rejected."}}),
  s("networks","Mobile networks",["Raha Pay supports KES wallet flows for M-Pesa and Airtel Money where enabled for your merchant. Pass `MPESA` or `AIRTEL_MONEY` exactly as shown."])
 ]),
 g("changelog","Reference","Changelog","Track changes to Raha Pay’s KES API and documentation.",[
  s("2026-09-22","22 September 2026",["Published the unified KES documentation, including collections, payouts, virtual accounts, balances, conversions, webhooks and Sandbox testing guidance."]),
  s("versioning","Change policy",["Backward-compatible additions may appear without a version change. Breaking request or response changes are announced in advance with a migration window. Webhook consumers should ignore unknown fields."])
 ]),
 g("faq","Reference","FAQ","Answers to common KES integration questions.",[
  s("final-status","Is the create response final?",["Usually not. A `pending`, `queued` or `processing` response confirms acceptance. Use a verified webhook or retrieval endpoint for the final status."]),
  s("money-format","How should I send KES amounts?",["Send positive JSON numbers in KES units as shown by each endpoint. Do not add currency symbols or thousands separators."]),
  s("phones","What phone format is accepted?",["Use Kenya’s country code without a plus sign: `2547XXXXXXXX`. Remove spaces and a leading zero."]),
  s("support","How do I get help?",["Email `{{SUPPORT_EMAIL}}` with the request ID, Raha Pay resource ID, environment and timestamp. Never include a full secret key or wallet PIN."])
 ])
];

export const guideGroups = ["Getting started","Webhooks","Collections (pay-in)","Payouts","Balances & conversions","Reference"];
export const getGuide=(slug:string)=>guides.find((item)=>item.slug===slug);
