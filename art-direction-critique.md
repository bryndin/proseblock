# ProseBlock — Art Direction Critique

_Re-audited 2026-05-04, post-refactor. Light + dark, 375 / 768 / 1024 / 1440._

---

## Step 1 — Visual Identity Audit

**Vibe:** "Minimalist Editorial-Lite" — aspires to a Kinfolk / Are.na quietness, but lands closer to **Notion-meets-Hugo-Coder**. Reads as "tasteful blog template" rather than "named publication."

**Type pairing**
- Manrope 200–800 (UI + display + body) + JetBrains Mono 100–700 (code).
- **Single-family pairing.** Manrope does headings, body, eyebrows, navigation, captions — everything. The result is uniform but undifferentiated; no editorial "voice."

**Palette mood**
- Cool monochrome OKLCH: bg `oklch(0.985)` / surface `#fff` / text `oklch(0.48 0.02 260)` (slate-blue gray) / accent ≈ blue revealed only on hover.
- Mood: "neutral SaaS doc site" — calm, but un-memorable. No warm tone, no editorial color (no muted oxblood, no archive-paper cream, no signature ink). Same temperature in light and dark.

**Design language**
- Hero block (pale gray slab) sits on every page. White content card sits below. Sidebar to the right. Left rail used on archives + authors + tags.
- Eyebrow + Title + Excerpt + Meta-row repeated for every list item.
- Hover micro-motion (icon translate-X, color → accent, shadow-inner on cards).
- Letter-tracked logo `P R O S E B L O C K`.
- Letter-rail dictionary pattern reused on /tags/ and /authors/.

**Net classification:** Restrained, monochromatic, "quiet web." Not Brutalist (too soft), not Editorial (no contrast/photography/ornament), not Swiss (no real grid commitment). It currently sits in the **"clean Hugo theme"** uncanny valley — competent, but generic.

---

## Step 2 — Aesthetic & Art Direction Critique

### 1. Modernity vs. Cliché

**1.1 The "pale-gray slab hero on every page" is 2018 Vercel/Stripe-marketing**
- *Critique:* The same `oklch(0.965)` panel with a left-aligned big title + subtitle subtitle appears on home, posts, archives, categories, tags, authors, about, search, 404. It is the most repeated visual element on the site, and it's the most clichéd. It stops being a hero and becomes a "header that's slightly grayer than the page."
- *Trend alternative (2026):* drop the panel entirely on inner pages. The page title sits inside the same column as content, with a thin display rule above it (oxidized hairline, not a slab). Reserve the slab for the **homepage only**, and make it earn its space with a typographic moment (an oversized statement, not a centered title block).
- *Direction:* "A hero is a promise. If every page promises the same thing, it's wallpaper." Use the slab once, ceremonially.

**1.2 Letter-tracked all-caps logo `P R O S E B L O C K`**
- *Critique:* Wide-tracked caps wordmarks were peak 2014–2018 (Medium, Mailchimp era). At 12–14px caps with ~0.4em tracking, it reads as "default tasteful" rather than as a brand.
- *Trend alternative:* a real wordmark — set the logo in a **second** typeface (a serif: Söhne Mono, GT Sectra, Editorial New, Reckless Neue) at sentence-case, weight 500. Or a custom ligature treatment. The pair gives the site a memorable signature.
- *Direction:* "If your logo is just your body font in caps with letter-spacing, you don't have a logo — you have a label."

**1.3 Single-family typography**
- *Critique:* Manrope for everything = "I'm a designer who knows about variable fonts" but doesn't risk a pairing. Editorial design is a contrast sport; one geometric sans means there is no tonal contrast between "voice of the publication" and "voice of the prose."
- *Trend alternative (2026):* introduce a **display serif** or a **slabbed display sans** for h1/h2 only. Pairings I'd reach for: *Reckless × Söhne*, *Editorial New × Inter*, *Saol Display × Söhne Mono*, *PP Editorial New × Manrope* (free to license: *Fraunces* × *Manrope* gets you 80% of the way for $0).
- *Direction:* "Two voices, never three. The display face is the title of the magazine; the body is the writer."

