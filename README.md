# OseCom

Site freelance d'Essia Ben Kheder · Stratégie social media, community management, UGC, acquisition & growth · Paris.

Monorepo simple : `frontend/` (React + Vite) + `backend/` (Express + Prisma).

## Stack

**Frontend**
- React 19 · Vite 8 · react-router-dom 7
- Axios pour le form contact
- CSS pur en 4 fichiers (mobile-first)
- ESLint 9

**Backend**
- Express 5 · Prisma 6 · PostgreSQL (Neon)
- Brevo (REST) pour les emails
- HubSpot (REST) pour la sync CRM

## Lancer en local

```bash
# Terminal 1 — backend
cd backend
npm install
cp .env.example .env   # à créer + remplir
npm run dev            # → :3001

# Terminal 2 — frontend
cd frontend
npm install
npm run dev            # → :5173
```

## Commandes

```bash
# Frontend
npm run dev        # vite dev
npm run build      # bundle prod
npm run lint       # eslint
npm run preview    # preview build

# Backend
npm run dev        # nodemon
npm run start      # node prod
npx prisma studio  # GUI DB
```

## Variables d'environnement

**`backend/.env`** (non commité)
```
DATABASE_URL=postgresql://...
BREVO_API_KEY=xkeysib-...
BREVO_SENDER_EMAIL=contact@osecom.fr
CONTACT_TO_EMAIL=contact@osecom.fr
HUBSPOT_ACCESS_TOKEN=pat-eu1-...
```

**`frontend/.env`** (non commité)
```
VITE_API_URL=http://localhost:3001
```

## Structure

```
.
├── frontend/                ← React app
│   ├── index.html
│   ├── public/              ← favicon, robots.txt, sitemap.xml
│   └── src/
│       ├── App.jsx          ← router (routes + redirections legacy)
│       ├── main.jsx
│       ├── osecom/          ← module UI (voir frontend/src/osecom/README.md)
│       └── styles/          ← base.css, layout.css, components.css, pages.css
│
└── backend/                 ← Express API
    ├── prisma/schema.prisma
    └── src/
        ├── server.js
        ├── routes/
        ├── controllers/
        └── services/
```

Détails frontend dans `frontend/src/osecom/README.md` (où éditer le contenu, ajouter un service, etc.).

## Pages & routes

- `/` Home · `/services` (+ `/services/:slug` × 5) · `/ugc` · `/portfolio` · `/blog` · `/about` · `/contact`
- `/legal/:slug` → mentions · privacy · terms · cookies
- Redirections legacy (`/strategy`, `/community-management`, `/privacy-policy`, etc.) → routes canoniques

## API

`POST /api/contact` — voir `backend/src/controllers/contact.controller.js`
Payload : `{ name, email, businessName, website, budget, service, date, project }` (4 premiers requis).

## License

Tous droits réservés · OseCom · 2026
