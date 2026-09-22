# Raha Pay documentation redesign

## Goal
Rebuild the existing static documentation into a richer developer experience while preserving the Raha Pay design tokens, fonts, supplied logos, sidebar groups, and endpoint catalogue.

## What will change

### Shared foundation
- Add one documentation configuration module for live and sandbox URLs, key examples, `Raha-Signature`, dashboard, support, and status links.
- Replace every rendered placeholder with environment-aware real-looking values; keep the existing Sandbox/Live control and persist the selected code language site-wide.
- Add a working `/reference` entry point and audit every navigation, search, dashboard, footer, previous/next, and cross-guide link.
- Extend shared content rendering for inline code, links, emphasis, status pills, searchable tables, expandable payloads, and code-bearing callouts without exposing Markdown punctuation.

### Welcome page
- Keep the supplied dark lockup band and update its message.
- Add three workflow cards, a tabbed first-request walkthrough, payment-rail chips, six popular-guide links, a sandbox callout band, and the requested support/status/changelog/legal footer.
- Use responsive grids and compact mobile stacking with no horizontal page overflow.

### Guide experience
- Replace the universal Request/Response/Webhook/Errors sequence with page-specific sections.
- Expand each guide around purpose, flow, implementation, failure handling, and sandbox testing; transactional guides receive full four-language requests, complete responses/events, parameters, status lifecycle, and concrete edge cases.
- Give Accept payments, Send money, and Events guides numbered prose steps beside a sticky code workspace. Intersection tracking switches the active snippet as the reader moves through steps; mobile places the matching snippet beneath each step.
- Move page navigation into a compact top dropdown and add branded speed-line eyebrows.
- Build special presentations for the five-step Quickstart, payment/payout lifecycle guides, webhook delivery/signature guides, event catalogue, searchable error catalogue, and searchable Kenyan bank/network directory.

### API reference
- Keep endpoint definitions centralized, extending each record with parameter examples and nesting, response fields, valid statuses, endpoint-specific errors, and complete 200/4xx examples.
- Keep the grouped index but rename it “API reference.”
- Rebuild endpoint detail pages as middle documentation plus a sticky right code workspace with cURL, Node.js, Python, and PHP requests and response tabs.
- Render nested object fields in expandable rows, required badges, sticky zebra headers, and semantic status pills.

### Diagrams and visual system
- Replace the current diagram tables with responsive branded swimlane sequence diagrams using Mermaid, loaded only in the browser for reliable page rendering.
- Use violet participants, muted arrows, Nunito Sans labels, correct actors, and flow-specific messages.
- Add Lucide icons to sidebar group labels and page eyebrows; preserve the flat Raha Pay palette and exact supplied logos.
- Use bordered surfaces, tinted icon callouts, 48px major-section rhythm, 24px step rhythm, and restrained hover lift only on the requested home cards.

## Technical details
- Reshape `src/data/guides.ts` into richer page sections and step/snippet records while retaining all current slugs and sidebar groups.
- Extend `src/data/endpoints.ts` rather than duplicating endpoint facts in components.
- Split the large presentation layer into focused home, guide, API, table, status, code-workspace, and diagram components.
- Keep all content static and editable in data/config files; no backend or database will be added.
- Add `/reference` as a real TanStack route and leave generated route files untouched.

## Validation
- Check all routes and links for 200 responses, including `/reference` and every endpoint.
- Confirm no rendered `{{...}}`, literal Markdown punctuation, obsolete “KES” page headings, or broken dashboard/footer links.
- Test environment and language persistence, search, expandable rows/payloads, code switching, and copy actions.
- Visually verify home, one guide, and one endpoint at desktop and 375px in both light and dark modes; confirm no horizontal page overflow or console errors.
