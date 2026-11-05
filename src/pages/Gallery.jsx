import { useEffect, useState } from 'react';
import api from '../api/client';
import { imageSrc } from '../api/upload';
import PageHero from '../components/PageHero';

export default function Gallery() {
  const [list, setList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lb, setLb] = useState(null);

  useEffect(() => {
    api.get('/gallery').then(r => setList(r.data || [])).catch(() => {});
  }, []);

  const categories = ['All', 'Events', 'Campus', 'Sports', 'Activities'];

  const filteredList = activeCategory === 'All'
    ? list
    : list.filter(item => (item.category || item.caption || '').toLowerCase().includes(activeCategory.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lb === null) return;
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft') setLb((prev) => (prev - 1 + filteredList.length) % filteredList.length);
      if (e.key === 'ArrowRight') setLb((prev) => (prev + 1) % filteredList.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lb, filteredList.length]);

  return (
    <>
      <PageHero title="School Life &amp; Photo Gallery" crumb="Gallery" />
      <section className="section">
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline-dark'}`}
                style={{ padding: '8px 20px', borderRadius: 50, fontSize: '0.9rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredList.map((item, i) => (
              <div className="gallery-item" key={item._id || i} onClick={() => setLb(i)} style={{ cursor: 'pointer' }}>
                <img src={imageSrc(item.path)} alt={item.caption || 'School Photo'} loading="lazy" />
                <div className="gallery-caption">{item.caption || 'Pt. Harishankar Shukla School'}</div>
              </div>
            ))}
            {!filteredList.length && (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#888', padding: 40 }}>
                No photos found for category "{activeCategory}".
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lb !== null && filteredList[lb] && (
        <div className="gallery-modal-overlay" onClick={(e) => e.target === e.currentTarget && setLb(null)}>
          <div className="gallery-modal-content">
            <button className="gallery-modal-close" aria-label="Close" onClick={() => setLb(null)}>&times;</button>
            {filteredList.length > 1 && (
              <>
                <button
                  className="gallery-modal-nav prev"
                  aria-label="Previous image"
                  onClick={() => setLb((lb - 1 + filteredList.length) % filteredList.length)}
                >
                  ‹
                </button>
                <button
                  className="gallery-modal-nav next"
                  aria-label="Next image"
                  onClick={() => setLb((lb + 1) % filteredList.length)}
                >
                  ›
                </button>
              </>
            )}
            <img
              src={imageSrc(filteredList[lb].path)}
              alt={filteredList[lb].caption || ''}
              className="gallery-modal-img"
            />
            {filteredList[lb].caption && (
              <div className="gallery-modal-caption">{filteredList[lb].caption}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
