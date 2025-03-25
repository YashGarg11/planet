import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Pluto = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/pluto.glb");
  const { actions } = useAnimations(animations, scene);
  const plutoRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  const semiMajorAxis = 320; // Adjust orbit size
  const eccentricity = 0.25; // Pluto's actual orbital eccentricity
  const orbitSpeed = 0.0008; // Adjust orbital speed
  const selfRotationSpeed = 0.003; // Adjust Pluto's self-rotation speed

  const offsetX = -30;
  const offsetZ = 2;

  useFrame(({ clock }) => {
    if (plutoRef.current) {
      const time = clock.elapsedTime * orbitSpeed;
      const angle = time * Math.PI * 2; // Convert time to angle

      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Minor axis
      const x = a * Math.cos(angle) + offsetX;
      const z = b * Math.sin(angle) + offsetZ;

      plutoRef.current.position.set(x, 0, z);
      plutoRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      plutoRef.current.rotateY(selfRotationSpeed);
    }
  });

  return (
    <group ref={plutoRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
};

export default Pluto;