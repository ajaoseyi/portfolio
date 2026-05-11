import { useState } from 'react';
import { Link } from 'react-router';
import type { Project } from '~/data/portfolio';
import { portfolio } from '~/data/portfolio';
import { Reveal } from '~/components/Reveal';

function Arrow({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="square" />
    </svg>
  );
}

const LAYOUTS: Array<{ col: string; big: boolean }> = [
  { col: '1 / span 7', big: true },
  { col: '8 / span 5', big: false },
  { col: '1 / span 5', big: false },
  { col: '6 / span 7', big: true },
  { col: '1 / span 12', big: true },
];

function ProjectCard({ p, big, col }: { p: Project; big: boolean; col: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal
      as="article"
      className="project-card"
      style={{
        gridColumn: col,
        borderTop: '1px solid var(--ink)',
        paddingTop: 18,
      }}
    >
      <Link to={`/work/${p.id}`} style={{ display: 'block' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 18,
          }}
          className="kicker"
        >
          <span>{p.n} · {p.cat}</span>
          <span>{p.year}</span>
        </div>

        {/* Visual block */}
        <div
          className="project-image"
          style={{
            height: big ? 360 : 280,
            background: 'var(--invert-bg)',
            color: 'var(--invert-ink)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 28,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Watermark number */}
          <div
            className="serif-h work-watermark"
            style={{
              position: 'absolute',
              top: -28,
              right: -16,
              fontSize: big ? 362 : 282,
              lineHeight: 0.8,
              color: '#1a1a1a',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {p.n}
          </div>

          {/* Title + tagline */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="serif-h work-card-title" style={{ fontSize: big ? 66 : 50, lineHeight: 1 }}>
              {p.name}
            </div>
            <div className="kicker" style={{ color: 'var(--dark-dim)', marginTop: 12 }}>
              {p.tagline}
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              transition: 'transform 0.25s',
              transform: hovered ? 'translate(3px, -3px)' : 'none',
            }}
          >
            <Arrow size={22} color="#fff" />
          </div>
        </div>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: 16,
            gap: 16,
          }}
        >
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#222', maxWidth: 460 }}>
            {p.desc}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              flexShrink: 0,
            }}
          >
            {p.stack.slice(0, 4).map((s) => (
              <span key={s} className="kicker">{s}</span>
            ))}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function Work() {
  return (
    <section
      id="work"
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '40px var(--pad-x) 80px',
      }}
    >
      {/* Section header */}
      <div className="grid-12" style={{ alignItems: 'baseline' }}>
        <Reveal style={{ gridColumn: 'span 6', borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
          <span className="kicker">№ 02 — Selected Work</span>
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
          <span className="kicker">05 of 17 · 2022—2025</span>
        </Reveal>
      </div>

      <Reveal
        as="h2"
        className="serif-h"
        style={{
          fontSize: 'clamp(50px, 8vw, 114px)',
          lineHeight: 1,
          margin: '24px 0 40px',
        }}
      >
        Things I've <em>shipped</em>.
      </Reveal>

      {/* Project grid */}
      <div
        className="work-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 24,
        }}
      >
        {portfolio.projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} big={LAYOUTS[i].big} col={LAYOUTS[i].col} />
        ))}
      </div>
    </section>
  );
}
