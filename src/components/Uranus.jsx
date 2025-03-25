import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Uranus = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/uranus.glb");
  const { actions } = useAnimations(animations, scene);
  const uranusRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play(); // Play the self-rotation animation
    }
  }, [actions, animations]);

  // Orbital parameters
  const semiMajorAxis = 230; // Adjusted for scale
  const eccentricity = 0.046; // Uranus’s actual orbital eccentricity
  const orbitalPeriod = 84; // Uranus orbits Sun in 84 years (scaled for speed)

  const sunFocusOffset = semiMajorAxis * eccentricity; // Sun at one focus

  useFrame(({ clock }) => {
    if (uranusRef.current) {
      const time = clock.elapsedTime * (2 * Math.PI) / orbitalPeriod;
      const angle = time; // Time-based angle calculation

      // Elliptical orbit calculations
      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Semi-minor axis
      const x = a * Math.cos(angle) - sunFocusOffset;
      const z = b * Math.sin(angle);

      // Update position (without interfering with self-rotation)
      uranusRef.current.position.set(x, 0, z);
      uranusRef.current.lookAt(new THREE.Vector3(0, 0, 0)); // Make Uranus face the Sun
    }
  });

  return (
    <group ref={uranusRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
};

export default Uranus;
