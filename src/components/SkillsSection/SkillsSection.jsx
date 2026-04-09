import React from 'react';
import FlowingMenu from '../FlowingMenu/FlowingMenu';

const SkillsSection = () => {
  const SKILL_ITEMS = [
    { link: '#', text: 'Systems architecture', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop' },
    { link: '#', text: 'Applied ML & AI', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop' },
    { link: '#', text: 'Cloud Systems', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop' },
    { link: '#', text: 'Security', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop' },
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
        <div className="mt-16 w-full flex justify-center h-[600px] relative">
          <FlowingMenu 
            items={SKILL_ITEMS}
            speed={15}
            textColor="#e9d5ff"
            bgColor="transparent"
            marqueeBgColor="#7c3aed"
            marqueeTextColor="#ffffff"
            borderColor="rgba(168,85,247,0.3)"
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
