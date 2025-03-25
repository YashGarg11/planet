import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Button from "./components/button";

import SolarSystem from "./components/SolarSystem";
import Navbar from "./navbar/navbar";

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  // Handles planet selection from navbar & 3D click
  const handlePlanetSelect = (planet) => {
    console.log("Selected Planet:", planet);
    setSelectedPlanet(planet);
  };

  return (
    <>
      {/* Navbar to select planets */}
      <Navbar onPlanetSelect={handlePlanetSelect} />

      {/* 3D Scene */}
      <Canvas 
        camera={{ position: [5, 5, 10] }} 
        style={{ width: "100%", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <OrbitControls enableZoom enableRotate enablePan />
        <Environment files="/HDR_blue_nebulae-1.hdr" background />

        <Suspense fallback={null}>
          
<SolarSystem></SolarSystem>
        </Suspense>
      </Canvas>

      {/* Info Box Button for Selected Planet */}
      {selectedPlanet && (
        <Button planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
      )}
    </>
  );
}

export default App;
