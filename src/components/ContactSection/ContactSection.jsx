import React from 'react';
import Folder from '../Folder/Folder';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/PoojasPatel013',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pooja-p-77329933b/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:poojaspatel1375@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

import { withPrefix } from 'gatsby';

const FOLDER_ITEMS = [
  <span key="1" style={{ fontSize: 9, color: '#7c3aed', fontFamily: 'monospace' }}>portfolio.md</span>,
  <span key="2" style={{ fontSize: 9, color: '#9333ea', fontFamily: 'monospace' }}>research.pdf</span>,
  <a key="3" href={withPrefix('/assets/files/cv.pdf')} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: '#a855f7', fontFamily: 'monospace', textDecoration: 'underline', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#c084fc'} onMouseOut={(e) => e.target.style.color = '#a855f7'}>cv.pdf</a>,
];

const CLI_LINES = [
  { prompt: '~', cmd: 'whoami', out: 'pooja-patel' },
  { prompt: '~', cmd: 'cat interests.txt', out: 'ML · Systems · Security · Cloud' },
  { prompt: '~', cmd: 'open socials/', out: null },
];

const ContactSection = () => {
  return (
    <section id="connect" className="snap-section relative flex flex-col px-6 md:px-16 min-h-screen overflow-hidden">

      {/* Header */}
      <div className="mt-24 mb-16">
        <h2 className="font-outfit text-5xl md:text-7xl font-black tracking-tighter" style={{ color: '#1e293b' }}>
          Connect<span style={{ color: '#d946ef' }}>.</span>
        </h2>
        <p className="font-inter text-base mt-2" style={{ color: '#64748b' }}>
          Let's build something exceptional together.
        </p>
      </div>

      {/* Main content row */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20 flex-1">

        {/* LEFT — CLI terminal + social links */}
        <div className="flex flex-col gap-8 flex-1 min-w-0">

          {/* Terminal card */}
          <div
            className="rounded-2xl p-6 font-mono text-sm"
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(192,132,252,0.3)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 40px rgba(192, 132, 252, 0.1)',
            }}
          >
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
              <span className="ml-3 text-xs" style={{ color: '#94a3b8' }}>pooja@portfolio ~ </span>
            </div>

            {CLI_LINES.map((line, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#c084fc' }}>❯</span>
                  <span style={{ color: '#334155' }}>{line.cmd}</span>
                </div>
                {line.out && (
                  <div className="mt-1 ml-5" style={{ color: '#64748b' }}>{line.out}</div>
                )}
              </div>
            ))}

            {/* Social links as CLI output */}
            <div className="mt-4 flex flex-col gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group transition-all duration-300"
                  style={{ color: '#64748b' }}
                >
                  <span style={{ color: '#c084fc' }}>├─</span>
                  <span className="group-hover:text-purple-600 transition-colors" style={{ color: '#475569' }}>
                    {s.icon}
                  </span>
                  <span
                    className="font-sans font-semibold tracking-wide group-hover:underline"
                    style={{ color: '#334155', textDecorationColor: '#c084fc' }}
                  >
                    {s.label}
                  </span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs" style={{ color: '#c084fc' }}>↗</span>
                </a>
              ))}
            </div>

            {/* Blinking cursor */}
            <div className="mt-4 flex items-center gap-2">
              <span style={{ color: '#c084fc' }}>❯</span>
              <span className="inline-block w-2 h-4 animate-pulse" style={{ background: '#c084fc' }} />
            </div>
          </div>
        </div>

        {/* CENTRE — Interactive Folder */}
        <div className="flex flex-col items-center justify-center gap-6 shrink-0">
          <div
            style={{
              perspective: '800px',
              transformStyle: 'preserve-3d',
              width: '320px',
              height: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Folder
              color="#d946ef" // Fuchsia color to pop against light bg
              size={2}
              items={FOLDER_ITEMS}
              className="drop-shadow-2xl"
            />
          </div>
          <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
            click to open
          </p>
        </div>

        {/* RIGHT — Regal quote */}
        <div
          className="flex-1 flex flex-col justify-center min-w-0"
          style={{ borderLeft: '1px solid rgba(192,132,252,0.3)', paddingLeft: '2rem' }}
        >
          <blockquote className="relative">
            {/* Large decorative quote mark */}
            <span
              className="absolute -top-8 -left-4 select-none pointer-events-none"
              style={{
                fontSize: '8rem',
                lineHeight: 1,
                color: 'rgba(217, 70, 239, 0.15)', // Light fuchsia quote mark
                fontFamily: 'Georgia, serif',
              }}
            >
              "
            </span>

            <p
              className="relative z-10 leading-relaxed"
              style={{
                fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#1e293b', // Dark plum/slate
                letterSpacing: '0.01em',
              }}
            >
              The systems we build today
              <br />
              <span style={{ color: '#c084fc' }}>become the architecture</span>
              <br />
              of tomorrow's intelligence.
            </p>

            <footer className="mt-6">
              <cite
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontStyle: 'normal',
                  fontSize: '0.875rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  display: 'block',
                }}
              >
                — Pooja Patel
              </cite>
              <div className="mt-2 h-px w-16" style={{ background: 'linear-gradient(90deg, #d946ef, transparent)' }} />
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-between items-end mt-auto py-12">
        <p className="font-inter text-xs" style={{ color: '#94a3b8' }}>
          © {new Date().getFullYear()} Pooja Patel
        </p>
        <p className="font-inter text-xs hidden md:block" style={{ color: '#94a3b8' }}>
          Built with Gatsby &amp; Framer Motion
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
