import { useState } from 'react';
import api from '../api/client';

export default function Settings() {
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const save = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) return alert('Passwords do not match');
    try {
      await api.post('/auth/change-password', { newPassword });
      setMsg('Password updated!');
      setNewPassword(''); setConfirm('');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed');
    }
  };

  return (
    <div>
      <h1 style={{ color: '#0f3460', marginBottom: 20 }}>Settings</h1>
      <form onSubmit={save} style={{ background: '#fff', padding: 24, borderRadius: 12, maxWidth: 480 }}>
        <h3 style={{ marginBottom: 12 }}>Change Password</h3>
        {msg && <p style={{ color: 'green' }}>{msg}</p>}
        <input type="password" placeholder="New password (min 8)" required minLength={8} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <input type="password" placeholder="Confirm password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Update Password</button>
      </form>
      <p style={{ marginTop: 20, color: '#888', fontSize: '0.85rem' }}>Site contact info is edited under Website Content → site</p>
    </div>
  );
}
