# ProseBlock — Design & Accessibility Audit

_Audited: 2026-04-28 against https://bryndin.github.io/proseblock-demo/_
_Viewports: 1440×900 desktop, 375×812 mobile. Light + dark themes._

## Step 1 — Observational Audit (verified state)

**Type system**
- Single family: `Manrope` (system-ui fallback). Mono = generic `monospace` (not pinned).
- Body: 16px / lh 24px (1.50) / **fw 300** / `oklch(0.48 0.02 260)` light; `oklch(0.78 0.015 240)` dark.
- Heading scale on post: h1 36/45/400 ls -0.9, **h2 72/72/400 ls -1.8**, h3 24/36/600, h4 20/**40**/600, h5 18/31.5/600, h6 18/31.5/600.
- Eyebrows/meta: 10px fw 700 caps, color `oklch(0.58 0.015 240)`.
- Code: 12px, generic monospace, bg `oklch(0.965 0.006 250)`.
- Letter-spacing only on biggest heads (h1/h2); `normal` from h3 down.

**Color / theme**
- OKLCH-only palette, light bg `oklch(0.985 0.003 250)` / surface `#fff`; dark bg `oklch(0.2 0.015 230)` / chrome `oklch(0.15 0.01 230)`.
- Theme attr: `data-theme="light|dark"` + `data-theme-setting="system|light|dark"` (system follows `prefers-color-scheme`).
- Accent applied only on hover (links, card titles, sidebar items).

**Layout**
- `main` max-width **1280px**, padding 32px; `header`/`footer` full-bleed at 48px padding.
- Article inner card: padding 48px.
- 8pt-ish rhythm (8/16/24/32/40/48/80 used).
- Sidebar: 296px on the right of main on desktop; stacks below content on mobile.
- Hero: pale gray block at top of every page (home/posts/category/tag/search/404).

**Components & patterns identified**
- Featured rotator (only on home) with `01 / 02` index + prev/next.
- Pagination `< 01 02 03 >` with underline on active.
- Tag/category sidebar widgets with item count badges.
- TOC sidebar on single post (sticky-like rail with hover-grow indent).
- Newsletter "Dispatch" widget with bottom-bordered input + arrow submit.
- Hover transitions: color → accent, plus icon `translateX` for arrows; card hover adds `box-shadow: var(--shadow-inner)` + bg change.
- Drawer (mobile menu) triggered by hamburger.
- 404 has dedicated bottom nav (Archives / Categories / Tags) instead of standard sidebar.

**Things working well (not critiqued below)**
- OKLCH color tokens, dark mode plumbing via `data-theme`, hover micro-interactions on cards, no horizontal overflow at 375px, semantic `<article>`, drawer for mobile nav, RU + EN glyph support.

---

## Step 2 — Exhaustive Critique

### 1. Cross-Page Consistency

**1.1 Hero typography divergent on 404**
- *Location:* `/404` hero vs home/posts/category/tag heroes.
- *Measured:* 404 hero h2 = **96px / fw 800**; all other heroes = **72px / fw 400**.
- *Fix:* unify on the `--font-size-hero` / weight tokens. Replace 404-specific rule with same hero class. Pick one of the two; do not allow both.

**1.2 Taxonomy indexes use opposite layouts**
- *Location:* `/categories/` (3-card grid) vs `/tags/` (single-column dictionary list with letter dividers).
- *Issue:* same data shape (term + count), incompatible visual systems. Users learning the pattern on one page must relearn on the other.
- *Fix:* pick one. Recommended: dictionary list for both when count > 8, card grid for both when count ≤ 8; reuse `.c-tag-card` styling for category cards. Drop letter dividers if list is short.

**1.3 "Posts" hero missing subtitle**
- *Location:* `/posts/` vs `/categories/` ("Explore content organized…") and `/tags/` ("Browse all tags…").
- *Fix:* add `params.description` to `posts/_index.md` and render the same `<p class="c-hero__subtitle">` from the hero partial unconditionally.

