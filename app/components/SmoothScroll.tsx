import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Dynamic import keeps Lenis off the SSR bundle
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    });

    return () => cleanup?.();
  }, []);

  return null;
}
