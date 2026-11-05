import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  const [about, setAbout] = useState(null);
  useEffect(() => {
    api.get('/content/about').then(r => setAbout(r.data)).catch(() => {});
  }, []);
  const a = about || {};
  return (
    <>
      <PageHero title="About Our School" crumb="About" />
      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="two-col">
              <div className="two-col-img">🏫</div>
              <div className="two-col-text">
                <span className="section-label">Our Story</span>
                <h2>{a.title || 'Our School'}</h2>
                {(a.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
                <Link to="/admissions" className="btn btn-navy" style={{ marginTop: 8 }}>Apply for Admission</Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section section-soft">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Leadership</span>
              <h2 className="section-title">Messages from Our Leadership</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* 1. Chairman's Message (First) */}
              {(a.chairmanMessage || a.chairmanName) && (
                <div className="principal-card">
                  <div className="principal-photo">
                    {a.chairmanImage ? (
                      <img src={imageSrc(a.chairmanImage)} alt={a.chairmanName || 'Chairman'} />
                    ) : (
                      a.chairmanInitials || 'SS'
                    )}
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', background: 'var(--navy-mid)', color: '#fff', padding: '3px 12px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: 10 }}>👑 Chairman's Message</span>
                    <blockquote>"{a.chairmanMessage || 'Our commitment is to empower every student with knowledge, wisdom, and strong moral character.'}"</blockquote>
                    <div className="principal-name" style={{ marginTop: 12 }}>{a.chairmanName || 'Shri Sushil Shukla'}</div>
                    <div className="principal-role">{a.chairmanRole || 'Chairman'}</div>
                  </div>
                </div>
              )}

              {/* 2. Principal's Message (Second) */}
              <div className="principal-card">
                <div className="principal-photo">
                  {a.principalImage ? (
                    <img src={imageSrc(a.principalImage)} alt={a.principalName || 'Principal'} />
                  ) : (
                    a.principalInitials || 'TS'
                  )}
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', background: 'var(--royal-blue)', color: '#fff', padding: '3px 12px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-block', marginBottom: 10 }}>🎓 Principal's Message</span>
                  <blockquote>"{a.principalMessage || 'Education is not merely about academic achievement; it is about developing responsible, confident and compassionate individuals.'}"</blockquote>
                  <div className="principal-name" style={{ marginTop: 12 }}>{a.principalName || 'Mrs. Tripati Shrivastava'}</div>
                  <div className="principal-role">{a.principalRole || 'Principal'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Vision</span>
              <h2 className="section-title">Mission & Values</h2>
            </div>
            <div className="cards-grid">
              <div className="card"><div className="card-icon">🎯</div><h3>Our Mission</h3><p>{a.mission}</p></div>
              <div className="card"><div className="card-icon">👁️</div><h3>Our Vision</h3><p>{a.vision}</p></div>
              <div className="card"><div className="card-icon">❤️</div><h3>Our Values</h3><p>{a.values}</p></div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
