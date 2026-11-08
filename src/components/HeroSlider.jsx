import { imageSrc } from '../api/upload';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

/**
 * Institutional Hero Slideshow with branding overlay & dual CTAs
 */
export default function HeroSlider({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const list = slides.length
    ? slides
    : [
        { id: '1', image: '/uploads/event-dance-1.jpg' },
        { id: '2', image: '/uploads/event-dance-2.jpg' }
      ];

  useEffect(() => {
    if (list.length <= 1) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % list.length), 6000);
    return () => clearInterval(t);
  }, [list.length]);

  return (
    <section className="hero-slider">
      {list.map((h, i) => (
        <div key={h.id || i} className={`slide${i === current ? ' active' : ''}`}>
          <div
            className="slide-bg"
            style={{ backgroundImage: `url(${imageSrc(h.image)})` }}
            role="img"
            aria-label={`Hero slide ${i + 1}`}
          />
          <div
            className="slide-overlay"
            style={{
              background: i === 0
                ? 'linear-gradient(to bottom, rgba(10, 22, 40, 0.75) 0%, rgba(10, 22, 40, 0.65) 60%, rgba(10, 22, 40, 0.9) 100%)'
                : 'linear-gradient(to bottom, rgba(10, 22, 40, 0.1) 0%, rgba(10, 22, 40, 0.3) 100%)'
            }}
          />
          {i === 0 && (
            <div className="container slide-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 10, color: '#fff', textAlign: 'center', padding: '0 20px' }}>
              <span style={{ background: 'var(--gold)', color: '#000', padding: '4px 16px', borderRadius: 50, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <FaGraduationCap /> Admissions Open 2026–27
              </span>
              <h1 className="slide-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.5)', maxWidth: 900, marginBottom: 14, lineHeight: 1.15 }}>
                Pt. Harishankar Shukla English Medium Higher Secondary School
              </h1>
              <p className="slide-desc" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', opacity: 0.92, fontWeight: 500, letterSpacing: '0.02em', maxWidth: 680, marginBottom: 28 }}>
                Nurturing Knowledge • Character • Excellence
              </p>
              <div className="hero-actions" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/admissions" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  Apply for Admission →
                </Link>
                <Link to="/about" className="btn btn-outline" style={{ padding: '14px 28px', fontSize: '1rem', border: '2px solid rgba(255,255,255,0.8)' }}>
                  Explore Our School
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
      {list.length > 1 && (
        <>
          <button
            className="slider-arrow prev"
            aria-label="Previous slide"
            onClick={() => setCurrent((c) => (c - 1 + list.length) % list.length)}
          >
            ‹
          </button>
          <button
            className="slider-arrow next"
            aria-label="Next slide"
            onClick={() => setCurrent((c) => (c + 1) % list.length)}
          >
            ›
          </button>
          <div className="slider-controls">
            {list.map((_, i) => (
              <button
                key={i}
                className={`slider-dot${i === current ? ' active' : ''}`}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
