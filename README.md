# Pax Longevity

Branded mock product — marketing site, TryYucca-style buy-first funnel, and Patient Center.

**Independent frontend.** Local IndexedDB today. Connect a real API later without rewriting the UI.

## Docs

- **[PAX_PASSPORT.md](./PAX_PASSPORT.md)** — product CV / brand kit / connect contract  
- **[PORTABLE.md](./PORTABLE.md)** — layout, how to run & connect later  

## Develop

```bash
npm install
npm run dev
```

| Surface | Path |
|---------|------|
| Marketing | `/` |
| Start treatment | `/#/start` |
| Patient Center | `/#/portal` |

## Stack

React 19 · Vite · brand passport · IndexedDB (local) · connect adapter for future remote API
