# Pax Health / Pax Longevity

Next.js (App Router) + TypeScript port of the client `getpaxfrontend` site, wired to VirtualClinicOS the same way as the prior Pax StartFlow.

## Stack

- Next.js 15 / React 19 / TypeScript (`allowJs` for exact UI port)
- Exact get-pax.health / getpaxfrontend pages, styles, and assets
- VirtualClinicOS Brand Storefront (`src/brand/*`) → hosted `intake_url`
- Optional server helpers (`src/server/vcoCheckout.js`) for `/api/checkout/*` and `/api/orders` with `VCO_API_KEY`

## Develop

```bash
npm install
npm run dev
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/network` | Partners network |
| `/how-pax-works` | How it works |
| `/programs/[slug]` | Program vials |
| `/treatments/[slug]` | Vial detail |
| `/intake` | Redirects to VCO hosted intake (`?treatment=` optional) |
| `/admin` | Admin |
| `/booking/[token]` | Booking |

## VCO wiring (marketing site)

1. Browser fetches `GET /api/commerce/v1/products?brandId=…` with `X-Brand-Id` (no API key).
2. Patient CTAs go to `/intake` or `/intake?treatment=tirzepatide` (etc.).
3. `/intake` resolves SKU (`STORE-SEMA` / `STORE-TIRZ` / `STORE-NAD`) and `window.location.assign(product.intake_url)`.
4. Hosted intake handles payment + clinical questions. This site does not invent intake URLs or create orders in the browser.

Public env: see `.env.example`.  
Hosted intake still requires DNS for `intake.paxlongevity.com`.

## Source

UI from `C:\ceo\getpaxfrontend`, storefront pattern from prior `legitscript` StartFlow + `C:\ceo\APIs\VCO-BRAND-STOREFRONT-PLAYBOOK.md`.
