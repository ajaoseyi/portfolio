import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}

export function Reveal({ children, delay = 0, className = '', style, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  const props = { ref, className: `reveal ${delayClass} ${className}`.trim(), style };

  return <Tag {...props}>{children}</Tag>;
}
