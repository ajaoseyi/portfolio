import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRef2 = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as Element;
      if (target.closest('a, button, [data-hover]')) {
        ring.classList.add('is-hovering');
      } else {
        ring.classList.remove('is-hovering');
      }
    };

    const tick = () => {
      const { x, y } = mouseRef.current;

      // Dot follows exactly
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      // Ring lerps with easing
      ringRef2.current.x += (x - ringRef2.current.x) * 0.1;
      ringRef2.current.y += (y - ringRef2.current.y) * 0.1;
      ring.style.left = `${ringRef2.current.x}px`;
      ring.style.top = `${ringRef2.current.y}px`;

      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