**1.4 The "01 / 02" carousel paginator with thin chevrons**
- *Critique:* Two-digit zero-padded counters + thin `<` `>` chevrons are **the** 2017 portfolio cliché (Resn, AWWWARDS, every Squarespace template since). It reads as "I designed a slider."
- *Trend alternative:* either commit (full-bleed, expressive featured banner with overlapping number set in display serif: `01.` huge in the gutter, `02.` greyed, etc.) or remove the carousel entirely and run a single hero-piece selection with no rotator — "this issue's lead" energy.
- *Direction:* "Carousels are confessions of editorial indecision. Pick one piece and stand behind it."

**1.5 Eyebrow + caps + colon + value as the universal label pattern**
- *Critique:* `STATUS CODE: 404`, `FEATURED`, `DISPATCH`, `CATEGORIES`, `TAGS`, `FILTER RESULTS`, `TEST / ДИЗАЙН`, `CONTINUE EXPLORING` — every label uses the same 10–11px bold-caps + tracking treatment. It's the most exhausted "minimal blog" idiom of the last decade.
- *Trend alternative:* mix label modes. Some labels in italic display serif lowercase ("dispatch" with a long horizontal rule extending right), some in numeric prefix (`§01 categories`), some inverted (white-on-ink chip). Variety = editorial.
- *Direction:* "Sameness is silence. A magazine speaks in different registers."

**1.6 Hover-only-color affordance on cards**
- *Critique:* At rest, cards are white-on-very-pale-gray with hairline borders. On hover, accent + shadow-inner. The rest state is so undifferentiated that the hover feels like the only real design — and the at-rest state feels like a wireframe.
- *Trend alternative (2026):* hover should *amplify* an already expressive rest state, not invent it. Give cards a **rest-state visual texture** (top-aligned numbered index in display serif, hairline rule with section letter, asymmetric padding, a pulled-out date in the gutter). Then hover can do less work.
- *Direction:* "Design the resting state. Hover is a flourish, not a rescue."

**1.7 Mobile drawer + hamburger + center logo + 2 right icons**
- *Critique:* The header layout — hamburger left / center logo / right icons (search + theme toggle) — is the **Squarespace mobile default**. It's not wrong, it's invisible.
- *Trend alternative:* push the logo flush-left, use word-link nav at large viewports (`Essays · Archives · About`) without the hamburger; reserve the drawer for ≤640px. Editorial publications wear their navigation; they don't hide it behind a burger on a 1440 desktop.
- *Direction:* "A burger on desktop tells the reader the menu is an inconvenience."

### 2. Typography & Sophistication

**2.1 Body type personality is flat**
- *Measured:* 16px / 26px lh / fw 400 / `oklch(0.48 0.02 260)`. Geometrically polite.
- *Critique:* Manrope at 16/400 is the "Vercel docs" default. Long-form deserves either (a) a real reading face (transitional/old-style serif) or (b) a humanist sans with more stroke variation (Söhne, GT America, Söhne Buch). Manrope's monoline feel is great for UI labels and bad for 1500-word essays.
- *Trend alternative (2026):* body in a serif (*Tiempos Text*, *Source Serif*, *Charter*, *EB Garamond* if free); set 18–19px / 1.6 / fw 400 in dark gray-ink not blue-gray. Alternative humanist-sans path: *Söhne Buch* 16/1.65.
- *Direction:* "If the homepage promises 'long-form,' the body face must reward sitting still."

**2.2 Heading-to-body ratio is static**
- *Measured:* hero h1 72px → body 16px (ratio 4.5×). Body h1 36px → body h2 30px → body h3 24px. Modular but predictable.
- *Critique:* the scale is gentle — every step is ~1.2×. Editorial hierarchy thrives on **abrupt jumps**: a 96–120px display title next to 16px body creates magazine drama. Right now it feels like a documentation site, not a publication.
- *Trend alternative:* go bolder at the top. Hero `clamp(56px, 8vw, 128px)` in the display serif, with negative tracking (-0.04em). Drop intermediate scale steps so there are only 4 sizes: display / section / body / micro.
- *Direction:* "Editorial type doesn't whisper at the top of the page; it announces. Then the body whispers."

