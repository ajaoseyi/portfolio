import { useState } from 'react';
import { Link } from 'react-router';
import { portfolio } from '~/data/portfolio';

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

function scrollTo(id: string) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          {/* Logo */}
          <button
            onClick={() => scrollTo('top')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
            }}
          >
            <div style={{ width: 9, height: 9, background: 'var(--ink)', flexShrink: 0 }} />
            A · Abdulsamad
            <sup style={{ fontWeight: 400, color: 'var(--dim)', marginLeft: 2, fontSize: 12 }}>®</sup>
          </button>

          {/* Desktop nav links */}
          <nav className="nav-desktop-links" style={{ color: 'var(--dim)' }}>
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  fontSize: 14,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--dim)',
                  transition: 'color 0.18s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Availability pill */}
          <div className="nav-availability">
            <span
              className="pulse-dot"
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--ink)',
              }}
            />
            {portfolio.available}
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-nav-overlay ${open ? 'is-open' : ''}`}>
        <button
          className="mobile-nav-close kicker"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          Close ✕
        </button>
        {NAV_ITEMS.map(({ id, label }, i) => (
          <button
            key={id}
            onClick={() => { scrollTo(id); setOpen(false); }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(42px, 10vw, 66px)',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              color: 'var(--ink)',
              textAlign: 'left',
              lineHeight: 1.2,
              padding: '6px 0',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.4s ${i * 0.06}s, transform 0.4s ${i * 0.06}s`,
            }}
          >
            {label}
          </button>
        ))}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 32,
            fontSize: 14,
            color: 'var(--dim)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {portfolio.available}
        </div>
      </div>
    </>
  );
}
