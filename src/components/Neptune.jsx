import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Neptune = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/neptune.glb");
  const { actions } = useAnimations(animations, scene);
  const neptuneRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  const semiMajorAxis = 280; // Adjust orbit size
  const eccentricity = 0.009; // Neptune's actual orbital eccentricity
  const orbitSpeed = 0.001; // Adjust orbital speed
  const selfRotationSpeed = 0.004; // Adjust Neptune's self-rotation speed

  const offsetX = -30;
  const offsetZ = 2;

  useFrame(({ clock }) => {
    if (neptuneRef.current) {
      const time = clock.elapsedTime * orbitSpeed;
      const angle = time * Math.PI * 2; // Convert time to angle

      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Minor axis
      const x = a * Math.cos(angle) + offsetX;
      const z = b * Math.sin(angle) + offsetZ;

      neptuneRef.current.position.set(x, 0, z);
      neptuneRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      neptuneRef.current.rotateY(selfRotationSpeed);
    }
  });

  return (
    <group ref={neptuneRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={0.005} />
    </group>
  );
};

export default Neptune;
