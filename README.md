# Pax Longevity

Branded mock product — marketing site, TryYucca-style buy-first funnel, and Patient Center.

**Independent frontend.** Local IndexedDB today. Connect a real API later without rewriting the UI.

## Docs

- **[docs/client-brand-kit.md](./docs/client-brand-kit.md)** — client brand handoff ([live](https://pax-longevity-flow.lovable.app/))
- **[docs/brand-kit.md](./docs/brand-kit.md)** — colors / type / usage summary
- **[PAX_PASSPORT.md](./PAX_PASSPORT.md)** — product CV / connect contract
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
