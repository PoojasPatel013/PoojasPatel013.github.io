/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect, memo } from 'react';
import * as THREE from 'three';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

// Shared mouse state — updated from window events so it works even with pointer-events:none
const mouse = { x: 0, y: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;
  const modeProps = { scale: 0.25, ior: 1.15, thickness: 5, chromaticAberration: 0.1, anisotropy: 0.01, ...rawOverrides };

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 9999, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true, antialias: true }} style={{ pointerEvents: 'none' }}>
        <GlassLens mode={mode} modeProps={modeProps} />
      </Canvas>
    </div>
  );
}

const GlassLens = memo(function GlassLens({ mode, modeProps }) {
  const ref = useRef();
  const buffer = useFBO(1024, 1024);
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  const glbPath = mode === 'bar' ? '/assets/3d/bar.glb' : mode === 'cube' ? '/assets/3d/cube.glb' : '/assets/3d/lens.glb';
  const geometryKey = mode === 'bar' ? 'Cube' : mode === 'cube' ? 'Cube' : 'Cylinder';
  const { nodes } = useGLTF(glbPath);

  useEffect(() => {
    if (!nodes?.[geometryKey]?.geometry) return;
    const geo = nodes[geometryKey].geometry;
    geo.computeBoundingBox();
    geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
  }, [nodes, geometryKey]);

  // Internal scene: adjust colors to match light lilac bg setting
  useEffect(() => {
    const meshes = [];
    const add = (color, opacity, pos, size = [30, 30]) => {
      const g = new THREE.PlaneGeometry(...size);
      const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(...pos);
      scene.add(mesh);
      meshes.push(mesh);
    };
    add('#f5eef8', 1, [0, 0, -8]); // Match the new global background
    add('#f0e8ff', 0.5, [0, 0, -5]); // Light lavender hint
    add('#e9d5ff', 0.2, [-2, 1, -3]); // Soft plum hint
    return () => { meshes.forEach(m => { scene.remove(m); m.geometry.dispose(); m.material.dispose(); }); };
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { gl, camera } = state;
    const v = vp;

    // Use our window-tracked mouse coords instead of R3F's pointer (which is (0,0) since canvas has pointer-events:none)
    const destX = (mouse.x * v.width) / 2;
    const destY = (mouse.y * v.height) / 2;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.12, delta);

    ref.current.rotation.z += delta * 0.04;

    if (modeProps.scale == null) {
      ref.current.scale.setScalar(Math.min(0.5, (v.width * 0.9) / geoWidthRef.current));
    }

    gl.setRenderTarget(buffer);
    gl.setClearColor(0x110022, 1);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;
  if (!nodes?.[geometryKey]?.geometry) return null;

  return (
    <>
      {createPortal(<></>, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.25} rotation-x={Math.PI / 2} geometry={nodes[geometryKey].geometry}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          transmission={1}
          roughness={0}
          color="#f5eef8" // Clear/light glass
          attenuationColor="#e9d5ff" // Light plum attenuation
          attenuationDistance={0.4}
          {...extraMat}
        />
      </mesh>
    </>
  );
});
