import { useEffect, useState, useRef } from 'react';
import api from '../api/client';
import { uploadImage, imageSrc } from '../api/upload';
import {
  FaFileUpload,
  FaCrown,
  FaGraduationCap,
  FaBullseye,
  FaImages,
  FaCommentDots,
  FaSchool
} from 'react-icons/fa';

const SECTIONS = [
  'popup', 'hero', 'site', 'highlights', 'about', 'why', 'academics',
  'facilities', 'studentLife', 'achievements', 'testimonials', 'admissionCta'
];

export default function ContentEditor() {
  const [section, setSection] = useState('hero');
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/content/${section}`)
      .then((r) => setData(r.data))
      .catch(() => setData(section === 'hero' ? [] : {}))
      .finally(() => setLoading(false));
  }, [section]);

  const showMsg = (t) => {
    setMsg(t);
    setTimeout(() => setMsg(''), 2500);
  };

  const save = async (payload) => {
    try {
      await api.put(`/content/${section}`, { data: payload });
      setData(payload);
      showMsg('Saved successfully!');
    } catch (e) {
      alert(e.response?.data?.error || e.message || 'Save failed');
    }
  };

  const HeroEditor = () => {
    const list = Array.isArray(data) ? data : [];
    const [url, setUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);

    const addFile = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const res = await uploadImage(file);
        const updatedList = [...list, { id: Date.now().toString(), image: res.url }];
        setData(updatedList);
        await save(updatedList);
        showMsg('Image uploaded and hero saved!');
      } catch (err) {
        alert(err.response?.data?.error || err.message || 'Upload failed');
      } finally {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = '';
      }
    };

    const addUrl = async () => {
      if (!url.trim()) return alert('Enter image URL');
      const updatedList = [...list, { id: Date.now().toString(), image: url.trim() }];
      setData(updatedList);
      setUrl('');
      await save(updatedList);
      showMsg('Image URL added and hero saved!');
    };

    const remove = async (i) => {
      if (!confirm('Remove this image?')) return;
      const updatedList = list.filter((_, idx) => idx !== i);
      setData(updatedList);
      await save(updatedList);
      showMsg('Image removed and hero updated!');
    };

    return (
      <div>
        <p style={{ color: '#666', marginBottom: 16, fontSize: '0.9rem' }}>
          Hero is <strong>image only</strong>. Upload files or paste URLs, then Save.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ ...btnStyle('#28a745'), display: 'inline-flex', alignItems: 'center', gap: 6, cursor: uploading ? 'wait' : 'pointer' }}>
            <FaFileUpload />
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input ref={fileRef} type="file" accept="image/*" hidden disabled={uploading} onChange={addFile} />
          </label>
          <span style={{ color: '#999' }}>or</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://... image URL"
            style={{ flex: 1, minWidth: 180, padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
          />
          <button type="button" onClick={addUrl} style={btnStyle('#16213e')}>+ Add URL</button>
          <button type="button" onClick={() => save(list)} style={btnStyle('#0f3460')}>Save Hero</button>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: 16 }}>JPEG, PNG, WebP, GIF · max 5 MB</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
          {list.map((item, i) => (
            <div key={item.id || i} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '16/10', background: '#eee', border: '1px solid #e0e0e0' }}>
              <img src={imageSrc(item.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.opacity = 0.3; }} />
              <button type="button" onClick={() => remove(i)} style={{ position: 'absolute', top: 8, right: 8, background: '#e94560', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>Delete</button>
            </div>
          ))}
        </div>
        {!list.length && <p style={{ color: '#999' }}>No hero images yet.</p>}
      </div>
    );
  };

  const PopupEditor = () => {
    const p = data && typeof data === 'object' && !Array.isArray(data) ? data : {
      enabled: false, title: '', message: '', buttonText: 'OK', image: ''
    };
    const [form, setForm] = useState(p);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);

    useEffect(() => {
      if (data && typeof data === 'object' && !Array.isArray(data)) setForm(data);
    }, [data]);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const onFile = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      try {
        const res = await uploadImage(file);
        set('image', res.url);
        showMsg('Image uploaded');
      } catch (err) {
        alert(err.response?.data?.error || err.message || 'Upload failed');
      } finally {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = '';
      }
    };

    return (
      <div style={{ maxWidth: 520 }}>
        <p style={{ color: '#666', marginBottom: 16, fontSize: '0.9rem' }}>
          Homepage popup shown once per visit.
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!form.enabled} onChange={(e) => set('enabled', e.target.checked)} />
          <span>Enable popup</span>
        </label>
        <Field label="Title" value={form.title || ''} onChange={(v) => set('title', v)} />
        <Field label="Message" value={form.message || ''} onChange={(v) => set('message', v)} textarea />
        <Field label="Button text" value={form.buttonText || 'OK'} onChange={(v) => set('buttonText', v)} />
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Image (optional)</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ ...btnStyle('#28a745'), display: 'inline-flex', alignItems: 'center', gap: 6, cursor: uploading ? 'wait' : 'pointer', fontSize: '0.85rem' }}>
              <FaFileUpload />
              {uploading ? 'Uploading...' : 'Upload'}
              <input ref={fileRef} type="file" accept="image/*" hidden disabled={uploading} onChange={onFile} />
            </label>
            <input
              value={form.image || ''}
              onChange={(e) => set('image', e.target.value)}
              placeholder="or paste URL"
              style={{ flex: 1, minWidth: 160, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            />
          </div>
          {form.image && (
            <img src={imageSrc(form.image)} alt="" style={{ marginTop: 10, maxHeight: 120, borderRadius: 8 }} />
          )}
        </div>
        <button type="button" onClick={() => save(form)} style={{ ...btnStyle('#0f3460'), marginTop: 8 }}>Save Popup</button>
      </div>
    );
  };
  const AboutEditor = () => {
    const a = data && typeof data === 'object' && !Array.isArray(data) ? data : {};
    const [form, setForm] = useState(a);
    const [uploadingChairman, setUploadingChairman] = useState(false);
    const [uploadingPrincipal, setUploadingPrincipal] = useState(false);
    const chairmanFileRef = useRef(null);
    const principalFileRef = useRef(null);

    useEffect(() => {
      if (data && typeof data === 'object' && !Array.isArray(data)) setForm(data);
    }, [data]);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const onChairmanFile = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadingChairman(true);
      try {
        const res = await uploadImage(file);
        set('chairmanImage', res.url);
        showMsg('Chairman picture uploaded');
      } catch (err) {
        alert(err.response?.data?.error || err.message || 'Upload failed');
      } finally {
        setUploadingChairman(false);
        if (chairmanFileRef.current) chairmanFileRef.current.value = '';
      }
    };

    const onPrincipalFile = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadingPrincipal(true);
      try {
        const res = await uploadImage(file);
        set('principalImage', res.url);
        showMsg('Principal picture uploaded');
      } catch (err) {
        alert(err.response?.data?.error || err.message || 'Upload failed');
      } finally {
        setUploadingPrincipal(false);
        if (principalFileRef.current) principalFileRef.current.value = '';
      }
    };

    return (
      <div style={{ maxWidth: 680 }}>
        <p style={{ color: '#666', marginBottom: 16, fontSize: '0.9rem' }}>
          Edit About Section content including Chairman &amp; Principal messages and pictures.
        </p>
        <Field label="School Title" value={form.title || ''} onChange={(v) => set('title', v)} />
        
        <h3 style={{ marginTop: 20, marginBottom: 12, color: '#0f3460', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FaCrown style={{ color: '#d97706' }} /> Chairman Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 10 }}>
          <Field label="Chairman Name" value={form.chairmanName || 'Shri Sushil Shukla'} onChange={(v) => set('chairmanName', v)} />
          <Field label="Chairman Role" value={form.chairmanRole || 'Chairman'} onChange={(v) => set('chairmanRole', v)} />
          <Field label="Initials" value={form.chairmanInitials || 'SS'} onChange={(v) => set('chairmanInitials', v)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Chairman Picture (optional)</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ ...btnStyle('#28a745'), display: 'inline-flex', alignItems: 'center', gap: 6, cursor: uploadingChairman ? 'wait' : 'pointer', fontSize: '0.85rem' }}>
              <FaFileUpload />
              {uploadingChairman ? 'Uploading...' : 'Upload Picture'}
              <input ref={chairmanFileRef} type="file" accept="image/*" hidden disabled={uploadingChairman} onChange={onChairmanFile} />
            </label>
            <input
              value={form.chairmanImage || ''}
              onChange={(e) => set('chairmanImage', e.target.value)}
              placeholder="or paste image URL"
              style={{ flex: 1, minWidth: 160, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            />
            {form.chairmanImage && (
              <button type="button" onClick={() => set('chairmanImage', '')} style={{ ...btnStyle('#e94560'), fontSize: '0.8rem', padding: '6px 12px' }}>Remove</button>
            )}
          </div>
          {form.chairmanImage && (
            <img src={imageSrc(form.chairmanImage)} alt="Chairman" style={{ marginTop: 10, width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #0f3460' }} />
          )}
        </div>
        <Field label="Chairman Message" value={form.chairmanMessage || ''} onChange={(v) => set('chairmanMessage', v)} textarea />

        <h3 style={{ marginTop: 24, marginBottom: 12, color: '#0f3460', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FaGraduationCap style={{ color: '#1a56db' }} /> Principal Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: 10 }}>
          <Field label="Principal Name" value={form.principalName || 'Mrs. Tripati Shrivastava'} onChange={(v) => set('principalName', v)} />
          <Field label="Principal Role" value={form.principalRole || 'Principal'} onChange={(v) => set('principalRole', v)} />
          <Field label="Initials" value={form.principalInitials || 'TS'} onChange={(v) => set('principalInitials', v)} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>Principal Picture (optional)</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ ...btnStyle('#28a745'), display: 'inline-flex', alignItems: 'center', gap: 6, cursor: uploadingPrincipal ? 'wait' : 'pointer', fontSize: '0.85rem' }}>
              <FaFileUpload />
              {uploadingPrincipal ? 'Uploading...' : 'Upload Picture'}
              <input ref={principalFileRef} type="file" accept="image/*" hidden disabled={uploadingPrincipal} onChange={onPrincipalFile} />
            </label>
            <input
              value={form.principalImage || ''}
              onChange={(e) => set('principalImage', e.target.value)}
              placeholder="or paste image URL"
              style={{ flex: 1, minWidth: 160, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            />
            {form.principalImage && (
              <button type="button" onClick={() => set('principalImage', '')} style={{ ...btnStyle('#e94560'), fontSize: '0.8rem', padding: '6px 12px' }}>Remove</button>
            )}
          </div>
          {form.principalImage && (
            <img src={imageSrc(form.principalImage)} alt="Principal" style={{ marginTop: 10, width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #0f3460' }} />
          )}
        </div>
        <Field label="Principal Message" value={form.principalMessage || ''} onChange={(v) => set('principalMessage', v)} textarea />

        <h3 style={{ marginTop: 24, marginBottom: 12, color: '#0f3460', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 6 }}>
          <FaBullseye style={{ color: '#ef4444' }} /> Mission, Vision &amp; Values
        </h3>
        <Field label="Mission" value={form.mission || ''} onChange={(v) => set('mission', v)} textarea />
        <Field label="Vision" value={form.vision || ''} onChange={(v) => set('vision', v)} textarea />
        <Field label="Values" value={form.values || ''} onChange={(v) => set('values', v)} textarea />

        <button type="button" onClick={() => save(form)} style={{ ...btnStyle('#0f3460'), marginTop: 12 }}>Save About Section</button>
      </div>
    );
  };

  const JsonEditor = () => {
    const [json, setJson] = useState('');
    useEffect(() => {
      setJson(JSON.stringify(data, null, 2));
    }, [data]);

    return (
      <div>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: 10 }}>Edit JSON for: <strong>{section}</strong></p>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          style={{ width: '100%', minHeight: 380, fontFamily: 'monospace', fontSize: 13, padding: 16, borderRadius: 12, border: '1.5px solid #dde1e7' }}
        />
        <button
          type="button"
          onClick={() => {
            try { save(JSON.parse(json)); } catch { alert('Invalid JSON'); }
          }}
          style={{ ...btnStyle('#0f3460'), marginTop: 12 }}
        >
          Save {section}
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ color: '#0f3460', marginBottom: 8 }}>Website Content</h1>
      <p style={{ color: '#666', marginBottom: 20, fontSize: '0.9rem' }}>
        Upload images for Hero &amp; Popup, or edit other sections.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid #dde1e7',
              cursor: 'pointer',
              background: section === s ? '#0f3460' : '#fff',
              color: section === s ? '#fff' : '#333',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            {s === 'hero' ? <><FaImages /> Hero Images</> : s === 'popup' ? <><FaCommentDots /> Popup</> : s === 'about' ? <><FaSchool /> About &amp; Leadership</> : s}
          </button>
        ))}
      </div>
      {msg && (
        <div style={{ background: '#d4edda', color: '#155724', padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {msg}
        </div>
      )}
      {loading ? <p>Loading...</p> : section === 'hero' ? <HeroEditor /> : section === 'popup' ? <PopupEditor /> : section === 'about' ? <AboutEditor /> : <JsonEditor />}
    </div>
  );
}

function Field({ label, value, onChange, textarea }) {
  const style = { width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ddd', marginBottom: 12, fontFamily: 'inherit' };
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: 6 }}>{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} style={{ ...style, minHeight: 100 }} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={style} />
      )}
    </div>
  );
}

function btnStyle(bg) {
  return {
    padding: '10px 20px',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 600
  };
}
