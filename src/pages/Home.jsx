import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import HeroSlider from '../components/HeroSlider';
import SitePopup from '../components/SitePopup';
import ScrollReveal from '../components/ScrollReveal';
import {
  FaGraduationCap,
  FaSchool,
  FaChalkboardTeacher,
  FaBus,
  FaCrown,
  FaFilePdf,
  FaImage,
  FaBullhorn,
  FaEye,
  FaDownload,
  FaStar,
  FaWhatsapp,
  FaMicroscope,
  FaBook
} from 'react-icons/fa';

export default function Home() {
  const [content, setContent] = useState({});
  const [notices, setNotices] = useState([]);
  const [activeNotice, setActiveNotice] = useState(null);
  const [showAttachment, setShowAttachment] = useState(true);

  useEffect(() => {
    api.get('/content').then((r) => setContent(r.data || {})).catch(() => {});
    api.get('/notices').then((r) => setNotices((r.data || []).slice(0, 3))).catch(() => {});
  }, []);

  const openNoticeModal = (n) => {
    setActiveNotice(n);
    setShowAttachment(true);
  };

  const why = content.why || [
    { title: '30+ Years of Excellence', text: 'A trusted educational institution with a proven legacy of academic & moral excellence.' },
    { title: 'Experienced & Caring Faculty', text: 'Dedicated teachers focusing on individual attention and personal development.' },
    { title: 'Modern Learning Infrastructure', text: 'Smart classrooms, practical science labs, and technology-enabled learning.' },
    { title: 'Safe & Secure Campus', text: 'Caring, disciplined, and CCTV monitored environment for every child.' },
    { title: 'Holistic Student Growth', text: 'Balanced focus on academics, sports, cultural activities, and leadership skills.' },
    { title: 'Strong Foundation', text: 'Comprehensive English medium curriculum from Nursery through Class XII.' }
  ];

  const testimonials = content.testimonials || [
    { stars: 5, text: 'Pt. Harishankar Shukla School provides an outstanding academic foundation and great discipline for my children.', name: 'Rakesh Sharma', role: 'Parent of Class X Student', initials: 'RS' },
    { stars: 5, text: 'The teachers are immensely supportive and focused on both studies and character building.', name: 'Priya Verma', role: 'Parent of Class VII Student', initials: 'PV' },
    { stars: 5, text: 'Clean campus, excellent lab facilities, and very accessible management.', name: 'Sanjay Mishra', role: 'Parent of Class XI Student', initials: 'SM' }
  ];

  const about = content.about || {};
  const cta = content.admissionCta || {};

  return (
    <>
      <SitePopup />
      <HeroSlider slides={content.hero || []} />

      {/* Quick Info Cards Banner */}
      <ScrollReveal>
        <section className="quick-info-section">
          <div className="container">
            <div className="quick-info-grid">
              <div className="quick-info-card">
                <div className="quick-info-icon"><FaGraduationCap /></div>
                <div className="quick-info-content">
                  <h4>Nursery to Class XII</h4>
                  <p>Complete K-12 English Medium Education</p>
                </div>
              </div>
              <div className="quick-info-card">
                <div className="quick-info-icon"><FaSchool /></div>
                <div className="quick-info-content">
                  <h4>Recognized Institution</h4>
                  <p>High Academic & Ethical Standards</p>
                </div>
              </div>
              <div className="quick-info-card">
                <div className="quick-info-icon"><FaChalkboardTeacher /></div>
                <div className="quick-info-content">
                  <h4>Experienced Faculty</h4>
                  <p>Dedicated Subject Experts & Mentors</p>
                </div>
              </div>
              <div className="quick-info-card">
                <div className="quick-info-icon"><FaBus /></div>
                <div className="quick-info-content">
                  <h4>Safe &amp; Secure Campus</h4>
                  <p>Disciplined &amp; Caring Environment</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Leadership Messages */}
      <ScrollReveal>
        <section className="section" style={{ paddingTop: 60 }}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">Leadership</span>
              <h2 className="section-title">Messages from Our Leadership</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* 1. Chairman's Message (First) */}
              <div className="principal-card">
                <div className="principal-photo">
                  {about.chairmanImage ? (
                    <img src={imageSrc(about.chairmanImage)} alt={about.chairmanName || 'Chairman'} />
                  ) : (
                    about.chairmanInitials || 'SS'
                  )}
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', background: 'var(--navy-mid)', color: '#fff', padding: '3px 12px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <FaCrown /> Chairman's Message
                  </span>
                  <blockquote>"{about.chairmanMessage || 'Our commitment is to empower every student with knowledge, wisdom, and strong moral character.'}"</blockquote>
                  <div className="principal-name" style={{ marginTop: 12 }}>{about.chairmanName || 'Shri Sushil Shukla'}</div>
                  <div className="principal-role">{about.chairmanRole || 'Chairman'}</div>
                </div>
              </div>

              {/* 2. Principal's Message (Second) */}
              <div className="principal-card">
                <div className="principal-photo">
                  {about.principalImage ? (
                    <img src={imageSrc(about.principalImage)} alt={about.principalName || 'Principal'} />
                  ) : (
                    about.principalInitials || 'TS'
                  )}
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', background: 'var(--royal-blue)', color: '#fff', padding: '3px 12px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <FaGraduationCap /> Principal's Message
                  </span>
                  <blockquote>"{about.principalMessage || 'Education is not merely about academic achievement; it is about developing responsible, confident and compassionate individuals.'}"</blockquote>
                  <div className="principal-name" style={{ marginTop: 12 }}>{about.principalName || 'Mrs. Tripati Shrivastava'}</div>
                  <div className="principal-role">{about.principalRole || 'Principal'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Why Choose Us */}
      <ScrollReveal>
        <section className="section section-soft">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">Why Parents Trust Our School</h2>
            </div>
            <div className="why-grid">
              {why.map((w, i) => (
                <div className="why-item" key={w.id || i}>
                  <div className="why-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* School Statistics */}
      <ScrollReveal>
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">30+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Enrolled Students</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Experienced Faculty</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%+</div>
                <div className="stat-label">Academic Success Rate</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Latest Notices & News */}
      <ScrollReveal>
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Announcements</span>
              <h2 className="section-title">Latest School Notices</h2>
            </div>
            <div className="news-grid">
              {notices.map((n, i) => {
                const hasAttachment = !!n.attachment;
                const isPdf = n.attachmentType === 'pdf' || (hasAttachment && n.attachment.toLowerCase().includes('.pdf'));
                const isImage = n.attachmentType === 'image' || (hasAttachment && !isPdf);
                const fileUrl = imageSrc(n.attachment);

                return (
                  <article
                    className="news-card"
                    key={n._id || i}
                    style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}
                  >
                    {/* Header Thumbnail */}
                    <div
                      className="news-thumb"
                      style={{
                        height: 170,
                        background: isPdf
                          ? 'linear-gradient(135deg, #7f1d1d, #dc2626)'
                          : isImage
                          ? '#0f172a'
                          : 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      {isImage ? (
                        <img
                          src={fileUrl}
                          alt={n.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                          onClick={() => openNoticeModal(n)}
                        />
                      ) : (
                        <span style={{ fontSize: '2.8rem', color: '#fff' }}>{isPdf ? <FaFilePdf style={{ color: '#ef4444' }} /> : <FaBullhorn style={{ color: 'var(--gold)' }} />}</span>
                      )}

                      {/* Notice Type Badge Tag */}
                      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                        {isPdf && (
                          <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,0.2)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <FaFilePdf /> PDF
                          </span>
                        )}
                        {isImage && (
                          <span style={{ background: '#3b82f6', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 10px', borderRadius: 6, boxShadow: '0 2px 6px rgba(0,0,0,0.2)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <FaImage /> IMAGE
                          </span>
                        )}
                        {!hasAttachment && (
                          <span style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <FaBullhorn /> GENERAL
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="news-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600 }}>
                          {n.date}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: 8, lineHeight: 1.4 }}>{n.title}</h3>
                      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 18, flex: 1 }}>{(n.content || '').slice(0, 110)}...</p>

                      <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <button
                          onClick={() => openNoticeModal(n)}
                          className="btn btn-navy"
                          style={{ padding: '7px 14px', fontSize: '0.82rem', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        >
                          <FaEye /> View Notice
                        </button>
                        {isPdf && (
                          <a
                            href={fileUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            style={{ padding: '7px 14px', fontSize: '0.82rem', borderRadius: 6, background: '#dc2626', borderColor: '#b91c1c', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                          >
                            <FaDownload /> Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
              {!notices.length && (
                <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: 40, background: '#f8fafc', borderRadius: 16 }}>
                  <p style={{ color: '#64748b' }}>No notices posted yet. Check back soon for official updates.</p>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link to="/news" className="btn btn-outline-dark">View All Notices →</Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Homepage Notice Detail Reader Modal */}
      {activeNotice && (() => {
        const isPdf = activeNotice.attachmentType === 'pdf' || (activeNotice.attachment && activeNotice.attachment.toLowerCase().includes('.pdf'));
        const fileUrl = imageSrc(activeNotice.attachment);
        const hasAttachment = !!activeNotice.attachment;

        return (
          <div className="notice-modal-overlay" onClick={() => setActiveNotice(null)}>
            <div className="notice-modal-card" style={{ maxWidth: (hasAttachment && showAttachment && isPdf) ? 720 : 580 }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setActiveNotice(null)}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  fontSize: '1.6rem',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
                aria-label="Close modal"
              >
                &times;
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className="badge-new-flash">OFFICIAL ANNOUNCEMENT</span>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>📅 {activeNotice.date}</span>
                {isPdf && (
                  <span style={{ background: '#dc2626', color: '#fff', padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700 }}>
                    📄 PDF DOCUMENT
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.3rem', color: '#0f2b5c', marginBottom: 14, lineHeight: 1.35 }}>
                {activeNotice.title}
              </h3>

              <p style={{ color: '#334155', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: 18, whiteSpace: 'pre-line' }}>
                {activeNotice.content}
              </p>

              {/* 👁️ Eye Icon Button to Toggle Attachment Display */}
              {hasAttachment && (
                <div style={{ marginBottom: 16 }}>
                  <button
                    type="button"
                    onClick={() => setShowAttachment(!showAttachment)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: showAttachment ? '#0f3460' : '#1a56db',
                      color: '#fff',
                      padding: '9px 18px',
                      borderRadius: 8,
                      border: 'none',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(26, 86, 219, 0.2)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>👁️</span>
                    <span>{showAttachment ? 'Hide Attachment' : `View ${isPdf ? 'PDF Document' : 'Picture Attachment'}`}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{showAttachment ? '▲' : '▼'}</span>
                  </button>
                </div>
              )}

              {/* Attachment Display inside Reader Modal */}
              {hasAttachment && showAttachment && (
                <div style={{ marginBottom: 22, background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  {isPdf ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '1.6rem' }}>📄</span>
                          <div>
                            <strong style={{ fontSize: '0.92rem', color: '#0f3460', display: 'block' }}>Official PDF Circular</strong>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Uploaded by School Administration</span>
                          </div>
                        </div>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '8px 18px', fontSize: '0.85rem', background: '#dc2626', borderColor: '#b91c1c' }}
                        >
                          📄 Open PDF Document →
                        </a>
                      </div>

                      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#fff' }}>
                        <iframe
                          src={`${fileUrl}#toolbar=0`}
                          title="Official Notice PDF Circular"
                          style={{ width: '100%', height: '380px', border: 'none' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <strong style={{ fontSize: '0.9rem', color: '#0f3460' }}>🖼️ Notice Picture / Poster</strong>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: '0.82rem', color: '#1a56db', fontWeight: 600 }}
                        >
                          🔍 View Fullscreen Picture ↗
                        </a>
                      </div>
                      <a href={fileUrl} target="_blank" rel="noreferrer">
                        <img
                          src={fileUrl}
                          alt="Notice Banner"
                          style={{ width: '100%', maxHeight: 400, objectFit: 'contain', borderRadius: 8, background: '#fff', border: '1px solid #cbd5e1' }}
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setActiveNotice(null)} className="btn btn-navy" style={{ padding: '9px 24px', fontSize: '0.9rem' }}>
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Testimonials */}
      <ScrollReveal>
        <section className="section section-soft">
          <div className="container">
            <div className="section-header">
              <span className="section-label">Testimonials</span>
              <h2 className="section-title">What Parents Say About Us</h2>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div className="testimonial-card" key={t.id || i}>
                  <div className="testimonial-stars">{'★'.repeat(t.stars || 5)}</div>
                  <p>"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.initials || 'P'}</div>
                    <div><strong>{t.name}</strong><span>{t.role}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Final Admission CTA */}
      <ScrollReveal>
        <section className="admission-cta">
          <div className="container">
            <h2>{cta.title || 'Admissions Open for Session 2026–27'}</h2>
            <p>{cta.text || 'Give your child the foundation for a bright and successful future. Apply online or visit our school office today.'}</p>
            <div className="hero-actions" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/admissions" className="btn btn-primary">Online Admission Enquiry</Link>
              <a href="https://wa.me/919516011227?text=Hello,%20I%20would%20like%20to%20enquire%20about%20admission" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ border: '2px solid #25d366', color: '#25d366', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <FaWhatsapp style={{ fontSize: '1.2rem' }} /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
