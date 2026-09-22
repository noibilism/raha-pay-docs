export type CalloutKind="note"|"warning"|"tip";
export type GuideSection={id:string;title:string;paragraphs?:string[];bullets?:string[];callout?:{kind:CalloutKind;title:string;text:string};code?:string;diagram?:"mobile"|"payout"|"webhook";table?:{headers:string[];rows:string[][]}};
export type Guide={slug:string;group:string;title:string;description:string;sections:GuideSection[]};
const s=(id:string,title:string,paragraphs:string[],extra:Partial<GuideSection>={}):GuideSection=>({id,title,paragraphs,...extra});
const g=(slug:string,group:string,title:string,description:string,sections:GuideSection[]):Guide=>({slug,group,title,description,sections});
const request=(text:string,code?:string)=>s("request","Request",[text],code?{code}:{});
const response=(text:string,code?:string)=>s("response","Response",[text],code?{code}:{});
const webhook=(text:string,code?:string)=>s("webhook","Webhook",[text],code?{code}:{});
const errors=(rows:string[][])=>s("errors","Common errors",["Use the code to decide what to fix before retrying."],{table:{headers:["Code","HTTP","What to do"],rows}});
const auth='-H "{{AUTH_HEADER}}: {{SECRET_KEY_PREFIX}}test_example"';
const payPayload=`{\n  "amount": 1250000,\n  "phone_number": "254712345678",\n  "network": "mpesa",\n  "reference": "order_10492"\n}`;
export const guides:Guide[]=[
 g("introduction","Start here","Welcome","Accept payments, send payouts and reconcile your Raha Pay account.",[
  s("purpose","Build with Raha Pay",["Raha Pay connects your product to M-Pesa, Airtel Money and Kenyan banks. You create each money movement through the API and receive its final status through a signed webhook."]),
  request("Create payments and payouts from your server. Keep secret keys away from browsers and mobile apps."),
  response("Every response has `status`, `message` and `data`. Save the Raha Pay ID with your own reference."),
  webhook("Use signed events to update orders, receipts and recipient records after a final outcome."),
  errors([["unauthorized","401","Check the key and environment."],["rate_limited","429","Wait for the stated retry period."]])
 ]),
 g("quickstart","Start here","Quickstart: your first M-Pesa payment in 5 minutes","Send an STK prompt, receive the event and confirm the payment.",[
  s("purpose","What you will build",["You will request KES 12,500.00 from a Sandbox M-Pesa number. API amounts are integers in cents, so send KES 12,500.00 as `1250000`."],{diagram:"mobile"}),
  request("Copy a Sandbox secret key from `{{DASHBOARD_URL}}`, then create the payment with a unique idempotency key.",`curl -X POST "{{BASE_URL}}/v1/payments" \\\n  ${auth} \\\n  -H "Idempotency-Key: quickstart-order-10492" \\\n  -H "Content-Type: application/json" \\\n  -d '${payPayload}'`),
  response("A pending response means the prompt reached the customer. It does not mean the payment succeeded.",`{\n  "status": "success",\n  "message": "Payment created",\n  "data": { "id": "rp_pay_8Kq2Xw91", "status": "awaiting_customer" }\n}`),
  webhook("Verify `{{WEBHOOK_SIGNATURE_HEADER}}`, then handle `payment.successful`. Fetch `/v1/payments/rp_pay_8Kq2Xw91` when you need to confirm the stored status.",`{\n  "id": "rp_evt_7Gh4Pw16",\n  "type": "payment.successful",\n  "created_at": "2026-09-22T14:05:00+03:00",\n  "data": { "id": "rp_pay_8Kq2Xw91", "amount": 1250000, "status": "successful" }\n}`),
  errors([["invalid_phone_number","400","Use 2547XXXXXXXX format."],["duplicate_reference","409","Send a new reference."],["rate_limited","429","Wait, then retry with the same idempotency key."]])
 ]),
 g("api-keys-environments","Start here","API keys and environments","Authenticate requests and keep Sandbox separate from Live.",[
  s("purpose","Choose an environment",["Use `{{BASE_URL_SANDBOX}}` while building and `{{BASE_URL_LIVE}}` for real transactions. Each environment has separate keys, records and webhook secrets."],{callout:{kind:"warning",title:"Keep keys separate",text:"A Sandbox key cannot access Live data. Store secret keys only on your server."}}),
  request("Send your secret key in `{{AUTH_HEADER}}` on every request.",`curl "{{BASE_URL}}/v1/balance" \\\n  ${auth}`),
  response("A valid key returns data from its own environment."),
  webhook("Register separate webhook URLs and secrets for Sandbox and Live."),
  errors([["unauthorized","401","Check that the key is complete and active."],["forbidden","403","Use a key with permission for this action."]])
 ]),
 g("sandbox-testing","Start here","Sandbox testing","Run repeatable payment and payout tests without moving real funds.",[
  s("purpose","Test predictable outcomes",["Sandbox test details return fixed outcomes. In `{{DASHBOARD_URL}}`, you can also add simulated funds to your available balance."],{table:{headers:["Test value","Result"],rows:[["0712 345 678","M-Pesa successful"],["0712 345 679","M-Pesa failed"],["0733 456 781","Airtel Money successful"],["0000000001 / bank 99","Bank successful"],["0000000002 / bank 99","Bank failed"]]}}),
  request("Use JSON phone numbers without spaces. To force an outcome, use the matching test number or account."),
  response("Sandbox returns the same response envelope and status flow as Live."),
  webhook("Sandbox sends signed events to its registered webhook URL. Test duplicate and delayed delivery handling before going Live."),
  errors([["insufficient_balance","422","Add simulated funds in the Sandbox dashboard."],["invalid_phone_number","400","Use one of the listed test numbers."]])
 ]),
 g("payments-work","Accept payments","How payments work","Create a payment and wait for the customer and payment network to finish it.",[
  s("purpose","Payment lifecycle",["A payment starts when your server creates it. Fulfil the order only after the status is successful."],{diagram:"mobile"}),
  request("Send the amount, method, customer details and a unique reference to `/v1/payments`."),
  response("The API returns a payment ID and the next customer action."),
  webhook("Expect `payment.successful` or `payment.failed`. Store event timestamps and ignore older updates."),
  errors([["duplicate_reference","409","Create a new merchant reference."],["invalid_amount","400","Send a positive integer in cents."]])
 ]),
 g("mpesa-payment","Accept payments","M-Pesa STK push","To request money from an M-Pesa number, create a payment with `network` set to `mpesa`.",[
  s("purpose","Prompt the customer",["The customer receives an STK prompt on their phone and confirms it with their M-Pesa PIN."],{diagram:"mobile"}),request("Send `amount`, `phone_number`, `network` and `reference` to `/v1/payments`.",payPayload),response("Save `data.id`. Show a waiting state while the customer acts."),webhook("Handle `payment.successful` and `payment.failed` as final outcomes."),errors([["invalid_phone_number","400","Use 2547XXXXXXXX format."],["customer_declined","422","Ask the customer to try again."]])
 ]),
 g("airtel-money-payment","Accept payments","Airtel Money","To request money from Airtel Money, create a payment with `network` set to `airtel_money`.",[
  s("purpose","Prompt the customer",["The customer confirms the request on their Airtel Money line."],{diagram:"mobile"}),request("Send the amount in cents and the phone number without spaces."),response("An awaiting customer status means the prompt is active."),webhook("Use `payment.successful` or `payment.failed` to close the order."),errors([["invalid_phone_number","400","Check the number and network."],["payment_timed_out","422","Create a new payment if the customer still wants to pay."]])
 ]),
 g("bank-transfer-payment","Accept payments","Bank transfer","Create bank details that your customer can use for one payment.",[
  s("purpose","Receive a transfer",["Show the returned bank name, account name, account number, amount and expiry to the customer."]),request("Send the expected amount, customer and reference to `/v1/payments` with `payment_method` set to `bank_transfer`."),response("The response contains the account details and expiry time."),webhook("Use `payment.successful` to fulfil the order. Compare the received amount with the requested amount."),errors([["duplicate_reference","409","Use a new payment reference."],["payment_method_unavailable","503","Wait before creating a new payment."]])
 ]),
 g("hosted-checkout","Accept payments","Hosted checkout","Create a Raha Pay page where your customer chooses how to pay.",[
  s("purpose","Send the customer to checkout",["Your server creates the checkout and redirects the customer to the returned URL."]),request("Send `amount`, `reference`, `customer` and `callback_url` to `/v1/payments`."),response("Open `data.checkout_url` in the customer’s browser."),webhook("Treat the browser return as navigation only. Use the signed payment event as the result.",{kind:"warning",title:"Verify before fulfilment",text:"A customer can close or revisit the browser page. Confirm the payment on your server."} as never),errors([["invalid_callback_url","400","Send a public HTTPS URL."],["duplicate_reference","409","Use a new reference."]])
 ]),
 g("payment-links","Accept payments","Payment links","Create a link you can share in an invoice, message or sales flow.",[
  s("purpose","Collect without a custom screen",["A fixed link requests one amount. A reusable link can accept several payments while active."]),request("Send a name, reference and optional amount to `/v1/payment-links`."),response("Share the returned URL and keep the link ID for later management."),webhook("Payments from the link send the standard payment events."),errors([["invalid_amount","400","Send a positive integer in cents."],["duplicate_reference","409","Use a new link reference."]])
 ]),
 g("dedicated-accounts","Accept payments","Dedicated account numbers","Give a customer a reusable or one-time bank account number.",[
  s("purpose","Match incoming transfers",["A dedicated number stays with one customer. A one-time number is tied to one expected payment and expires."]),request("Send customer details and a reference to `/v1/dedicated-accounts`. Add `account_type: one_time` and `amount` for a one-time number."),response("Display the returned account details exactly as received."),webhook("Handle `dedicated_account.credited` and match its transaction ID to your customer ledger."),errors([["invalid_amount","400","For one-time numbers, send a positive amount in cents."],["duplicate_reference","409","Use a new account reference."]])
 ]),
 g("amount-mismatches","Accept payments","Amount mismatches","Decide what to do when a bank transfer differs from the requested amount.",[
  s("purpose","Reconcile the amount received",["Compare the requested amount with the credited amount before you fulfil an order. Record the difference in your ledger."]),request("Create the original payment with the exact amount in cents."),response("The payment record shows both the requested and received amounts when they differ."),webhook("Read the credited amount in `payment.successful`. Apply your refund, credit or balance-due policy."),errors([["amount_mismatch","422","Review the credited amount and apply your business rule."]])
 ]),
 g("payouts-work","Send money","How payouts work","Create a payout and track it until the recipient receives the money.",[
  s("purpose","Payout lifecycle",["Raha Pay checks your balance and recipient details before sending the payout to the selected network."],{diagram:"payout"}),request("Send the recipient, amount, reference and `Idempotency-Key` to `/v1/payouts`."),response("Processing means the request was accepted, not delivered."),webhook("Handle `payout.successful`, `payout.failed` and `payout.reversed`."),errors([["insufficient_balance","422","Add funds before retrying."],["duplicate_reference","409","Use a new payout reference."]])
 ]),
 g("mobile-payouts","Send money","Payouts to M-Pesa and Airtel Money","To send money to a mobile wallet, create a payout with the recipient number and network.",[
  s("purpose","Send to a phone",["Use `mpesa` or `airtel_money` and a phone number in 2547XXXXXXXX format."],{diagram:"payout"}),request("Send `amount`, `phone_number`, `network`, `reference` and optional `narration`."),response("Save the `rp_po_` ID and show the payout as processing."),webhook("Use the payout event to show the final recipient result."),errors([["invalid_phone_number","400","Check the phone number and network."],["insufficient_balance","422","Add funds, then retry safely."]])
 ]),
 g("bank-payouts","Send money","Payouts to Kenyan bank accounts","To send money to a bank, confirm the account name and create a payout.",[
  s("purpose","Send to a bank account",["Fetch the current bank code, look up the account name and ask the sender to confirm it."],{diagram:"payout"}),request("Send `amount`, `account_number`, `bank_code`, `account_name`, `reference` and optional `narration`."),response("A processing response includes the payout ID for tracking."),webhook("Handle successful, failed and reversed payout events."),errors([["account_name_mismatch","422","Run account lookup and use the returned name."],["insufficient_balance","422","Add funds before retrying."]])
 ]),
 g("account-lookup","Send money","Account name lookup","Confirm a recipient name before sending a bank payout.",[
  s("purpose","Check recipient details",["Account lookup returns the name supplied by the selected bank. Show it before the user confirms the payout."]),request("Send `account_number` and `bank_code` to `/v1/accounts/lookup`."),response("Use the returned `account_name` in the payout request."),webhook("Account lookup is synchronous and does not send an event."),errors([["account_not_found","404","Check the account number and bank code."],["rate_limited","429","Wait before trying again."]])
 ]),
 g("balance","Account","Balance","Check the funds available for payouts.",[
  s("purpose","Read account totals",["Available is ready to send. Pending contains movements that have not settled. Ledger is the booked total."]),request("Send an authenticated GET request to `/v1/balance`."),response("Amounts are returned as integer cents with `currency: KES`."),webhook("Balance reads do not send an event. Payment and payout events explain changes."),errors([["unauthorized","401","Check the API key and environment."]])
 ]),
 g("transactions","Account","Transactions","List account activity or retrieve one transaction.",[
  s("purpose","Reconcile activity",["Filter by type, status or reference, then save the Raha Pay ID with your own ledger entry."]),request("GET `/v1/transactions` for a list or `/v1/transactions/{transaction_id}` for one record."),response("Each item includes its type, status, amount, reference and creation time."),webhook("Use events for immediate updates and transaction reads for reconciliation."),errors([["transaction_not_found","404","Check the ID and environment."],["rate_limited","429","Reduce polling and wait before retrying."]])
 ]),
 g("webhooks-overview","Events","Webhooks overview","Receive signed status updates at your HTTPS endpoint.",[
  s("purpose","Receive events",["Raha Pay sends an event when a payment, payout or dedicated account credit changes state."],{diagram:"webhook"}),request("Register an HTTPS URL in `{{DASHBOARD_URL}}` and select the events your system handles."),response("Return HTTP 2xx quickly after validating and storing the event."),webhook("Every event includes `id`, `type`, `created_at` and `data`. Deduplicate by event ID."),errors([["delivery_timeout","408","Acknowledge quickly and process queued work afterward."],["invalid_response","422","Return a 2xx status after accepting the event."]])
 ]),
 g("verify-webhooks","Events","Verifying signatures","Verify every event before reading or acting on its data.",[
  s("purpose","Check the signature",["Raha Pay signs the raw request body with HMAC-SHA256 and your webhook secret."],{callout:{kind:"warning",title:"Use the raw body",text:"Parsing and rebuilding JSON changes its bytes and breaks signature verification."}}),
  request("Read `{{WEBHOOK_SIGNATURE_HEADER}}` and calculate the expected digest from the untouched body."),
  response("Compare signatures in constant time. Return HTTP 401 when they differ."),
  webhook("Node.js",`const expected = createHmac('sha256', process.env.RAHA_PAY_WEBHOOK_SECRET)\n  .update(rawBody)\n  .digest('hex');\nconst valid = timingSafeEqual(Buffer.from(expected), Buffer.from(signature));\n\n// Python\nexpected = hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()\nvalid = hmac.compare_digest(expected, signature)\n\n// PHP\n$expected = hash_hmac('sha256', $rawBody, $secret);\n$valid = hash_equals($expected, $signature);`),
  errors([["invalid_signature","401","Use the raw body and the secret for this environment."],["missing_signature","401","Reject the request without processing it."]])
 ]),
 g("event-catalogue","Events","Event catalogue","Handle every Raha Pay event with one stable envelope.",[
  s("purpose","Available events",["Subscribe only to events your system can process."],{table:{headers:["Event","When it is sent"],rows:[["payment.successful","A payment settled."],["payment.failed","A payment ended without settling."],["payout.successful","The recipient received the payout."],["payout.failed","The payout could not be delivered."],["payout.reversed","A delivered payout was returned."],["dedicated_account.credited","A dedicated account received a bank credit."]]}}),
  request("Select event types when you register your webhook endpoint."),
  response("The delivery expects a quick HTTP 2xx acknowledgement."),
  webhook("Example payload",`{\n  "id": "rp_evt_7Gh4Pw16",\n  "type": "payment.successful",\n  "created_at": "2026-09-22T14:05:00+03:00",\n  "data": { "id": "rp_pay_8Kq2Xw91", "amount": 1250000, "status": "successful" }\n}`),
  errors([["unknown_event","200","Acknowledge and ignore event types your code does not use."]])
 ]),
 g("retries-idempotency","Events","Retries and idempotency","Make requests and event handlers safe to repeat.",[
  s("purpose","Prevent duplicate work",["Networks can time out after Raha Pay accepts a request. Events can also arrive more than once."],{callout:{kind:"warning",title:"Reuse the key",text:"After a timeout, retry the same create request with the same `Idempotency-Key` and unchanged body."}}),request("Send a unique `Idempotency-Key` header with every create request."),response("The same key and body return the original result. A changed body returns a conflict."),webhook("Store each event ID with a unique constraint before applying its business update."),errors([["idempotency_conflict","409","Use the original body or a new key."],["duplicate_reference","409","Use a unique business reference."]])
 ]),
 g("statuses","Reference","Status codes and meanings","Map payment and payout statuses to clear actions in your product.",[
  s("purpose","Status meanings",["Keep non-final records open for later updates."],{table:{headers:["Status","Meaning","Final"],rows:[["initiated","Created and ready for the next action","No"],["pending","Waiting for a customer or network","No"],["processing","Sent to a payment network","No"],["successful","Completed and confirmed","Yes"],["failed","Could not complete","Yes"],["reversed","A completed payout was returned","Yes"]]}}),request("Fetch the payment, payout or transaction when you need its current status."),response("Never move a final record back to a non-final status."),webhook("Use the event timestamp to ignore older updates."),errors([["invalid_status","400","Use a documented status filter."]])
 ]),
 g("errors","Reference","Errors","Use short error codes to choose the next action.",[
  s("purpose","Error format",["Error responses keep the standard envelope and put the machine-readable code in `data.code`."],{table:{headers:["Code","HTTP","Fix"],rows:[["invalid_phone_number","400","Use 2547XXXXXXXX format."],["duplicate_reference","409","Create a new reference."],["account_name_mismatch","422","Use the name returned by account lookup."],["insufficient_balance","422","Add funds before retrying."],["rate_limited","429","Wait for Retry-After seconds."]]}}),request("Log the request ID, status and error code. Do not log secret keys or customer PINs."),response("Show a specific next step to the user instead of the raw provider message."),webhook("Failed transaction events can include the same code in `data.failure_code`."),errors([["server_error","500","Retry with backoff and the same idempotency key."]])
 ]),
 g("banks-networks","Reference","Banks and mobile networks","Fetch active Kenyan bank codes and use the supported mobile wallet names.",[
  s("purpose","Choose a destination",["Call `/v1/banks` rather than keeping a permanent bank-code list. Use `mpesa` and `airtel_money` for mobile requests."]),request("Send an authenticated GET request to `/v1/banks`."),response("The response contains each active bank name and `bank_code`."),webhook("Bank and network discovery does not send an event."),errors([["rate_limited","429","Cache the list briefly and wait before retrying."]])
 ]),
 g("limits-allowlisting","Reference","Rate limits and IP allowlisting","Protect Live access and recover cleanly when request volume is high.",[
  s("purpose","Control access",["Add your public server addresses in `{{DASHBOARD_URL}}`. Read rate-limit headers to pace requests."],{table:{headers:["Header","Meaning"],rows:[["X-RateLimit-Limit","Requests in the current window"],["X-RateLimit-Remaining","Requests left"],["X-RateLimit-Reset","Time when the window resets"],["Retry-After","Seconds to wait"]]}}),request("Send Live requests from an allowlisted public address."),response("HTTP 429 includes a retry delay. Apply exponential backoff with jitter."),webhook("Allowlisting API traffic does not restrict Raha Pay deliveries to your webhook."),errors([["ip_not_allowed","403","Add the public egress address."],["rate_limited","429","Wait for the stated delay."]])
 ]),
 g("changelog","Reference","Changelog","See changes to Raha Pay APIs and developer guidance.",[
  s("purpose","22 Sep 2026, 14:05 EAT",["Published the payments, payouts, dedicated accounts, account activity and events documentation."]),request("No request is required for documentation updates."),response("Breaking API changes receive a new version and migration notice."),webhook("Webhook consumers should ignore fields they do not use."),errors([["not_applicable","—","No action is needed."]])
 ])
];
export const guideGroups=["Start here","Accept payments","Send money","Account","Events","Reference"];
export const getGuide=(slug:string)=>guides.find(item=>item.slug===slug);
