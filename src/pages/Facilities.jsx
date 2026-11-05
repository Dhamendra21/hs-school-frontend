import { useEffect, useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';

export default function Facilities() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get('/content/facilities').then(r => setItems(r.data || [])).catch(() => {});
  }, []);
  return (
    <>
      <PageHero title="Facilities" />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Campus</span>
            <h2 className="section-title">Facilities</h2>
            <p className="section-desc">Spaces designed for learning and growth.</p>
          </div>
          <div className="cards-grid">
            {items.map((item) => (
              <div className="card" key={item.id || item.title}>
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