**2.3 Italic and emphasis treatment is invisible**
- *Critique:* Italics on the about page (`content should be respected`, `personal essay`) are Manrope-italic (a slanted geometric sans) — they don't read as voice, they read as "text that's leaning slightly." The site begs for a serif italic for pull-emphasis.
- *Trend alternative:* if body stays Manrope, set `em, i { font-family: "GT Sectra Italic", "Reckless Italic"; font-style: italic; }` — magazine-grade. Even free *Fraunces Italic* will do.
- *Direction:* "Italic should feel like a different person speaking, not the same person tilting."

**2.4 No text-craft details**
- *Critique:* missing all the small-craft moves a typographically-positioned theme should ship: drop caps (the about page mentions "minimalism" but has no drop cap), small-caps inside body (no `font-feature-settings: "smcp"`), no real hanging punctuation, no `text-wrap: balance` on titles, no manual figure-space alignment in dates.
- *Trend alternative (2026):*
  - Drop cap on first paragraph of essays only. Use `::first-letter { float: left; font-family: var(--font-display); font-size: 5.5em; line-height: 0.85; padding: 0.05em 0.1em 0 0; }`.
  - `h1, h2 { text-wrap: balance; }`
  - Hanging quotes via `hanging-punctuation: first last;`
  - `font-feature-settings: "ss01", "smcp", "kern", "liga"` for variants where Manrope offers them.
- *Direction:* "Sophistication is in the four details no one consciously notices."

