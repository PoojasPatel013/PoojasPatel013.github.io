import React, { Suspense } from 'react';
import FluidGlass from '../FluidGlass/FluidGlass';

const FluidCursorBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#FAFAFA]">
      <Suspense fallback={null}>
        <FluidGlass
          mode="lens"
          lensProps={{
            scale: 0.15,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01
          }}
        />
      </Suspense>
    </div>
  );
};

export default FluidCursorBackground;
