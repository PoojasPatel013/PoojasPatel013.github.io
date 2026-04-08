/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useEffect, memo } from 'react';
import * as THREE from 'three';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Home', link: '' },
      { label: 'About', link: '' },
      { label: 'Contact', link: '' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        {mode === 'bar' && <NavItems items={navItems} />}
        <Wrapper modeProps={modeProps}>
          <Scroll>
            {/* We can hide default Images/Typography since it's just a background cursor */}
          </Scroll>
          <Scroll html />
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  const defaultGeometry = React.useMemo(() => {
    if (geometryKey === 'Cube') return new THREE.BoxGeometry(2, 2, 2);
    // Cylinder acts as the Lens
    return new THREE.CylinderGeometry(1.5, 1.5, 0.2, 64);
  }, [geometryKey]);

  useEffect(() => {
    defaultGeometry.computeBoundingBox();
    geoWidthRef.current = defaultGeometry.boundingBox.max.x - defaultGeometry.boundingBox.min.x || 1;
  }, [defaultGeometry]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    
    if (ref.current) {
        easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

        if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        ref.current.scale.setScalar(Math.min(0.15, desired));
        }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Background Color set to soft pastel blue/gray
    gl.setClearColor(0xFAFAFA, 1);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh ref={ref} scale={scale ?? 0.15} rotation-x={Math.PI / 2} geometry={defaultGeometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }) {
  return <ModeWrapper geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }) {
  return <ModeWrapper geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items }) {
  return null;
}
