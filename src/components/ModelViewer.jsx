// ============ //
// Model Viewer //
// ============ //

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function Model({ modelPath }) 
{
  const { scene } = useGLTF(modelPath);

  scene.position.set(0, -4, 0);

  return <primitive object={scene} />;
}

function Loader() 
{
  const { active } = useProgress();
  if (!active) return null;

  return (
    <Html center style={{ pointerEvents: 'none', zIndex: 1000 }}>
      <p className="text-white text-lg font-semibold">Loading...</p>
    </Html>
  );
}

function ModelViewer({ modelPath = "/models/Room.glb" }) 
{
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [20, 10, -20], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <hemisphereLight skyColor="#e0e0ff" groundColor="#404040" intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <directionalLight position={[-5, 5, -10]} intensity={0.3} />

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