# Green Park Hotel — Njoro

A new Green Park Hotel flagship experience for Njoro, Kenya: a photography-led hospitality website with a signature welcome reveal, clean typography, controlled glass surfaces, motion choreography, direct Google Maps / WhatsApp actions and a dedicated admin control-room route.

## Experience layer

- React + TypeScript + Vite
- GSAP motion timelines for the welcome sequence and interaction choreography
- Instrument Sans for the interface + Newsreader for display typography
- Clean Green Park green / warm ivory / charcoal visual language
- Responsive editorial layout with mobile-first behavior
- Real Green Park property photography from `public/images/green-park/`
- Guest flow without forced permanent accounts
- `/admin` control-room presentation for future hotel operations

## Signature welcome

The opening sequence uses a natural barbecue reference image as the visual hook, then animates the food toward the camera and expands a Green Park portal from the food area before revealing the main site. The intent is to make the welcome feel like entering the Grill & Lounge rather than loading a generic template.

The barbecue reference currently comes from a Pexels photo page selected for the project; the final production version can replace it with approved Green Park photography or video without changing the motion architecture.

## Business connections

The site includes the hotel's supplied Google Maps link and WhatsApp contact path using **+254 794 047344**.

## Run locally

```bash
npm install
npm run dev
```

The current repository is a front-end flagship build. The next production layer remains PostgreSQL-backed persistence, secure admin authentication, real booking workflows, optimized media storage, notifications and deployment hardening.