**1.4 Subtitle copy structure inconsistent**
- *Location:* `/categories/` "Explore content organized by topic categories." vs `/tags/` "Browse all tags used across our publications."
- *Issue:* mixed mood — imperative + abstract. Different cadence/length.
- *Fix:* "Explore by category." / "Explore by tag." (parallel imperative + noun).

**1.5 `Category:Test` rendered without space**
- *Location:* `/categories/test/` hero — literal "Category:Test" with colon glued to value.
- *Fix:* in `layouts/_default/term.html` (or `categories/term.html`), separate label and value into two spans:
  ```html
  <span class="c-hero__kicker">{{ .Type | humanize }}</span>
  <span class="c-hero__title">{{ .Title }}</span>
  ```
  Style with `gap: var(--space-2)` on the flex parent. Currently rendered as one inline string with no whitespace.

**1.6 Sidebar shape changes between pages**
- *Location:* home (Dispatch + Categories + Tags), category page (Dispatch + Related Categories + Related Tags), search (Filter + Suggested Categories + Suggested Tags), single post (TOC only).
- *Issue:* "Related" on a category index page is identical content to global Tags but renamed — confusing label.
- *Fix:* either keep Dispatch as a constant first card on every sidebar variant, or remove it from search where filters already crowd the rail. Rename "Related Tags" → "Other Tags" on taxonomy pages where they aren't actually filtered by relevance.

**1.7 Hero h2 vs body h1 inversion**
- *Location:* every page hero is `<h2>` at 72px while body markdown `<h1>` (36px) is the smaller heading.
- *Fix:* page hero should be `<h1>` semantically. Markdown `<h1>` inside body should be demoted to `<h2>` by the renderer (or authoring rule). Adjust `_markup/render-heading.html` to shift levels by +1.

**1.8 Pagination prev-arrow not disabled on first page**
- *Location:* `/posts/` (page 1), `/categories/test/` (page 1) — `<` chevron renders at full opacity even though it has nowhere to go.
- *Fix:* template: `{{ if .Paginator.HasPrev }}<a>{{ else }}<span aria-disabled="true" class="is-disabled">{{ end }}`. Add `.c-paginator__btn.is-disabled { opacity: .35; pointer-events: none; }`.

**1.9 Article container padding ≠ main container padding**
- *Location:* `main { padding: 0 32px }` and `article { padding: 48px }` on desktop.
- *Issue:* the article card text left-edge sits 80px from viewport edge while the hero text inside the same column sits at 80px — appears aligned by accident; on archive cards without the white wrapper, alignment shifts ±16px between hero and card title.
- *Fix:* tokenize: `--container-pad: 32px; --card-pad: var(--space-6)`; ensure sum of `main` padding + card padding always equals an even multiple. Use 24/48 throughout.

**1.10 Featured rotator only on home**
- *Location:* `/` shows featured carousel; archive/category/tag/search list pages drop it. There's no announcement that the same article also appears in the list.
- *Issue:* causes duplicate visual entry on home (Featured "Building Resilient…" + a list item with the same title and same description).
- *Fix:* exclude featured posts from the regular list query on home. In `home.html`: `{{ $rest := where .Site.RegularPages "Params.featured" "ne" true }}`.

---

### 2. Visual Hierarchy & Layout Rhythm

**2.1 h4 line-height 2.0 outlier**
- *Location:* every post body h4 (`assets/css/...`).
- *Measured:* 20px font / **40px lh** (= 2.0). h3 1.5, h5/h6 1.75. h4 sticks out.
- *Fix:* `h4 { line-height: 1.4; }` (= 28px), bringing it in line with the rest of the scale.

**2.2 h5 and h6 visually identical**
- *Measured:* both 18px / 31.5px / 600 / no ls.
- *Fix:* h6 → 16px / 24px / 600 / `text-transform: uppercase` / `letter-spacing: 0.06em` (turn h6 into a visual eyebrow rather than a sibling of h5).

