# White Athens CRM — Contact Management (Pure HTML/CSS/JS)

Premium SaaS-style Contact Management UI built with **pure HTML, CSS, and JavaScript** — no React, Vue, or other frameworks.

## Pages

| File | Description |
|------|-------------|
| `web/index.html` | **Dashboard** — search, filters, sortable table, pagination |
| `web/contact.html` | **Contact Profile** — full profile with all sections A–J |

## Features

- Light / Dark mode (CSS variables + toggle)
- Sticky action bar (Save, Edit, Delete, Email, Call, WhatsApp)
- Collapsible card sections
- Engagement dashboard with green/red Yes/No indicators
- Marketing preference toggle switches
- Masked ID fields (PAN, Aadhaar, National ID) — click to reveal
- Expandable notes (click to expand when viewing)
- Profile picture upload
- Form validation on all fields
- Responsive (desktop + tablet + mobile breakpoints)
- 12 sample contacts stored in `localStorage`

## Quick Start

Open `web/index.html` in a browser, or run a local server:

```bash
cd web
npx serve .
```

Then visit **http://localhost:3000**

## Tech

- HTML5 + CSS3 (custom design system with CSS variables)
- Vanilla JavaScript (ES6+)
- [Lucide Icons](https://lucide.dev/) via CDN (icons only, not a framework)
- [Inter](https://fonts.google.com/specimen/Inter) typography

## Also in this repo

`frontend/` contains an earlier React prototype (Part 1 UI). The **`web/`** folder is the version that matches the pure HTML/CSS/JS assignment requirements.
