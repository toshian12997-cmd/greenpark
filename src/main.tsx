import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./greenpark.css";

type Page = "home" | "stay" | "dining" | "events" | "gallery" | "about" | "location" | "contact" | "book";
type AdminTab = "Overview" | "Rooms" | "Menu" | "Events" | "Gallery" | "Bookings" | "Enquiries" | "Content";
type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Booking = {
  reference: string;
  name: string;
  phone: string;
  email: string;
  arrival: string;
  departure: string;
  guests: string;
  request: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
};

type Room = { id: string; name: string; description: string; amenities: string; published: boolean };
type MenuItem = { id: string; name: string; category: string; description: string; price: string; available: boolean };
type EventItem = { id: string; name: string; date: string; time: string; venue: string; description: string; status: "Draft" | "Published" | "Cancelled" | "Completed" };

type GalleryItem = { id: string; label: string; src: string; published: boolean };

const hotel = {
  phone: "+254 794 047344",
  maps: "https://maps.app.goo.gl/VkHBGPQhcguYocoYA",
  whatsapp: "https://wa.me/254794047344?text=Hello%20Green%20Park%20Hotel%2C%20I%27d%20like%20to%20make%20an%20enquiry.",
  address: "Njoro – Sobea Road, Njoro, Kenya",
};

const images = {
  hero: "/images/green-park/hero-evening.webp",
  stay: "/images/green-park/accommodation.webp",
  dining: "/images/green-park/lounge.webp",
  grounds: "/images/green-park/garden.webp",
  sign: "/images/green-park/signboard.webp",
};

const gallerySeed: GalleryItem[] = [
  { id: "g1", label: "Evening exterior", src: images.hero, published: true },
  { id: "g2", label: "Accommodation", src: images.stay, published: true },
  { id: "g3", label: "Grill & Lounge", src: images.dining, published: true },
  { id: "g4", label: "Grounds", src: images.grounds, published: true },
  { id: "g5", label: "Green Park sign", src: images.sign, published: true },
];

const navItems: Array<[Page, string]> = [
  ["home", "Home"],
  ["stay", "Stay"],
  ["dining", "Dining"],
  ["events", "Events"],
  ["gallery", "Gallery"],
  ["about", "About"],
  ["location", "Location"],
];

function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function pageFromHash(): Page {
  const value = window.location.hash.replace("#", "") as Page;
  return ["home", "stay", "dining", "events", "gallery", "about", "location", "contact", "book"].includes(value) ? value : "home";
}

function navigate(page: Page) {
  window.location.hash = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <button className={`brand ${light ? "brand-light" : ""}`} onClick={() => navigate("home")} aria-label="Green Park Hotel home">
      <span className="brand-mark">G</span>
      <span className="brand-copy"><strong>GREEN PARK</strong><small>HOTEL · NJORO</small></span>
    </button>
  );
}

function WelcomeGate({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 2600);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="welcome-gate" role="presentation">
      <img src={images.hero} alt="Green Park Hotel at dusk" />
      <div className="welcome-wash" />
      <div className="welcome-content">
        <span>GREEN PARK · NJORO</span>
        <h1>GREEN PARK</h1>
        <p>HOTEL · GRILL & LOUNGE</p>
        <div className="welcome-line"><i /> <b>STAY · DINE · GATHER</b></div>
      </div>
    </div>
  );
}

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Brand />
      <nav className={open ? "nav-open" : ""} aria-label="Primary navigation">
        {navItems.map(([key, label]) => (
          <button key={key} className={page === key ? "nav-active" : ""} onClick={() => { navigate(key); setOpen(false); }}>{label}</button>
        ))}
        <button className="nav-cta" onClick={() => { navigate("book"); setOpen(false); }}>Book / Enquire</button>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">{open ? "Close" : "Menu"}</button>
    </header>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = document.createElement("div");
    void node;
    const timer = window.setTimeout(() => setVisible(true), 40);
    return () => window.clearTimeout(timer);
  }, []);
  return <div className={`reveal ${visible ? "reveal-on" : ""} ${className}`}>{children}</div>;
}

