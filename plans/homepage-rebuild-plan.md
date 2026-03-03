# Homepage Rebuild Plan (Astro Best Practices, Tokenized Light/Dark, Responsive)

## Summary
This plan rebuilds your homepage from the selected Pencil frames (`Portfolio Home Light v2`, `Portfolio Home Dark v2`, and `Portfolio Home Dark v2 Mobile` + `Menu Open`) using Astro + Tailwind v4 best practices, with all design tokens centralized in CSS, no typed content data objects, shared header/footer/tickertape in layout, Fontsource font setup, and dark mode via `dark:` utilities with persistent toggle behavior.

## Reference TODO
- [x] Remove scaffolded homepage component usage and switch to production page structure.
- [x] Define all theme/design tokens in global CSS (`:root` + `.dark`) from Pencil values.
- [x] Configure Tailwind v4 class-based dark variant for `dark:` utilities.
- [x] Install and wire Fontsource Geist + Geist Mono into Tailwind theme tokens.
- [x] Build shared layout shell with header, ticker tape, footer, and theme script.
- [x] Implement mobile hamburger panel behavior matching `Portfolio Home Dark v2 Mobile - Menu Open`.
- [x] Build homepage sections with hardcoded HTML content (no typed data layer).
- [x] Import image assets from `src/assets` and replace all placeholder/scaffold content.
- [x] Prepare MDX prose styling using Bearnie’s typography/prose approach.
- [x] Validate build, accessibility basics, responsive behavior, and theme persistence.

## Implementation Spec

### 1) Restructure page/layout for Astro best practices
1. Update `src/pages/index.astro` to contain homepage main content sections only.
2. Keep global shell responsibility in `src/layouts/Layout.astro`: `<html>`, `<head>`, `<body>`, shared header, shared ticker, shared footer, and `<slot />`.
3. Remove scaffold usage from `src/components/Welcome.astro` and either delete it or stop importing it.
4. Create site-level shared components:
   `SiteHeader.astro`,
   `TickerTape.astro`,
   `SiteFooter.astro`.

### 2) Token system in CSS (no hardcoded design values in Astro markup)
1. Expand `src/styles/global.css` with:
   `@import "tailwindcss";`
   `@custom-variant dark (&:where(.dark, .dark *));`
   `@theme` for font families and reusable scale tokens.
   `@theme inline` for semantic color mapping (`--color-background`, `--color-foreground`, `--color-border`, etc.).
   `:root` and `.dark` semantic tokens.
2. Put the Pencil-derived semantic values in CSS tokens only.

| Semantic Token | Light | Dark | Purpose |
|---|---|---|---|
| `--background` | `#FFFFFF` | `#090B10` | Page surface |
| `--foreground` | `#0F172A` | `#F9FAFB` | Main text |
| `--muted-foreground` | `#64748B` | `#94A3B8` | Secondary/meta text |
| `--body-copy` | `#334155` | `#D1D5DB` | Paragraph/list copy |
| `--accent` | `#2563EB` | `#A5B4FC` | Accent link/CTA |
| `--border` | `#CBD5E1` | `#1F2430` | Section dividers |
| `--ticker-text` | `#64748B` | `#E2E8F0` | Tickertape + logo/navigation text |
| `--location-text` | `#8295AD` | `#A5B4FC` | Location line |

3. Add CSS utilities/classes for repeated design patterns (radial page glow, divider sections, ticker animation, gallery strip motion) so Astro files only use semantic classes/utilities.

### 3) Fontsource + Tailwind integration
1. Add font dependencies with `pnpm`: `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`.
2. Import font packages once in `src/layouts/Layout.astro` (or global CSS if preferred).
3. Register in `@theme` as `--font-sans` and `--font-mono`; use `font-sans`/`font-mono` utilities across layout/page.
4. Use weights needed by the design (400, 500, 600, 700, 900) without introducing inline `style` font settings.

