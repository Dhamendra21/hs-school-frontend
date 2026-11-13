import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import {
  FaBolt,
  FaEnvelopeOpenText,
  FaEdit,
  FaPlus,
  FaInbox
} from 'react-icons/fa';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ enquiries: 0, unreadEnquiries: 0, notices: 0, faculty: 0, gallery: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/enquiries').catch(() => ({ data: [] })),
      api.get('/notices').catch(() => ({ data: [] })),
      api.get('/faculty').catch(() => ({ data: [] })),
      api.get('/gallery').catch(() => ({ data: [] }))
    ]).then(([eq, n, f, g]) => {
      const enquiriesList = eq.data || [];
      const unreadCount = enquiriesList.filter(item => item.status === 'unread').length;
      setStats({
        enquiries: enquiriesList.length,
        unreadEnquiries: unreadCount,
        notices: (n.data || []).length,
        faculty: (f.data || []).length,
        gallery: (g.data || []).length
      });
      setRecentEnquiries(enquiriesList.slice(0, 5));
    });
  }, []);

  const card = { background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' };

  return (
    <div>
      <h1 style={{ color: '#0f3460', marginBottom: 4 }}>School CMS Dashboard</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>Welcome back, <strong>{user || 'Admin'}</strong></p>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 28 }}>
        <Link to="/admin/enquiries" style={{ ...card, textDecoration: 'none', borderLeft: '4px solid #1a56db' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a56db' }}>
            {stats.enquiries}
            {stats.unreadEnquiries > 0 && (
              <span style={{ fontSize: '0.8rem', background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: 50, marginLeft: 8, verticalAlign: 'middle' }}>
                {stats.unreadEnquiries} NEW
              </span>
            )}
          </div>
          <div style={{ color: '#475569', fontWeight: 600, marginTop: 4 }}>Admission Enquiries</div>
        </Link>
        <Link to="/admin/notices" style={{ ...card, textDecoration: 'none', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b' }}>{stats.notices}</div>
          <div style={{ color: '#475569', fontWeight: 600, marginTop: 4 }}>Active Notices</div>
        </Link>
        <Link to="/admin/faculty" style={{ ...card, textDecoration: 'none', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10b981' }}>{stats.faculty}</div>
          <div style={{ color: '#475569', fontWeight: 600, marginTop: 4 }}>Faculty Members</div>
        </Link>
        <Link to="/admin/gallery" style={{ ...card, textDecoration: 'none', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#8b5cf6' }}>{stats.gallery}</div>
          <div style={{ color: '#475569', fontWeight: 600, marginTop: 4 }}>Gallery Photos</div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div style={{ ...card, marginBottom: 28 }}>
        <h2 style={{ fontSize: '1.1rem', color: '#0f3460', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaBolt style={{ color: '#f59e0b' }} /> Quick Portal Actions
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/admin/enquiries" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#1a56db', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            <FaEnvelopeOpenText /> View Enquiries
          </Link>
          <Link to="/admin/content" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#0f3460', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            <FaEdit /> Edit Website Content
          </Link>
          <Link to="/admin/notices" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#f59e0b', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            <FaPlus /> Post Notice
          </Link>
          <Link to="/admin/faculty" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#10b981', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            <FaPlus /> Add Faculty
          </Link>
          <Link to="/admin/gallery" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#8b5cf6', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
            <FaPlus /> Upload Photo
          </Link>
        </div>
      </div>

      {/* Recent Enquiries Preview */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.1rem', color: '#0f3460', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaInbox style={{ color: '#1a56db' }} /> Recent Admission Enquiries
          </h2>
          <Link to="/admin/enquiries" style={{ color: '#1a56db', fontSize: '0.85rem', fontWeight: 600 }}>View All Enquiries →</Link>
        </div>
        {!recentEnquiries.length ? (
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No enquiries received yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Subject / Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map(item => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td><strong>{item.name}</strong></td>
                    <td><a href={`tel:${item.phone}`} style={{ color: '#2563eb' }}>{item.phone}</a></td>
                    <td>{item.subject}</td>
                    <td><span className={`badge-${item.status}`}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