function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function Home() {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero-image-wrap"><img src={images.hero} alt="Green Park Hotel exterior" /></div>
        <div className="hero-copy">
          <span className="eyebrow">A PLACE TO STAY · DINE · GATHER</span>
          <h1>Come for the moment.<em>Stay for the feeling.</em></h1>
          <p>Green Park Hotel brings accommodation, Grill & Lounge dining and gatherings together in Njoro.</p>
          <div className="button-row">
            <button className="button button-dark" onClick={() => navigate("book")}>Plan a visit <span>↗</span></button>
            <button className="button button-text" onClick={() => navigate("dining")}>Explore dining <span>→</span></button>
          </div>
          <div className="hero-meta"><b>GREEN PARK</b><span>Hotel · Grill & Lounge</span><span>Njoro, Kenya</span></div>
        </div>
      </section>

      <Reveal><section className="intro-grid content-width"><div className="label">THE GREEN PARK IDEA</div><div><h2>A hotel website should feel like the property itself.</h2><p>Warm, welcoming and simple to move through. Guests can explore the place, choose what they need and send the hotel a clear request without creating an account.</p></div></section></Reveal>

      <Reveal><section className="experience-grid content-width">
        <article className="experience-card experience-large" onClick={() => navigate("stay")}><img src={images.stay} alt="Green Park accommodation" /><div className="image-overlay" /><div className="card-copy"><span>01 · STAY</span><h3>Stay close to what matters.</h3><p>Accommodation information, presented with space and clarity.</p><b>Explore stay →</b></div></article>
        <article className="experience-card" onClick={() => navigate("dining")}><img src={images.dining} alt="Green Park lounge" /><div className="image-overlay" /><div className="card-copy"><span>02 · DINE</span><h3>Grill & Lounge.</h3><p>Let the dining experience lead the way.</p><b>Discover dining →</b></div></article>
        <article className="experience-card experience-dark" onClick={() => navigate("events")}><img src={images.grounds} alt="Green Park grounds" /><div className="image-overlay" /><div className="card-copy"><span>03 · GATHER</span><h3>Make room for people.</h3><p>Celebrations, meetings and gatherings begin here.</p><b>Explore events →</b></div></article>
      </section></Reveal>

      <section className="statement-band"><div className="content-width statement-inner"><span>GREEN PARK · NJORO</span><h2>Food brings people closer.<em>Hospitality keeps them there.</em></h2><button className="button button-light" onClick={() => navigate("book")}>Make an enquiry →</button></div></section>

      <Reveal><section className="visit-grid content-width"><img src={images.sign} alt="Green Park Hotel signboard" /><div><span className="eyebrow">FIND US</span><h2>Green Park Hotel</h2><p>{hotel.address}</p><div className="button-row"><a className="button button-dark" href={hotel.maps} target="_blank" rel="noreferrer">Open Google Maps ↗</a><a className="button button-text" href={hotel.whatsapp} target="_blank" rel="noreferrer">WhatsApp the hotel →</a></div></div></section></Reveal>
    </main>
  );
}

function EmptyState({ title, message, action }: { title: string; message: string; action?: () => void }) {
  return <div className="empty-state"><div className="empty-number">—</div><h3>{title}</h3><p>{message}</p>{action && <button className="button button-dark" onClick={action}>Send an enquiry →</button>}</div>;
}

function Stay() {
  const rooms = readStore<Room[]>("gp-rooms", []);
  return <main className="page-shell content-width"><Reveal><section className="page-intro"><div><span className="eyebrow">STAY</span><h1>A calmer way<br /><em>to stay.</em></h1></div><img src={images.stay} alt="Green Park accommodation" /></section></Reveal><section className="split-copy"><div><span className="eyebrow">GUEST-FIRST FLOW</span><h2>No forced account. Just a clear request.</h2></div><p>Guests can see published accommodation details and move straight into an enquiry. Rates, amenities and room availability belong to the hotel team — not to invented website content.</p></section>{rooms.length ? <section className="data-grid">{rooms.filter(r => r.published).map(room => <article className="data-card" key={room.id}><div><span>ROOM</span><h3>{room.name}</h3><p>{room.description}</p><small>{room.amenities}</small></div><button className="button button-dark" onClick={() => navigate("book")}>Enquire</button></article>)}</section> : <EmptyState title="Accommodation details are ready to be published." message="The admin workspace can add approved room information without filling this page with made-up rates or amenities." action={() => navigate("book")} />}</main>;
}

