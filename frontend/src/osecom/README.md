# osecom/

UI module for the OseCom site. Everything React lives under here.

## Folder layout

```
osecom/
├── Layout.jsx              ← root layout (loader, nav, footer, transitions)
├── components/             ← reusable UI atoms
│   ├── Nav.jsx
│   ├── Footer.jsx
│   ├── CookieBanner.jsx
│   ├── Curtain.jsx
│   ├── IconArrow.jsx
│   ├── Loader.jsx
│   ├── Marquee.jsx
│   ├── MeshBg.jsx
│   ├── MorphHeadline.jsx
│   ├── Placeholder.jsx
│   └── TopBanner.jsx
├── pages/                  ← one file per route
│   ├── HomePage.jsx
│   ├── ServicesPage.jsx
│   ├── ServiceDetailPage.jsx
│   ├── UGCPage.jsx
│   ├── PortfolioPage.jsx
│   ├── AboutPage.jsx
│   ├── BlogPage.jsx
│   ├── ContactPage.jsx
│   ├── LegalPage.jsx
│   └── NotFoundPage.jsx
├── data/                   ← editorial content (no UI)
│   ├── services.js         ← 5 offers + hero / problem / offer / results / CTA
│   ├── portfolio.js        ← 3 case studies
│   └── legal.js            ← 4 legal pages (FR)
├── config/
│   ├── routes.js           ← single source of truth for URLs
│   ├── site.js             ← brand info, socials, brands, nav items
│   └── timing.js           ← animation durations & localStorage keys
└── lib/
    ├── hooks.js            ← useReveal, useParallax
    └── theme.js            ← JS-side color constants (mirrors CSS vars)
```

Styles live in `../styles/` and are split into `base.css`, `layout.css`,
`components.css`, `pages.css`, all aggregated by `osecom.css`.

## Where to edit common things

| You want to… | Edit |
| --- | --- |
| Change the contact email | `config/site.js → SITE.email` |
| Add/remove a route | `config/routes.js` then `App.jsx` |
| Reorder or rename nav links | `config/site.js → NAV_ITEMS` |
| Change footer links | `config/site.js → FOOTER_NAV` |
| Edit a service offer (copy/process) | `data/services.js` |
| Edit a legal page | `data/legal.js` |
| Add a case study | `data/portfolio.js` |
| Tweak intro animation timing | `config/timing.js → TIMING.LOADER_MS` |
| Add a CSS rule for a button variant | `styles/components.css` |
| Add a page-specific style | `styles/pages.css` |

## Contact form

`pages/ContactPage.jsx` POSTs to `${VITE_API_URL}/api/contact` with:
`{ name, email, businessName, website, budget, service, date, project }`.

Backend endpoint expectations are documented in `backend/src/controllers/contact.controller.js`.

## Adding a new service

1. Append an entry to `data/services.js` with the same shape as the others.
2. Done — it appears automatically on `/services` and gets its own
   `/services/:slug` page.

## Adding a new legal page

1. Add a key to `LEGAL` in `data/legal.js`.
2. Add a link to it in `config/site.js → FOOTER_NAV.legal`.
3. Done — the route `/legal/:slug` picks it up automatically.

## Commands

From `frontend/`:

```bash
npm run dev      # vite dev server
npm run build    # production build
npm run lint     # ESLint
npm run preview  # preview the prod build
```

From `backend/` (separate terminal):

```bash
npm run dev      # express server on :3001
```
