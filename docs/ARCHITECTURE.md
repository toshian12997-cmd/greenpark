# Green Park Hotel — Architecture

## 1. Core stack

Use TypeScript as the primary application language. React powers the public interface and admin interface. Tailwind CSS plus custom CSS tokens handles presentation. PostgreSQL is the target relational database.

Do not add another programming language unless a concrete requirement justifies it.

## 2. Application boundaries

```text
Guest browser
    |
    v
Public React application
    |
    v
TypeScript API/service layer
    |
    +--> PostgreSQL
    |
    +--> Optimized image storage/CDN

Hotel staff
    |
    v
Secure admin authentication
    |
    v
Admin React application
    |
    v
TypeScript API/service layer
```

Public guests do not create permanent accounts. A booking is a request until hotel staff confirms it.

## 3. Domain model

- AdminUser
- AdminRole / permissions
- Room
- MenuCategory
- MenuItem
- Event
- GalleryAsset
- Booking
- Enquiry
- SiteContent
- SiteSetting
- AuditLog

## 4. Booking lifecycle

```text
Guest submits request
        -> server validation
        -> booking reference generated
        -> Pending
        -> admin reviews
        -> Confirmed / Cancelled
        -> Completed
```

Never present a pending request as a guaranteed reservation.

## 5. Admin security

Authorization must be enforced on the server/API, not only by hiding frontend controls.

Required design considerations:

- secure password hashing
- secure session handling
- protected admin routes
- role-based authorization
- server-side input validation
- output encoding where appropriate
- rate limiting for authentication and sensitive endpoints
- secure cookies
- CSRF protection where cookie-based state-changing requests require it
- audit logs for important administrative actions
- safe password-reset flow
- environment variables for secrets
- no credentials or private keys in source control
- controlled file uploads

## 6. HTTP/application security

Production deployment should enforce HTTPS and use appropriate security headers, including HSTS and a restrictive Content-Security-Policy. Also evaluate X-Content-Type-Options, frame-ancestors/clickjacking protection, Referrer-Policy and Permissions-Policy.

CSP must be compatible with the actual assets and integrations; do not blindly add a policy that breaks the application.

## 7. Image architecture

Admin upload pipeline:

```text
upload
  -> validate MIME/type + dimensions + size
  -> reject unsafe/unacceptable files
  -> resize
  -> compress
  -> generate responsive variants
  -> WebP/AVIF where supported
  -> store optimized variants
  -> publish only approved asset
```

Public pages should request the smallest suitable image variant. Originals should not be unnecessarily exposed to visitors.

## 8. Performance

- preload only the critical homepage hero
- lazy-load below-the-fold media
- use responsive image dimensions/srcset
- gallery loads a small initial batch, approximately 8–12 items
- load larger image only when opened
- no automatic video download/playback
- load only required font weights
- code-split heavy routes/components
- keep admin-only code out of the public initial bundle where practical
- avoid duplicate API requests
- cache stable public content appropriately
- provide lightweight skeleton/error states
- respect reduced-motion and data-saving preferences where practical

Performance must be measured with real builds/tests rather than represented by invented scores.

## 9. SEO and accessibility

- semantic HTML
- useful page titles and descriptions
- Open Graph metadata
- canonical URLs where needed
- sitemap and robots configuration
- hotel/local-business structured data when accurate
- descriptive alt text
- keyboard navigation
- visible focus states
- sensible heading hierarchy
- form labels and accessible validation
- sufficient contrast

## 10. Content integrity

The application must not fabricate reviews, prices, events, room availability, customer records, bookings, statistics or hotel claims. Empty database states should be represented honestly.

## 11. UI direction

Modern editorial hospitality. Prioritize photography, typography and layout over decorative UI. Green Park's visual language should use deep/natural greens, warm cream/off-white, charcoal and restrained neutral tones. Avoid purple/blue SaaS gradients, neon green, excessive cards, excessive rounded containers, glassmorphism, 3D decorative objects and animated noise.
