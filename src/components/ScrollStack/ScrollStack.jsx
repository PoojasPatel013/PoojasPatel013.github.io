import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ScrollStackItem = ({ project, index, total }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "start end"]
  });

  // the offset logic for stacking
  const { scrollYProgress: stickyProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // Calculate the target depth scale dynamically based on total cards
  const targetScale = 1 - (total - index - 1) * 0.05;
  
  // Smoothly transform from 1 down to targetScale as we scroll past it
  const scale = useTransform(stickyProgress, [0, 1], [1, targetScale]);
  
  // Darken slightly as it recedes into the background
  const opacity = useTransform(stickyProgress, [0, 1], [1, 0.4]);

  return (
    <div 
      ref={cardRef} 
      className="sticky top-0 flex items-center justify-center min-h-[90vh] pb-12 pt-[20px]"
    >
      <motion.div 
        style={{ 
          scale, 
          opacity, 
          // Stagger the final sticky position based on card index so they peek out
          top: `calc(5vh + ${index * 20}px)` 
        }}
        className="scroll-stack-card relative flex flex-col justify-center w-full max-w-5xl bg-white rounded-[40px] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] ring-1 ring-slate-900/5 origin-top will-change-transform"
      >
        <div className="flex flex-col gap-4">
          <span className="text-sm md:text-base font-outfit font-bold tracking-widest uppercase text-slate-400">
            {project.header}
          </span>
          <h3 className="font-outfit text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="font-inter text-xl md:text-2xl text-slate-500 font-light max-w-2xl mt-4">
            {project.subtitle}
          </p>
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
