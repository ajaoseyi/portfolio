import { portfolio } from '~/data/portfolio';
import { Reveal } from '~/components/Reveal';

const BELIEFS = [
  {
    title: 'Performance is empathy',
    body: "Slow apps tax the people with the slowest devices. I'd rather ship 30 KB than 300.",
  },
  {
    title: 'Types are documentation',
    body: "TypeScript isn't a tax — it's the cheapest spec you'll ever write.",
  },
  {
    title: 'Boring tech wins',
    body: 'I reach for React, Postgres, and good defaults before anything novel.',
  },
];

export function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--invert-bg)',
        color: 'var(--invert-ink)',
        padding: '80px 0',
      }}
    >
      <div className="container">

        {/* Section header */}
        <div className="grid-12" style={{ alignItems: 'baseline' }}>
          <Reveal
            style={{
              gridColumn: 'span 6',
              borderTop: '1px solid rgba(250,250,248,0.15)',
              paddingTop: 14,
            }}
          >
            <span className="kicker" style={{ color: 'var(--dark-dim)' }}>
              № 03 — About
            </span>
          </Reveal>
          <Reveal
            delay={1}
            style={{
              gridColumn: 'span 6',
              borderTop: '1px solid rgba(250,250,248,0.15)',
              paddingTop: 14,
              textAlign: 'right',
            }}
          >
            <span className="kicker" style={{ color: 'var(--dark-dim)' }}>
              Worldwide · Remote-first · Open to full-time & freelance
            </span>
          </Reveal>
        </div>

        {/* Portrait + story */}
        <div className="grid-12" style={{ marginTop: 32, gap: 32, alignItems: 'start' }}>

          {/* Portrait */}
          <Reveal style={{ gridColumn: 'span 4' }}>
            <div
              className="about-portrait"
              style={{
                width: '100%',
                aspectRatio: '4/5',
                background: 'linear-gradient(135deg, #2a2a2a 0%, #141414 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src="/images/profile.png"
                alt="Abdulsamad Ajao"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
                onError={(e) => {
                  // Show letterform fallback if photo is missing
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />

              <div
                className="kicker"
                style={{
                  position: 'absolute',
                  bottom: 18,
                  left: 18,
                  right: 18,
                  color: 'var(--dark-dim)',
                }}
              >
                Abdulsamad Ajao — Remote
              </div>
            </div>
          </Reveal>

          {/* Story column */}
          <div style={{ gridColumn: 'span 8' }}>
            <Reveal>
              <h2
                className="serif-h"
                style={{
                  fontSize: 'clamp(42px, 6vw, 90px)',
                  lineHeight: 1.15,
                  paddingBottom: 16,
                }}
              >
                I make the web feel{' '}
                <em style={{ color: 'var(--dark-dim)' }}>lighter</em>.
              </h2>
            </Reveal>

            {/* Two-column paragraphs */}
            <Reveal
              delay={1}
              className="story-grid"
              style={{
                marginTop: 48,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 36,
              }}
            >
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: 'var(--dark-text)' }}>
                I started writing JavaScript in a generator-powered office in Yaba in 2019. Six years
                later, I'm still chasing the same thing — interfaces that load before you notice they did.
              </p>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: 'var(--dark-text)' }}>
                Most of my work lives at the seams: the millisecond between tap and feedback, the retry
                that decides whether a meal arrives, the type system that keeps a small team honest. I
                care about Core Web Vitals because users  pay for every byte.
              </p>
            </Reveal>

            {/* Tech stack */}
            <Reveal
              delay={2}
              style={{
                marginTop: 48,
                paddingTop: 18,
                borderTop: '1px dashed #2a2a2a',
              }}
            >
              <div className="kicker" style={{ color: 'var(--dark-dim)', marginBottom: 14 }}>
                Daily drivers
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {portfolio.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 15,
                      padding: '8px 14px',
                      border: '1px solid #2a2a2a',
                      color: 'var(--dark-text)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Beliefs */}
            <Reveal
              delay={3}
              className="beliefs-grid"
              style={{
                marginTop: 48,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
              }}
            >
              {BELIEFS.map(({ title, body }, i) => (
                <div key={i} style={{ borderTop: '1px solid #2a2a2a', paddingTop: 14 }}>
                  <div className="serif-h" style={{ fontSize: 24, color: '#fafaf8', lineHeight: 1.3 }}>
                    {title}
                  </div>
                  <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.55, color: 'var(--dark-dim)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