**2.3 Heading weight inversion**
- *Issue:* h1/h2 are `fw 400` but h3-h6 jump to `fw 600`. The biggest things are the lightest. Visual hierarchy works only because of size — strip the size cue (e.g. on small screens) and h3 starts feeling more important than h2.
- *Fix:* either ramp weights monotonically (h1 600, h2 600, h3 600, h4 500, h5/h6 500), or commit to display-light: keep h1/h2 at 400 but drop h3 to 500 and h4-h6 to 500 as well so the change is one step, not two.

**2.4 Featured carousel leaves vast empty column**
- *Location:* home, desktop. Featured card occupies ~50% of the main column; nothing renders to its right.
- *Fix:* either make the featured card full-width of `main` (and make the prev/next paginator span its full width), or place the featured card *inside* the article list so the post grid below uses the freed width.

**2.5 Tags index: ~50% dead whitespace per row**
- *Location:* `/tags/` desktop. Most rows show 1 tag flush-left, with 50% of the white card empty.
- *Fix:* `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-3);` inside each letter-section. Letter dividers stay sectioned.

**2.6 Tags letter dividers near-invisible**
- *Location:* `/tags/` — single lowercase letter ("a", "b") with hairline rule, low contrast.
- *Fix:* make the letter the visual anchor: `font-size: 32px; font-weight: 700; opacity: 1; color: var(--text-primary);` and put the rule on the section, not under the letter.

**2.7 Categories cards underline detached from title**
- *Location:* `/categories/` — each card has `01 — 04 ARTICLES` with a horizontal rule below the count, then "TEST" title sits under the rule on a new line.
- *Issue:* rule visually separates the title from its index/count — they feel like two unrelated rows.
- *Fix:* move the rule to the card's outer `border-bottom`, or tighten `gap: var(--space-2)` between count row and title and remove the inline rule.

**2.8 Hero block height varies by content alone**
- *Location:* `/posts/` hero (just "Posts") collapses to a tall band that's mostly empty; `/categories/` ("Categories" + subtitle) feels balanced.
- *Fix:* set a min-height on `.c-hero` (e.g., `min-height: 280px`) and center the title block vertically; eliminates 30% empty hero on `/posts/`.

**2.9 Author byline meta row visually heavy**
- *Location:* archive cards: `📅 MAR 15, 2026 · 👤 JANE DOE · ⏱ 3 MIN`.
- *Issue:* three icon+caps+text groups in a row create visual noise; bullets between them aren't baseline-aligned with the icons.
- *Fix:* drop the bullet glyphs, use `gap: var(--space-4)` on a flex row; replace icon + label with icon-only (with `aria-label`) or label-only.

**2.10 No visible footer anchor — full-bleed empty band**
- *Location:* footer on every page = single line `© 2026 ProseBlock` flush-left at 48px padding, ~104px of blank space below.
- *Fix:* either reduce `padding-block: 24px` and lose the empty band, or actually populate the footer (links, social, language switcher) so the height is justified.

**2.11 Featured card title clipped on mobile**
- *Location:* `/` at 375px — featured carousel title "Building Resilient Web Application..." clips to "...Modern CS" (last char visibly cut).
- *Fix:* the inner card likely has fixed width or padding that exceeds parent. Set `.c-featured__card { width: 100%; min-width: 0; }` on the article element; `.c-featured__title { overflow-wrap: anywhere; }`.

**2.12 Sidebar duplicates main content on mobile**
- *Location:* every list page on mobile — sidebar (Dispatch + Categories + Tags) renders below the post list, doubling the page length.
- *Fix:* on mobile, hoist the newsletter into a single `<aside>` near the bottom; collapse Categories + Tags into a `<details>` accordion; or move taxonomy widgets into the drawer instead of inline.

---

### 3. Typography

**3.1 Body weight 300 too thin for 16px on light bg**
- *Measured:* body p `fw 300` / 16px / `oklch(0.48 0.02 260)`. Combined with the gray text color, strokes thin out enough to feel washed.
- *Fix:* `--font-weight-body: 400` (or 380 if Manrope variable axis is loaded). 300 is acceptable for >18px display use only.

