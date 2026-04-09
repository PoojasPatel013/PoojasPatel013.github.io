import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Distinct light theme gradients
const CARD_THEMES = [
  {
    bg: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #d8b4fe 100%)', // Grape/Orchid (Project 1)
    accent: '#f5eef8',
    text: '#ffffff',
    sub: 'rgba(255,255,255,0.9)',
    glow: 'rgba(168,85,247,0.3)',
    ring: 'rgba(192,132,252,0.5)',
  },
  {
    bg: 'linear-gradient(135deg, #be185d 0%, #db2777 50%, #f472b6 100%)', // Magenta/Boysenberry (Project 2)
    accent: '#f5eef8',
    text: '#ffffff',
    sub: 'rgba(255,255,255,0.9)',
    glow: 'rgba(219,39,119,0.3)',
    ring: 'rgba(244,114,182,0.5)',
  },
  {
    bg: 'linear-gradient(135deg, #701a75 0%, #a21caf 50%, #d946ef 100%)', // Plum/Jam (Project 3)
    accent: '#f5eef8',
    text: '#ffffff',
    sub: 'rgba(255,255,255,0.9)',
    glow: 'rgba(162,28,175,0.3)',
    ring: 'rgba(217,70,239,0.5)',
  },
];

export const ScrollStackItem = ({ project, index, total }) => {
  const cardRef = useRef(null);
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  const { scrollYProgress: stickyProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (total - index - 1) * 0.05;
  const scale = useTransform(stickyProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(stickyProgress, [0, 1], [1, 0.5]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 flex items-center justify-center min-h-[90vh] pb-12 pt-[20px]"
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: `calc(5vh + ${index * 20}px)`,
          background: theme.bg,
          boxShadow: `0 30px 80px ${theme.glow}, 0 0 0 1px ${theme.ring}, inset 0 1px 0 rgba(255,255,255,0.15)`,
        }}
        className="relative flex flex-col justify-between w-full max-w-5xl rounded-[40px] p-12 md:p-16 origin-top will-change-transform overflow-hidden"
      >
        {/* Neon glow blob */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: theme.accent }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: theme.accent }}
        />

        {/* Glass inner panel */}
        <div
          className="absolute inset-4 rounded-[32px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        />

        <div className="relative flex flex-col gap-5 z-10">
          <span
            className="text-xs md:text-sm font-outfit font-bold tracking-[0.25em] uppercase"
            style={{ color: theme.accent }}
          >
            {project.header}
          </span>
          <h3
            className="font-outfit text-4xl md:text-7xl font-black tracking-tight leading-none"
            style={{ color: theme.text }}
          >
            {project.title}
          </h3>
          <p
            className="font-inter text-lg md:text-2xl font-light max-w-2xl mt-2 leading-relaxed"
            style={{ color: theme.sub }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Bottom index badge */}
        <div className="relative z-10 mt-12 flex items-center justify-between">
          <div
            className="font-outfit font-black text-7xl md:text-9xl leading-none opacity-10 select-none"
            style={{ color: theme.text }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)', border: `1px solid ${theme.ring}` }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ScrollStack = ({ projects }) => {
  return (
    <div className="relative w-full pb-[10vh]">
      {projects.map((project, i) => (
        <ScrollStackItem
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
        />
      ))}
    </div>
  );
};

export default ScrollStack;