function Dining() {
  const items = readStore<MenuItem[]>("gp-menu", []);
  return <main className="page-shell content-width"><Reveal><section className="page-intro"><div><span className="eyebrow">GRILL & LOUNGE</span><h1>Let the food<br /><em>lead the way.</em></h1></div><img src={images.dining} alt="Green Park Grill and Lounge" /></section></Reveal><section className="split-copy"><div><span className="eyebrow">DINING</span><h2>A living menu, not a poster.</h2></div><p>The menu section is built to show only what the hotel has approved and published. Prices and availability can be updated by staff from the control room.</p></section>{items.filter(i => i.available).length ? <section className="menu-list">{items.filter(i => i.available).map(item => <article key={item.id}><div><span>{item.category}</span><h3>{item.name}</h3><p>{item.description}</p></div>{item.price && <strong>{item.price}</strong>}</article>)}</section> : <EmptyState title="The menu has not been published yet." message="When the hotel team adds dishes and approved prices, they will appear here automatically." action={() => navigate("book")} />}</main>;
}

function Events() {
  const events = readStore<EventItem[]>("gp-events", []).filter(e => e.status === "Published");
  return <main className="page-shell content-width"><Reveal><section className="page-intro"><div><span className="eyebrow">EVENTS</span><h1>Bring people<br /><em>together.</em></h1></div><img src={images.grounds} alt="Green Park grounds" /></section></Reveal><section className="split-copy"><div><span className="eyebrow">GATHERINGS</span><h2>Published dates. Clear details.</h2></div><p>The events experience is designed for real dates, venues, times and descriptions. Nothing is invented to make an empty calendar look full.</p></section>{events.length ? <section className="data-grid">{events.map(event => <article className="data-card" key={event.id}><div><span>{event.date} · {event.time}</span><h3>{event.name}</h3><p>{event.description}</p><small>{event.venue}</small></div><button className="button button-dark" onClick={() => navigate("book")}>Enquire</button></article>)}</section> : <EmptyState title="No upcoming events have been published yet." message="The next approved event will appear here as soon as management publishes it." action={() => navigate("book")} />}</main>;
}

function Gallery() {
  const items = readStore<GalleryItem[]>("gp-gallery", gallerySeed).filter(i => i.published);
  return <main className="page-shell content-width"><Reveal><section className="gallery-heading"><span className="eyebrow">GALLERY</span><h1>See the place<br /><em>in its own light.</em></h1><p>Real photographs of Green Park Hotel, presented simply.</p></section></Reveal><section className="gallery-grid">{items.map((item, index) => <figure key={item.id} className={`gallery-card gallery-${(index % 5) + 1}`}><img src={item.src} alt={item.label} loading={index > 1 ? "lazy" : "eager"} /><figcaption><span>{item.label}</span><b>Green Park · Njoro</b></figcaption></figure>)}</section></main>;
}

function About() {
  return <main className="page-shell content-width"><Reveal><section className="page-intro"><div><span className="eyebrow">ABOUT GREEN PARK</span><h1>A place with<br /><em>its own rhythm.</em></h1></div><img src={images.sign} alt="Green Park Hotel sign" /></section></Reveal><section className="about-story"><div className="about-big">Built around the moments that bring people together.</div><div><p>Green Park Hotel is presented here as a connected experience: accommodation, Grill & Lounge dining, grounds and gatherings, all tied together by a simple way for guests to enquire.</p><p>The website intentionally avoids invented facts. Published content should come from the hotel team so the digital experience remains as trustworthy as the property itself.</p></div></section></main>;
}

