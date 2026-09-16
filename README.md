# Green Park Hotel — Njoro

A polished React + TypeScript website and interactive admin control-room frontend for Green Park Hotel in Njoro, Kenya.

## Run locally

```bash
npm install
npm run dev
```

## Current build

- Editorial hospitality homepage with real Green Park project photography
- Stay, Dining, Events, Gallery, About, Location and Contact surfaces
- Guest booking/enquiry flow without a permanent guest account
- Booking requests appear in the local admin workflow during the demo session
- Dedicated `/admin` control room with staff login screen
- Admin areas for Overview, Rooms, Menu, Events, Gallery, Bookings, Enquiries, Content and Settings
- Working demo CRUD for rooms, menu items and events using in-memory state
- Empty states instead of invented rooms, dishes, events, prices, reviews or customers
- Welcome animation, reveal motion, responsive layouts and mobile admin navigation
- Green / cream / charcoal hospitality visual system
- Photo asset management guidance for responsive WebP/AVIF delivery

## Important production boundary

The current repository contains the **working frontend experience and admin demonstration layer**. It does not yet claim production backend functionality.

Before hotel staff use the system operationally, the next engineering phase should connect:

- secure server-side authentication and authorization
- PostgreSQL persistence and API services
- real booking confirmation workflow
- email/SMS notifications
- protected image storage and responsive processing
- validation, rate limiting, audit logs and security headers
- SEO, analytics and final performance verification

The architecture and roadmap are documented in `docs/ARCHITECTURE.md` and `docs/ROADMAP.md`.
