import { useState } from 'react';
import { ArrowRight, CalendarDays, Menu, Phone, X } from 'lucide-react';

const HERO_IMAGE = '/images/green-park-hero.webp';

export default function App() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" onClick={close} aria-label="Green Park Hotel home">
          <span className="brand-mark">GP</span>
          <span><strong>Green Park</strong><small>Hotel · Njoro</small></span>
        </a>
        <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
          {['Stay', 'Dining', 'Events', 'Gallery', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={close}>{item}</a>
          ))}
          <a className="nav-book" href="#book" onClick={close}>Book now <ArrowRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-image" style={{ backgroundImage: `url(${HERO_IMAGE})` }} role="img" aria-label="Green Park Hotel Njoro exterior" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Njoro · Kenya</p>
          <h1>A warm place<br /><em>to pause.</em></h1>
          <p className="hero-copy">Stay, dine and gather in a relaxed setting in Njoro, surrounded by the character of Green Park.</p>
          <div className="hero-actions">
            <a className="button primary" href="#book">Plan your stay <ArrowRight size={17} /></a>
            <a className="text-link" href="#gallery">Explore the hotel</a>
          </div>
        </div>
        <div className="hero-note"><span>01</span><span className="rule" /><span>Green Park Hotel</span></div>
      </section>

      <section className="intro" id="about">
        <div><p className="eyebrow dark">A little closer to home</p><h2>Simple hospitality,<br /><em>beautifully considered.</em></h2></div>
        <div className="intro-copy"><p>Green Park Hotel is a place for overnight stays, meals, celebrations and quiet moments in Njoro. The website keeps that feeling at its centre: clear information, real photography and an easy path to enquire.</p><a className="text-link dark-link" href="#contact">Discover Green Park <ArrowRight size={16} /></a></div>
      </section>

      <section className="split-section" id="stay">
        <div className="section-image image-one" aria-label="Accommodation photography placeholder" />
        <div className="section-copy">
          <p className="eyebrow dark">Stay</p><h2>Rooms made for<br /><em>rest.</em></h2>
          <p>Comfortable accommodation with a calm, practical feel. Room details, amenities and current rates will be published here by the hotel.</p>
          <a className="text-link dark-link" href="#book">View accommodation <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="feature-band" id="dining">
        <div className="feature-copy"><p className="eyebrow">Dining</p><h2>Good food.<br /><em>Good company.</em></h2><p>Explore the current menu, from everyday favourites to dishes prepared for gatherings at Green Park.</p><a className="button light" href="#menu">View menu <ArrowRight size={16} /></a></div>
        <div className="feature-image image-two" aria-label="Dining photography placeholder" />
      </section>

      <section className="events" id="events">
        <div className="section-heading"><div><p className="eyebrow dark">What's happening</p><h2>Events at <em>Green Park.</em></h2></div><a className="text-link dark-link" href="#contact">Host an event <ArrowRight size={16} /></a></div>
        <div className="event-empty"><CalendarDays size={19} /><div><strong>Upcoming events will appear here.</strong><p>The hotel team can publish event dates, times, venues and details from the admin system.</p></div></div>
      </section>

      <section className="gallery" id="gallery">
        <div className="section-heading"><div><p className="eyebrow dark">The place</p><h2>See Green Park<br /><em>for yourself.</em></h2></div><span className="gallery-count">01 — 04</span></div>
        <div className="gallery-grid"><div className="gallery-photo image-three" /><div className="gallery-photo image-four" /><div className="gallery-photo image-five" /><div className="gallery-photo image-six" /></div>
      </section>

      <section className="booking" id="book">
        <div><p className="eyebrow">Make an enquiry</p><h2>Planning a stay<br /><em>or gathering?</em></h2><p>Send the hotel your details. You don't need to create an account. A booking reference can be generated for each enquiry.</p></div>
        <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
          <label>Name<input required placeholder="Your name" /></label>
          <label>Phone<input required type="tel" placeholder="Phone number" /></label>
          <label>Date<input type="date" /></label>
          <label>Guests<select defaultValue=""><option value="" disabled>Number of guests</option><option>1</option><option>2</option><option>3–5</option><option>6–10</option><option>10+</option></select></label>
          <label className="wide">Request<textarea rows={3} placeholder="Room, dining, event or anything else you'd like to ask about…" /></label>
          <button className="button light wide" type="submit">Send enquiry <ArrowRight size={17} /></button>
        </form>
      </section>

      <footer id="contact">
        <div><div className="brand footer-brand"><span className="brand-mark">GP</span><span><strong>Green Park</strong><small>Hotel · Njoro</small></span></div><p>Njoro – Sobea Road, Njoro, Kenya</p></div>
        <div className="footer-contact"><a href="tel:+254794047344"><Phone size={15} /> +254 794 047344</a><span>© {new Date().getFullYear()} Green Park Hotel</span></div>
      </footer>
    </main>
  );
}
