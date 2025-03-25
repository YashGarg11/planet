import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Mercury = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/mercury.glb");
  const { actions } = useAnimations(animations, scene);
  const mercuryRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  const semiMajorAxis = 40; // Adjust orbit size
  const eccentricity = 0.2056; // Mercury's actual orbital eccentricity
  const orbitSpeed = 0.03; // Adjust orbital speed
  const selfRotationSpeed = 0.0005; // Adjust Mercury's self-rotation speed

  const offsetX = -30;
  const offsetZ = 2;

  useFrame(({ clock }) => {
    if (mercuryRef.current) {
      const time = clock.elapsedTime * orbitSpeed;
      const angle = time * Math.PI * 2; // Convert time to angle

      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Minor axis
      const x = a * Math.cos(angle) + offsetX;
      const z = b * Math.sin(angle) + offsetZ;

      mercuryRef.current.position.set(x, 0, z);
      mercuryRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      mercuryRef.current.rotateY(selfRotationSpeed);
    }
  });

  return (
    <group ref={mercuryRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
};

export default Mercury;