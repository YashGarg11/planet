import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

const Saturn = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/saturn1.glb");
  const { actions } = useAnimations(animations, scene);
  const saturnRef = useRef();

  // Saturn Orbit Parameters
  const semiMajorAxis = 95; // Distance from Sun
  const eccentricity = 0.56; // Elliptical shape
  const orbitSpeed = 0.0003; // Revolution speed
  const selfRotationSpeed = 0.005; // Self-rotation speed
  const tiltAngle = Math.PI / 9; // Saturn's axial tilt (~26.7 degrees)

  // Offset to match OrbitPath
  const offsetX = 5;
  const offsetZ = 0;

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  useFrame(({ clock }) => {
    if (saturnRef.current) {
      const time = clock.elapsedTime * orbitSpeed;
      const angle = time * Math.PI * 2; // Convert time to angle

      // Calculate elliptical orbit (Kepler's equation)
      const a = semiMajorAxis;
      const b = a * Math.sqrt(1 - eccentricity ** 2); // Minor axis
      const x = a * Math.cos(angle) + offsetX;
      const z = b * Math.sin(angle) + offsetZ;

      // Update Saturn's position along the orbit path
      saturnRef.current.position.set(x, 0, z);

      // Set axial tilt once (without resetting rotation)
      if (!saturnRef.current.initialTiltSet) {
        saturnRef.current.rotation.x = tiltAngle;
        saturnRef.current.initialTiltSet = true; // Prevent re-setting tilt
      }

      // Apply continuous self-rotation
      saturnRef.current.rotateY(selfRotationSpeed);
    }
  });

  return (
    <group ref={saturnRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={3} />
    </group>
  );
};

export default Saturn;
