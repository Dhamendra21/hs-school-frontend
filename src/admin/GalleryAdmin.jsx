import { useEffect, useState, useRef } from 'react';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import { FaFileUpload, FaLink, FaImages } from 'react-icons/fa';

export default function GalleryAdmin() {
  const [list, setList] = useState([]);
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('file'); // 'file' | 'url'
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const inputRef = useRef(null);

  const load = () => api.get('/gallery').then((r) => setList(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview('');
  };

  const add = async (e) => {
    e.preventDefault();
    if (!caption.trim()) return alert('Caption required');
    setUploading(true);
    try {
      if (mode === 'file') {
        if (!file) return alert('Select an image file');
        const form = new FormData();
        form.append('image', file);
        form.append('caption', caption.trim());
        await api.post('/gallery', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        if (!url.trim()) return alert('Enter image URL');
        await api.post('/gallery', { path: url.trim(), full: url.trim(), caption: caption.trim() });
      }
      setCaption('');
      setUrl('');
      setFile(null);
      setPreview('');
      if (inputRef.current) inputRef.current.value = '';
      load();
    } catch (err) {
      alert(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const del = async (id) => {
    if (!confirm('Delete this photo?')) return;
    await api.delete(`/gallery/${id}`);
    load();
  };

  return (
    <div>
      <h1 style={{ color: '#0f3460', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        <FaImages style={{ color: '#8b5cf6' }} /> Gallery Management
      </h1>

      <form onSubmit={add} style={{ background: '#fff', padding: 24, borderRadius: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <button type="button" onClick={() => setMode('file')} style={{ ...tabBtn(mode === 'file'), display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <FaFileUpload /> Upload File
          </button>
          <button type="button" onClick={() => setMode('url')} style={{ ...tabBtn(mode === 'url'), display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <FaLink /> Image URL
          </button>
        </div>

        {mode === 'file' ? (
          <div style={{ marginBottom: 12 }}>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onFileChange} />
            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: 6 }}>JPEG, PNG, WebP, GIF · max 5 MB</p>
            {preview && (
              <img src={preview} alt="Preview" style={{ marginTop: 12, maxHeight: 160, borderRadius: 10, objectFit: 'cover' }} />
            )}
          </div>
        ) : (
          <input
            placeholder="https://example.com/photo.jpg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
          />
        )}

        <input
          placeholder="Caption"
          required
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <button
          type="submit"
          disabled={uploading}
          style={{ padding: '10px 20px', background: '#0f3460', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
        >
          {uploading ? 'Uploading...' : 'Add Photo'}
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 16 }}>
        {list.map((g) => (
          <div key={g._id} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1', background: '#eee' }}>
            <img src={imageSrc(g.path)} alt={g.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 12, padding: '6px 8px' }}>
              {g.caption}
            </div>
            <button
              onClick={() => del(g._id)}
              style={{ position: 'absolute', top: 8, right: 8, background: '#e94560', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function tabBtn(active) {
  return {
    padding: '8px 14px',
    borderRadius: 8,
    border: active ? 'none' : '1px solid #dde1e7',
    background: active ? '#0f3460' : '#fff',
    color: active ? '#fff' : '#333',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontWeight: 500
  };
}
