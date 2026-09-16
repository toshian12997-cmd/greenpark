import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './photo-layout.css';
import './motion.css';
import './ux-polish.css';
import './admin.css';

type View = 'home' | 'stay' | 'menu' | 'events' | 'gallery' | 'about' | 'location' | 'contact' | 'book';
type AdminTab = 'Overview' | 'Rooms' | 'Menu' | 'Events' | 'Gallery' | 'Bookings' | 'Enquiries' | 'Content' | 'Settings';

type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  available: boolean;
};

type EventItem = {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  status: 'Draft' | 'Published' | 'Cancelled';
};

type RoomItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  status: 'Draft' | 'Published';
};

type BookingItem = {
  id: string;
  name: string;
  phone: string;
  date: string;
  service: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
};

type EnquiryItem = {
  id: string;
  name: string;
  phone: string;
  message: string;
  created: string;
  status: 'Unread' | 'Read';
};

const ASSET = '/images/green-park/';
const photos = {
  hero: `${ASSET}hero-evening.webp`,
  accommodation: `${ASSET}accommodation.webp`,
  lounge: `${ASSET}lounge.webp`,
  garden: `${ASSET}garden.webp`,
  signboard: `${ASSET}signboard.webp`,
};

const nav: { id: View; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'stay', label: 'Stay' },
  { id: 'menu', label: 'Dining' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'about', label: 'About' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' },
];

const readView = (): View => {
  const path = window.location.pathname.replace(/^\//, '').toLowerCase();
  if (path === 'admin') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return (nav.some((item) => item.id === hash) || hash === 'book' ? hash : 'home') as View;
};

function WelcomeScreen() {
  return (
    <div className="welcome-screen" aria-label="Welcome to Green Park Hotel">
      <div className="welcome-core">
        <div className="welcome-mark">G</div>
        <p className="welcome-name">GREEN PARK</p>
        <p className="welcome-sub">HOTEL · NJORO</p>
        <div className="welcome-line-loader"><span /></div>
      </div>
    </div>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button className="brand" onClick={onClick ?? (() => { window.location.hash = 'home'; })}>
      <span className="brand-mark">G</span>
      <span><b>GREEN PARK</b><small>HOTEL · NJORO</small></span>
    </button>
  );
}

function App() {
  const [view, setView] = useState<View>(readView);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [adminMode, setAdminMode] = useState(() => window.location.pathname.toLowerCase() === '/admin');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [contentNotice, setContentNotice] = useState('No unpublished site copy is waiting for review.');

  const go = (next: View) => {
    setView(next);
    setAdminMode(false);
    setMenuOpen(false);
    setBooked(false);
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleLocation = () => {
      const pathAdmin = window.location.pathname.toLowerCase() === '/admin';
      setAdminMode(pathAdmin);
      if (!pathAdmin) setView(readView());
    };
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('popstate', handleLocation);
    return () => {
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('popstate', handleLocation);
    };
  }, []);

  const addBooking = (booking: BookingItem) => setBookings((current) => [...current, booking]);

  const publicPage = useMemo(
    () => (
      <PublicWebsite
        view={view}
        go={go}
        booked={booked}
        setBooked={setBooked}
        menuItems={menuItems}
        events={events}
        rooms={rooms}
        addBooking={addBooking}
      />
    ),
    [view, booked, menuItems, events, rooms],
  );

  if (adminMode) {
    return (
      <AdminPortal
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        events={events}
        setEvents={setEvents}
        rooms={rooms}
        setRooms={setRooms}
        bookings={bookings}
        setBookings={setBookings}
        enquiries={enquiries}
        setEnquiries={setEnquiries}
        contentNotice={contentNotice}
        setContentNotice={setContentNotice}
        onBack={() => { window.location.hash = 'home'; setAdminMode(false); setView('home'); window.scrollTo({ top: 0 }); }}
      />
    );
  }

  return (
    <>
      <WelcomeScreen />
      <div className="welcome-line"><span>GREEN PARK HOTEL</span><span>NJORO · KENYA</span></div>
      <header>
        <Brand />
        <nav className={menuOpen ? 'open' : ''}>
          {nav.map((item) => (
            <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => go(item.id)}>{item.label}</button>
          ))}
          <button className="nav-book" onClick={() => go('book')}>Book / Enquire</button>
        </nav>
        <div className="header-tools">
          <button className="admin-entry" onClick={() => { window.history.pushState({}, '', '/admin'); setAdminMode(true); }}>Admin</button>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Close' : 'Menu'}</button>
        </div>
      </header>
      {publicPage}
      <footer>
        <div><Brand /><p>A refined digital front door for Green Park Hotel, Njoro.</p></div>
        <div className="footer-links">
          <button onClick={() => go('stay')}>Stay</button>
          <button onClick={() => go('menu')}>Dining</button>
          <button onClick={() => go('events')}>Events</button>
          <button onClick={() => go('gallery')}>Gallery</button>
          <button onClick={() => { window.history.pushState({}, '', '/admin'); setAdminMode(true); }}>Admin</button>
        </div>
      </footer>
    </>
  );
}

