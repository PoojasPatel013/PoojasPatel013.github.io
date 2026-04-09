import React from 'react';
import { Helmet } from 'react-helmet';

import StaggeredMenu from '../components/StaggeredMenu/StaggeredMenu';
import HeroSection from '../components/HeroSection/HeroSection';
import SkillsSection from '../components/SkillsSection/SkillsSection';
import ProjectsSection from '../components/ProjectsSection/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection/ExperienceSection';
import ContactSection from '../components/ContactSection/ContactSection';

const FluidGlassSection = React.lazy(() => import('../components/FluidGlass/FluidGlass'));

const IndexPage = () => {
  const isBrowser = typeof window !== 'undefined';

  return (
    <>
      <Helmet>
        <title>Pooja Patel — Applied ML Systems Researcher</title>
        <meta name="description" content="Portfolio of Pooja Patel — Lucid Architect Design." />
      </Helmet>

      {/* Animated Full-Screen Overlay Hamburger Menu */}
      <StaggeredMenu />

      <main className="w-full relative">
        <HeroSection />

        {/* FluidGlass — standalone 3D glass scrolling experience */}
        {isBrowser && (
          <section id="glass" className="relative w-full z-10">
            <div style={{ height: '600px', position: 'relative' }}>
              <React.Suspense fallback={<div className="w-full h-full bg-offwhite" />}>
                <FluidGlassSection
                  mode="lens"
                  lensProps={{
                    scale: 0.25,
                    ior: 1.15,
                    thickness: 5,
                    chromaticAberration: 0.1,
                    anisotropy: 0.01
                  }}
                />
              </React.Suspense>
            </div>
          </section>
        )}

        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
};

export default IndexPage;