**3.2 Body line-height 1.5 too tight for long-form**
- *Measured:* 16/24 = 1.50.
- *Issue:* the theme positions itself as long-form ("haven for long-form reading"), but 1.5 is the floor, not the comfort point.
- *Fix:* `body { line-height: 1.65; }` and `article p { line-height: 1.7; }`. Recompute spacing to keep `margin-bottom: 1em` between paragraphs.

**3.3 Inline code 12px breaks vertical rhythm**
- *Measured:* `<code>` 12px while body p 16px.
- *Issue:* every inline code token shrinks the line height locally — paragraphs containing code visibly hop.
- *Fix:* `code { font-size: 0.9375em; }` (15px when in 16px body) and let it inherit line-height.

**3.4 `<pre>` code 12px is below comfortable read size**
- *Location:* every post body code block.
- *Fix:* `pre code { font-size: 14px; line-height: 1.55; }`. Pin the mono family: `font-family: "JetBrains Mono", ui-monospace, "Cascadia Code", monospace;` (currently inherits generic `monospace`, which renders Courier on many systems).

**3.5 TOC links 11px / 600 — illegible**
- *Location:* single post left rail.
- *Fix:* `.c-toc__list a { font-size: 13px; font-weight: 500; line-height: 1.45; }`. Reserve 11/700 for TOC active marker only.

**3.6 Eyebrows 10px/700/caps**
- *Location:* "FEATURED", "TEST / ДИЗАЙН", "STATUS CODE: 404", "CONTINUE EXPLORING", everywhere.
- *Issue:* AAA fail and visually noisy because the entire site uses 10px-700-caps as the only "label" treatment.
- *Fix:* baseline 12px / 600 / `letter-spacing: 0.08em` / `text-transform: uppercase`. Keeps the look, restores readability.

**3.7 Newsletter input 12px triggers iOS auto-zoom**
- *Location:* Dispatch widget on every page with sidebar.
- *Fix:* `.c-newsletter__input { font-size: 16px; }` (or use `font-size: max(16px, 0.875rem)`) so iOS Safari does not zoom the viewport on focus.

**3.8 Reading measure too wide on desktop**
- *Measured:* body p width 793px; first paragraph 222 chars over a few lines → ~85–110 chars/line.
- *Fix:* cap article prose: `.c-post__content { max-width: 68ch; margin-inline: auto; }`. Move TOC and side rails outside the prose constraint.

**3.9 Reading measure too narrow on mobile**
- *Measured:* body p width 247px at 375px viewport → ~32–35 chars/line.
- *Fix:* root cause is a parent with `padding: 48px` inside another `padding: 32px` container at mobile. Reduce article inner padding on mobile: `@media (max-width:480px){ .c-post__article{padding:24px 16px;} main{padding:0 12px;} }` to recover ~30px and bring measure to ~50 chars.

**3.10 h2 hero `line-height: 72px` collides on wrap**
- *Measured:* 72/72 = 1.0. On mobile h2 reduces to 36/45 (1.25), but the desktop value of 1.0 means a wrapped two-line title literally has zero space between lines.
- *Fix:* `h2.c-hero__title { line-height: 1.05; }` minimum.

**3.11 No `font-feature-settings` for tabular figures**
- *Location:* meta dates, "01 / 02" pagination, "04 ARTICLES" counts.
- *Issue:* digits will jiggle when counts change (e.g., 11 vs 04).
- *Fix:* `[class*="meta"], [class*="count"], .c-paginator { font-variant-numeric: tabular-nums; }`.

**3.12 Mono fallback is unstyled**
- *Measured:* `pre code { font-family: monospace; }` — no nominated mono.
- *Fix:* declare a real stack (see 3.4); current rendering varies wildly across OS.

---

### 4. Color & Accessibility (WCAG)