function PublicWebsite({
  view, go, booked, setBooked, menuItems, events, rooms, addBooking,
}: {
  view: View;
  go: (view: View) => void;
  booked: boolean;
  setBooked: (value: boolean) => void;
  menuItems: MenuItem[];
  events: EventItem[];
  rooms: RoomItem[];
  addBooking: (booking: BookingItem) => void;
}) {
  if (view === 'home') return <Home go={go} />;
  if (view === 'book') return <Booking booked={booked} setBooked={setBooked} addBooking={addBooking} />;

  const titles: Record<string, [string, string]> = {
    stay: ['Stay at Green Park', 'Accommodation presented clearly, with guest enquiries kept simple.'],
    menu: ['Green Park Grill & Lounge', 'Discover the published dining selection from the hotel team.'],
    events: ['Events at Green Park', 'See what the hotel has published for celebrations, meetings and gatherings.'],
    gallery: ['A glimpse of Green Park', 'Explore the hotel, grounds, dining and atmosphere.'],
    about: ['A hotel experience built around place', 'Green Park Hotel in Njoro, presented through real property photography.'],
    location: ['Find Green Park', 'Njoro · Sobea Road'],
    contact: ['Contact Green Park', 'Start an enquiry without requiring a guest account.'],
  };
  const [title, sub] = titles[view] ?? titles.about;

  return (
    <main className="page">
      <section className="page-head reveal-up"><span className="eyebrow">GREEN PARK · NJORO</span><h1>{title}</h1><p>{sub}</p></section>

      {view === 'stay' && (
        <section className="visual-content">
          <div className="wide-photo reveal-image" style={{ backgroundImage: `url(${photos.accommodation})` }} />
          <section className="stay-feature">
            <div>
              <span className="eyebrow">ACCOMMODATION</span>
              <h2>A calm place to stay.</h2>
              <p>Room information can be published by the hotel team from the admin portal. Until then, guests can enquire directly without needing an account.</p>
            </div>
            <div className="published-list">
              {rooms.length === 0 ? (
                <div className="site-empty"><strong>Room details coming soon.</strong><span>The hotel can publish room types and approved rates here.</span></div>
              ) : rooms.map((room) => <article key={room.id}><div><b>{room.name}</b><span>{room.description}</span></div><em>{room.price ? `From ${room.price}` : 'Rate on enquiry'}</em></article>)}
            </div>
            <button className="dark-button" onClick={() => go('book')}>Enquire about a stay →</button>
          </section>
        </section>
      )}

      {view === 'menu' && (
        <section className="visual-content">
          <div className="wide-photo reveal-image" style={{ backgroundImage: `url(${photos.lounge})` }} />
          <section className="menu-intro">
            <span className="eyebrow">GRILL & LOUNGE</span>
            <h2>Dining that is easy to discover.</h2>
            {menuItems.length === 0 ? (
              <div className="site-empty large"><strong>The menu is being prepared.</strong><span>The hotel team can publish dishes, descriptions, prices and availability from the admin portal.</span></div>
            ) : (
              <div className="menu-live-grid">{menuItems.filter((item) => item.available).map((item) => <article key={item.id}><small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p><b>{item.price}</b></article>)}</div>
            )}
            <button className="dark-button" onClick={() => go('book')}>Ask about dining →</button>
          </section>
        </section>
      )}

      {view === 'events' && (
        <section className="visual-content">
          <div className="wide-photo reveal-image" style={{ backgroundImage: `url(${photos.garden})` }} />
          <section className="event-feature">
            <div><span className="eyebrow">GATHER · MEET · CELEBRATE</span><h2>Events at Green Park.</h2><p>Published events will appear here with their date, time, venue and enquiry path.</p></div>
            {events.filter((event) => event.status === 'Published').length === 0 ? (
              <div className="site-empty"><strong>No upcoming events have been published yet.</strong><span>That space stays intentionally empty until the hotel has real event information.</span></div>
            ) : (
              <div className="event-live-list">{events.filter((event) => event.status === 'Published').map((event) => <article key={event.id}><div><small>{event.date} · {event.time}</small><h3>{event.name}</h3><p>{event.description}</p></div><span>{event.venue}</span></article>)}</div>
            )}
            <button className="dark-button" onClick={() => go('book')}>Plan an event →</button>
          </section>
        </section>
      )}

      {view === 'gallery' && (
        <section className="gallery-grid">
          {[photos.hero, photos.accommodation, photos.lounge, photos.garden, photos.signboard].map((src, index) => (
            <div className={`gallery-tile g${index + 1} hover-lift reveal-image`} key={src} style={{ backgroundImage: `url(${src})` }}>
              <span>{['Evening exterior', 'Accommodation', 'Grill & Lounge', 'Garden', 'Green Park sign'][index]}</span>
            </div>
          ))}
        </section>
      )}

      {view === 'about' && (
        <section className="about-visual">
          <div className="about-photo reveal-image" style={{ backgroundImage: `url(${photos.signboard})` }} />
          <div className="about-copy reveal-up"><span className="eyebrow">THE PLACE</span><h2>Green Park, clearly presented.</h2><p>This website uses the real property photography supplied for the project and gives the hotel a clearer digital journey across stay, dining, events and enquiries.</p><button className="text-button" onClick={() => go('location')}>Find the hotel →</button></div>
        </section>
      )}

      {view === 'location' && (
        <section className="split">
          <div className="location-card reveal-image"><div className="location-photo" style={{ backgroundImage: `url(${photos.signboard})` }} /><div className="location-overlay"><span>GREEN PARK HOTEL</span><small>Njoro – Sobea Road</small></div></div>
          <div className="location-copy reveal-up"><span className="eyebrow">LOCATION</span><h2>Easy to reach. Easy to remember.</h2><p>Use the live map link for directions to Green Park Hotel in Njoro.</p><a className="dark-button location-link" href="https://maps.app.goo.gl/VkHBGPQhcguYocoYA" target="_blank" rel="noreferrer">Get directions →</a></div>
        </section>
      )}

      {view === 'contact' && <Booking booked={booked} setBooked={setBooked} compact addBooking={addBooking} />}
    </main>
  );
}

