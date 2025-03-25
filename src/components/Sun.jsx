import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

const Sun = ({ onPlanetClick }) => {
  const { scene, animations } = useGLTF("/models/sun.glb");
  const { actions } = useAnimations(animations, scene);
  const uranusRef = useRef();

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play(); // Play the self-rotation animation
    }
  }, [actions, animations]);

  return (
    <group ref={uranusRef} onClick={onPlanetClick}>
      <primitive object={scene} scale={5} />
    </group>
  );
};

export default Sun;
