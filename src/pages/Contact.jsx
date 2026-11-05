import { useEffect, useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';

export default function Contact() {
  const [site, setSite] = useState({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Admission Enquiry', message: '' });

  useEffect(() => {
    api.get('/content/site').then(r => setSite(r.data || {})).catch(() => {});
  }, []);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/enquiries', form);
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero title="Contact Us" crumb="Contact" />
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <span className="section-label">Get in Touch</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 24 }}>We'd Love to Hear From You</h2>
              <div className="contact-info-list">
                <div className="contact-info-item"><div className="contact-info-icon">🏫</div><div><h4>School</h4><p>Pt. Harishankar Shukla English Medium Higher Secondary School</p></div></div>
                <div className="contact-info-item"><div className="contact-info-icon">📍</div><div><h4>Address</h4><p>{site.address || 'Shankar Nagar, Raipur'}</p></div></div>
                <div className="contact-info-item"><div className="contact-info-icon">📞</div><div><h4>Phone</h4><p>{site.phone || '+91-9516011227'}</p></div></div>
                <div className="contact-info-item"><div className="contact-info-icon">✉️</div><div><h4>Email</h4><p>{site.email || 'hsems51@gmail.com'}</p></div></div>
                <div className="contact-info-item"><div className="contact-info-icon">💬</div><div><h4>WhatsApp</h4><p><a href="https://wa.me/919516011227" target="_blank" rel="noreferrer" style={{ color: '#25d366', fontWeight: 600 }}>+91-9516011227 (Enquire on WhatsApp)</a></p></div></div>
                <div className="contact-info-item"><div className="contact-info-icon">🕐</div><div><h4>Office Hours</h4><p>{site.timings || 'Mon–Sat 8:00 AM – 2:00 PM'}</p></div></div>
              </div>
            </div>
            <div className="contact-form">
              <h3 style={{ marginBottom: 18, color: 'var(--navy-mid)' }}>Send a Message</h3>
              {submitted ? (
                <div style={{ padding: 24, background: '#dcfce7', color: '#166534', borderRadius: 12, textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: 6 }}>✅ Message Sent Successfully!</h4>
                  <p style={{ fontSize: '0.9rem' }}>Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-navy" style={{ marginTop: 14 }}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  {error && <div style={{ color: '#dc2626', background: '#fee2e2', padding: 10, borderRadius: 8, marginBottom: 14, fontSize: '0.85rem' }}>{error}</div>}
                  <div className="form-row">
                    <div className="form-group"><label>Your Name *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" /></div>
                    <div className="form-group"><label>Phone *</label><input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" /></div>
                  </div>
                  <div className="form-group"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your.email@gmail.com" /></div>
                  <div className="form-group"><label>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                      <option>Admission Enquiry</option><option>General Enquiry</option><option>Feedback</option><option>Other</option>
                    </select>
                  </div>
                  <div className="form-group"><label>Message *</label><textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Write your query or message here..." /></div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                    {loading ? 'Sending Message...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
