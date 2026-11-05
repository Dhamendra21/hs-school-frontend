import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal wrapper component that triggers section reveal animations
 * as the user scrolls down the page.
 */
export default function ScrollReveal({ children, className = '', threshold = 0.12, style = {} }) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-section${isRevealed ? ' is-revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
