import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Mars = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/mars.glb");
  const { actions } = useAnimations(animations, scene);
  const marsRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  const semiMajorAxis = 150; // Adjust orbit size
  const eccentricity = 0.0934; // Mars' actual orbital eccentricity
  const orbitSpeed = 0.008; // Adjust orbital speed
  const selfRotationSpeed = 0.002; // Adjust Mars' self-rotation speed

  const offsetX = -30;
  const offsetZ = 2;

  useFrame(({ clock }) => {
    if (marsRef.current) {
      const time = clock.elapsedTime * orbitSpeed;
      const angle = time * Math.PI * 2; // Convert time to angle

      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Minor axis
      const x = a * Math.cos(angle) + offsetX;
      const z = b * Math.sin(angle) + offsetZ;

      marsRef.current.position.set(x, 0, z);
      marsRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      marsRef.current.rotateY(selfRotationSpeed);
    }
  });

  return (
    <group ref={marsRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
};

export default Mars;