import { useEffect, useState } from 'react';
import api from '../api/client';
import PageHero from '../components/PageHero';

export default function Achievements() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.get('/content/achievements').then(r => setItems(r.data || [])).catch(() => {});
  }, []);
  return (
    <>
      <PageHero title="Achievements" />
      <section className="section">
        <div className="container">
          <div className="achieve-grid">
            {items.map((item) => (
              <div className="achieve-card" key={item.id || item.title}>
                <span className="achieve-year">{item.year}</span>
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