**4.1 Inline body links indistinguishable from prose** — *severe*
- *Location:* `/posts/test-markdown/` body — "I'm an inline-style link" rendered in `oklch(0.48 0.02 260)` (identical to body) with `text-decoration: none` and no border. Hover changes color, but rest state has no visual cue at all.
- *WCAG:* fails 1.4.1 Use of Color.
- *Fix:* default `article a { color: var(--accent); text-decoration: underline; text-underline-offset: 0.2em; text-decoration-thickness: 1px; }`. Hover can thicken to 2px. Do not strip underline globally.

**4.2 Focus styles defined for only 3 components**
- *Location:* CSS audit — `:focus-visible` rules exist only for `.c-share__item` and `.c-search-widget__header--link`. `.c-sidebar__input:focus { outline: none; ... }` removes the default outline and replaces with a same-color border tweak.
- *WCAG:* fails 2.4.7 (Focus Visible) for the majority of interactive elements; fails 2.4.13 (Focus Appearance) where the only fallback is the user-agent 1px ring.
- *Fix:* global rule:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 2px;
  }
  ```
  Remove `outline: none` overrides unless paired with an equally strong replacement.

**4.3 Header icon buttons under-sized on mobile** — *severe*
- *Measured:* `#theme-toggle` and search-icon link both **13×20 px** at 375px viewport.
- *WCAG:* fails 2.5.8 Target Size Minimum (24×24 AA). Far below 2.5.5 (44×44 AAA).
- *Fix:* `.c-header__icon-btn, .c-header__icon-link { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; }`. Keep the visible icon at 16px; pad the hit area.

**4.4 Hamburger trigger AA-only**
- *Measured:* 24×24. Meets AA, fails AAA.
- *Fix:* same as 4.3.

**4.5 Eyebrow / meta contrast borderline**
- *Measured:* meta text `oklch(0.58 0.015 240)` on bg `oklch(0.965 0.006 250)` → **3.85:1**.
- *WCAG:* at 10px non-bold this would fail 1.4.3. It is bold caps so AA Large (3:1) just clears.
- *Fix:* either bump color to `oklch(0.5 0.02 260)` (≥ 4.5:1) or accept caps-bold and never use this color for non-bold small text. Currently the date "Mar 15, 2026" appears in the same token, which qualifies as small text and degrades.

**4.6 Code-block surface barely distinct in light mode**
- *Measured:* page bg `oklch(0.985)` vs code bg `oklch(0.965)` — ~2% lightness delta.
- *Issue:* code blocks are visually swimmable; readers cannot easily spot where prose ends and code begins.
- *Fix:* drop code surface to `oklch(0.94 0.01 250)` and add `border: 1px solid oklch(0.9 0.01 250)`. In dark mode, lift to `oklch(0.24 0.02 230)`.

**4.7 Dark mode body bg `oklch(0.2)` is high luminance** for an OLED-friendly long-read theme
- *Issue:* body text contrast 9.07:1 — exceeds AAA — but excessive contrast in dark mode causes halation/glow on long-form reading.
- *Fix:* either drop body color to `oklch(0.72 0.012 240)` (still ~7:1) or raise bg to `oklch(0.22 0.015 230)`. Aim for 7–8:1 in dark mode, not 9+.

**4.8 No `aria-current` on active pagination page**
- *Location:* `/posts/` — active "01" gets visual underline only.
- *Fix:* template: `aria-current="page"` on the active `<span>`/`<a>`. Pair with a visible indicator that isn't color-only (already underlined — keep + add `aria-current`).

**4.9 Theme toggle lacks state semantics**
- *Location:* `<button id="theme-toggle" aria-label="Theme: system">`.
- *Issue:* button cycles system → light → dark, but the only state cue is the icon. Screen reader users hear "Theme: system" even after switching to dark.
- *Fix:* update `aria-label` on click to reflect current setting, e.g. `Theme: dark (click to cycle)`. Add visually-hidden text inside the button for richer announcement.

