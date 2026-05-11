import { Link } from 'react-router';
import { portfolio } from '~/data/portfolio';
import { Reveal } from '~/components/Reveal';

function Arrow({ size = 12, color = 'currentColor', dir = 'ne' }: { size?: number; color?: string; dir?: 'ne' | 'e' }) {
  const paths: Record<string, string> = {
    ne: 'M3 13L13 3M13 3H6M13 3v7',
    e: 'M3 8h10M9 4l4 4-4 4',
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      style={{ display: 'inline-block', verticalAlign: '-2px', flexShrink: 0 }}
    >
      <path d={paths[dir]} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="square" />
    </svg>
  );
}

export function Hero() {
  const featured = portfolio.projects[0];

  return (
    <section
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '64px var(--pad-x) 80px',
      }}
    >
      {/* ── Top rule row ── */}
      <div className="grid-12">
        <Reveal
          style={{
            gridColumn: 'span 4',
            borderTop: '1px solid var(--ink)',
            paddingTop: 14,
          }}
        >
          <span className="kicker">№ 01 — Introducing</span>
        </Reveal>
        <Reveal
          delay={1}
          style={{
            gridColumn: 'span 8',
            borderTop: '1px solid var(--ink)',
            paddingTop: 14,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span className="kicker">{portfolio.role}</span>
          <span className="kicker">{portfolio.location} · UTC+1</span>
        </Reveal>
      </div>

      {/* ── Big headline ── */}
      <Reveal
        as="h1"
        className="serif-h"
        style={{
          gridColumn: 'span 12',
          fontSize: 'clamp(58px, 11vw, 170px)',
          lineHeight: 0.92,
          marginTop: 32,
        }}
      >
        I build <em>quietly</em>
        <br />
        fast interfaces.
      </Reveal>

      {/* ── Bottom three-panel row ── */}
      <div className="grid-12" style={{ marginTop: 64 }}>

        {/* Bio */}
        <Reveal
          style={{
            gridColumn: '1 / span 5',
            paddingTop: 18,
            borderTop: '1px solid var(--faint-rule)',
          }}
        >
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: '#222' }}>
            Five years shipping production across two continents
          </p>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 18,
              fontSize: 15,
              color: 'var(--dim)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Arrow size={11} /> Read about my approach
          </button>
        </Reveal>

        {/* Metrics */}
        <Reveal
          delay={2}
          style={{
            gridColumn: '6 / span 3',
            paddingTop: 18,
            borderTop: '1px solid var(--faint-rule)',
          }}
        >
          {portfolio.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '9px 0',
                borderBottom: i < portfolio.metrics.length - 1 ? '1px dashed var(--faint-rule)' : 'none',
              }}
            >
              <span className="kicker">{m.k}</span>
              <span className="serif-h" style={{ fontSize: 26 }}>{m.v}</span>
            </div>
          ))}
        </Reveal>

        {/* Featured project card */}
        <Reveal
          delay={3}
          style={{
            gridColumn: '9 / span 4',
            background: 'var(--invert-bg)',
            color: 'var(--invert-ink)',
            padding: '22px 24px',
            borderTop: '1px solid var(--ink)',
          }}
        >
          <div className="kicker" style={{ color: 'var(--dark-dim)' }}>
            Featured · {featured.cat}
          </div>
          <div className="serif-h" style={{ fontSize: 40, marginTop: 10, lineHeight: 1 }}>
            {featured.name}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: '#c4c3be', marginTop: 12 }}>
            Real-time order management, payment integration, analytics dashboard.{' '}
            <strong style={{ color: '#fff' }}>99.8% payment success</strong>.
          </p>
          <Link
            to={`/work/${featured.id}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18 }}
          >
            <span className="kicker" style={{ color: '#fff' }}>
              View case study <Arrow size={11} color="#fff" />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
