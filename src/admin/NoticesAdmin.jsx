import { useEffect, useState, useRef } from 'react';
import api from '../api/client';
import { uploadImage, imageSrc } from '../api/upload';

export default function NoticesAdmin() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const [attachmentType, setAttachmentType] = useState('');
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const load = () => api.get('/notices').then((r) => setList(r.data || [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      const url = res.url;
      const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      setAttachment(url);
      setAttachmentType(isPdf ? 'pdf' : 'image');
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'File upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please fill in title and description.');
      return;
    }

    const payload = {
      title,
      content,
      attachment: attachment.trim(),
      attachmentType: attachmentType || (attachment.toLowerCase().includes('.pdf') ? 'pdf' : attachment ? 'image' : '')
    };

    try {
      if (editId) {
        await api.put(`/notices/${editId}`, payload);
      } else {
        await api.post('/notices', payload);
      }
      resetForm();
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save notice');
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setAttachment('');
    setAttachmentType('');
    setEditId(null);
  };

  const startEdit = (n) => {
    setEditId(n._id);
    setTitle(n.title || '');
    setContent(n.content || '');
    setAttachment(n.attachment || '');
    setAttachmentType(n.attachmentType || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = async (id) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    await api.delete(`/notices/${id}`);
    load();
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ color: '#0f3460', fontSize: '1.6rem', marginBottom: 4 }}>📢 Notices & Announcements Portal</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Post official school notices with attached PDF circulars or image banners.</p>
        </div>
        <button
          onClick={load}
          style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
        >
          🔄 Refresh Notices
        </button>
      </div>

      {/* Advanced Notice Form */}
      <form onSubmit={save} style={{ background: '#fff', padding: 24, borderRadius: 14, marginBottom: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
          <h3 style={{ fontSize: '1.1rem', color: '#0f3460', display: 'flex', alignItems: 'center', gap: 8 }}>
            {editId ? '✏️ Edit Notice Entry' : '➕ Create & Publish New Notice'}
          </h3>
          {editId && (
            <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: 6 }}>
              Editing Mode
            </span>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>
            Notice Title *
          </label>
          <input
            placeholder="e.g. Annual Academic Examination Datesheet & Guidelines 2026"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>
            Notice Details & Description *
          </label>
          <textarea
            placeholder="Write full notice details, instructions for parents/students..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '100%', padding: '11px 14px', minHeight: 120, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.95rem', lineHeight: 1.6 }}
          />
        </div>

        {/* Drag-and-Drop & File Upload Inspector Card */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            marginBottom: 22,
            padding: 20,
            background: dragActive ? '#eff6ff' : '#f8fafc',
            borderRadius: 12,
            border: dragActive ? '2px dashed #1a56db' : '2px dashed #cbd5e1',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <strong style={{ fontSize: '0.92rem', color: '#0f3460', display: 'block' }}>
                📄 Attach PDF Circular or 🖼️ Image Banner (Optional)
              </strong>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Upload PDF circulars, exam datesheets, or poster images up to 15 MB.
              </span>
            </div>

            <label style={{ background: '#1a56db', color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, cursor: uploading ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(26, 86, 219, 0.25)' }}>
              {uploading ? '⏳ Uploading...' : '📎 Select File to Upload'}
              <input ref={fileInputRef} type="file" accept="application/pdf,image/*" hidden disabled={uploading} onChange={onFileChange} />
            </label>
          </div>

          {/* File URL Input Fallback */}
          <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Or paste file URL directly (e.g. /uploads/notice.pdf or https://...)"
              value={attachment}
              onChange={(e) => {
                const val = e.target.value;
                setAttachment(val);
                setAttachmentType(val.toLowerCase().includes('.pdf') ? 'pdf' : val ? 'image' : '');
              }}
              style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            />
            {attachment && (
              <button
                type="button"
                onClick={() => { setAttachment(''); setAttachmentType(''); }}
                style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '8px 14px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Clear File
              </button>
            )}
          </div>

          {/* Uploaded Attachment Inspector Box */}
          {attachment && (
            <div style={{ marginTop: 14, background: '#fff', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '2rem' }}>{attachmentType === 'pdf' ? '📄' : '🖼️'}</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#0f3460', display: 'block' }}>
                    {attachmentType === 'pdf' ? 'PDF Document Attached' : 'Image Banner Attached'}
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', wordBreak: 'break-all' }}>{attachment}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <a
                  href={imageSrc(attachment)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  👁️ Preview Link
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Form Action Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: '12px 28px',
              background: '#0f3460',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              boxShadow: '0 4px 12px rgba(15, 52, 96, 0.2)'
            }}
          >
            {editId ? '💾 Save Changes' : '📢 Publish Notice'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              style={{ padding: '12px 20px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Posted Notices List Table */}
      <div style={{ background: '#fff', padding: 22, borderRadius: 14, boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ color: '#0f3460', marginBottom: 16, fontSize: '1.15rem' }}>
          All Published Notices ({list.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {list.map((n) => {
            const hasAtt = !!n.attachment;
            const isPdf = n.attachmentType === 'pdf' || (hasAtt && n.attachment.toLowerCase().includes('.pdf'));

            return (
              <div
                key={n._id}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  border: '1px solid #f1f5f9',
                  background: '#fafafa',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'flex-start',
                  gap: 16
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#0f3460' }}>{n.title}</strong>
                    <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                      📅 {n.date}
                    </span>
                    {hasAtt && (
                      <span style={{ background: isPdf ? '#fee2e2' : '#dbeafe', color: isPdf ? '#991b1b' : '#1e40af', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>
                        {isPdf ? '📄 PDF ATTACHED' : '🖼️ IMAGE ATTACHED'}
                      </span>
                    )}
                  </div>

                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 10, whiteSpace: 'pre-line' }}>
                    {n.content}
                  </p>

                  {hasAtt && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <a
                        href={imageSrc(n.attachment)}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: '0.82rem',
                          color: '#1a56db',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        🔗 Open Attached File ↗
                      </a>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => startEdit(n)}
                    style={{ padding: '7px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => del(n._id)}
                    style={{ padding: '7px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })}

          {!list.length && (
            <div style={{ textAlign: 'center', padding: 30, color: '#64748b' }}>
              No notices published yet. Use the form above to post a notice.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