**4.10 Newsletter form has no visible label**
- *Location:* Dispatch widget — placeholder "EMAIL ADDRESS" only, no `<label>`.
- *WCAG:* fails 3.3.2 Labels or Instructions when placeholder vanishes.
- *Fix:* add `<label class="u-visually-hidden" for="newsletter-email">Email address</label>` and a visible label above the input or use a floating-label pattern.

**4.11 Search input `Type here…` is placeholder-only label**
- Same problem as 4.10 on `/search/`. Same fix.

**4.12 Footer copyright contrast not audited but small**
- *Location:* footer "© 2026 PROSEBLOCK" rendered in 10–12px caps with low contrast.
- *Fix:* `.c-footer { font-size: 14px; color: var(--text-secondary); }`.

**4.13 Hover-only differentiation on cards**
- *Location:* archive/category/tag cards. At rest, only the eyebrow color hints affordance; on hover, title turns accent and bg shifts.
- *WCAG:* fails 1.4.1 Use of Color when accent is the sole hover signal (no underline / size / shadow before hover).
- *Fix:* add `cursor: pointer` (already present) AND an at-rest visual cue: `border-bottom: 1px solid transparent` that becomes accent on hover, OR a `box-shadow` at rest that grows on hover.

**4.14 No reduced-motion guard inspected for hover translations**
- *Location:* `.c-author__more-link:hover .c-author__more-icon { transform: translateX(...); }`, `.c-search-widget__header--link:hover .c-search-widget__subtitle { padding-left: var(--space-2); }`, etc.
- *Fix:* `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; transform: none !important; } }`.

---

### 5. Interactive States & Usability

**5.1 Search-page filter dropdowns rendered after results on mobile**
- *Location:* `/search/` at 375px — DOM order: search input → results → "Filter Results" → Category dropdown → Time dropdown → Suggestions.
- *Issue:* a user typing a query never sees they have filters until scrolling past results.
- *Fix:* CSS `order` reorder on mobile: filters above results inside a flex column, or move filters into a sticky bar below the search input.

**5.2 Filter dropdowns not associated with the search widget**
- *Location:* `/search/` — category + time dropdowns sit in sidebar with no relationship attribute.
- *Fix:* `aria-controls="search-results"` on each dropdown; `role="region" aria-label="Search results"` on the results container.

**5.3 Featured carousel has no live region**
- *Location:* home — pressing prev/next swaps article content silently.
- *Fix:* `<div aria-live="polite" aria-atomic="true">` wraps the rotating article body. Update the `01 / 02` text via JS to trigger announcement.

**5.4 Carousel autoplay status unstated**
- *Issue:* if it auto-rotates, no pause control; if it doesn't, the prev/next arrows imply temporality without indication.
- *Fix:* add explicit pause/play toggle if autoplay; otherwise label arrows "View previous" / "View next" (already done) and don't rotate without input.

**5.5 "Return Home" on 404 doesn't read as a button**
- *Location:* `/404` lower block — "← Return Home / Back to the primary index" is plain text + arrow, no border/bg.
- *Issue:* visually identical to the "Continue Exploring" links beside it; primary CTA loses prominence.
- *Fix:* style as primary button: `.c-404-nav__home-link { display:inline-flex; padding:14px 20px; border:1px solid var(--text-primary); border-radius:2px; font-weight:600; }`.

**5.6 Tag rows have ambiguous click target**
- *Location:* `/tags/` and category sidebars — tag name on the left, count on the right, hairline rule between rows.
- *Issue:* visually unclear whether the count is part of the link, padding around the row exceeds the visible link.
- *Fix:* wrap entire row in `<a>` (already true); add `display: flex; padding-block: 12px;` so the whole row is the affordance, and add hover `background-color` to confirm.

**5.7 Drawer close affordance unverified**
- *Location:* mobile menu drawer (opens via hamburger) — could not inspect open state without click; ensure ESC closes, focus traps inside, and a visible × button exists.
- *Fix:* Hugo partial `_partials/drawer.html` should have `<button aria-label="Close menu">×</button>`, `inert` on background, focus trap, ESC handler.

