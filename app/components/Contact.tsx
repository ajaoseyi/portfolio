import { useState } from 'react';
import { portfolio } from '~/data/portfolio';
import { Reveal } from '~/components/Reveal';

const SOCIAL_LINKS = [
  { label: 'GitHub', handle: '@ajaoseyi', href: portfolio.socials.github },
  { label: 'LinkedIn', handle: '/in/abdulsamad-ajao', href: portfolio.socials.linkedin },
  { label: 'X / Twitter', handle: '@Abdulsamad_O', href: portfolio.socials.twitter },
  { label: 'Dev.to', handle: '@ajaoseyi', href: portfolio.socials.devto },
];

const LOOKING_FOR = [
  {
    title: 'Senior or staff role',
    body: 'Product-led teams shipping React or React Native at real scale.',
  },
  {
    title: 'Consulting · 4-week min.',
    body: 'Performance audits, design-system bring-up, hiring loops.',
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(portfolio.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="contact"
      style={{
        background: 'var(--invert-bg)',
        color: 'var(--invert-ink)',
        padding: '80px 0 0',
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
              № 06 — Contact
            </span>
          </Reveal>
          <Reveal
            delay={1}
            style={{
              gridColumn: 'span 6',
              borderTop: '1px solid rgba(250,250,248,0.15)',
              paddingTop: 14,
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#0eea6c',
              }}
            />
            <span className="kicker" style={{ color: 'var(--dark-dim)' }}>
              {portfolio.available}
            </span>
          </Reveal>
        </div>

        {/* Big headline */}
        <Reveal
          as="h2"
          className="serif-h"
          style={{
            fontSize: 'clamp(66px, 13vw, 222px)',
            lineHeight: 0.92,
            marginTop: 40,
          }}
        >
          Let's
          <br />
          <em style={{ color: 'var(--dark-dim)' }}>build</em> something.
        </Reveal>

        {/* Contact cards */}
        <div
          className="contact-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 4fr 3fr',
            gap: 24,
            marginTop: 64,
          }}
        >
          {/* Email */}
          <Reveal style={{ borderTop: '1px solid rgba(250,250,248,0.15)', paddingTop: 18 }}>
            <div className="kicker" style={{ color: 'var(--dark-dim)' }}>Email — fastest</div>
            <div
              className="serif-h"
              style={{
                fontSize: 'clamp(20px, 2.5vw, 38px)',
                marginTop: 8,
                color: '#fafaf8',
                wordBreak: 'break-all',
              }}
            >
              {portfolio.email}
            </div>
            <button
              onClick={handleCopy}
              style={{
                marginTop: 20,
                padding: '14px 22px',
                border: '1px solid #fafaf8',
                color: '#fafaf8',
                fontSize: 13,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fafaf8';
                e.currentTarget.style.color = '#0a0a0a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fafaf8';
              }}
            >
              {copied ? 'Copied ✓' : 'Copy address'}
            </button>
          </Reveal>

          {/* Calendar */}
          <Reveal
            delay={1}
            style={{ borderTop: '1px solid rgba(250,250,248,0.15)', paddingTop: 18 }}
          >
            <div className="kicker" style={{ color: 'var(--dark-dim)' }}>30-min intro call</div>
            <div
              className="serif-h"
              style={{ fontSize: 30, marginTop: 8, color: '#fafaf8', lineHeight: 1.2 }}
            >
              Tell me about the work — I'll come prepared.
            </div>
            <a
              href="mailto:ajaoabdulsamad2000@gmail.com?subject=Let's talk"
              style={{
                display: 'inline-block',
                marginTop: 20,
                padding: '14px 22px',
                background: '#fafaf8',
                color: '#0a0a0a',
                fontSize: 13,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Book a slot →
            </a>
          </Reveal>

          {/* Socials */}
          <Reveal
            delay={2}
            style={{ borderTop: '1px solid rgba(250,250,248,0.15)', paddingTop: 18 }}
          >
            <div className="kicker" style={{ color: 'var(--dark-dim)', marginBottom: 12 }}>
              Elsewhere
            </div>
            <ul style={{ listStyle: 'none' }}>
              {SOCIAL_LINKS.map(({ label, handle, href }) => (
                <li key={label} style={{ borderBottom: '1px dashed #2a2a2a' }}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      fontSize: 15,
                      color: 'var(--dark-text)',
                      textDecoration: 'none',
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ color: '#fafaf8' }}>{handle} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={portfolio.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 16,
                fontSize: 13,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--dark-dim)',
                textDecoration: 'none',
              }}
            >
              Download CV ↓
            </a>
          </Reveal>
        </div>

        {/* What I'm looking for */}
        <Reveal
          style={{
            marginTop: 64,
            paddingTop: 18,
            borderTop: '1px dashed #2a2a2a',
          }}
        >
          <div
            className="contact-looking-for"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: 24,
              alignItems: 'start',
            }}
          >
            <div className="kicker" style={{ color: 'var(--dark-dim)' }}>
              What I'm looking for
            </div>
            <div className="contact-looking-for-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {LOOKING_FOR.map(({ title, body }, i) => (
                <div key={i}>
                  <div className="serif-h" style={{ fontSize: 26, color: '#fafaf8' }}>{title}</div>
                  <p style={{ marginTop: 6, fontSize: 15, color: 'var(--dark-dim)', lineHeight: 1.55 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '40px 0 32px',
            marginTop: 56,
            borderTop: '1px solid #2a2a2a',
          }}
          className="kicker"
        >
          <span style={{ color: 'var(--dark-dim)' }}>
            © Abdulsamad Ajao MMXXVI · All rights reserved
          </span>
          <span style={{ color: 'var(--dark-dim)' }}>
            Crafted with care · Set in Inter & Instrument Serif
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ color: 'var(--dark-dim)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </section>
  );
}
