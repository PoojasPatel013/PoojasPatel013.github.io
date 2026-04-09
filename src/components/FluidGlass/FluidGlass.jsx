/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect, memo } from 'react';
import * as THREE from 'three';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

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

  // Build a LIGHT internal scene — white/silver so glass looks clear, not dark
  useEffect(() => {
    const meshes = [];
    const addPlane = (color, opacity, pos, size = [30, 30]) => {
      const geo = new THREE.PlaneGeometry(...size);
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity, side: THREE.DoubleSide });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(...pos);
      scene.add(m);
      meshes.push(m);
    };
    // Light silver-white base so glass is transparent/clear, not a dark blob
    addPlane('#ffffff', 1.0, [0, 0, -8]);       // white base
    addPlane('#f0e8ff', 0.5, [0, 0, -6]);       // faint lavender
    addPlane('#e9d5ff', 0.2, [-3, 2, -4]);      // very faint purple
    addPlane('#ddd6fe', 0.15, [3, -2, -5]);     // violet whisp
    return () => { meshes.forEach(m => { scene.remove(m); m.geometry.dispose(); m.material.dispose(); }); };
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Follow cursor
    easing.damp3(ref.current.position, [(pointer.x * v.width) / 2, (pointer.y * v.height) / 2, 15], 0.15, delta);

    // Subtle slow rotation
    ref.current.rotation.z += delta * 0.05;

    if (modeProps.scale == null) {
      ref.current.scale.setScalar(Math.min(0.5, (v.width * 0.9) / geoWidthRef.current));
    }

    // Render white internal scene into FBO
    gl.setRenderTarget(buffer);
    gl.setClearColor(0xffffff, 1);
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
          roughness={0.02}
          color="#ffffff"
          {...extraMat}
        />
      </mesh>
    </>
  );
});