function Home({ go }: { go: (view: View) => void }) {
  const featureData = [
    { title: 'Accommodation', copy: 'A calm, comfortable place to stay in Njoro.', image: photos.accommodation, target: 'stay' as View },
    { title: 'Grill & Lounge', copy: 'A relaxed setting for dining and time together.', image: photos.lounge, target: 'menu' as View },
    { title: 'Grounds & Gatherings', copy: 'A green setting for celebrations, meetings and gatherings.', image: photos.garden, target: 'events' as View },
  ];
  return (
    <main>
      <section className="hero"><div className="hero-visual"><div className="hero-photo reveal-image" style={{ backgroundImage: `url(${photos.hero})` }}><span>GREEN PARK HOTEL · NJORO</span></div></div><div className="hero-copy"><span className="eyebrow reveal-up">WELCOME TO GREEN PARK HOTEL</span><h1 className="reveal-up delay-1">Stay close to what matters.</h1><p className="reveal-up delay-2">A welcoming digital front door for Green Park Hotel in Njoro — calm, useful and rooted in the real property.</p><div className="hero-actions reveal-up delay-3"><button className="dark-button" onClick={() => go('book')}>Book / Enquire</button><button className="text-button" onClick={() => go('stay')}>Explore the hotel →</button></div></div></section>
      <section className="intro"><span className="eyebrow">THE EXPERIENCE</span><h2>Stay. Dine. Gather. Explore.</h2><p>One clear journey from discovering the hotel to making an enquiry.</p></section>
      <section className="feature-strip">{featureData.map((item) => <button key={item.title} className="feature hover-lift" onClick={() => go(item.target)}><span className="feature-photo" style={{ backgroundImage: `url(${item.image})` }} /><span><small>GREEN PARK</small><b>{item.title}</b><em>{item.copy}</em></span><i>↗</i></button>)}</section>
      <section className="home-cta"><div><span className="eyebrow">YOUR NEXT VISIT</span><h2>Make your enquiry in a few steps.</h2><p>No guest account required.</p></div><button className="dark-button" onClick={() => go('book')}>Start an enquiry →</button></section>
    </main>
  );
}

