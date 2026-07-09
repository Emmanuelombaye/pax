# Pax Longevity — Product Passport (CV)

> Portable telehealth brand product. Frontend-complete today. Backend-connectable later.

---

## Identity

| Field | Value |
|-------|--------|
| **Product** | Pax Longevity |
| **Slug** | `pax` |
| **Tagline** | Prevent decline years before symptoms. |
| **Category** | Telehealth · Longevity · Peptide Care |
| **Tone** | Calm, clinical-confident, coastal, premium |

---

## Brand system

| Token | Value |
|-------|--------|
| Sand (canvas) | `#FAF6F0` |
| Beige | `#F4EAE0` |
| Card / terracotta pastel | `#EDD5CC` |
| Terracotta | `#C17D74` |
| Deep terracotta (CTA) | `#A0594E` |
| Ink | `#1F1A16` |
| Coastal teal | `#4A8A96` |
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
  brand/
    passport.js      ← product CV / brand kit
    connect.js       ← local | remote adapter
  portal/
    StartFlow.jsx    ← buy-first funnel
    PortalApp.jsx    ← Patient Center
    storage.js       ← IndexedDB database
    BrandMark.jsx
    startFlowData.js
  App.jsx            ← marketing + hash routes
```

---

## Compliance note

Pax is framed as a telehealth technology platform. Compounded medications follow 503A pharmacy standards and are not individually FDA-approved. Demo Patient Center data lives on-device until a production backend is connected.

---

*Passport version 1.0.0 — keep in sync with `src/brand/passport.js`*