function Location() {
  return <main className="page-shell content-width"><Reveal><section className="location-hero"><div><span className="eyebrow">LOCATION</span><h1>Find your way<br /><em>to Green Park.</em></h1><p>{hotel.address}</p><div className="button-row"><a className="button button-dark" href={hotel.maps} target="_blank" rel="noreferrer">Open Google Maps ↗</a><a className="button button-text" href={`tel:${hotel.phone.replaceAll(" ", "")}`}>Call {hotel.phone} →</a></div></div><div className="map-art"><div className="map-pin">G</div><span>GREEN PARK HOTEL</span><small>Njoro · Kenya</small><a href={hotel.maps} target="_blank" rel="noreferrer">Open live location →</a></div></section></Reveal></main>;
}

function Contact() {
  return <main className="page-shell content-width"><Reveal><section className="page-intro"><div><span className="eyebrow">CONTACT</span><h1>Talk to<br /><em>Green Park.</em></h1><p>No account needed. Choose the fastest way to reach the hotel.</p></div><img src={images.dining} alt="Green Park lounge" /></section></Reveal><section className="contact-options"><a href={hotel.whatsapp} target="_blank" rel="noreferrer"><span>01</span><strong>WhatsApp</strong><small>Start a direct conversation with the hotel.</small><b>Open WhatsApp →</b></a><a href={`tel:${hotel.phone.replaceAll(" ", "")}`}><span>02</span><strong>Phone</strong><small>{hotel.phone}</small><b>Call the hotel →</b></a><a href={hotel.maps} target="_blank" rel="noreferrer"><span>03</span><strong>Location</strong><small>{hotel.address}</small><b>Open directions →</b></a></section></main>;
}

function BookingForm({ onSubmitted }: { onSubmitted: (booking: Booking) => void }) {
  const [busy, setBusy] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const stamp = Date.now().toString().slice(-6);
    const booking: Booking = {
      reference: `GP-${new Date().getFullYear()}-${stamp}`,
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      arrival: String(data.get("arrival") || ""),
      departure: String(data.get("departure") || ""),
      guests: String(data.get("guests") || ""),
      request: String(data.get("request") || "General enquiry"),
      notes: String(data.get("notes") || ""),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    const current = readStore<Booking[]>("gp-bookings", []);
    writeStore("gp-bookings", [booking, ...current]);
    window.setTimeout(() => { setBusy(false); onSubmitted(booking); }, 450);
  };
  return <form className="booking-form" onSubmit={submit}><div className="form-heading"><span className="eyebrow">GUEST ENQUIRY</span><h2>Tell us what you need.</h2><p>No permanent guest account. Just the essentials the hotel team needs to follow up.</p></div><div className="form-grid"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required placeholder="+254 …" /></label><label>Email <small>optional</small><input name="email" type="email" placeholder="you@example.com" /></label><label>Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label><label>Arrival<input name="arrival" type="date" required /></label><label>Departure<input name="departure" type="date" /></label><label className="full">What are you enquiring about?<select name="request" defaultValue="Accommodation"><option>Accommodation</option><option>Dining</option><option>Event / meeting</option><option>General enquiry</option></select></label><label className="full">Special request <small>optional</small><textarea name="notes" rows={4} placeholder="Anything the hotel team should know?" /></label></div><button className="button button-dark button-submit" disabled={busy}>{busy ? "Sending…" : "Send enquiry →"}</button></form>;
}

