# Pax Health / Pax Longevity

Next.js (App Router) + TypeScript port of the client `getpaxfrontend` site.

## Stack

- Next.js 15 / React 19 / TypeScript (`allowJs` for exact UI port)
- Exact get-pax.health / getpaxfrontend pages, styles, and assets
- VirtualClinicOS Brand Storefront helper in `src/lib/vco-storefront.ts`

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
| `/intake` | Intake assessment |
| `/admin` | Admin |
| `/booking/[token]` | Booking |

## VCO

Public brand ID defaults are set for Pax. Optional env: see `.env.example`.  
Hosted intake still requires DNS for `intake.paxlongevity.com`.

## Source

UI copied from `C:\ceo\getpaxfrontend` (client deliverable), swapped into Next.js TypeScript for Rangel-holdings `pax` (`legitscript`).
