import { Link, useParams, redirect } from 'react-router';
import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { portfolio } from '~/data/portfolio';
import { CustomCursor } from '~/components/CustomCursor';
import { SmoothScroll } from '~/components/SmoothScroll';
import { ScrollProgress } from '~/components/ScrollProgress';
import { Reveal } from '~/components/Reveal';

export async function loader({ params }: LoaderFunctionArgs) {
  const project = portfolio.projects.find((p) => p.id === params.id);
  if (!project) throw redirect('/');
  return { project };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: 'Work — Abdulsamad Ajao' }];
  const { project: p } = data;
  return [
    { title: `${p.name} — Abdulsamad Ajao` },
    { name: 'description', content: p.tagline },
  ];
};

function Arrow({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M3 13L13 3M13 3H6M13 3v7" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="square" />
    </svg>
  );
}

export default function CaseStudy({ loaderData }: { loaderData: Awaited<ReturnType<typeof loader>> }) {
  const { project: p } = loaderData;
  const idx = portfolio.projects.findIndex((proj) => proj.id === p.id);
  const next = portfolio.projects[(idx + 1) % portfolio.projects.length];

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', minHeight: '100vh' }}>
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />

      {/* Sticky mini nav */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(244, 243, 239, 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--faint-rule)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px var(--pad-x)',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            ← Back to index
          </Link>
          <span className="kicker">Case Study · {p.n} of 05</span>
          <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" className="kicker cs-nav-visit" style={{ color: 'var(--ink)' }}>
            Visit {p.url} ↗
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '64px var(--pad-x) 0' }}>
        <div className="grid-12">
          <div
            style={{
              gridColumn: 'span 12',
              borderTop: '1px solid var(--ink)',
              paddingTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <span className="kicker">{p.n} · {p.cat}</span>
            <span className="kicker">{p.year} — {p.role}</span>
          </div>
        </div>

        <Reveal
          as="h1"
          className="serif-h"
          style={{ fontSize: 'clamp(66px, 13vw, 202px)', lineHeight: 0.92, marginTop: 32 }}
        >
          {p.name}.
        </Reveal>

        <Reveal
          delay={1}
          className="serif-h"
          style={{
            gridColumn: '1 / span 8',
            marginTop: 24,
            fontSize: 'clamp(26px, 3.4vw, 54px)',
            fontStyle: 'italic',
            lineHeight: 1.15,
            color: '#3a3a38',
            maxWidth: 900,
          }}
        >
          {p.tagline}
        </Reveal>

        <Reveal delay={2} style={{ marginTop: 40 }}>
          <a
            href={`https://${p.url}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              background: '#0a0a0a',
              border: '1px solid #0a0a0a',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#f4f3ef',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2a2a2a';
              e.currentTarget.style.borderColor = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0a0a0a';
              e.currentTarget.style.borderColor = '#0a0a0a';
            }}
          >
            View Project <Arrow size={13} />
          </a>
        </Reveal>

        {/* Outcomes strip */}
        <Reveal
          delay={2}
          className="cs-outcomes-grid"
          style={{
            marginTop: 56,
            paddingTop: 18,
            borderTop: '1px solid var(--ink)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
        >
          {p.outcomes.map((o, i) => (
            <div key={i}>
              <div className="serif-h" style={{ fontSize: 66, lineHeight: 1, letterSpacing: '-0.03em' }}>
                {o.v}
              </div>
              <div className="kicker" style={{ marginTop: 10 }}>{o.k}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Hero visual ── */}
      {p.images?.hero && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '64px var(--pad-x) 0' }}>
          <div
            className="cs-hero-visual"
            style={{
              height: 560,
              background: 'var(--invert-bg)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="serif-h cs-hero-watermark"
              style={{
                position: 'absolute',
                top: -60,
                right: -40,
                fontSize: 722,
                lineHeight: 0.8,
                color: '#161616',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {p.n}
            </div>
            <img
              src={p.images.hero}
              alt={`${p.name} app screenshot`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 2,
              }}
            />
          </div>
        </section>
      )}

      {/* ── Problem / Approach / Stack ── */}
      <section
        className="cs-three-col"
        style={{
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
          padding: '80px var(--pad-x) 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        {[
          { label: 'The problem', content: p.problem },
          { label: 'My approach', content: p.approach },
        ].map(({ label, content }, i) => (
          <Reveal key={label} delay={i as 0 | 1}>
            <div className="kicker" style={{ borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
              {label}
            </div>
            <p style={{ marginTop: 18, fontSize: 19, lineHeight: 1.6, color: '#222' }}>{content}</p>
          </Reveal>
        ))}
        <Reveal delay={2}>
          <div className="kicker" style={{ borderTop: '1px solid var(--ink)', paddingTop: 14 }}>Stack</div>
          <ul style={{ marginTop: 18, padding: 0, listStyle: 'none' }}>
            {p.stack.map((s) => (
              <li
                key={s}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px dashed var(--faint-rule)',
                  fontSize: 15,
                  color: '#222',
                }}
              >
                <span>{s}</span>
                <span style={{ color: 'var(--dim)' }}>·</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── Highlights ── */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px var(--pad-x) 0' }}>
        <div className="kicker" style={{ borderTop: '1px solid var(--ink)', paddingTop: 14 }}>
          What I shipped
        </div>
        <div
          className="cs-three-col"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            marginTop: 32,
          }}
        >
          {p.highlights.map((h, i) => (
            <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
              <div style={{ borderTop: '1px solid var(--faint-rule)', paddingTop: 18 }}>
                <div className="serif-h" style={{ fontSize: 58, color: 'var(--dim)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ marginTop: 14, fontSize: 18, lineHeight: 1.55, color: '#222' }}>{h}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Secondary visual band ── */}
      {(p.images?.logo || p.images?.detail?.length) && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px var(--pad-x) 0' }}>
          <div className="cs-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {p.images?.logo && (
              <div
                style={{
                  height: 360,
                  background: 'var(--invert-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 48,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={p.images.logo}
                  alt={`${p.name} logo`}
                  style={{ maxHeight: 120, maxWidth: '70%', objectFit: 'contain' }}
                />
              </div>
            )}
            {p.images?.detail?.map((src) => (
              <div
                key={src}
                style={{
                  height: 360,
                  background: 'var(--invert-bg)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={src}
                  alt={`${p.name} detail`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center top' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Pull quote ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px var(--pad-x)' }}>
        <Reveal
          className="serif-h"
          style={{
            fontSize: 'clamp(34px, 4.6vw, 74px)',
            lineHeight: 1.15,
            fontStyle: 'italic',
          }}
        >
          "{p.tagline}"{' '}
          <span style={{ color: 'var(--dim)', fontStyle: 'normal', fontSize: '0.5em' }}>
            — the brief, in one line.
          </span>
        </Reveal>
      </section>

      {/* ── Next project ── */}
      <section style={{ borderTop: '1px solid var(--ink)' }}>
        <Link
          to={`/work/${next.id}`}
          style={{
            display: 'block',
            padding: '64px var(--pad-x)',
            transition: 'background 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--invert-bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div
            className="next-project-inner"
            style={{
              maxWidth: 'var(--max-w)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 16,
              alignItems: 'baseline',
            }}
          >
            <div style={{ gridColumn: 'span 6' }}>
              <span className="kicker" style={{ mixBlendMode: 'difference', color: 'white' }}>
                Next case → {next.cat}
              </span>
            </div>
            <div style={{ gridColumn: 'span 6', textAlign: 'right' }}>
              <span className="kicker" style={{ mixBlendMode: 'difference', color: 'white' }}>
                {next.n} of 05
              </span>
            </div>
            <h2
              className="serif-h"
              style={{
                gridColumn: 'span 12',
                margin: '24px 0 0',
                fontSize: 'clamp(66px, 13vw, 202px)',
                lineHeight: 0.9,
                mixBlendMode: 'difference',
                color: 'white',
              }}
            >
              {next.name} <Arrow size={64} color="currentColor" />
            </h2>
          </div>
        </Link>
      </section>
    </div>
  );
}
