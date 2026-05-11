import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const thumb = thumbRef.current;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;

      // Top progress bar
      if (bar) bar.style.width = `${pct * 100}%`;

      // Scrollbar thumb
      if (thumb) {
        const trackH = 80;
        const thumbH = Math.max(12, trackH * (window.innerHeight / document.documentElement.scrollHeight));
        const maxTop = trackH - thumbH;
        thumb.style.height = `${thumbH}px`;
        thumb.style.top = `${pct * maxTop}px`;
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div className="custom-scrollbar" aria-hidden="true">
        <div ref={thumbRef} className="custom-scrollbar-thumb" />
      </div>
    </>
  );
}
