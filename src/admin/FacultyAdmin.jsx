import { useEffect, useState, useRef } from 'react';
import api from '../api/client';
import { uploadImage, imageSrc } from '../api/upload';

export default function FacultyAdmin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', designation: '', experience: '', qualification: '', subject: '', image: '', initials: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const load = () => api.get('/faculty').then((r) => setList(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const onFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadImage(file);
      setForm((f) => ({ ...f, image: res.url }));
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      role: form.designation || form.role || 'Teacher',
      initials: form.initials || (form.name ? form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'FC')
    };

    if (editId) await api.put(`/faculty/${editId}`, payload);
    else await api.post('/faculty', payload);

    setForm({ name: '', role: '', designation: '', experience: '', qualification: '', subject: '', image: '', initials: '' });
    setEditId(null);
    load();
  };

  const startEdit = (f) => {
    setEditId(f._id);
    setForm({
      name: f.name || '',
      role: f.role || f.designation || '',
      designation: f.designation || f.role || '',
      experience: f.experience || '',
      qualification: f.qualification || '',
      subject: f.subject || '',
      image: f.image || '',
      initials: f.initials || ''
    });
  };

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ color: '#0f3460', marginBottom: 6 }}>👨‍🏫 Manage School Faculty</h1>
      <p style={{ color: '#666', marginBottom: 20, fontSize: '0.9rem' }}>Add &amp; edit faculty members with photo uploads, designation, experience, and qualification.</p>

      <form onSubmit={save} style={{ background: '#fff', padding: 24, borderRadius: 12, marginBottom: 28, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '1rem', color: '#0f3460', marginBottom: 16 }}>{editId ? '✏️ Edit Faculty Member' : '➕ Add New Faculty Member'}</h3>

        {/* Photo Upload Section */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: '#334155' }}>Faculty Photo</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ background: '#1a56db', color: '#fff', padding: '9px 16px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600, cursor: uploading ? 'wait' : 'pointer', display: 'inline-block' }}>
              {uploading ? 'Uploading...' : '📁 Upload Photo'}
              <input ref={fileInputRef} type="file" accept="image/*" hidden disabled={uploading} onChange={onFileUpload} />
            </label>
            <input
              placeholder="or paste image URL"
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              style={{ flex: 1, minWidth: 200, padding: 10, borderRadius: 8, border: '1px solid #cbd5e1' }}
            />
            {form.image && (
              <button type="button" onClick={() => setForm({ ...form, image: '' })} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '9px 12px', borderRadius: 8, fontSize: '0.8rem', cursor: 'pointer' }}>Remove</button>
            )}
          </div>
          {form.image && (
            <img src={imageSrc(form.image)} alt="Preview" style={{ marginTop: 10, width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #1a56db' }} />
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Full Name *</label>
            <input placeholder="e.g. Dr. A. K. Sharma" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: 11, borderRadius: 8, border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Designation / Role *</label>
            <input placeholder="e.g. Vice Principal / PGT Physics" required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value, role: e.target.value })} style={{ width: '100%', padding: 11, borderRadius: 8, border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Teaching Experience</label>
            <input placeholder="e.g. 12+ Years Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} style={{ width: '100%', padding: 11, borderRadius: 8, border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Qualification</label>
            <input placeholder="e.g. M.Sc. Physics, B.Ed., Ph.D." value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} style={{ width: '100%', padding: 11, borderRadius: 8, border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Subject</label>
            <input placeholder="e.g. Physics / Mathematics" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ width: '100%', padding: 11, borderRadius: 8, border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Initials (fallback badge)</label>
            <input placeholder="e.g. AS" value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} style={{ width: '100%', padding: 11, borderRadius: 8, border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button type="submit" style={{ padding: '10px 24px', background: '#0f3460', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>{editId ? 'Save Changes' : '+ Add Faculty'}</button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ name: '', role: '', designation: '', experience: '', qualification: '', subject: '', image: '', initials: '' }); }} style={{ padding: '10px 18px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Cancel</button>
          )}
        </div>
      </form>

      {/* Faculty List */}
      <h3 style={{ color: '#0f3460', marginBottom: 14 }}>Faculty Roster ({list.length})</h3>
      {list.map((f) => (
        <div key={f._id} style={{ background: '#fff', padding: 18, borderRadius: 12, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {f.image ? (
              <img src={imageSrc(f.image)} alt={f.name} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid #1a56db' }} />
            ) : (
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #0f3460, #1a56db)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                {f.initials || 'FC'}
              </div>
            )}
            <div>
              <strong style={{ fontSize: '1.05rem', color: '#0f3460' }}>{f.name}</strong>
              <div style={{ fontSize: '0.88rem', color: '#1a56db', fontWeight: 600, marginTop: 2 }}>{f.designation || f.role}</div>
              <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 2 }}>
                {f.qualification && <span>🎓 {f.qualification} · </span>}
                {f.experience && <span>⏳ {f.experience} · </span>}
                {f.subject && <span>📚 {f.subject}</span>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => startEdit(f)} style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>Edit</button>
            <button onClick={async () => { if (confirm('Delete this faculty member?')) { await api.delete(`/faculty/${f._id}`); load(); } }} style={{ padding: '6px 14px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