**2.5 Code at 12px in Courier-fallback**
- *Measured:* `pre code` still resolves to 12px / generic `monospace`, despite JetBrains Mono being loaded.
- *Critique:* the bug aside (CSS isn't pinning the family), 12px reads as "tooltip," not "code." A theme positioning around technical writing should set code at 14–15px in a real mono. Code is half the brand promise; it's currently the smallest type on the page.
- *Direction:* "If you ship code, code is editorial. Treat it like a pull quote."

### 3. Visual Interest & Depth

**3.1 The site is too flat**
- *Critique:* Two surface levels (page bg + white card) and one elevation (hover `box-shadow: inner`). No texture, no rule weights other than 1px hairlines, no full-bleed media. The promise is "calm," the delivery is "blank."
- *Trend alternative (2026):*
  - Introduce a third surface: a **paper texture** at 2% opacity behind the body in light mode, or a subtle vertical gradient (`linear-gradient(180deg, oklch(0.985) 0%, oklch(0.97) 100%)`).
  - One signature ornament. Magazines have **a** mark — a section sigil, a folio rule, a corner glyph. Pick one. (e.g., a thin vertical rail in the gutter that becomes a year-mark on archives.)
  - Hairline rules in **two weights**: 0.5px structural (cards) and 1.5–2px editorial (under hero, over footer). Right now everything is 1px and all rules read the same.
- *Direction:* "Calm isn't empty. It's controlled. Add one ornament so the absence of others becomes deliberate."

**3.2 Negative space is wasted, not composed**
- *Critique:* The home page's right of the featured carousel at 1024 leaves a half-column blank. The /tags/ index has 50% empty rail per row. The single-author page has a hero that's 60% empty. The 404 page hero is 75% empty. Whitespace currently means "we ran out of content," not "we placed this here."
- *Trend alternative:* asymmetric grid. Push titles into wide gutters. Use the empty space to **hold meta** (issue numbers, dates, footnote anchors) — the way *The New York Times Magazine* + *Are.na* + *Robb Report* online treat margins.
- *Direction:* "Empty space must be claimed by alignment with something. Otherwise it's just wallpaper."

**3.3 Cards-on-canvas feels SaaS, not editorial**
- *Critique:* the recurring "white card with rounded-ish corners floating on a pale page" pattern is a Stripe-dashboard idiom. Magazines don't put articles in cards — they put articles on pages.
- *Trend alternative:* drop the card containers. Articles list as rule-divided rows directly on the page bg. The white card concept can survive *only* on the actual post detail page (and even there I'd argue against it).
- *Direction:* "Cards are for inventory. Articles are for reading."

**3.4 No photography, no illustration, no ornament**
- *Critique:* The author page (Jane Doe portrait) is the **only** image on the entire demo. The result: a "writing-focused site" that visually has no visual authorship. Editorial is not "no images" — it's "considered images."
- *Trend alternative (2026):* one of three commitments —
  1. **All-typographic** (à la *The Browser*, *Read Max*): then go further, no images at all, but with serious display typography to compensate.
  2. **Single hero image per article** with full-bleed treatment, captioned in mono.
  3. **Generative/computational ornament** per category (a different procedural sigil per tag — increasingly common in 2025–26).
- *Direction:* "Pick a stance on image-making. 'No stance' is itself a stance — and it reads as 'unfinished.'"

**3.5 Dark mode is "light mode inverted," not designed**
- *Critique:* dark bg is `oklch(0.2)` with the same blue-gray text just lifted in lightness. There's no shift in mood — same surfaces, same tracks, same ornaments. Premium dark themes feel like a different room (*Linear*, *Tailwind UI v3*, *Vercel v0*).
- *Trend alternative:* shift the **chromacity**, not just the lightness. Dark-mode bg `oklch(0.18 0.02 270)` (cool ink) and accent `oklch(0.78 0.13 80)` (warm amber/cream) for a "reading lamp" feel. The light theme can stay neutral; dark commits to a temperature.
- *Direction:* "Dark mode is a different time of day. Design the lighting, not just the wallpaper."

### 4. Layout Rhythm (Editorial Feel)

**4.1 Homepage is a list of three identical cards under a carousel**
- *Critique:* the home below the featured rotator is `card · card · card` of the same archive-card component used everywhere else. There's no hierarchical treatment — a "featured" section, then a "recent" section, then "from the archives," then a tag-cloud or quote-of-the-issue. Right now home reads as paginated list. This is the **single biggest aesthetic gap.**
- *Trend alternative (2026):* an editorial home has at least 3 visual zones:
  - **The Lead** (one piece, editorial weight, oversized type, possibly with a pulled-quote teaser).
  - **The Stack** (3-up grid with **varied** card sizes — one tall, two short).
  - **The Index** (a typographic table of recent pieces, all-text, mono numerals, no thumbnails).
  - Optional fourth zone: **Editor's note** (a static block in the publisher's voice).
- *Direction:* "A homepage with one rhythm is a list. A homepage with three rhythms is an issue."

**4.2 The featured carousel hijacks the lead position with weak content**
- *Critique:* "FEATURED · 01/02 · Building Resilient Web Applications with Modern CSS" is set in the same h2 that the archive cards below use. It is no more dramatic than the row beneath it — yet it occupies the most premium real estate on the site, and it duplicates an article that also appears in the list directly below.
- *Trend alternative:* the lead piece must look unmistakably different — full-bleed background panel, editorial display type at 96–128px, kicker in a serif italic, and *no thumbnail of itself directly below*.
- *Direction:* "The lead must be impossible to mistake for any other story on the page."

**4.3 Sidebar is the same on every list page**
- *Critique:* Dispatch (newsletter) → Categories list → Tags list. Always. It works as a utility, but it never participates in the editorial moment of the page. On the about page, on the search page, on archive — same widgets, same order.
- *Trend alternative:* the sidebar should be **page-specific editorial content**: on a category page, an editor's note about the category; on a single post, a "previously / next in series"; on archives, a tiny stat block ("121 essays since 2023, ~8 min average read"); on author pages, a manifesto excerpt. Move newsletter to a dedicated end-of-content slot, not a permanent rail.
- *Direction:* "A rail of widgets is utility furniture. Make at least one slot editorial."

**4.4 Archives is the strongest page — and it's the model**
- *Critique:* The /archives/ page (left timeline rail with year/month → main column with gutter dates and section dividers per year) is by far the most editorially literate composition on the site. It commits to a grid, uses the gutter productively, and has rhythm.
- *Trend alternative:* port the archives' design language outward. The home, category, and tag pages should adopt the **gutter-date + section-rule + display-numeral** treatment. That single move would unify the visual identity around something with character, instead of the generic card-list.
- *Direction:* "When one page in your system has a voice, propagate that voice — don't let the rest of the system mute it."

**4.5 Author single page is hero-heavy, content-light**
- *Critique:* Jane Doe's page = portrait + 4-line bio + 2 social icons + **one** article card. The hero takes 50% of the viewport, then the page collapses. The page-shape is wrong: it should be either (a) a deep author page with multiple articles, pull-quotes from her work, and a "by-the-numbers" stat strip, or (b) compressed: bio inline above a tight list.
- *Trend alternative:* author page = **portrait + tagline + index of work as a typographic table** (year · title · category · read-time, all set in mono caps). No card per article — a *contents page*.
- *Direction:* "An author's page is a contents page for a person."

**4.6 404 and search heroes use display copy that's bigger than the actual page heroes**
- *Critique:* `Page Not Found` and `code` (search query echoed) are set comically large — much larger than `Markdown Test Page`, which is the actual primary content title on a post. The heaviest typographic moments on the site are reserved for **error states and search input echoes** instead of for content.
- *Trend alternative:* invert. The post title should be the biggest type the user ever sees on the site. 404 should be small and dry (`404. Page not found.`), search-echoed query should be inline with the input, not a 96px display.
- *Direction:* "The biggest type on the site should be the type that matters most. Currently it is reserved for failure and metadata."

### 5. Consistency (lower priority)

- **Sidebar label "TOPICS" vs "CATEGORIES"** — on the author page the sidebar reads `TOPICS`, on every other page it reads `CATEGORIES`. Same widget, different word.
- **Letter-rail (jump-list) appears on /archives/, /authors/, /tags/ but not on /categories/.** Two taxonomies, one with a rail, one without — breaks the brand of the navigation device.
- **Hero typography on /404/ and /search/ uses heavier weight + larger size** than every other hero. Already covered in 4.6 — listing here as the consistency touchpoint.
- **Inline link color = body color** (still). Underline now restored, but the link is the same hue as prose. Editorial sites either commit to a colored link (oxidised red, ink blue) or a typographically-loud underline (custom thickness + offset). The mid-state — same color, hairline underline — reads as "I forgot to style this."

---

## Step 3 — Minor Technical / Accessibility (kept short per brief)

- **Code blocks render in browser-default `monospace`** — JetBrains Mono is loaded by `@font-face` but `pre code` is not declaring the family in CSS. Bug.
- **Featured card title clips at 768/375** — fixed-width inner card overflows; "Modern CS" gets cut.
- **Homepage featured carousel is half-width inside `main` on 1024**, leaving an empty column to its right.
- **Search results don't highlight the query term** (`?q=code` returns articles, none of the matched substrings are marked).
- **"Post 1 / Post 2 / Post 3" placeholder titles still in production demo content** on /archives/.
- **Inline body links remain same color as body text** (now underlined — better than before, but still color-only differentiation if underline is removed by the browser/print).

---

## Verdict

ProseBlock is a **competent template**, not yet a **product with a point of view**. It avoids the worst free-template mistakes (overdone gradients, garish accents, illegible scales) but it also avoids any of the moves that would let it ship as a paid theme on a marketplace tier above $19.

**The single biggest art-direction lever** is the typeface pairing decision. Add one display serif and re-rank the hierarchy around it, and 60% of the "feels generic" critique resolves overnight.

**The second biggest lever** is committing to one of the three image stances (§3.4) and threading it through. A site that promises "long-form reading" but visually has no images, no ornament, and no display typography reads as a draft.

**The third biggest lever** is letting the **archives page's voice** colonize the rest of the system — replace card-grids with rule-divided typographic indexes everywhere. That alone moves you from "Hugo blog" to "publication."

---

## Unresolved Questions

1. Display-serif pairing — license budget? (free: Fraunces / EB Garamond; paid: Reckless / Söhne / GT Sectra).
2. Image stance — all-typographic, single-hero-per-post, or generative ornament per taxonomy?
3. Archives page model — port to home + categories?
4. Drop cards entirely on list pages — yes/no?
5. Logo upgrade — wordmark commission or type-only solution?
6. Newsletter — keep in sidebar or move to end-of-content slot?
7. Dark mode — neutral inverse or shifted chromacity (warm reading lamp)?
8. Featured carousel — kill it or re-art-direct as full-bleed lead?
9. Author page model — contents page or current bio+card?
10. Drop cap + small caps — opt-in per article or default for "essays"?
