import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Venus = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/planet_venus.glb");
  const { actions } = useAnimations(animations, scene);
  const venusRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  // Venus Orbit Parameters (Realistic values)
  const semiMajorAxis = 50; // Adjusted distance
  const eccentricity = 0.7; // Adjusted elliptical shape
  const orbitSpeed = 0.02; // Speed of revolution
  const selfRotationSpeed = 0.001; // Slow rotation

  // Offset to align with OrbitPath
  const offsetX = -30;
  const offsetZ = 2;

  useFrame(({ clock }) => {
    if (venusRef.current) {
      const time = clock.elapsedTime * orbitSpeed;
      const angle = time * Math.PI * 2; // Convert time to angle

      // Calculate elliptical orbit (Kepler's equation)
      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Minor axis
      const x = a * Math.cos(angle) + offsetX;
      const z = b * Math.sin(angle) + offsetZ;

      // Update Venus position along orbit
      venusRef.current.position.set(x, 0, z);

      // Make Venus face the Sun (at [0, 0, 0])
      venusRef.current.lookAt(new THREE.Vector3(0, 0, 0));

      // Apply self-rotation
      venusRef.current.rotateY(selfRotationSpeed);
    }
  });

  return (
    <group ref={venusRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={0.003} />
    </group>
  );
};

export default Venus;
