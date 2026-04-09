import React from 'react';
import { Helmet } from 'react-helmet';

import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu';
import HeroSection from '../components/HeroSection/HeroSection';
import SkillsSection from '../components/SkillsSection/SkillsSection';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection/ExperienceSection';
import ContactSection from '../components/ContactSection/ContactSection';
import FluidGlass from '../components/FluidGlass/FluidGlass';

const IndexPage = () => {
  const isBrowser = typeof window !== 'undefined';

  return (
    <>
      <Helmet>
        <title>Pooja Patel — Applied ML Systems Researcher</title>
        <meta name="description" content="Portfolio of Pooja Patel — Lucid Architect Design." />
      </Helmet>

      {/* Fixed glass lens overlay — follows cursor across ALL sections */}


      {/* Hamburger menu overlay */}
      <StaggeredMenu />

      {/* Normal DOM page — all sections scroll naturally */}
      <main className="w-full relative z-10">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />

        {/* ReactBits FluidGlass demo block as requested */}
        {isBrowser && (
          <div style={{ height: '800px', position: 'relative' }} className="w-full bg-[#5227ff] my-12">
            <FluidGlass
              mode="lens"
              lensProps={{
                scale: 0.25,
                ior: 1.15,
                thickness: 5,
                chromaticAberration: 0.1,
                anisotropy: 0.01
              }}
            />
          </div>
        )}

        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
};

export default IndexPage;
