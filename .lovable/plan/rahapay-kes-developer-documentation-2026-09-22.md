# Rahapay KES Developer Documentation

## Overview
Build a polished static documentation site for Rahapay’s Kenya-focused payments API. The site will use a responsive three-column docs layout, structured content, global search, code examples, diagrams, and live interface preferences without any backend.

## What will be built

### 1. Documentation shell and navigation
- Replace the blank page with a responsive documentation layout.
- Add a top bar with the Rahapay wordmark, Guides / API Reference / Changelog tabs, search, Live/Sandbox selector, theme toggle, and Dashboard link.
- Add the complete grouped left navigation from the brief, a mobile drawer, and a contextual right rail.
- Add previous/next page controls and a local “Was this page helpful?” interaction.

### 2. Reusable documentation experience
- Build reusable headings with copyable anchors, Note/Warning/Tip callouts, parameter tables, status and error tables, language-tabbed code blocks, copy controls, and Mermaid-style sequence diagrams.
- Implement Cmd+K / Ctrl+K search across guide titles, headings, and endpoint names.
- Make the environment selector swap `{{BASE_URL_LIVE}}` and `{{BASE_URL_SANDBOX}}` throughout code samples.
- Persist theme and environment choices in the browser while keeping the site otherwise static.

### 3. Editable content architecture
- Store every endpoint definition in `src/data/endpoints.ts`, including methods, paths, descriptions, parameters, examples, errors, and related events.
- Store guide material separately from rendering components in typed content modules.
- Generate the left navigation, searchable index, API pages, right-rail contents, and previous/next links from these data sources.

### 4. Complete KES-only guides
- Write the Getting Started and Webhooks sections in Rahapay’s voice.
- Write Collections guides for checkout, payment links, M-Pesa/mobile money, bank transfers, permanent and temporary virtual accounts, and amount mismatch handling.
- Write Payout guides for Kenyan bank transfers, mobile money, cross-currency payouts into KES, and account verification.
- Write Balances, KES conversion, statuses, grouped errors, supported institutions, changelog, and FAQ pages.
- Include full field requirements, status meanings, events, error coverage, realistic fake Kenyan data, and KES amounts from the cited reference material while excluding all forbidden regions, currencies, and products.

### 5. Data-driven API Reference
- Add a separate API Reference experience grouped by product.
- Give each endpoint a dedicated view with method badge, path, description, request parameter table, cURL/Node.js/Python/PHP requests, success and failure JSON, and related webhook event.
- Keep all placeholder values exactly as provided for URLs, keys, headers, support, and dashboard links.

### 6. Visual system and responsive polish
- Use a neutral, high-clarity visual system with a deep-green accent, Inter text, and JetBrains Mono code.
- Provide light and dark themes, sticky desktop rails, stacked mobile code samples, accessible controls, and overflow-safe tables/code.
- Add restrained transitions and respect reduced-motion preferences.

### 7. Validation
- Verify no forbidden company name, currency, country, or excluded product appears in visible content or source content.
- Verify every navigation item and endpoint opens, search and keyboard shortcuts work, environment swapping updates samples, anchors copy correctly, and mobile layouts do not scroll horizontally.
- Verify page metadata, desktop/mobile rendering, dark/light themes, and a clean preview build.

## Technical details
- TanStack Start routes will serve the guide and endpoint views with route-specific metadata.
- Shared content components will render typed guide blocks and endpoint records rather than embedding documentation prose in page components.
- Search and preferences will run entirely in the browser; no database or Cloud service will be added.
- Mermaid diagrams will be rendered client-side with an SSR-safe loading boundary.
