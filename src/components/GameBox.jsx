// =========== //
// 3D Game Box //
// =========== //

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const BOX_HEIGHT = 2;
const EDGE_RADIUS = 0.03;

function Box({ front, back, spine, width, depth, caseColor })
{
  const textures = useTexture([front, back, spine]);

  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });

  const [frontTex, backTex, spineTex] = textures;

  // BoxGeometry face order: +x, -x, +y, -y, +z, -z
  const materials = useMemo(() => {
    const plastic = new THREE.MeshStandardMaterial({ color: caseColor, roughness: 0.45 });
    const cover = (map) => new THREE.MeshStandardMaterial({ map, roughness: 0.55 });
    return [plastic, cover(spineTex), plastic, plastic, cover(frontTex), cover(backTex)];
  }, [frontTex, backTex, spineTex, caseColor]);

  const geometry = useMemo(
    () => new RoundedBoxGeometry(width, BOX_HEIGHT, depth, 4, EDGE_RADIUS),
    [width, depth]
  );

  return <mesh geometry={geometry} material={materials} />;
}

export default function GameBox({ front, back, spine, frontRatio, spineRatio, caseColor = "#ffffff" })
{
  return (
    <div className="w-[200px] h-[260px] cursor-grab active:cursor-grabbing">
      <Canvas flat camera={{ position: [-2.2, 0.5, 4], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={2.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <directionalLight position={[-3, 2, -5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Box
            front={front}
            back={back}
            spine={spine}
            width={BOX_HEIGHT * frontRatio}
            depth={BOX_HEIGHT * spineRatio}
            caseColor={caseColor}
          />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>
    </div>
  );
}
