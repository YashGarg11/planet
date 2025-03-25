import { Line } from "@react-three/drei";
import React, { useMemo } from "react";

const OrbitPath = ({ semiMajorAxis, eccentricity, color = "white" }) => {
  const points = useMemo(() => {
    const numPoints = Math.min(300, Math.max(100, semiMajorAxis / 1.5)); // Adaptive resolution
    const a = semiMajorAxis;
    const b = a * Math.sqrt(1 - eccentricity ** 2); // Semi-minor axis
    const focalOffset = eccentricity * a; // Sun at one focus

    return Array.from({ length: numPoints }, (_, i) => {
      const theta = (i / numPoints) * Math.PI * 2;
      return [a * Math.cos(theta) - focalOffset, 0, b * Math.sin(theta)];
    });
  }, [semiMajorAxis, eccentricity]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.5} // Slightly thinner for smooth rendering
      dashed={true} // Dashed line for better clarity
    />
  );
};

export default OrbitPath;
