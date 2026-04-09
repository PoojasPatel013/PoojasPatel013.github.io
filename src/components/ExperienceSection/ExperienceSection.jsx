import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIENCES = [
  {
    id: 'udaan',
    company: 'Udaan Society',
    role: 'Software Development Engineer',
    period: 'Dec 2025 – Mar 2026',
    type: 'Current',
    highlights: [
      'Engineered a scalable project management platform for non-profit operations.',
      'Architected backend services and secure API endpoints ensuring strict data integrity.',
    ],
    tags: ['FastAPI', 'Scalable Architecture', 'API Design'],
  },
  {
    id: 'pregard',
    company: 'Pregard',
    role: 'Cybersecurity Trainee',
    period: 'Jul 2023 – Oct 2023',
    type: 'Previous',
    highlights: [
      'Partnered with core engineering teams to assess infrastructure security risks.',
      'Analyzed security gaps and recommended configuration changes to improve compliance.',
    ],
    tags: ['Threat Modeling', 'Vulnerability Assessment'],
  },
];

const ExperienceCard = ({ exp, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="rounded-[24px] p-8 flex flex-col gap-4 w-full md:w-[48%] relative overflow-hidden"
      style={{
        background: 'rgba(255, 230, 240, 0.6)', // Light rose pink
        border: '1px solid rgba(251, 113, 133, 0.3)', // Rose border
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(251, 113, 133, 0.1)',
      }}
    >
      {/* Decorative Bow - using an SVG */}
      <div className="absolute -top-2 -right-2 opacity-20 transform rotate-12 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fb7185' }}>
          <path d="M12 9c-1.5-2.5-4-4-7-4-1.5 0-3 1-3 3 0 2.5 4 4.5 9 5.5-1 1-2.5 3-2.5 5 0 1.5 1 3 3 3 1.5 0 3-1 4-2.5 1 1.5 2.5 2.5 4 2.5 2 0 3-1.5 3-3 0-2-1.5-4-2.5-5 5-1 9-3 9-5.5 0-2-1.5-3-3-3-3 0-5.5 1.5-7 4-1-1-2.5-2.5-4-2.5z" />
        </svg>
      </div>

      <div className="flex justify-between items-start relative z-10">
        <span
          className="font-outfit text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ color: '#be123c', background: 'rgba(251, 113, 133, 0.2)', border: '1px solid rgba(251, 113, 133, 0.3)' }}
        >
          {exp.type}
        </span>
        <span className="font-inter text-sm font-medium" style={{ color: '#881337' }}>{exp.period}</span>
      </div>
      <div className="relative z-10">
        <h3 className="font-outfit text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#4c0519' }}>
          {exp.role}
        </h3>
        <p className="font-inter text-base font-bold mt-1" style={{ color: '#e11d48' }}>
          {exp.company}
        </p>
      </div>
      <div className="h-px w-full my-2 relative z-10" style={{ background: 'rgba(251, 113, 133, 0.3)' }} />
      <ul className="flex flex-col gap-2 relative z-10">
        {exp.highlights.map((hlt, i) => (
          <li key={i} className="font-inter text-sm md:text-base font-medium flex gap-3" style={{ color: '#4c0519' }}>
            <span style={{ color: '#fb7185' }}>✿</span> {/* Flower bullet */}
            {hlt}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-auto pt-4 relative z-10">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="font-inter text-xs px-3 py-1 rounded-md font-medium"
            style={{
              color: '#9f1239',
              background: 'rgba(251, 113, 133, 0.15)',
              border: '1px solid rgba(251, 113, 133, 0.2)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="snap-section relative flex flex-col justify-center px-6 md:px-12 min-h-screen">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tighter mb-12" style={{ color: '#1e293b' }}>
          Professional Journey<span style={{ color: '#fb7185' }}>.</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 justify-between w-full">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
