import { portfolio } from '~/data/portfolio';
import { Reveal } from '~/components/Reveal';

function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="square" />
    </svg>
  );
}

export function Writing() {
  return (
    <section
      id="writing"
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '0 var(--pad-x) 80px',
      }}
    >
      {/* Section header */}
      <div className="grid-12" style={{ alignItems: 'baseline' }}>
        <Reveal style={{ gridColumn: 'span 6', borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
          <span className="kicker">№ 05 — Writing</span>
        </Reveal>
        <Reveal
          delay={1}
          style={{
            gridColumn: 'span 6',
            borderTop: '1px solid var(--ink)',
            paddingTop: 14,
            textAlign: 'right',
          }}
        >
          <span className="kicker">Occasional · RSS available</span>
        </Reveal>
      </div>

      <Reveal
        as="h2"
        className="serif-h"
        style={{ fontSize: 'clamp(42px, 7vw, 98px)', lineHeight: 1, margin: '24px 0 40px' }}
      >
        Notes on <em>craft</em>.
      </Reveal>

      {/* Post list */}
      <div>
        {portfolio.writing.map((w, i) => (
          <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
            <a
              href="#"
              className="writing-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 100px 60px',
                gap: 24,
                alignItems: 'baseline',
                padding: '22px 0',
                borderTop: '1px solid var(--faint-rule)',
                color: 'var(--ink)',
              }}
            >
              <div className="kicker">{w.d}</div>
              <div className="serif-h" style={{ fontSize: 30, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {w.t}
              </div>
              <div className="kicker writing-readtime" style={{ textAlign: 'right' }}>{w.read}</div>
              <div className="writing-arrow" style={{ textAlign: 'right' }}>
                <Arrow size={14} />
              </div>
            </a>
          </Reveal>
        ))}
        <div style={{ borderTop: '1px solid var(--ink)' }} />
      </div>
    </section>
  );
}