function Book() {
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  return <main className="booking-page content-width"><section className="booking-layout"><div className="booking-intro"><span className="eyebrow">BOOK / ENQUIRE</span><h1>Make the request.<br /><em>Let the hotel confirm.</em></h1><p>We treat this as a booking request until the hotel team confirms availability. That keeps the guest promise honest.</p><div className="booking-image"><img src={images.hero} alt="Green Park Hotel" /></div></div><div className="booking-panel">{submitted ? <div className="success-state"><span className="eyebrow">REQUEST RECEIVED</span><h2>Your enquiry is on its way.</h2><p>Keep this reference for follow-up:</p><strong>{submitted.reference}</strong><small>Current status: Pending confirmation</small><div className="button-row"><a className="button button-dark" href={hotel.whatsapp} target="_blank" rel="noreferrer">WhatsApp the hotel →</a><button className="button button-text" onClick={() => setSubmitted(null)}>New enquiry</button></div></div> : <BookingForm onSubmitted={setSubmitted} />}</div></section></main>;
}

function Stat({ label, value, note }: { label: string; value: number; note: string }) { return <article className="stat-card"><span>{label}</span><strong>{value}</strong><small>{note}</small></article>; }

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<AdminTab>("Overview");
  const [bookings, setBookings] = useState<Booking[]>(() => readStore("gp-bookings", []));
  const [rooms, setRooms] = useState<Room[]>(() => readStore("gp-rooms", []));
  const [menu, setMenu] = useState<MenuItem[]>(() => readStore("gp-menu", []));
  const [events, setEvents] = useState<EventItem[]>(() => readStore("gp-events", []));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => readStore("gp-gallery", gallerySeed));
  const [showComposer, setShowComposer] = useState(false);

  useEffect(() => { writeStore("gp-bookings", bookings); }, [bookings]);
  useEffect(() => { writeStore("gp-rooms", rooms); }, [rooms]);
  useEffect(() => { writeStore("gp-menu", menu); }, [menu]);
  useEffect(() => { writeStore("gp-events", events); }, [events]);
  useEffect(() => { writeStore("gp-gallery", gallery); }, [gallery]);

  if (!authenticated) return <main className="admin-login"><div className="admin-login-card"><Brand /><span className="eyebrow">PRIVATE AREA</span><h1>Green Park<br /><em>Control Room.</em></h1><p>Staff access for website content, guest requests and publishing.</p><form onSubmit={(e) => { e.preventDefault(); setAuthenticated(true); }}><label>Staff email<input required type="email" placeholder="staff@greenpark.example" /></label><label>Password<input required type="password" placeholder="••••••••" /></label><button className="button button-dark">Enter control room →</button></form><small>This presentation build stores demo records in this browser. Production authentication and PostgreSQL should be connected before deployment.</small><a href="/">← Back to website</a></div></main>;

  const pendingBookings = bookings.filter(b => b.status === "Pending").length;
  const publishedEvents = events.filter(e => e.status === "Published").length;
  const publishedMenu = menu.filter(i => i.available).length;
  const publishedRooms = rooms.filter(r => r.published).length;

  const setBookingStatus = (reference: string, status: BookingStatus) => setBookings(prev => prev.map(b => b.reference === reference ? { ...b, status } : b));

  const addDemo = () => {
    setShowComposer(true);
  };

  const saveComposer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "Untitled");
    const id = `${Date.now()}`;
    if (tab === "Rooms") setRooms(prev => [...prev, { id, name, description: String(data.get("description") || ""), amenities: String(data.get("amenities") || ""), published: false }]);
    if (tab === "Menu") setMenu(prev => [...prev, { id, name, category: String(data.get("category") || "General"), description: String(data.get("description") || ""), price: String(data.get("price") || ""), available: false }]);
    if (tab === "Events") setEvents(prev => [...prev, { id, name, date: String(data.get("date") || ""), time: String(data.get("time") || ""), venue: String(data.get("venue") || ""), description: String(data.get("description") || ""), status: "Draft" }]);
    setShowComposer(false);
  };

  return <main className="admin-shell"><aside className="admin-sidebar"><Brand /><div className="admin-caption">CONTROL ROOM</div><nav>{(["Overview", "Rooms", "Menu", "Events", "Gallery", "Bookings", "Enquiries", "Content"] as AdminTab[]).map(item => <button key={item} className={tab === item ? "admin-active" : ""} onClick={() => setTab(item)}>{item}</button>)}</nav><div className="admin-sidebar-bottom"><span>Local presentation data</span><a href="/">View website ↗</a></div></aside><section className="admin-main"><header className="admin-topbar"><div><span className="eyebrow">GREEN PARK ADMIN</span><h1>{tab}</h1></div><span className="admin-note">PREVIEW · DATA STAYS IN THIS BROWSER</span></header>{tab === "Overview" && <><div className="admin-stats"><Stat label="Pending bookings" value={pendingBookings} note="Awaiting hotel confirmation" /><Stat label="Published rooms" value={publishedRooms} note="Ready for guests" /><Stat label="Menu items" value={publishedMenu} note="Currently available" /><Stat label="Upcoming events" value={publishedEvents} note="Published" /></div><section className="admin-panel"><div className="panel-heading"><div><span className="eyebrow">OPERATIONS</span><h2>Manage the guest journey.</h2></div></div><div className="workflow-strip"><span>Guest submits</span><i>→</i><span>Request is stored</span><i>→</i><span>Staff reviews</span><i>→</i><span>Hotel confirms</span></div><p className="panel-note">This workflow is intentionally a request rather than a guaranteed real-time reservation until a production availability service is connected.</p></section></>}

      {tab === "Bookings" && <section className="admin-panel"><AdminTable title="Guest requests" action={null}>{bookings.length ? bookings.map(booking => <div className="admin-row" key={booking.reference}><div><strong>{booking.reference}</strong><span>{booking.name} · {booking.phone}</span><small>{booking.arrival || "No date"} · {booking.guests} guest(s) · {booking.request}</small></div><div className="row-actions"><span className={`status status-${booking.status.toLowerCase()}`}>{booking.status}</span><select value={booking.status} onChange={e => setBookingStatus(booking.reference, e.target.value as BookingStatus)}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></div></div>) : <EmptyAdmin label="No booking requests yet." />}</AdminTable></section>}

      {(tab === "Rooms" || tab === "Menu" || tab === "Events") && <section className="admin-panel"><AdminTable title={`${tab} library`} action={<button className="button button-dark small" onClick={addDemo}>Add {tab === "Menu" ? "item" : tab === "Events" ? "event" : "room"}</button>}>{tab === "Rooms" && (rooms.length ? rooms.map(room => <div className="admin-row" key={room.id}><div><strong>{room.name}</strong><span>{room.description}</span><small>{room.amenities}</small></div><span className={`status ${room.published ? "status-confirmed" : "status-pending"}`}>{room.published ? "Published" : "Draft"}</span></div>) : <EmptyAdmin label="No rooms have been added." />)}{tab === "Menu" && (menu.length ? menu.map(item => <div className="admin-row" key={item.id}><div><strong>{item.name}</strong><span>{item.category} · {item.description}</span><small>{item.price || "Price not set"}</small></div><span className={`status ${item.available ? "status-confirmed" : "status-pending"}`}>{item.available ? "Available" : "Draft"}</span></div>) : <EmptyAdmin label="No menu items have been added." />)}{tab === "Events" && (events.length ? events.map(item => <div className="admin-row" key={item.id}><div><strong>{item.name}</strong><span>{item.date} · {item.time}</span><small>{item.venue} · {item.status}</small></div><span className="status status-pending">{item.status}</span></div>) : <EmptyAdmin label="No events have been added." />)}</AdminTable></section>}

      {tab === "Gallery" && <section className="admin-panel"><AdminTable title="Gallery library" action={<button className="button button-dark small" onClick={() => setGallery(prev => [...prev, { id: `${Date.now()}`, label: "New gallery slot", src: images.hero, published: false }])}>Add image slot</button>}>{gallery.map(item => <div className="admin-row" key={item.id}><div className="row-media"><img src={item.src} alt="" /><div><strong>{item.label}</strong><span>{item.src}</span></div></div><span className={`status ${item.published ? "status-confirmed" : "status-pending"}`}>{item.published ? "Published" : "Draft"}</span></div>)}</AdminTable></section>}

      {tab === "Enquiries" && <section className="admin-panel"><AdminTable title="Enquiries"><EmptyAdmin label="No separate enquiries yet. Booking requests will appear in Bookings." /></AdminTable></section>}
      {tab === "Content" && <section className="admin-panel"><AdminTable title="Website content"><EmptyAdmin label="Content editor structure is ready. Connect it to the production content tables for live editing." /></AdminTable></section>}

      {showComposer && <div className="composer-backdrop" onMouseDown={() => setShowComposer(false)}><form className="composer" onSubmit={saveComposer} onMouseDown={e => e.stopPropagation()}><button type="button" className="composer-close" onClick={() => setShowComposer(false)}>×</button><span className="eyebrow">NEW {tab.slice(0, -1).toUpperCase()}</span><h2>Add {tab === "Menu" ? "menu item" : tab === "Events" ? "event" : "room"}</h2><label>Name<input name="name" required /></label><label>Description<textarea name="description" rows={3} /></label>{tab === "Rooms" && <label>Amenities<input name="amenities" placeholder="e.g. Wi‑Fi, private bath" /></label>}{tab === "Menu" && <><label>Category<input name="category" placeholder="e.g. Grill" /></label><label>Price<input name="price" placeholder="e.g. KSh 800" /></label></>}{tab === "Events" && <><label>Date<input name="date" type="date" required /></label><label>Time<input name="time" placeholder="e.g. 6:00 PM" /></label><label>Venue<input name="venue" /></label></>}<button className="button button-dark">Save draft →</button></form></div>}
    </section></main>;
}