function Booking({ booked, setBooked, compact = false, addBooking }: { booked: boolean; setBooked: (value: boolean) => void; compact?: boolean; addBooking: (booking: BookingItem) => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', service: 'Accommodation', message: '' });
  const reference = useMemo(() => `GP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, [booked]);
  return (
    <section className={compact ? 'booking compact page' : 'booking page'}>
      <div className="page-head"><span className="eyebrow">GUEST ENQUIRY</span><h1>{booked ? 'Request received' : 'Plan your stay'}</h1><p>{booked ? `Reference ${reference} · Your request is ready for the hotel team.` : 'No guest account is required. Send the hotel your preferred date and contact details.'}</p></div>
      {booked ? (
        <div className="confirmation"><span className="check">✓</span><h2>Your enquiry is on its way.</h2><p>For this demo build, the request is added to the local admin queue. Production email/SMS delivery will connect at the backend stage.</p><button className="dark-button" onClick={() => setBooked(false)}>Create another enquiry</button></div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); addBooking({ id: reference, name: form.name, phone: form.phone, date: form.date, service: form.service, status: 'Pending' }); setBooked(true); }}>
          <div><label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>Phone<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+254 …" /></label></div>
          <div><label>Email <em>optional</em><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><label>Preferred date<input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label></div>
          <label>What can we help with?<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}><option>Accommodation</option><option>Dining</option><option>Event / meeting</option><option>General enquiry</option></select></label>
          <label>Message<textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell the hotel what you need…" /></label>
          <button className="dark-button" type="submit">Send enquiry →</button>
        </form>
      )}
    </section>
  );
}

function AdminPortal({
  menuItems, setMenuItems, events, setEvents, rooms, setRooms, bookings, setBookings, enquiries, setEnquiries, contentNotice, setContentNotice, onBack,
}: {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  rooms: RoomItem[];
  setRooms: React.Dispatch<React.SetStateAction<RoomItem[]>>;
  bookings: BookingItem[];
  setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
  enquiries: EnquiryItem[];
  setEnquiries: React.Dispatch<React.SetStateAction<EnquiryItem[]>>;
  contentNotice: string;
  setContentNotice: React.Dispatch<React.SetStateAction<string>>;
  onBack: () => void;
}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<AdminTab>('Overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const tabs: AdminTab[] = ['Overview', 'Rooms', 'Menu', 'Events', 'Gallery', 'Bookings', 'Enquiries', 'Content', 'Settings'];

  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} onBack={onBack} />;

  const selectTab = (next: AdminTab) => { setTab(next); setMobileOpen(false); };

  return (
    <div className="admin-root">
      <div className="admin-mobile-bar"><button onClick={() => setMobileOpen((value) => !value)}>Menu</button><b>GREEN PARK · ADMIN</b><button onClick={onBack}>Website</button></div>
      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="admin-side-brand"><span className="admin-side-mark">G</span><div><b>GREEN PARK</b><small>ADMIN CONTROL ROOM</small></div></div>
        <div className="admin-nav">{tabs.map((item) => <button key={item} className={tab === item ? 'selected' : ''} onClick={() => selectTab(item)}>{item}</button>)}</div>
        <button className="admin-signout" onClick={() => setLoggedIn(false)}>Sign out</button>
      </aside>
      <section className="admin-main">
        <div className="admin-toolbar"><div><span className="admin-kicker">CONTROL ROOM</span><h1>{tab}</h1></div><div className="admin-actions"><button className="admin-top-button" onClick={onBack}>View website</button>{tab !== 'Overview' && tab !== 'Settings' && <button className="admin-primary" onClick={() => setModal(tab)}>Add / create</button>}</div></div>
        {tab === 'Overview' && <AdminOverview counts={{ bookings: bookings.length, enquiries: enquiries.length, events: events.length, menu: menuItems.length }} onSelect={selectTab} />}
        {tab === 'Rooms' && <RoomManager rooms={rooms} setRooms={setRooms} onAdd={() => setModal('Rooms')} />}
        {tab === 'Menu' && <MenuManager items={menuItems} setItems={setMenuItems} onAdd={() => setModal('Menu')} />}
        {tab === 'Events' && <EventManager items={events} setItems={setEvents} onAdd={() => setModal('Events')} />}
        {tab === 'Gallery' && <GalleryManager onAdd={() => setModal('Gallery')} />}
        {tab === 'Bookings' && <BookingManager bookings={bookings} setBookings={setBookings} />}
        {tab === 'Enquiries' && <EnquiryManager enquiries={enquiries} setEnquiries={setEnquiries} />}
        {tab === 'Content' && <ContentManager notice={contentNotice} onSave={() => setContentNotice('Homepage copy marked for review. Production publishing will connect after backend setup.')} />}
        {tab === 'Settings' && <SettingsPanel />}
      </section>
      {modal && <AdminModal type={modal} close={() => setModal(null)} addRoom={(item) => { setRooms((v) => [...v, item]); setModal(null); }} addMenu={(item) => { setMenuItems((v) => [...v, item]); setModal(null); }} addEvent={(item) => { setEvents((v) => [...v, item]); setModal(null); }} />}
    </div>
  );
}

function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return <div className="admin-login"><div className="admin-login-card"><div className="admin-login-brand"><span className="brand-mark">G</span><div><b>GREEN PARK</b><small>HOTEL · NJORO</small></div></div><span className="admin-kicker">STAFF ACCESS</span><h1>Admin control room</h1><p>Secure staff access for managing hotel content, enquiries and bookings.</p><form className="admin-form" onSubmit={(e) => { e.preventDefault(); if (email.trim() && password.trim()) onLogin(); }}><label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@example.com" /></label><label>Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></label><button className="admin-primary" type="submit">Sign in</button></form><p className="admin-demo-note">Demo UI only: authentication is not connected to a real server yet. Any non-empty email and password opens the local presentation admin.</p><button className="admin-top-button" onClick={onBack}>← Back to website</button></div></div>;
}

function AdminOverview({ counts, onSelect }: { counts: { bookings: number; enquiries: number; events: number; menu: number }; onSelect: (tab: AdminTab) => void }) {
  return <div className="admin-page-grid"><div className="admin-stats">{[['Bookings', counts.bookings], ['Enquiries', counts.enquiries], ['Events', counts.events], ['Menu items', counts.menu]].map(([label, value]) => <article className="admin-card admin-stat" key={String(label)}><span>{label}</span><strong>{value}</strong><small>Current local demo state</small></article>)}</div><div className="admin-grid"><section className="admin-card"><div className="admin-card-head"><h2>Quick actions</h2><span className="admin-pill">No fake records</span></div><div className="admin-card-body"><div className="admin-quick"><button onClick={() => onSelect('Rooms')}>Add a room<span>Publish approved accommodation details.</span></button><button onClick={() => onSelect('Menu')}>Add menu item<span>Build the live dining list.</span></button><button onClick={() => onSelect('Events')}>Create an event<span>Add a real date, venue and status.</span></button><button onClick={() => onSelect('Gallery')}>Manage gallery<span>Use the hotel photography.</span></button></div></div></section><section className="admin-card"><div className="admin-card-head"><h2>Workflow</h2></div><div className="admin-card-body admin-list"><div className="admin-list-row"><b>Guest enquiry</b><span className="admin-pill">→ Bookings</span></div><div className="admin-list-row"><b>Staff update</b><span className="admin-pill">→ Publish</span></div><div className="admin-list-row"><b>Website</b><span className="admin-pill">→ Reflect changes</span></div></div></section></div><section className="admin-card"><div className="admin-card-head"><h2>Production boundary</h2></div><div className="admin-card-body"><div className="admin-note">This control room is intentionally a working frontend demo. Real password authentication, database persistence, email/SMS delivery, image storage and audit logs should be connected before hotel staff use it operationally.</div></div></section></div>;
}

function RoomManager({ rooms, setRooms, onAdd }: { rooms: RoomItem[]; setRooms: React.Dispatch<React.SetStateAction<RoomItem[]>>; onAdd: () => void }) {
  return <section className="admin-card"><div className="admin-card-head"><h2>Accommodation records</h2><button className="admin-primary" onClick={onAdd}>Add room</button></div>{rooms.length === 0 ? <div className="admin-empty"><strong>No room records yet.</strong><p>Keep this empty until the hotel approves room names, descriptions and rates.</p><button className="admin-primary" onClick={onAdd}>Create first room</button></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Description</th><th>Price</th><th>Status</th><th /></tr></thead><tbody>{rooms.map((room) => <tr key={room.id}><td>{room.name}</td><td>{room.description}</td><td>{room.price || 'On enquiry'}</td><td>{room.status}</td><td><div className="admin-row-actions"><button onClick={() => setRooms((v) => v.filter((item) => item.id !== room.id))}>Delete</button></div></td></tr>)}</tbody></table></div>}</section>;
}

function MenuManager({ items, setItems, onAdd }: { items: MenuItem[]; setItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; onAdd: () => void }) {
  return <section className="admin-card"><div className="admin-card-head"><h2>Dining menu</h2><button className="admin-primary" onClick={onAdd}>Add menu item</button></div>{items.length === 0 ? <div className="admin-empty"><strong>No menu items yet.</strong><p>Add only dishes and prices approved by the hotel team.</p><button className="admin-primary" onClick={onAdd}>Create first item</button></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Availability</th><th /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.category}</td><td>{item.price}</td><td>{item.available ? 'Available' : 'Hidden'}</td><td><div className="admin-row-actions"><button onClick={() => setItems((v) => v.filter((entry) => entry.id !== item.id))}>Delete</button></div></td></tr>)}</tbody></table></div>}</section>;
}

function EventManager({ items, setItems, onAdd }: { items: EventItem[]; setItems: React.Dispatch<React.SetStateAction<EventItem[]>>; onAdd: () => void }) {
  return <section className="admin-card"><div className="admin-card-head"><h2>Event publishing</h2><button className="admin-primary" onClick={onAdd}>Create event</button></div>{items.length === 0 ? <div className="admin-empty"><strong>No events published.</strong><p>Use real hotel event dates and details. Do not populate this section with placeholders.</p><button className="admin-primary" onClick={onAdd}>Create first event</button></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Event</th><th>Date</th><th>Venue</th><th>Status</th><th /></tr></thead><tbody>{items.map((event) => <tr key={event.id}><td>{event.name}</td><td>{event.date} · {event.time}</td><td>{event.venue}</td><td>{event.status}</td><td><div className="admin-row-actions"><button onClick={() => setItems((v) => v.filter((entry) => entry.id !== event.id))}>Delete</button></div></td></tr>)}</tbody></table></div>}</section>;
}

function GalleryManager({ onAdd }: { onAdd: () => void }) {
  return <div className="admin-two-col"><section className="admin-card"><img className="admin-preview-image" src={photos.hero} alt="Green Park Hotel evening exterior" /><div className="admin-card-body"><span className="admin-kicker">CURRENT PROPERTY PHOTOGRAPHY</span><h2>Gallery asset management</h2><p className="admin-note">This build uses the real hotel photography already committed to the repository. A production upload pipeline should validate, resize, compress and generate responsive WebP/AVIF variants before publishing.</p><button className="admin-primary" onClick={onAdd}>Upload / add media</button></div></section><section className="admin-card"><div className="admin-card-head"><h2>Gallery rules</h2></div><div className="admin-card-body admin-list"><div className="admin-list-row"><b>Optimize</b><span>WebP / AVIF</span></div><div className="admin-list-row"><b>Load</b><span>Responsive sizes</span></div><div className="admin-list-row"><b>Publish</b><span>Only approved images</span></div><div className="admin-list-row"><b>Protect</b><span>Private originals</span></div></div></section></div>;
}

function BookingManager({ bookings, setBookings }: { bookings: BookingItem[]; setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>> }) {
  return <section className="admin-card"><div className="admin-card-head"><h2>Guest booking requests</h2><span className="admin-pill">{bookings.length} request{bookings.length === 1 ? '' : 's'}</span></div>{bookings.length === 0 ? <div className="admin-empty"><strong>No booking requests yet.</strong><p>Guest enquiries will appear here after someone submits the public booking form.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Guest</th><th>Phone</th><th>Date</th><th>Service</th><th>Status</th><th /></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.name}</td><td>{booking.phone}</td><td>{booking.date}</td><td>{booking.service}</td><td><select value={booking.status} onChange={(e) => setBookings((current) => current.map((item) => item.id === booking.id ? { ...item, status: e.target.value as BookingItem['status'] } : item))}><option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></select></td><td><div className="admin-row-actions"><button onClick={() => setBookings((current) => current.filter((item) => item.id !== booking.id))}>Archive</button></div></td></tr>)}</tbody></table></div>}</section>;
}

function EnquiryManager({ enquiries, setEnquiries }: { enquiries: EnquiryItem[]; setEnquiries: React.Dispatch<React.SetStateAction<EnquiryItem[]>> }) {
  return <section className="admin-card"><div className="admin-card-head"><h2>General enquiries</h2><span className="admin-pill">{enquiries.length} records</span></div>{enquiries.length === 0 ? <div className="admin-empty"><strong>No general enquiries yet.</strong><p>This area is ready for contact-form submissions once a production backend is connected.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Status</th></tr></thead><tbody>{enquiries.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.phone}</td><td>{item.message}</td><td><button className="admin-top-button" onClick={() => setEnquiries((current) => current.map((entry) => entry.id === item.id ? { ...entry, status: entry.status === 'Read' ? 'Unread' : 'Read' } : entry))}>{item.status}</button></td></tr>)}</tbody></table></div>}</section>;
}

function ContentManager({ notice, onSave }: { notice: string; onSave: () => void }) {
  const [headline, setHeadline] = useState('Stay close to what matters.');
  const [intro, setIntro] = useState('A welcoming digital front door for Green Park Hotel in Njoro.');
  return <section className="admin-card"><div className="admin-card-head"><h2>Website content</h2><span className="admin-pill">Draft workspace</span></div><div className="admin-card-body"><form className="admin-form" onSubmit={(e) => { e.preventDefault(); onSave(); }}><div className="admin-form-grid"><label>Homepage headline<input value={headline} onChange={(e) => setHeadline(e.target.value)} /></label><label>Homepage introduction<input value={intro} onChange={(e) => setIntro(e.target.value)} /></label></div><label>Publishing note<textarea defaultValue="Use this workspace for approved homepage, About, contact and announcement copy. Database-backed version will publish changes safely after authentication is connected." /></label><div className="admin-form-actions"><button className="admin-primary">Save draft</button></div></form><p className="admin-note" style={{ marginTop: 16 }}>{notice}</p></div></section>;
}

function SettingsPanel() {
  return <div className="admin-two-col"><section className="admin-card"><div className="admin-card-head"><h2>Hotel website settings</h2></div><div className="admin-card-body admin-list"><div className="admin-list-row"><b>Site</b><span>Green Park Hotel · Njoro</span></div><div className="admin-list-row"><b>Guest accounts</b><span>Not required</span></div><div className="admin-list-row"><b>Booking mode</b><span>Request first; confirm through staff</span></div><div className="admin-list-row"><b>Admin auth</b><span>Demo only in current frontend</span></div></div></section><section className="admin-card"><div className="admin-card-head"><h2>Next production connections</h2></div><div className="admin-card-body admin-list"><div className="admin-list-row"><b>Authentication</b><span>Secure server session</span></div><div className="admin-list-row"><b>Database</b><span>PostgreSQL target</span></div><div className="admin-list-row"><b>Notifications</b><span>Email / SMS provider</span></div><div className="admin-list-row"><b>Storage</b><span>Optimized image pipeline</span></div></div></section></div>;
}

function AdminModal({ type, close, addRoom, addMenu, addEvent }: { type: string; close: () => void; addRoom: (item: RoomItem) => void; addMenu: (item: MenuItem) => void; addEvent: (item: EventItem) => void }) {
  const [room, setRoom] = useState({ name: '', description: '', price: '' });
  const [menu, setMenu] = useState({ name: '', category: 'Lunch & Grill', description: '', price: '' });
  const [event, setEvent] = useState({ name: '', date: '', time: '', venue: '', description: '', status: 'Draft' as EventItem['status'] });
  const [galleryNote, setGalleryNote] = useState('');
  const formTitle = type === 'Rooms' ? 'Add accommodation' : type === 'Menu' ? 'Add menu item' : type === 'Events' ? 'Create event' : 'Add gallery media';
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'Rooms') addRoom({ ...room, id: crypto.randomUUID(), status: 'Draft' });
    else if (type === 'Menu') addMenu({ ...menu, id: crypto.randomUUID(), available: true });
    else if (type === 'Events') addEvent({ ...event, id: crypto.randomUUID() });
    else close();
  };
  return <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.currentTarget === e.target) close(); }}><div className="admin-modal"><div className="admin-modal-head"><h2>{formTitle}</h2><button className="admin-close" onClick={close}>×</button></div>{type === 'Gallery' ? <div className="admin-form"><label>Image file<input type="file" accept="image/*" onChange={(e) => setGalleryNote(e.target.files?.[0]?.name ?? '')} /></label>{galleryNote && <div className="admin-note">Selected: {galleryNote}. Production upload processing is the next backend step.</div>}<div className="admin-form-actions"><button className="admin-top-button" onClick={close}>Close</button></div></div> : <form className="admin-form" onSubmit={submit}>{type === 'Rooms' && <><div className="admin-form-grid"><label>Room name<input required value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })} placeholder="Approved room name" /></label><label>Approved rate<input value={room.price} onChange={(e) => setRoom({ ...room, price: e.target.value })} placeholder="e.g. KSh … or On enquiry" /></label></div><label>Description<textarea required value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })} /></label></>}{type === 'Menu' && <><div className="admin-form-grid"><label>Item name<input required value={menu.name} onChange={(e) => setMenu({ ...menu, name: e.target.value })} /></label><label>Category<select value={menu.category} onChange={(e) => setMenu({ ...menu, category: e.target.value })}><option>Breakfast & light bites</option><option>Lunch & Grill</option><option>Drinks & Lounge</option></select></label></div><div className="admin-form-grid"><label>Description<textarea required value={menu.description} onChange={(e) => setMenu({ ...menu, description: e.target.value })} /></label><label>Price<input required value={menu.price} onChange={(e) => setMenu({ ...menu, price: e.target.value })} placeholder="Approved price" /></label></div></>}{type === 'Events' && <><div className="admin-form-grid"><label>Event name<input required value={event.name} onChange={(e) => setEvent({ ...event, name: e.target.value })} /></label><label>Venue<input required value={event.venue} onChange={(e) => setEvent({ ...event, venue: e.target.value })} /></label></div><div className="admin-form-grid"><label>Date<input required type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} /></label><label>Time<input required value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} placeholder="e.g. 18:00–21:00" /></label></div><label>Description<textarea required value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} /></label><label>Status<select value={event.status} onChange={(e) => setEvent({ ...event, status: e.target.value as EventItem['status'] })}><option>Draft</option><option>Published</option><option>Cancelled</option></select></label></>}{type !== 'Gallery' && <div className="admin-form-actions"><button type="button" className="admin-top-button" onClick={close}>Cancel</button><button className="admin-primary" type="submit">Save</button></div>}</form>}</div></div>;
}

createRoot(document.getElementById('root')!).render(<App />);
