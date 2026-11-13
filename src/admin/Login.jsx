import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuth } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuth) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      nav('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0f3460,#16213e)', fontFamily: 'Poppins,sans-serif', padding: 20 }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 16, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logo.png" alt="School Logo" style={{ width: 64, height: 64, objectFit: 'contain', margin: '0 auto 12px', display: 'block', borderRadius: '50%', background: '#fff', padding: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }} />
          <h1 style={{ fontSize: '1.4rem', color: '#0f3460' }}>Admin Login</h1>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>MERN Stack · MongoDB + Express + React</p>
        </div>
        {error && <div style={{ background: '#ffe6e6', color: '#c00', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.9rem' }}>{error}</div>}
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6 }}>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #dde1e7', borderRadius: 8, fontFamily: 'inherit' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #dde1e7', borderRadius: 8, fontFamily: 'inherit' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, background: '#0f3460', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
  
      </div>
    </div>
  );
}
