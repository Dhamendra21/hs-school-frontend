import { useEffect, useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';

export default function StudentLife() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get('/content/studentLife').then(r => setItems(r.data || [])).catch(() => {});
  }, []);
  return (
    <>
      <PageHero title="Student Life" />
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Beyond Classrooms</span>
            <h2 className="section-title">Life at Our School</h2>
          </div>
          <div className="life-grid">
            {items.map((item) => (
              <div className="life-card" key={item.id || item.title}>
                <div className="life-thumb">{item.icon}</div>
                <div className="life-body"><h3>{item.title}</h3><p>{item.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
