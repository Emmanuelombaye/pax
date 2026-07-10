# Pax Longevity — portable frontend

Independent marketing + Patient Center SPA. Local mock data. No Peak Health runtime required.

## Quick start

```bash
npm install
npm run dev
```

- Marketing: `/`
- Start funnel (buy first): `/#/start`
- Patient Center: `/#/portal`

## Product passport (CV)

See **[PAX_PASSPORT.md](./PAX_PASSPORT.md)** and `src/brand/passport.js`.

## Data

Local IndexedDB via `src/brand/connect.js` → `src/portal/storage.js`.

Connect a real API later:

```bash
VITE_PAX_CONNECT_MODE=remote
VITE_PAX_API_URL=https://your-api.example.com
```
