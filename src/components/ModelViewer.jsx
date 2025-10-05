// ============ //
// Model Viewer //
// ============ //

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { Stars } from '@react-three/drei';
import { Riple } from 'react-loading-indicators';
import * as THREE from 'three';

function Model({ modelPath }) 
{
  const { scene } = useGLTF(modelPath);
  scene.position.set(0, -4, 0);
  return <primitive object={scene} />;
}

// LED strip light effect
function LEDStripLight({ position, direction, color, intensity, length = 10 }) 
{
  const groupRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (groupRef.current) 
    {
      groupRef.current.children.forEach((light, i) => {
        light.intensity = intensity + Math.sin(time.current * 1.5 + i * 0.3) * 0.15;
      });
    }
  });

  const lights = [];
  for (let i = 0; i < 8; i++) {
    const offset = (i / 7 - 0.5) * length;
    const pos = [
      position[0] + direction[0] * offset,
      position[1] + direction[1] * offset,
      position[2] + direction[2] * offset
    ];
    lights.push(
      <pointLight
        key={i}
        position={pos}
        color={color}
        intensity={intensity}
        distance={8}
        decay={2.5}
      />
    );
  }

  return <group ref={groupRef}>{lights}</group>;
}

function Loader() 
{
  const { active } = useProgress();
  if (!active) return null;

  return (
    <Html center style={{ pointerEvents: 'none', zIndex: 1000 }}>
      <Riple size="large" color="white" text="" textColor="white" />
    </Html>
  );
}

function ModelViewer({ modelPath = "/models/Room.glb" }) 
{
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas 
        camera={{ position: [20, 10, -20], fov: 40 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        {/* Balanced ambient lighting */}
        <ambientLight intensity={0.15} color="#e8e8f0" />
        
        {/* top of spiderverse next to curtains */}
        <LEDStripLight 
          position={[0, 3.5, 0]} 
          direction={[1, 0, 0]} 
          color="#a855f7" 
          intensity={2.3}
          length={10}
        />
        
        {/* on top of spiderverse poster */}
        <LEDStripLight 
          position={[-4, 2, -1]} 
          direction={[0, 0, 1]} 
          color="#9333ea" 
          intensity={2.0}
          length={8}
        />
        
        {/* under bed */}
        <LEDStripLight 
          position={[5, 0, 0]} 
          direction={[0, 1, 0]} 
          color="#c084fc" 
          intensity={2.0}
          length={6}
        />
        
        {/* on game bookshelf */}
        <LEDStripLight 
          position={[-3, -3, -7]} 
          direction={[0, 1, 0]} 
          color="#d8b4fe" 
          intensity={2.1}
          length={6}
        />
        
        {/* on whiteboard */}
        <LEDStripLight 
          position={[7, 0, -5]} 
          direction={[0, 1, 0]} 
          color="#a855f7" 
          intensity={2.1}
          length={6}
        />
        
        {/* on vertical monitor */}
        <LEDStripLight 
          position={[-4.5, -2, 4]} 
          direction={[0, 1, 0]} 
          color="#c084fc" 
          intensity={1.9}
          length={5}
        />
        
        {/* on manga bookshelf */}
        <LEDStripLight 
          position={[4.5, -1, 4]} 
          direction={[0, 1, 0]} 
          color="#9333ea" 
          intensity={1.9}
          length={5}
        />
        
        {/* on left curtain */}
        <LEDStripLight 
          position={[0, 3, 4]} 
          direction={[1, 0, 0]} 
          color="#d8b4fe" 
          intensity={1.7}
          length={8}
        />
        
        {/* on bottom of guitar */}
        <LEDStripLight 
          position={[-4, -3, 0]} 
          direction={[0, 0, -1]} 
          color="#a855f7" 
          intensity={1.6}
          length={7}
        />
        
        {/* above tv */}
        <LEDStripLight 
          position={[0, 4, -5]} 
          direction={[1, 0, 0]} 
          color="#c084fc" 
          intensity={2.2}
          length={7}
        />
        
        {/* above dresser */}
        <rectAreaLight
          position={[0, 0, -5.5]}
          width={9}
          height={7}
          color="#7c3aed"
          intensity={1.4}
        />
        
        {/* Neutral hemisphere */}
        <hemisphereLight skyColor="#b8b8d0" groundColor="#606070" intensity={0.3} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <Suspense fallback={<Loader />}>
          <Model modelPath={modelPath} />
        </Suspense>

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

export default ModelViewer;