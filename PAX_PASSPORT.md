# Pax Longevity — Product Passport (CV)

> Portable Pax brand product. Frontend mock complete today. Backend-connectable later.

---

## Identity

| Field | Value |
|-------|--------|
| **Product** | Pax Longevity |
| **Slug** | `pax` |
| **Tagline** | Prevent decline years before symptoms. |
| **Category** | Longevity · Peptide Care · Patient Center |
| **Tone** | Calm, clinical-confident, coastal, premium |

---

## Brand system

| Token | Value |
|-------|--------|
| Sand (canvas) | `#FAF6F0` |
| Dune (cards / warm neutral) | `#EBC5A0` |
| Terracotta (accent) | `#C17C74` |
| Forest (primary / CTAs) | `#2D5A3D` |
| Ink (text) | `#1F1A16` |
| Display font | Instrument Serif |
| Body font | Work Sans |
| Logo | `/images/pax-logo.webp` (+ PNG fallback) |

Source of truth in code: `src/brand/passport.js`

---

## Product surfaces (shipped)

| Surface | Route | Status |
|---------|-------|--------|
| Marketing site | `#/` | Live |
| Start funnel (buy-first) | `#/start` | Live — TryYucca-style |
| Patient Center | `#/portal` | Live — login after purchase |
| Admin / Affiliate | — | Deferred (connect later) |

### Start funnel (no account before buy)

1. Choose treatment  
2. Clinical intake  
3. Choose plan  
4. Checkout (simulated auth hold)  
5. Identity verify  
6. Create Patient Center password → portal  

### Patient Center tabs

Home · Treatment · Messages · Progress · Profile  

---

## Data architecture (portable)

**Mode today:** `local` (IndexedDB)

| Store | Purpose |
|-------|---------|
| `users` | Member credentials |
| `profiles` | Checklist, treatment summary |
| `orders` | Purchase / plan records |
| `messages` | Care-team thread |
| `weight_logs` | Progress entries |
| `meta` | Migration flags |

Session + in-progress checkout draft: `localStorage`  
Adapter: `src/brand/connect.js` → `src/portal/storage.js`

**Mode later:** `remote`

```bash
VITE_PAX_CONNECT_MODE=remote
VITE_PAX_API_URL=https://your-api.example.com
VITE_PAX_BRAND_ID=<uuid>
```

Implement remote handlers in `connect.js` without rewriting UI.

---

## Independence principles

1. **No Peak Health runtime dependency** for the demo portal.  
2. **Brand passport** owns colors, logo, copy, and connect contract.  
3. **UI talks only to `connect.js`** — never to a vendor SDK directly.  
4. **Connect later** = flip env + fill remote client; keep funnel + Patient Center.

---

## Repo map

```
src/
  App.jsx            ← thin hash router (marketing | start | portal)
  brand/
    passport.js      ← product CV / brand kit
    connect.js       ← local | remote adapter
    BrandLogo.jsx    ← marketing logo
    BrandMark.jsx    ← portal / start logo
  marketing/
    MarketingApp.jsx ← site pages
    data.js          ← FAQs, lifestyle, hero slides, routes
  start/
    StartFlow.jsx    ← buy-first funnel
    startFlowData.js
  portal/
    PortalApp.jsx    ← Patient Center
    storage.js       ← IndexedDB database
  styles/            ← marketing · portal · start CSS
```

---

## Compliance note

Pax is framed as a branded longevity patient platform. Compounded medications follow 503A pharmacy standards and are not individually FDA-approved. Demo Patient Center data lives on-device until a production backend is connected.

---

*Passport version 1.0.0 — keep in sync with `src/brand/passport.js`*