function AdminTable({ title, action, children }: { title: string; action?: React.ReactNode | null; children: React.ReactNode }) { return <div className="admin-table"><div className="panel-heading"><div><span className="eyebrow">WORKSPACE</span><h2>{title}</h2></div>{action}</div>{children}</div>; }
function EmptyAdmin({ label }: { label: string }) { return <div className="empty-admin">{label}</div>; }

function Footer() {
  return <footer className="site-footer"><div className="content-width footer-grid"><div><Brand light /><p>Stay · Dine · Gather<br />Green Park Hotel · Njoro</p></div><div><span>CONTACT</span><a href={`tel:${hotel.phone.replaceAll(" ", "")}`}>{hotel.phone}</a><a href={hotel.maps} target="_blank" rel="noreferrer">Njoro · Kenya</a></div><div><span>QUICK LINKS</span><button onClick={() => navigate("stay")}>Stay</button><button onClick={() => navigate("dining")}>Dining</button><button onClick={() => navigate("events")}>Events</button><button onClick={() => navigate("book")}>Book / Enquire</button></div></div><div className="content-width footer-bottom"><span>GREEN PARK HOTEL · NJORO</span><span>Built as a production-ready foundation, with live backend integration still to be connected.</span></div></footer>;
}

function App() {
  const [page, setPage] = useState<Page>(pageFromHash());
  const [welcome, setWelcome] = useState(() => sessionStorage.getItem("gp-welcome") !== "seen");
  useEffect(() => { const sync = () => setPage(pageFromHash()); window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync); }, []);
  const closeWelcome = () => { sessionStorage.setItem("gp-welcome", "seen"); setWelcome(false); };
  if (window.location.pathname === "/admin") return <Admin />;
  const pageBody = useMemo(() => { switch (page) { case "home": return <Home />; case "stay": return <Stay />; case "dining": return <Dining />; case "events": return <Events />; case "gallery": return <Gallery />; case "about": return <About />; case "location": return <Location />; case "contact": return <Contact />; case "book": return <Book />; } }, [page]);
  return <><a className="skip-link" href="#main">Skip to content</a>{welcome && <WelcomeGate onDone={closeWelcome} />}<Header page={page} /><div id="main">{pageBody}</div><div className="quick-actions"><a href={hotel.maps} target="_blank" rel="noreferrer">Map</a><a href={hotel.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div><Footer /></>;
}

createRoot(document.getElementById("root")!).render(<App />);
