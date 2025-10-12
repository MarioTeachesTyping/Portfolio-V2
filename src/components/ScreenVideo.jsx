// ======================= //
// Video Player on Screens //
// ======================= //

import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three';

export function ScreenVideo({ 
  meshNames = ['Cube008', 'Cube008_1'], 
  materialName = 'Screen',
  videoSrc = '/images/kpdh.mp4',
  delaySeconds = 3
}) {
  const { scene } = useThree();
  const { progress } = useProgress();
  const videoRef = useRef(null);
  const appliedRef = useRef(false);
  const loadTimeRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Detect when model is fully loaded
  useEffect(() => {
    if (progress === 100 && !modelLoaded) {
      setModelLoaded(true);
      loadTimeRef.current = Date.now();
    }
  }, [progress, modelLoaded]);

  // Apply video texture and handle delayed playback
  useEffect(() => {
    if (!scene || !modelLoaded || appliedRef.current) return;

    // Create video element
    const video = document.createElement('video');
    video.src = videoSrc;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    
    // Critical: add event listener for when video metadata is loaded
    video.addEventListener('loadedmetadata', () => {
      console.log('Video loaded:', videoSrc);

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

      // Play video after delay
      const playVideo = () => {
        video.play().catch(err => console.log('Video play error:', err));
      };

      setTimeout(playVideo, delaySeconds * 1000);
      appliedRef.current = true;
    });

    // Handle errors
    video.addEventListener('error', (e) => {
      console.error('Video error:', e);
    });

    videoRef.current = video;

    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, [scene, meshNames, materialName, videoSrc, modelLoaded, delaySeconds]);

  return null;
}