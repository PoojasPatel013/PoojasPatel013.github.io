import React from 'react';
import { Helmet } from 'react-helmet';

import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu';
import HeroSection from '../components/HeroSection/HeroSection';
import SkillsSection from '../components/SkillsSection/SkillsSection';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection/ExperienceSection';
import ContactSection from '../components/ContactSection/ContactSection';

import FluidCursorBackground from '../components/FluidCursorBackground/FluidCursorBackground';

const IndexPage = () => {
  const isBrowser = typeof window !== 'undefined';

  return (
    <>
      <Helmet>
        <title>Pooja Patel — Applied ML Systems Researcher</title>
        <meta name="description" content="Portfolio of Pooja Patel — Lucid Architect Design." />
      </Helmet>

      {/* Global Background Interactive Blob */}
      {isBrowser && <FluidCursorBackground />}

      {/* Animated Full-Screen Overlay Hamburger Menu */}
      <StaggeredMenu />

      <main className="w-full">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
};

export default IndexPage;
