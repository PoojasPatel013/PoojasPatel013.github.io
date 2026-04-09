import React from 'react';
import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack';

const ProjectsSection = () => {
  const PROJECTS = [
    {
      id: 'netra',
      header: '01 - Cybersecurity',
      title: 'NETRA v2',
      subtitle: 'AI-Native Asset Discovery Engine',
    },
    {
      id: 'oasis',
      header: '02 - AI Documentation',
      title: 'OASIS',
      subtitle: 'Self-Healing Documentation Engine',
    },
    {
      id: 'disaster',
      header: '03 - ML Platform',
      title: 'Disaster Risk Prediction',
      subtitle: 'End-to-End ML Platform for Risk Modeling',
    },
  ];

  return (
    <section id="projects" className="relative w-full z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
        <h2 className="font-outfit text-4xl md:text-6xl font-black tracking-tighter mb-[5vh]" style={{ color: '#e9d5ff' }}>
          Systems I've Built<span style={{ color: '#7c3aed' }}>.</span>
        </h2>
      </div>
      
      {/* Scroll Stack using framer-motion's useScroll and sticky positioning for flawless performance */}
      <ScrollStack projects={PROJECTS} />
    </section>
  );
};

export default ProjectsSection;
