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
      className="rounded-[24px] p-8 flex flex-col gap-4 w-full md:w-[48%]"
      style={{
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(168,85,247,0.2)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(88,28,195,0.15)',
      }}
    >
      <div className="flex justify-between items-start">
        <span
          className="font-outfit text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ color: '#c084fc', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(168,85,247,0.2)' }}
        >
          {exp.type}
        </span>
        <span className="font-inter text-sm" style={{ color: 'rgba(196,148,255,0.6)' }}>{exp.period}</span>
      </div>
      <div>
        <h3 className="font-outfit text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#e9d5ff' }}>
          {exp.role}
        </h3>
        <p className="font-inter text-base font-medium" style={{ color: '#c084fc' }}>
          {exp.company}
        </p>
      </div>
      <div className="h-px w-full my-2" style={{ background: 'rgba(168,85,247,0.15)' }} />
      <ul className="flex flex-col gap-2">
        {exp.highlights.map((hlt, i) => (
          <li key={i} className="font-inter text-sm md:text-base font-light flex gap-3" style={{ color: 'rgba(233,213,255,0.7)' }}>
            <span style={{ color: '#7c3aed' }}>●</span>
            {hlt}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="font-inter text-xs px-3 py-1 rounded-md"
            style={{
              color: '#c084fc',
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(168,85,247,0.15)',
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
        <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tighter mb-12" style={{ color: '#e9d5ff' }}>
          Professional Journey<span style={{ color: '#7c3aed' }}>.</span>
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
