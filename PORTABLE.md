# Pax Longevity — portable frontend

Independent marketing + start funnel + Patient Center SPA. Local mock data.

## Quick start

```bash
npm install
npm run dev
```

| Surface | Path | Code |
|---------|------|------|
| Marketing | `/` | `src/marketing/` |
| Start funnel (buy first) | `/#/start` | `src/start/` |
| Patient Center | `/#/portal` | `src/portal/` |

## Layout

```
src/
  App.jsx              ← thin hash router (lazy portal + start)
  brand/               ← passport, connect, BrandLogo, BrandMark
  marketing/           ← MarketingApp + content data
  start/               ← TryYucca-style buy-first funnel
  portal/              ← Patient Center + IndexedDB storage
  styles/              ← marketing.css · portal.css · start.css
```

## Data

Local IndexedDB via `src/brand/connect.js` → `src/portal/storage.js`.

```bash
VITE_PAX_CONNECT_MODE=remote
VITE_PAX_API_URL=https://your-api.example.com
```
