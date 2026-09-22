# Raha Pay docs layout, virtual accounts, and assistant

## Goal
Rebuild the existing documentation presentation to match the three supplied designs, add a complete Kenya virtual-accounts section, and add a grounded Raha Pay Assistant without changing existing public content routes or the core Raha Pay brand system.

## Layout rebuild

### Shared shell
- Rebuild the 64px top bar to match the references: exact supplied mark, Raha Pay wordmark, Docs tag, active navigation underline, Ask AI, 300px search, environment switch, theme control, and Dashboard action.
- Keep the existing keyboard search, theme persistence, environment switching, mobile drawer, and language persistence.
- Reorder the guide sidebar to Start here, Accept payments, Virtual accounts, Send money, Account, Events, Reference; retain icons, active states, and all valid existing links.
- Standardize shared code panels with the dark request/response treatment, language controls, copy and Explain actions, horizontal overflow, and response status tabs.

### Home
- Match the full-width dark hero, 1200px content container, exact supplied lockup, headline, buttons, speed lines, and three overlapping workflow cards.
- Rebuild first request, payment rails, popular guides, sandbox band, and footer to the proportions and grouping shown in the supplied home design.
- Update the bank and popular-guide copy to introduce Virtual accounts while preserving the current payment and payout content.

### Guides
- Apply the supplied 272px-sidebar and 620px-prose/sticky-code layout to every guide.
- Add the page meta row, Ask about this page, Copy page as Markdown, use-case callout, flow diagram, scroll-tracked numbered steps, parameter blocks, statuses, edge-case cards, sandbox table, and previous/next navigation where the page content supports them.
- Preserve page-specific layouts for guides without flows rather than manufacturing empty diagrams or build steps.
- Expand thin guides with direct, topic-specific prose so each explains purpose, flow, implementation, failures, and testing; transactional pages include complete four-language requests, responses, and events.

### API reference
- Match the supplied grouped endpoint sidebar, compact middle column, full URL bar, stacked parameter cards, expandable child attributes, status pills, error table, and 520px sticky request/response rail.
- Keep the grouped API index titled “API reference,” and preserve all existing endpoint URLs.

## Kenya Virtual accounts
- Replace “Dedicated account numbers” in navigation and content with a new Virtual accounts group containing overview, activation and KYC, create, receiving payments, manage, and Sandbox testing pages.
- Redirect `/guides/dedicated-accounts` to `/guides/virtual-accounts`; fold amount-mismatch guidance into Receiving payments while retaining a compatibility redirect for its old route.
- Add the requested account types, lifecycle, activation process, KYC checklists, visible `[PARTNER BANK]`, `[X] business days`, and `KES [THRESHOLD]` placeholders, flow diagrams, account-display example, full credited/held/returned events, management guidance, and Sandbox outcomes.
- Add six Virtual accounts endpoint records with nested customer/KYC parameters, complete requests/responses/errors, a Sandbox-only badge, and the new API-reference group.
- Extend the event catalogue with the seven requested Virtual accounts events and complete example payloads.

## Raha Pay Assistant
- Build one session-only conversation in a 440px right slide-over, becoming full-screen on mobile. Use the supplied mark as its identity and AI Elements for conversation, message, prompt, and loading primitives.
- Add entry points in the top bar, search results, guide headers, and every code panel. Pass current page context and attached snippets without exposing credentials.
- Add a server streaming chat route using Lovable AI with `openai/gpt-6-astra`. Send the complete current-session conversation each turn and keep the AI key server-side.
- Build a static documentation chunk index from guides, endpoints, events, and changelog content. Rank relevant chunks on the server, restrict answers to that context, and require canonical source URLs. Render cited sources as navigation chips that keep the panel open.
- Block messages matching secret-key patterns before sending. Add the agreed temporary 20-question/hour limit using an anonymous browser visitor key; this is intentionally a best-effort limit until a standard platform limiter is available.
- Store sanitized question text, cited page URLs, and optional thumbs rating in Lovable Cloud. Store no account identity, raw address, secret, or chat transcript.
- Surface AI configuration, credit, access, and rate errors directly; never fabricate a fallback answer.

## AI-readable documentation
- Add `public/llms.txt` listing every public guide and endpoint with one-line descriptions.
- Serve Markdown mirrors at `/guides/<slug>.md`, `/api-reference/<slug>.md`, and index Markdown URLs, generated from the same data sources as the visible pages.

## Technical details
- Extend the existing guide and endpoint types instead of duplicating documentation in components.
- Add focused shared components for the top bar, sidebars, code panel, guide header/steps, assistant panel, source chips, and Markdown export.
- Create one backend table for assistant feedback/coverage logs with explicit grants, row security, and server-only writes.
- Keep the temporary rate-limit records separate from question logs and automatically expire old hourly buckets during new requests.
- Preserve every route’s unique title, description, Open Graph title/description/type, and Twitter card metadata; add metadata for all new visible guide routes through the existing dynamic guide route.

## Validation
- Verify every navigation item, redirect, search result, Markdown mirror, Dashboard link, and source chip resolves.
- Test Virtual accounts create/manage/testing pages, all six endpoint pages, nested KYC rows, and all seven event payloads.
- Test the assistant with a documented question, a current-page question, an attached snippet, an out-of-scope question, a secret-key pattern, citation navigation, feedback, session continuity, and the temporary limit.
- Make one live Lovable AI request through the app route and verify the streamed response and citations.
- Visually compare home, one guide, one endpoint, and the assistant at desktop, dark mode, below 1024px, and 375px; confirm no clipping, overlap, console errors, rendered placeholders, or literal Markdown punctuation.
