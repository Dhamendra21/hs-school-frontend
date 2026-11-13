import { useState, useEffect } from 'react';
import api from '../api/client';
import {
  FaEnvelopeOpenText,
  FaSyncAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaTrashAlt
} from 'react-icons/fa';

export default function EnquiriesAdmin() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/enquiries')
      .then(r => setList(r.data || []))
      .catch(err => setMsg('Failed to load enquiries: ' + (err.response?.data?.error || err.message)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/enquiries/${id}`, { status })
      .then(() => {
        setList(list.map(item => item._id === id ? { ...item, status } : item));
      })
      .catch(err => alert('Failed to update: ' + (err.response?.data?.error || err.message)));
  };

  const remove = (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    api.delete(`/enquiries/${id}`)
      .then(() => {
        setList(list.filter(item => item._id !== id));
      })
      .catch(err => alert('Failed to delete: ' + (err.response?.data?.error || err.message)));
  };

  const filtered = filter === 'all'
    ? list
    : list.filter(item => item.status === filter);

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#0f3460', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FaEnvelopeOpenText style={{ color: '#1a56db' }} /> Admission Enquiries
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage messages &amp; applications submitted by parents</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {['all', 'unread', 'read', 'contacted'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: '1px solid #cbd5e1',
                background: filter === s ? '#0f3460' : '#fff',
                color: filter === s ? '#fff' : '#334155',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {s}
            </button>
          ))}
          <button onClick={load} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' }}>
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      {msg && <div style={{ color: '#dc2626', marginBottom: 16 }}>{msg}</div>}

      {loading ? (
        <p>Loading enquiries...</p>
      ) : !filtered.length ? (
        <div style={{ background: '#fff', padding: 40, borderRadius: 12, textAlign: 'center', color: '#64748b' }}>
          No enquiries found in this view.
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <table className="enquiries-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name &amp; Contact</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '');
                const waLink = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${item.name}, thank you for contacting Pt. Harishankar Shukla School regarding your enquiry.`)}`;
                
                return (
                  <tr key={item._id} style={{ background: item.status === 'unread' ? '#fff7ed' : '#fff' }}>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', color: '#64748b' }}>
                      {new Date(item.createdAt).toLocaleDateString()} <br />
                      <span style={{ fontSize: '0.75rem' }}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td>
                      <strong style={{ color: '#0f3460', display: 'block' }}>{item.name}</strong>
                      <a href={`tel:${item.phone}`} style={{ color: '#2563eb', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <FaPhoneAlt style={{ fontSize: '0.75rem' }} /> {item.phone}
                      </a>
                      {item.email && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#64748b', marginTop: 2 }}>
                          <FaEnvelope style={{ fontSize: '0.75rem' }} /> {item.email}
                        </span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#334155' }}>{item.subject}</span>
                    </td>
                    <td style={{ maxWidth: 300 }}>
                      <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{item.message}</p>
                    </td>
                    <td>
                      <span className={`badge-${item.status}`}>{item.status}</span>
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#25d366', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}
                          title="Open WhatsApp chat"
                        >
                          <FaWhatsapp style={{ fontSize: '0.85rem' }} /> WhatsApp
                        </a>
                        {item.status === 'unread' && (
                          <button
                            onClick={() => updateStatus(item._id, 'contacted')}
                            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: 4, fontSize: '0.78rem', cursor: 'pointer' }}
                          >
                            Mark Contacted
                          </button>
                        )}
                        <button
                          onClick={() => remove(item._id)}
                          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#ef4444', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: 4, fontSize: '0.78rem', cursor: 'pointer' }}
                          title="Delete enquiry"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
