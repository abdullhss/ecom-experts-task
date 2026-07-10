# Excom Exprts Tasj

A React prototype of a multi-step bundle builder with a live review panel.

## Live Link
Open [https://ecom-experts-task-ten.vercel.app/](https://ecom-experts-task-ten.vercel.app/)

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

## Assets

Product images and icons live in `public/images/` (exported from Figma).
