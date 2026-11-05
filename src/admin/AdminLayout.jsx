import { Link, NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/enquiries', label: '📩 Admission Enquiries' },
  { to: '/admin/content', label: '✏️ Website Content' },
  { to: '/admin/notices', label: '📢 Notices / News' },
  { to: '/admin/faculty', label: '👨‍🏫 Faculty' },
  { to: '/admin/gallery', label: '🖼️ Gallery' },
  { to: '/admin/settings', label: '⚙️ Settings' }
];

export default function AdminLayout() {
  const { isAuth, loading, logout, user } = useAuth();
  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!isAuth) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <aside style={{ width: 250, background: '#0f3460', color: '#fff', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: '50%', background: '#fff', padding: 2 }} />
          <div>
            <h2 style={{ fontSize: '1rem', margin: 0 }}>PHS Admin</h2>
            <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0 }}>{user || 'Admin'}</p>
          </div>
        </div>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                display: 'block', padding: '12px 20px', color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid #e94560' : '3px solid transparent',
                textDecoration: 'none', fontSize: '0.95rem'
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <a href="/" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '12px 20px', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>🌐 View Website</a>
          <button onClick={logout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 20px', background: 'none', border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 20, color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.95rem' }}>🚪 Logout</button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 30, background: '#f0f2f5' }}>
        <Outlet />
      </main>
    </div>
  );
}
