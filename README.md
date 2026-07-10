# Wyze Security Bundle Builder

A React prototype of a multi-step bundle builder with a live review panel. Built as a frontend take-home — desktop fidelity matches the Figma design, with responsive layouts for tablet and mobile.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

## What it does

- **4-step accordion builder** (cameras → plan → sensors → extra protection)
- **Product cards** with badges, variant chips, quantity steppers, and pricing
- **Live review panel** that updates totals as you configure
- **Variant-aware quantities** — each color tracks its own count; the card stepper edits the active variant
- **Synced steppers** between builder cards and review lines
- **localStorage persistence** — configuration auto-saves; "Save my system for later" confirms the save

## Project structure

```
src/
  data/catalog.json       # All products, steps, pricing, seed quantities
  types/catalog.ts        # TypeScript types
  context/BundleContext.tsx
  lib/
    bundleState.ts        # State helpers, review line builder, totals
    pricing.ts            # Line-price calculation (unit + tier rules)
    storage.ts            # localStorage read/write
  components/security-system/
    BuilderPanel.tsx      # Accordion (desktop/tablet + mobile)
    StepAccordionItem.tsx
    ProductCard.tsx
    ReviewPanel.tsx
    ReviewSection.tsx
    ...
```

## Data model

All UI is driven from `src/data/catalog.json`. Products define:

- Unit and tiered line pricing (`linePricing` for bundle quantities like 2× Pan v3)
- Variants with per-variant `initialQuantities`
- Flags: `required`, `stepperDisabled`, `isFree`, `isMonthly`, `selectionMode: "single"` (plans)

Initial state matches the Figma design: 2 cameras selected, Cam Unlimited plan, 2 motion sensors + required hub, 2 microSD cards.

## Key decisions & tradeoffs

| Area | Decision |
|------|----------|
| **State** | React context + derived review/totals (no external state library) |
| **Persistence** | `localStorage` key `wyze-bundle-config`; auto-saves on every change |
| **Variants** | Quantities keyed as `stepId:productId:variantId` |
| **Plan step** | Single-select via `selectionMode: "single"` — only one plan at a time |
| **Checkout** | Placeholder `alert()` — out of scope for this prototype |
| **Fonts** | Gilroy via CDN with Inter fallback |
| **Responsive** | Three layouts: mobile stack, tablet stack + 2-col review, desktop side-by-side |

## Interactions implemented

- [x] Accordion expand/collapse (Step 1 open on load)
- [x] "N selected" counter per step
- [x] Variant selection with per-variant quantities
- [x] Card ↔ review quantity sync
- [x] Live total recalculation
- [x] Selected card border when qty > 0
- [x] Disabled stepper for required hub
- [x] Save / restore via localStorage
- [x] Responsive mobile + tablet layouts

## Not finished / out of scope

- Full product UI for every step in mobile collapsed state (steps expand to show products)
- Selected-chip styling polish (per brief: behavior over chip highlight)
- Backend API for catalog (local JSON only)
- Checkout flow

## Assets

Product images and icons live in `public/images/` (exported from Figma).
