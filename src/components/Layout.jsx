import { useState, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import api from '../api/client';
import NoticeTicker from './NoticeTicker';
import { FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'Notices' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/contact', label: 'Contact' }
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [site, setSite] = useState({
    phone: '+91-9516011227',
    email: 'hsems51@gmail.com',
    address: 'Shankar Nagar, Raipur',
    topbarNote: 'Admissions Open 2026–27'
  });

  useEffect(() => {
    api.get('/content/site').then(r => r.data && setSite(s => ({ ...s, ...r.data }))).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span className="topbar-item"><FaMapMarkerAlt style={{ color: 'var(--gold)' }} /> {site.address}</span>
            <span className="topbar-item"><FaPhoneAlt style={{ color: 'var(--gold)' }} /> {site.phone}</span>
            <span className="topbar-item"><FaEnvelope style={{ color: 'var(--gold)' }} /> {site.email}</span>
          </div>
          <div className="topbar-right">
            <a href="https://wa.me/919516011227?text=Hello,%20I%20would%20like%20to%20enquire%20about%20admission%20at%20Pt.%20Harishankar%20Shukla%20School%20for%20my%20child." target="_blank" rel="noreferrer" className="topbar-item" style={{ color: '#25d366', fontWeight: 600 }}>
              <FaWhatsapp style={{ fontSize: '1rem' }} /> WhatsApp Enquiry
            </a>
            <Link to="/admissions" className="topbar-item" style={{ background: 'var(--gold)', color: '#000', padding: '2px 10px', borderRadius: 4, fontWeight: 600 }}>{site.topbarNote}</Link>
          </div>
        </div>
      </div>

      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="container header-content">
          <Link to="/" className="logo-area" onClick={close}>
            <img src="/logo.png" alt="School Logo" className="logo-img" />
            <div className="school-name">
              <h1 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Pt. Harishankar Shukla</h1>
              <p style={{ fontSize: '0.72rem', opacity: 0.85, fontWeight: 500 }}>English Medium H.S. School</p>
            </div>
          </Link>
          <nav className={`nav${open ? ' active' : ''}`} id="nav">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/admissions" className="nav-link nav-cta" onClick={close}>Apply Now</Link>
          </nav>
          <button
            className={`menu-btn${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 998
          }}
        />
      )}

      <NoticeTicker />

      <Outlet />

      {/* Floating WhatsApp Widget */}
      <a
        href="https://wa.me/919516011227?text=Hello,%20I%20would%20like%20to%20enquire%20about%20admission%20at%20Pt.%20Harishankar%20Shukla%20School%20for%20my%20child."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Enquire on WhatsApp"
      >
        <span className="whatsapp-icon"><FaWhatsapp /></span>
        <span>WhatsApp Us</span>
      </a>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo-area">
                <img src="/logo.png" alt="School Logo" className="logo-img" />
                <div className="school-name">
                  <h1>Pt. Harishankar Shukla</h1>
                  <p>English Medium H.S. School</p>
                </div>
              </Link>
              <p>Nurturing knowledge, character, and excellence through quality English medium education in {site.address}.</p>

              <div className="social-links" style={{
                marginTop:"10px",
                fontSize:'1.6rem',
                display:"flex",
                gap:'16px'
              }}>
                <a href="https://www.facebook.com/Pt.Hsshs/">
                  <FaFacebook/>
                </a>
                <a href="https://www.instagram.com/pt_harishankarschool/">
                <FaSquareInstagram />
                </a>
              </div>
           
           
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/academics">Academics</Link></li>
                <li><Link to="/admissions">Admissions 2026–27</Link></li>
                <li><Link to="/faculty">Our Faculty</Link></li>
                <li><a href="https://wa.me/919516011227" target="_blank" rel="noreferrer" style={{ color: '#25d366', display: 'inline-flex', alignItems: 'center', gap: 6 }}><FaWhatsapp /> Enquire on WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4>Faculty &amp; Campus</h4>
              <ul className="footer-links">
                <li><Link to="/faculty">Faculty Roster</Link></li>
                <li><Link to="/student-life">Student Life</Link></li>
                <li><Link to="/gallery">Photo Gallery</Link></li>
                <li><Link to="/achievements">Achievements</Link></li>
                <li><Link to="/news">Notices &amp; Events</Link></li>
              </ul>
            </div>
            <div>
              <h4>Contact Info</h4>
              <ul className="footer-links">
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FaMapMarkerAlt style={{ color: 'var(--gold)', flexShrink: 0 }} /> {site.address}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FaPhoneAlt style={{ color: 'var(--gold)', flexShrink: 0 }} /> {site.phone}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FaEnvelope style={{ color: 'var(--gold)', flexShrink: 0 }} /> {site.email}</li>
                <li><Link to="/contact">Send Message →</Link></li>
              </ul>
            </div>
            <div className="footer-map-col">
              <h4><FaMapMarkerAlt style={{ color: 'var(--gold)', marginRight: 6 }} />Location Map</h4>
              <div className="footer-map-frame">
                <iframe
                  title="School Location Map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('Pt. Harishankar Shukla English Medium Higher Secondary School Shankar Nagar Raipur')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Pt. Harishankar Shukla English Medium Higher Secondary School Shankar Nagar Raipur')}`}
                target="_blank"
                rel="noreferrer"
                className="footer-map-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <FaMapMarkedAlt /> Open in Google Maps ↗
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Pt. Harishankar Shukla English Medium Higher Secondary School. All rights reserved.</p>
            <p>Empowering students through quality education.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
