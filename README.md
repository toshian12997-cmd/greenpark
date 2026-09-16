# Green Park Hotel — Njoro

A presentation-ready **review prototype** for Green Park Hotel in Njoro, Kenya. The repository keeps the production architecture and security plan documented while the current build focuses on a polished, demonstrable guest experience and admin information architecture.

## Run locally

```bash
npm install
npm run dev
```

## Review scope

Implemented for review:
- Editorial hospitality homepage and navigation
- Stay, Menu, Events, Gallery, About, Location and Contact surfaces
- Guest booking/enquiry flow with prototype confirmation
- Admin preview with dashboard and content-management areas
- Responsive layout for desktop and mobile
- Natural green / cream / charcoal visual system
- Empty states instead of invented hotel data

The visual code intentionally uses **photo slots** for approved Green Park imagery. Add the final hotel photographs under `public/images/` when the approved asset set is available; the presentation styling is already prepared for them.

## Next phase

The documented production architecture remains in `docs/ARCHITECTURE.md` and `docs/ROADMAP.md`. Database persistence, secure admin authentication, API services, image processing, security hardening, SEO/performance testing and deployment are deliberately not presented as complete in this review build.

## Engineering direction

React + TypeScript + Vite for the current review frontend. The planned production system keeps PostgreSQL, a TypeScript service/API layer, secure admin authentication and responsive image delivery as documented architectural targets.
