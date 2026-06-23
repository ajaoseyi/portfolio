import { portfolio } from '~/data/portfolio';
import { Reveal } from '~/components/Reveal';

export function Experience() {
  return (
    <section
      id="experience"
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '80px var(--pad-x)',
      }}
    >
      {/* Section header */}
      <div className="grid-12" style={{ alignItems: 'baseline' }}>
        <Reveal style={{ gridColumn: 'span 6', borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
          <span className="kicker">№ 04 — Experience</span>
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
          <a
            href="/cv.pdf"
            className="kicker"
            style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Download CV ↓
          </a>
        </Reveal>
      </div>

      <Reveal
        as="h2"
        className="serif-h"
        style={{ fontSize: 'clamp(42px, 7vw, 98px)', lineHeight: 1, margin: '24px 0 40px' }}
      >
        Where I've <em>worked</em>.
      </Reveal>

      {/* Experience rows */}
      <div>
        {portfolio.experience.map((e, i) => (
          <Reveal
            key={i}
            delay={(i % 3) as 0 | 1 | 2}
            className="exp-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr 1fr',
              gap: 32,
              padding: '32px 0',
              borderTop: '1px solid var(--faint-rule)',
              borderBottom: i === portfolio.experience.length - 1 ? '1px solid var(--ink)' : 'none',
            }}
          >
            {/* Date */}
            <div className="kicker" style={{ paddingTop: 6 }}>{e.dates}</div>

            {/* Role + company */}
            <div>
              <div className="serif-h" style={{ fontSize: 38, lineHeight: 1, letterSpacing: '-0.02em' }}>
                {e.role}
              </div>
              <div style={{ marginTop: 8, fontSize: 15, color: 'var(--dim)' }}>
                {e.co} · {e.loc}
              </div>
            </div>

            {/* Bullets */}
            <div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: '#222',
                      paddingLeft: 18,
                      position: 'relative',
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 10,
                        width: 8,
                        height: 1,
                        background: 'var(--ink)',
                      }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
              {e.productUrl && (
                <a
                  href={e.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kicker"
                  style={{
                    display: 'inline-block',
                    marginTop: 18,
                    color: 'var(--ink)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  View product ↗
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
