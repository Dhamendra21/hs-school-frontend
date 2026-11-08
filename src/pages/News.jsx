import { useEffect, useState } from 'react';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import PageHero from '../components/PageHero';
import { FaFilePdf, FaImage, FaBullhorn, FaEye, FaDownload, FaTimes } from 'react-icons/fa';

export default function News() {
  const [list, setList] = useState([]);
  const [activeNotice, setActiveNotice] = useState(null);
  const [showAttachment, setShowAttachment] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    api.get('/notices').then(r => setList(r.data || [])).catch(() => {});
  }, []);

  const openNoticeModal = (n) => {
    setActiveNotice(n);
    setShowAttachment(true);
  };

  return (
    <>
      <PageHero
        title="Official Notices & Circulars"
        crumb="Notices"
        subtitle="Stay updated with official announcements, exam schedules, academic circulars, and event notices."
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Public Notice Board</span>
            <h2 className="section-title">Latest School Announcements</h2>
          </div>

          <div className="news-grid">
            {list.map((n) => {
              const hasAttachment = !!n.attachment;
              const isPdf = n.attachmentType === 'pdf' || (hasAttachment && n.attachment.toLowerCase().includes('.pdf'));
              const isImage = n.attachmentType === 'image' || (hasAttachment && !isPdf);
              const fileUrl = imageSrc(n.attachment);

              return (
                <article
                  className="news-card"
                  key={n._id}
                  style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}
                >
                  {/* Card Header Thumbnail / Banner */}
                  <div
                    className="news-thumb"
                    style={{
                      height: 180,
                      background: isPdf
                        ? 'linear-gradient(135deg, #7f1d1d, #dc2626)'
                        : isImage
                        ? '#0f172a'
                        : 'linear-gradient(135deg, var(--navy), var(--navy-mid))',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Render Image Thumbnail directly on card if it's an image */}
                    {isImage ? (
                      <img
                        src={fileUrl}
                        alt={n.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => setPreviewImage(fileUrl)}
                      />
                    ) : (
                      <span style={{ fontSize: '3rem', color: '#fff' }}>{isPdf ? <FaFilePdf style={{ color: '#ef4444' }} /> : <FaBullhorn style={{ color: 'var(--gold)' }} />}</span>
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

                  {/* Card Body */}
                  <div className="news-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 20 }}>
                    {/* Date Badge */}
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600 }}>
                        {n.date}
                      </span>
                    </div>

                    {/* Notice Title */}
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: 8, lineHeight: 1.4 }}>
                      {n.title}
                    </h3>

                    {/* Short Description Preview */}
                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 18, flex: 1, whiteSpace: 'pre-line' }}>
                      {(n.content || '').slice(0, 130)}{n.content?.length > 130 ? '...' : ''}
                    </p>

                    {/* Action Buttons on Card */}
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

                      {isImage && (
                        <button
                          onClick={() => setPreviewImage(fileUrl)}
                          className="btn btn-outline-dark"
                          style={{ padding: '7px 14px', fontSize: '0.82rem', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        >
                          <FaImage /> View Image
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {!list.length && (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: 50, background: '#f8fafc', borderRadius: 16, border: '1px dashed #cbd5e1' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 10 }}>📢</span>
                <p style={{ color: '#64748b', fontSize: '1.05rem' }}>No active notices at this moment. Check back soon for official updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Notice Detail Reader Modal */}
      {activeNotice && (() => {
        const hasAttachment = !!activeNotice.attachment;
        const isPdf = activeNotice.attachmentType === 'pdf' || (hasAttachment && activeNotice.attachment.toLowerCase().includes('.pdf'));
        const isImage = activeNotice.attachmentType === 'image' || (hasAttachment && !isPdf);
        const fileUrl = imageSrc(activeNotice.attachment);

        return (
          <div className="notice-modal-overlay" onClick={() => setActiveNotice(null)}>
            <div
              className="notice-modal-card"
              style={{ maxWidth: (hasAttachment && showAttachment && isPdf) ? 750 : 600, borderRadius: 16, padding: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveNotice(null)}
                style={{
                  position: 'absolute',
                  top: 16,
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
                {isImage && (
                  <span style={{ background: '#3b82f6', color: '#fff', padding: '2px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <FaImage /> IMAGE ATTACHMENT
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.35rem', color: '#0f2b5c', marginBottom: 14, lineHeight: 1.35 }}>
                {activeNotice.title}
              </h3>

              <div style={{ color: '#334155', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: 20, whiteSpace: 'pre-line', background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #f1f5f9' }}>
                {activeNotice.content}
              </div>

              {/* Eye Icon Toggle Button for Attachments */}
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
                    <span>{showAttachment ? 'Hide Attachment' : `View Attached ${isPdf ? 'PDF Document' : 'Picture'}`}</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{showAttachment ? '▲' : '▼'}</span>
                  </button>
                </div>
              )}

              {/* PDF Document Viewer vs Image Banner inside Modal */}
              {hasAttachment && showAttachment && (
                <div style={{ marginBottom: 22, background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  {isPdf ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <FaFilePdf style={{ fontSize: '1.6rem', color: '#dc2626' }} />
                          <div>
                            <strong style={{ fontSize: '0.92rem', color: '#0f3460', display: 'block' }}>Official PDF Circular</strong>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Read document directly below or download</span>
                          </div>
                        </div>

                        <a
                          href={fileUrl}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                          style={{ padding: '8px 18px', fontSize: '0.85rem', background: '#dc2626', borderColor: '#b91c1c', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                        >
                          <FaDownload /> Download PDF
                        </a>
                      </div>

                      {/* Embedded Browser PDF Viewer */}
                      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #cbd5e1', background: '#fff' }}>
                        <iframe
                          src={`${fileUrl}#toolbar=1`}
                          title="Official Notice PDF Circular"
                          style={{ width: '100%', height: '400px', border: 'none' }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <strong style={{ fontSize: '0.9rem', color: '#0f3460', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <FaImage style={{ color: '#1a56db' }} /> Attached Picture / Banner
                        </strong>
                        <button
                          onClick={() => setPreviewImage(fileUrl)}
                          style={{ background: 'none', border: 'none', color: '#1a56db', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                        >
                          Zoom & View Full Image ↗
                        </button>
                      </div>
                      <img
                        src={fileUrl}
                        alt={activeNotice.title}
                        onClick={() => setPreviewImage(fileUrl)}
                        style={{ width: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 8, background: '#fff', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                {isPdf && (
                  <a
                    href={fileUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ padding: '9px 20px', fontSize: '0.88rem', background: '#dc2626', borderColor: '#b91c1c' }}
                  >
                    📥 Download PDF
                  </a>
                )}
                <button onClick={() => setActiveNotice(null)} className="btn btn-navy" style={{ padding: '9px 24px', fontSize: '0.88rem' }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Image Preview Lightbox with Zoom Controls */}
      {previewImage && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setPreviewImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,22,40,0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 3500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div style={{ position: 'relative', maxWidth: '95vw', maxHeight: '92vh', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: -46,
                right: 0,
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close image lightbox"
            >
              &times;
            </button>

            <img
              src={previewImage}
              alt="Notice Banner Full View"
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: 12, boxShadow: '0 25px 60px rgba(0,0,0,0.6)', objectFit: 'contain' }}
            />

            <div style={{ marginTop: 14 }}>
              <a
                href={previewImage}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                🔗 Open Original File ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

