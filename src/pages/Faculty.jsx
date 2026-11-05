import { useEffect, useState } from 'react';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import PageHero from '../components/PageHero';

export default function Faculty() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('/faculty').then(r => setList(r.data || [])).catch(() => {});
  }, []);

  return (
    <>
      <PageHero title="Our Experienced Faculty" crumb="Faculty" subtitle="Dedicated educators building knowledge, values, and character." />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">School Roster</span>
            <h2 className="section-title">Meet Our Academic Team</h2>
            <p className="section-desc">Our qualified and compassionate teachers guide students towards academic excellence and personal growth.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {list.map((f) => (
              <div
                key={f._id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '28px 24px',
                  boxShadow: '0 4px 20px rgba(10,22,40,0.06)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                className="highlight-card"
              >
                {/* Photo or Avatar */}
                <div style={{ marginBottom: 18, position: 'relative' }}>
                  {f.image ? (
                    <img
                      src={imageSrc(f.image)}
                      alt={f.name}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid var(--royal-blue)',
                        boxShadow: '0 8px 20px rgba(26,86,219,0.2)'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--navy), var(--royal-blue))',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 800,
                        border: '4px solid var(--gold)',
                        boxShadow: '0 8px 20px rgba(10,22,40,0.15)'
                      }}
                    >
                      {f.initials || (f.name ? f.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'FC')}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 style={{ fontSize: '1.2rem', color: 'var(--navy)', fontWeight: 700, marginBottom: 4 }}>
                  {f.name}
                </h3>

                {/* Designation */}
                <div style={{ fontSize: '0.9rem', color: 'var(--royal-blue)', fontWeight: 600, marginBottom: 12, background: '#eff6ff', padding: '3px 12px', borderRadius: 50 }}>
                  {f.designation || f.role}
                </div>

                {/* Details List */}
                <div style={{ width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: 14, marginTop: 'auto', textAlign: 'left', fontSize: '0.85rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {f.qualification && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>🎓</span>
                      <span><strong>Qualification:</strong> {f.qualification}</span>
                    </div>
                  )}
                  {f.experience && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>⏳</span>
                      <span><strong>Experience:</strong> {f.experience}</span>
                    </div>
                  )}
                  {f.subject && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>📚</span>
                      <span><strong>Subject:</strong> {f.subject}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {!list.length && (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b' }}>Faculty details are being loaded.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

