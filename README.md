# Green Park Hotel — Njoro

A photography-led hospitality website and hotel operations foundation for Green Park Hotel in Njoro, Kenya.

The current build is designed around a simple guest journey — **stay, dine, gather, enquire** — plus a dedicated staff control room for managing the content and guest-request workflow.

## Current build

- React + TypeScript + Vite
- Instrument Sans for interface text + Newsreader for editorial headings
- Green Park forest-green / warm-ivory / charcoal design system
- Responsive public website with mobile navigation
- Short welcome experience using the hotel's own supplied property photography
- Public pages: Home, Stay, Dining, Events, Gallery, About, Location, Contact and Book/Enquire
- Guest booking-request flow with generated references
- No forced permanent guest account
- Booking requests visible in the admin workspace
- Admin sections for Rooms, Menu, Events, Gallery, Bookings, Enquiries and Content
- Draft/published states and empty states instead of fabricated hotel data
- Google Maps and WhatsApp actions using the supplied hotel contact path
- Local browser storage for the presentation build so the end-to-end workflow can be demonstrated without inventing backend records
- Responsive image loading and lightweight CSS motion
- Reduced-motion support

## Important production boundary

The UI is structured as a production-ready foundation, but the presentation build is not being represented as a deployed hotel backend. Before the site is handed over for live operations, connect:

1. secure staff authentication and authorization
2. PostgreSQL persistence for rooms, menu, events, gallery, bookings and enquiries
3. secure media storage and an image optimization pipeline
4. server-side validation, rate limiting and audit logging
5. booking/availability confirmation logic and notification delivery
6. deployment, monitoring, backups and domain configuration

## Real property assets

Approved development photography is stored under `public/images/green-park/`. Higher-resolution originals from the hotel should replace the supplied compressed development files before final production deployment.

## Run locally

```bash
npm install
npm run dev
```

Open `/admin` to review the staff control-room flow.

## Verification

GitHub Actions runs `npm install` and `npm run build` for pushes and pull requests targeting `main`.
