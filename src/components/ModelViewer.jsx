// ============ //
// Model Viewer //
// ============ //

import React, { Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import { Stars } from '@react-three/drei';
import { Riple } from 'react-loading-indicators';

// import { GlowEffect } from './GlowEffect';
import { ScreenVideo } from './ScreenVideo';

function Model({ modelPath }) 
{
  const { scene } = useGLTF(modelPath);
  scene.position.set(0, -4, 0);

  // For debugging and finding mesh names. I fucked up on blender...
  // const printHierarchy = (obj, indent = 0) => {
  //   const prefix = '  '.repeat(indent);
  //   let materialInfo = '';
  //   if (obj.isMesh && obj.material) {
  //     if (Array.isArray(obj.material)) {
  //       materialInfo = ` Materials: [${obj.material.map(m => m.name).join(', ')}]`;
  //     } else {
  //       materialInfo = ` Material: "${obj.material.name}"`;
  //     }
  //   }
  //   console.log(`${prefix}${obj.type}: "${obj.name}" ${obj.isMesh ? '(MESH)' : ''}${materialInfo}`);
  //   obj.children.forEach(child => printHierarchy(child, indent + 1));
  // };
  // printHierarchy(scene);

  return <primitive object={scene} />;
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
  // Detect if device is mobile
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas 
        camera={{ position: [20, 10, -20], fov: 40 }}
        gl={{ 
          antialias: !isMobile, // Disable antialiasing on mobile
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.2,
          powerPreference: "high-performance"
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
      >
        {/* Enhanced ambient for purple glow */}
        <ambientLight intensity={0.25} color="#b8a5d9" />
        
        {/* Single area light for overall purple ambiance */}
        <rectAreaLight
          position={[0, 0, -7.5]}
          width={12}
          height={8}
          color="#8b5cf6"
          intensity={0.8}
        />

        <rectAreaLight
          position={[-1, 0, 5.8]}
          width={12}
          height={8}
          color="#8b5cf6"
          intensity={1.8}
        />

        <rectAreaLight
          position={[1, 0, 6]}
          width={12}
          height={8}
          color="#8b5cf6"
          intensity={1.8}
        />
        
        {/* Purple-tinted hemisphere */}
        <hemisphereLight skyColor="#c4b5fd" groundColor="#7c3aed" intensity={0.4} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <Suspense fallback={<Loader />}>
          <Model modelPath={modelPath} />
        </Suspense>

        {/* <GlowEffect /> */}

        <ScreenVideo 
          meshNames={['Cube008', 'Cube008_1']}
          materialName="Screen"
          videoSrc="/videos/kpdh.mp4"
          delaySeconds={3}
        />

        <ScreenVideo 
          meshNames={['Cube024', 'Cube024_1']}
          materialName="Monitor_Screen_H"
          videoSrc="/videos/persona5.mp4"
          delaySeconds={3}
        />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          maxPolarAngle={Math.PI / 2}
          enableDamping={!isMobile} // Disable damping on mobile for better performance
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}

export default ModelViewer;