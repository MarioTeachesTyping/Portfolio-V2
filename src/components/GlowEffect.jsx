// =================== //
// Glow/Outline Effect //
// =================== //

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function GlowEffect({ meshNames = ['Cube008', 'Cube008_1'] }) 
{
  const { camera, scene, gl } = useThree();
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const outlineObjectsRef = useRef({});

  useEffect(() => {
    if (!scene) return;

    // Find all meshes matching the names and create outlines
    scene.traverse((obj) => {
      if (obj.isMesh && meshNames.includes(obj.name)) {
        // Create outline geometry from the original mesh
        const outlineGeometry = obj.geometry.clone();
        const outlineMaterial = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
          side: THREE.BackSide,
          wireframe: false,
        });

        const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial);
        outlineMesh.position.copy(obj.position);
        outlineMesh.rotation.copy(obj.rotation);
        outlineMesh.scale.copy(obj.scale);
        outlineMesh.scale.multiplyScalar(1.03); // Slightly larger for outline effect

        outlineMesh.visible = false; // Hidden by default
        obj.add(outlineMesh);

        outlineObjectsRef.current[obj.name] = outlineMesh;
      }
    });

    const handleMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = gl.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast to find intersected objects
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);

      // Get names of currently intersected objects
      const intersectedNames = intersects
        .map((intersection) => intersection.object.name)
        .filter((name) => meshNames.includes(name));

      // Update all outline meshes
      Object.keys(outlineObjectsRef.current).forEach((meshName) => {
        outlineObjectsRef.current[meshName].visible = intersectedNames.includes(meshName);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [scene, camera, gl, meshNames]);

  return null;
}