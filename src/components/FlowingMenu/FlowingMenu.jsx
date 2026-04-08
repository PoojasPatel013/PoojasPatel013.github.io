import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MenuItem = ({ text, href, index, hoveredIndex, setHoveredIndex }) => {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.li 
      className="relative flex items-center justify-center py-4 md:py-6 cursor-pointer"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 font-outfit text-5xl md:text-8xl font-black uppercase tracking-tighter text-slate-800 transition-all duration-500 ease-in-out"
        style={{
          fontStyle: isHovered ? 'italic' : 'normal',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          display: 'inline-block'
        }}
      >
        {text}
      </a>
      
      {/* Organic blob underline effect that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="hoverBlob"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute bottom-4 left-0 right-0 h-[20px] md:h-[30px] rounded-full z-0 pointer-events-none mix-blend-multiply"
            style={{
              background: 'linear-gradient(90deg, rgba(135,170,220,0.6) 0%, rgba(180,200,230,0.2) 100%)',
              filter: 'blur(8px)'
            }}
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const FlowingMenu = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const defaultLinks = [
    { text: 'GitHub', href: 'https://github.com/PoojasPatel013' },
    { text: 'LinkedIn', href: 'https://linkedin.com/in/poojapatel013' },
    { text: 'Email', href: 'mailto:poojaspatel1375@gmail.com' },
  ];

  const menuItems = items || defaultLinks;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex flex-col items-center justify-center w-full relative h-[400px]">
        {menuItems.map((link, i) => (
          <MenuItem 
            key={link.text} 
            {...link} 
            index={i} 
            hoveredIndex={hoveredIndex} 
            setHoveredIndex={setHoveredIndex} 
          />
        ))}
      </ul>
    </div>
  );
};

export default FlowingMenu;
