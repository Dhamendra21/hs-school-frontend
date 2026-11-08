import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import { FaBullhorn, FaFilePdf, FaImage, FaEye, FaDownload, FaTimes } from 'react-icons/fa';

export default function NoticeTicker() {
  const [notices, setNotices] = useState([]);
  const [activeNotice, setActiveNotice] = useState(null);
  const [showAttachment, setShowAttachment] = useState(true);

  useEffect(() => {
    api.get('/notices')
      .then((r) => setNotices(r.data || []))
      .catch(() => {});
  }, []);

  const openNoticeModal = (item) => {
    setActiveNotice(item);
    setShowAttachment(true);
  };

  const defaultTicker = [
    { _id: 'default-1', title: '🎓 Admissions Open for Academic Session 2026–27 (Nursery to Class XII)', date: 'Latest', content: 'Admissions are open for all classes for the academic session 2026–27. Parents can submit enquiries online or visit the school administrative office between 8:00 AM to 2:00 PM.' },
    { _id: 'default-2', title: '🏆 Annual Academic & Cultural Excellence Awards Announcement', date: 'Upcoming', content: 'Our annual excellence awards ceremony celebrating outstanding student achievements will take place next month.' },
    { _id: 'default-3', title: '📢 Parent-Teacher Meeting (PTM) Scheduled for Classes I to XII', date: 'Important', content: 'Regular PTM is scheduled. Parents are requested to visit and discuss their child\'s academic progress with class teachers.' }
  ];

  const list = notices.length ? notices : defaultTicker;

  return (
    <>
      <div className="notice-ticker-bar" aria-label="Latest Running Notices Ticker">
        <div className="notice-ticker-label">
          <FaBullhorn />
          <span>Latest Notices</span>
        </div>
        <div className="notice-ticker-content">
          <div className="notice-ticker-track">
            {list.concat(list).map((item, index) => (
              <span
                key={`${item._id}-${index}`}
                className="ticker-item"
                onClick={() => openNoticeModal(item)}
                role="button"
                tabIndex={0}
              >
                <span className="badge-new-flash">NEW</span>
                <span style={{ opacity: 0.75, fontSize: '0.8rem' }}>[{item.date}]</span>
                <span>{item.title}</span>
                {item.attachmentType === 'pdf' && <span style={{ background: '#ef4444', color: '#fff', padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700 }}>PDF</span>}
                <span style={{ opacity: 0.5, marginLeft: 12 }}>•</span>
              </span>
            ))}
          </div>
        </div>
        <Link
          to="/news"
          style={{
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            fontSize: '0.8rem',
            padding: '0 16px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'none',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            zIndex: 5
          }}
        >
          View All →
        </Link>
      </div>

      {/* Notice Detail Modal */}
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
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{activeNotice.date}</span>
                {isPdf && (
                  <span style={{ background: '#dc2626', color: '#fff', padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <FaFilePdf /> PDF DOCUMENT
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#0f2b5c', marginBottom: 14, lineHeight: 1.35 }}>
                {activeNotice.title}
              </h3>

              <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 18, whiteSpace: 'pre-line' }}>
                {activeNotice.content || 'Please contact school office for complete notice details.'}
              </p>

              {/* Eye Icon Button to Toggle Attachment Display */}
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
                    <FaEye />
                    <span>{showAttachment ? 'Hide Attachment' : `View ${isPdf ? 'PDF Document' : 'Picture Attachment'}`}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{showAttachment ? '▲' : '▼'}</span>
                  </button>
                </div>
              )}

              {/* PDF Document Viewer vs Image Banner */}
              {hasAttachment && showAttachment && (
                <div style={{ marginBottom: 22, background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  {isPdf ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <FaFilePdf style={{ fontSize: '1.6rem', color: '#dc2626' }} />
                          <div>
                            <strong style={{ fontSize: '0.92rem', color: '#0f3460', display: 'block' }}>Official PDF Circular</strong>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Read document below or download</span>
                          </div>
                        </div>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '8px 18px', fontSize: '0.85rem', background: '#dc2626', borderColor: '#b91c1c', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        >
                          <FaFilePdf /> Open PDF Document →
                        </a>
                      </div>

                      {/* Embedded PDF Viewer */}
                      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
                        <iframe
                          src={`${fileUrl}#toolbar=0`}
                          title="Official Notice PDF Circular"
                          style={{ width: '100%', height: '360px', border: 'none' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <strong style={{ fontSize: '0.9rem', color: '#0f3460', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <FaImage style={{ color: '#1a56db' }} /> Notice Picture / Poster
                        </strong>
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ fontSize: '0.82rem', color: '#1a56db', fontWeight: 600 }}
                        >
                          View Fullscreen Picture ↗
                        </a>
                      </div>
                      <a href={fileUrl} target="_blank" rel="noreferrer">
                        <img
                          src={fileUrl}
                          alt="Notice Banner"
                          style={{ width: '100%', maxHeight: 380, objectFit: 'contain', borderRadius: 8, background: '#fff', border: '1px solid #cbd5e1' }}
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button onClick={() => setActiveNotice(null)} className="btn btn-navy" style={{ padding: '9px 24px', fontSize: '0.9rem' }}>
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