**5.8 Pagination `<` / `>` arrows have no label visually**
- *Location:* every paginated page — chevrons only, no text.
- *Fix:* `aria-label="Previous page"` / `Next page"` (likely present); add visible text on ≥768px: `<span class="u-hide-mobile">Prev</span>` for clarity.

**5.9 Carousel index text static**
- *Location:* `01 / 02` text on featured rotator.
- *Fix:* `aria-live="polite"` + update count when slide changes; or `<span aria-hidden="true">01 / 02</span>` plus a visually-hidden `<span>Slide 1 of 2</span>` that updates.

**5.10 Theme toggle target hit area**
- *Location:* `#theme-toggle` (see 4.3). At 13×20 the click area is so small that mis-clicks land on the search icon next to it.
- *Fix:* same as 4.3 — pad to 44×44.

**5.11 No skip-to-content link**
- *Location:* every page — first focusable element is the hamburger; keyboard users tab through nav before reaching content.
- *Fix:* prepend `<a class="u-skip-link" href="#main">Skip to content</a>` immediately inside `<body>`; style `.u-skip-link { position: absolute; left: -9999px; } .u-skip-link:focus { left: 8px; top: 8px; ... }`. Add `id="main"` to `<main>`.

**5.12 Hover on archive title is color-only**
- *Issue:* covered in 4.13 — also a usability finding for low-contrast or grayscale displays.
- *Fix:* `text-decoration: underline` on `:hover`.

**5.13 Author byline link has separate tap targets glued together**
- *Location:* archive card meta `📅 MAR 15, 2026 · 👤 JANE DOE · ⏱ 3 MIN` — the date links to the post, the author links to author page, the read-time is plain text. All three look identical.
- *Fix:* date and read-time should not be links (read-time isn't even a destination); only "Jane Doe" should be a link, distinguished by underline.

**5.14 No `prefers-color-scheme` respect for stored setting**
- *Location:* theme JS reads `localStorage.getItem("theme") || "system"`. If user picks `light` then later changes OS to dark, they're stuck on light. (Fine — that's the user's explicit choice.) But there's no UI to "reset to system" once explicit setting was made beyond cycling all 3 states.
- *Fix:* keep the cycle but add a tooltip explaining the current state (`Theme: light · click for dark`).

**5.15 `<details>` not used for TOC on mobile**
- *Location:* TOC on `/posts/...` mobile renders as full grid above content.
- *Fix:* wrap in `<details><summary>On this page</summary><nav>…</nav></details>` — collapsible, native, no JS, saves ~300px of vertical space at top of each post.

**5.16 Newsletter "subscribe" button unstyled as button**
- *Location:* Dispatch widget — `SUBSCRIBE →` is bare text + arrow, no border/bg, identical to footer links.
- *Issue:* mistaken for a label until clicked.
- *Fix:* `.c-newsletter__submit { padding: 10px 0; border-bottom: 1px solid currentColor; }` minimum, or full pill button.

**5.17 No empty/no-results state designed for `/search/`**
- *Issue:* upon typing nothing or a non-matching query, results section likely just disappears.
- *Fix:* render `<p class="c-search__empty">No results. Try a different query, or browse <a href="/categories/">categories</a>.</p>`.

**5.18 Console errors on every page** (4–12 errors per page)
- *Location:* observed at navigation time.
- *Fix:* unrelated to design but worth investigating; `gh-pages` 404s on missing assets degrade theme demo trust.

---

## Unresolved Questions

1. h1 vs h2 hero — semantic intent? page title `<h1>` planned?
2. Featured rotator autoplay or manual?
3. Drawer focus trap implemented?
4. Mono font intentionally generic?
5. "Related" tags on category page — relevance algo or global list?
6. Search filter dropdowns wired to results JS?
7. Newsletter submit endpoint stubbed or live?
8. Console errors — known?
9. Body fw 300 deliberate (display aesthetic) or oversight?
10. Dark mode contrast target — AAA mandated or AA acceptable?
