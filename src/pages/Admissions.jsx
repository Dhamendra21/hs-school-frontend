import { useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';

const classesOffered = [
  { level: 'Pre-Primary', grades: 'Nursery, LKG, UKG', desc: 'Playful, activity-based learning focusing on motor skills and language.' },
  { level: 'Primary School', grades: 'Classes I to V', desc: 'Building strong foundation in English, Mathematics, Science & Values.' },
  { level: 'Middle School', grades: 'Classes VI to VIII', desc: 'Conceptual learning, computer education, and interactive activities.' },
  { level: 'Secondary School', grades: 'Classes IX & X', desc: 'Rigorous preparation for board examinations with lab practicals.' },
  { level: 'Higher Secondary', grades: 'Classes XI & XII', desc: 'Specialized streams: Science, Commerce, and Humanities/Arts.' }
];

const processSteps = [
  { n: '01', t: 'Enquiry', d: 'Submit online form or visit campus to get detailed prospectus & seat availability.' },
  { n: '02', t: 'Registration', d: 'Fill the official registration form along with required student documents.' },
  { n: '03', t: 'Interaction', d: 'Informal student & parent interaction with principal / academic coordinator.' },
  { n: '04', t: 'Verification', d: 'Document verification including birth certificate & previous report cards.' },
  { n: '05', t: 'Confirmation', d: 'Complete fee submission formalities and confirm student enrollment.' }
];

export default function Admissions() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: 'Admission Enquiry (Session 2026-27)', message: '' });
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/enquiries', form);
      setSubmittedPhone(form.phone);
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', subject: 'Admission Enquiry (Session 2026-27)', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadProspectus = () => {
    alert('Prospectus download started.\n\n(Official school prospectus PDF will be downloaded.)');
  };

  return (
    <>
      <PageHero title="Admissions 2026–27" crumb="Admissions" />

      {/* Header Banner */}
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
          <span className="section-label">Admissions Open</span>
          <h2 className="section-title">Join Pt. Harishankar Shukla School</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            We welcome applications for students seeking quality English medium education in a disciplined, caring, and modern academic environment.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={downloadProspectus} className="btn btn-navy">
              📄 Download School Prospectus
            </button>
            <a href="https://wa.me/919516011227?text=Hello,%20I%20would%20like%20to%20enquire%20about%20admission" target="_blank" rel="noreferrer" className="btn btn-outline-dark">
              💬 Direct WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Classes Offered */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Programs</span>
            <h2 className="section-title">Classes &amp; Academic Streams</h2>
          </div>
          <div className="highlights-grid">
            {classesOffered.map((c, i) => (
              <div className="highlight-card" key={i}>
                <div className="highlight-icon">🎒</div>
                <h3>{c.level}</h3>
                <div style={{ color: 'var(--royal-blue)', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>{c.grades}</div>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Admission Process */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Roadmap</span>
            <h2 className="section-title">5-Step Admission Process</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((s) => (
              <div className="process-step" key={s.n}>
                <div className="process-num">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Enquiry Form */}
      <section className="section section-soft">
        <div className="container">
          <div className="contact-layout">
            <div>
              <span className="section-label">Apply Online</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 20 }}>Submit Admission Enquiry</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.7 }}>
                Fill out this quick form and our admissions team will contact you shortly regarding seats, fee structure, and campus visit.
              </p>
              <div style={{ background: '#fff', padding: 24, borderRadius: 16, border: '1px solid var(--border)', marginBottom: 20 }}>
                <h4 style={{ color: 'var(--navy-mid)', marginBottom: 12 }}>📋 Required Documents for Admission:</h4>
                <ul style={{ listStyle: 'disc', paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  <li>Birth Certificate (for Pre-Primary &amp; Primary)</li>
                  <li>Previous School Transfer Certificate (TC)</li>
                  <li>Recent Passport Size Photographs (4 Copies)</li>
                  <li>Aadhar Card Copy of Student &amp; Parents</li>
                  <li>Previous Class Marksheet</li>
                </ul>
              </div>
            </div>

            <div className="contact-form">
              <h3 style={{ marginBottom: 18, color: 'var(--navy-mid)' }}>Online Admission Form</h3>
              {submitted ? (
                <div style={{ padding: 28, background: '#dcfce7', color: '#166534', borderRadius: 12, textAlign: 'center' }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: 8 }}>✅ Enquiry Submitted Successfully!</h4>
                  <p style={{ fontSize: '0.95rem' }}>Thank you for reaching out to Pt. Harishankar Shukla School. Our admissions team will contact you on <strong>{submittedPhone}</strong> shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-navy" style={{ marginTop: 16 }}>Submit Another Enquiry</button>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  {error && <div style={{ color: '#dc2626', background: '#fee2e2', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: '0.9rem' }}>{error}</div>}
                  <div className="form-group">
                    <label>Parent / Guardian Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Mobile Number *</label>
                      <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your.email@gmail.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Applying for Class / Grade *</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                      <option>Nursery / LKG / UKG</option>
                      <option>Class I – V</option>
                      <option>Class VI – VIII</option>
                      <option>Class IX – X</option>
                      <option>Class XI – Science</option>
                      <option>Class XI – Commerce</option>
                      <option>Class XI – Humanities/Arts</option>
                      <option>Class XII</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message / Specific Queries *</label>
                    <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Mention student name, previous school, or any specific questions..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                    {loading ? 'Submitting Enquiry...' : 'Submit Admission Enquiry →'}
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
