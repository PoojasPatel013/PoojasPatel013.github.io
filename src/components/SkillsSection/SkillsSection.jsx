import React from 'react';
import FlowingMenu from '../FlowingMenu/FlowingMenu';

const SkillsSection = () => {
  const SKILL_ITEMS = [
    { text: 'Systems architecture', href: '#' },
    { text: 'Applied ML & AI', href: '#' },
    { text: 'Cloud Systems', href: '#' },
    { text: 'Security', href: '#' },
  ];

  return (
    <section
      id="skills"
      className="relative w-full z-10 py-32 bg-offwhite min-h-[70vh] flex flex-col justify-center"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section header */}
        <header className="mb-12">
          <h2 id="skills-heading" className="font-outfit text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">
            Core Competencies<span className="text-slate-400">.</span>
          </h2>
          <p className="font-inter text-xl text-slate-500 font-light mt-4">
            A curated stack refined through research and production-grade deployments.
          </p>
        </header>

        {/* Flowing Menu integration for skills */}
        <div className="mt-16 w-full flex justify-center">
          <FlowingMenu items={SKILL_ITEMS} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
