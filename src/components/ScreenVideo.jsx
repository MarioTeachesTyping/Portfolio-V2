// ======================= //
// Video Player on Screens //
// ======================= //

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ScreenVideo({ 
  meshNames = ['Cube008', 'Cube008_1'], 
  materialName = 'Screen',
  videoSrc = '/images/kpdh.mp4' 
}) {
  const { scene } = useThree();
  const videoRef = useRef(null);

  useEffect(() => {
    if (!scene) return;

    // Create video element once
    if (!videoRef.current) {
      const video = document.createElement('video');
      video.src = videoSrc;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      videoRef.current = video;
    }

    const video = videoRef.current;

    // Apply video to matching meshes
    scene.traverse((obj) => {
      if (obj.isMesh && meshNames.includes(obj.name)) {
        const applyVideoTexture = (mat) => {
          if (mat.name === materialName) {
            try {
              const texture = new THREE.VideoTexture(video);
              texture.flipY = false;
              texture.encoding = THREE.sRGBEncoding;
              mat.map = texture;
              mat.needsUpdate = true;
              
              // Play video when first applied
              if (video.paused) {
                video.play().catch(err => console.log('Video play error:', err));
              }
            } catch (err) {
              console.error('Error applying video texture:', err);
            }
          }
        };

        if (Array.isArray(obj.material)) {
          obj.material.forEach(applyVideoTexture);
        } else if (obj.material) {
          applyVideoTexture(obj.material);
        }
      }
    });

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [scene, meshNames, materialName, videoSrc]);

  return null; // This component doesn't render anything
}