### 4) Shared layout implementation details
1. `src/layouts/Layout.astro` will include:
   document metadata props (`title`, `description`) and sensible defaults,
   header at top,
   `<main><slot /></main>` for page content,
   ticker tape and footer shared below content.
2. Theme behavior:
   inline anti-FOUC script in `<head>` to set `html.dark` from `localStorage` or system preference,
   client script to sync any `[data-theme-toggle]` triggers (desktop + mobile panel),
   persist value in `localStorage`.
3. Mobile nav:
   hamburger toggle opens/collapses an in-page panel matching `Portfolio Home Dark v2 Mobile - Menu Open`.

### 5) Homepage content implementation (hardcoded HTML, no typed data)
1. In `src/pages/index.astro`, render:
   hero section,
   projects list (hardcoded items),
   latest writing list (hardcoded items),
   recent moments horizontal media strip.
2. Do not create TS content models/interfaces for these lists.
3. Keep text directly editable in Astro markup as requested.

### 6) Asset handling (`src/assets` strategy)
1. Copy Pencil-referenced assets into `src/assets/home/` with normalized filenames.
2. Import assets in Astro components/pages and use Astro image handling patterns.
3. Replace all current missing/public placeholder assumptions; avoid linking directly to `/design/*`.

### 7) Bearnie usage boundary + MDX prose readiness
1. Do not add Bearnie UI primitives unless a headless interactive component is actually needed.
2. Add prose styling groundwork based on Bearnie typography/prose guidance so future MDX content collections can drop into a `prose` wrapper without redesign.
3. Prepare a lightweight `Prose.astro` wrapper for future MDX rendering flow.

## Important Changes to Public APIs / Interfaces / Types
1. `Layout.astro` props contract:
   `title?: string`
   `description?: string`
   This is the only public layout interface change.
2. No new typed homepage data schemas are introduced.
3. Navigation links default to in-page anchors (`#about`, `#projects`, `#writing`) until dedicated pages exist.

## Test Cases and Scenarios
1. Build verification: `pnpm run build` passes after refactor.
2. Theme toggle persistence:
   toggle to dark, reload, confirm dark remains;
   toggle to light, reload, confirm light remains.
3. First visit behavior:
   with no saved preference, confirm system preference is applied.
4. Responsive fidelity:
   desktop aligns to selected desktop frames;
   mobile at ~430px aligns to `Portfolio Home Dark v2 Mobile` spacing/type scale;
   mobile menu open state matches the `Menu Open` frame structure.
5. Token discipline:
   run search to confirm no hex design colors in `.astro` markup files.
6. Shared layout reuse:
   header, ticker, and footer render from layout only (no duplication in page files).
7. Basic accessibility:
   keyboard reachable nav and theme toggle;
   menu toggle announces expanded/collapsed state;
   sufficient text contrast in both themes.

## Assumptions and Defaults Chosen
1. Theme behavior is class-based dark mode using `dark:` utilities, with persistent toggle plus system fallback.
2. Image strategy is `src/assets` imports, not `public/` URLs.
3. Implementation target is pixel-close desktop with responsive behavior derived from your dark mobile frames.
4. Hamburger menu is interactive and must support the “menu open” state from design.
5. Bearnie is reserved for common headless UI only; no unnecessary Bearnie components will be added.
6. Latest writing/projects remain hardcoded in page markup for now and will later migrate to content collections + MDX.

## Sources
- [Astro Tailwind guide](https://docs.astro.build/en/guides/styling/#tailwind)
- [Astro custom fonts + Fontsource](https://docs.astro.build/en/guides/fonts/#using-fontsource)
- [Astro layouts](https://docs.astro.build/en/basics/layouts/)
- [Tailwind dark mode (class selector via custom variant)](https://tailwindcss.com/docs/dark-mode)
- [Bearnie typography/prose docs](https://bearnie.dev/docs/components/typography/)
