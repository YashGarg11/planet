import React from "react";
import Earth from "./Earth";
import Jupiter from "./Jupiter";
import Mars from "./Mars";
import Mercury from "./Mercury";
import Neptune from "./Neptune";
import OrbitPath from "./path"; // Ensure correct filename
import Pluto from "./pluto";
import Saturn from "./saturn";
import Sun from "./Sun";
import Uranus from "./Uranus";
import Venus from "./Venus";

const SolarSystem = () => {
  return (
    <group>
      {/* Sun at Center */}
      <Sun />

      {/* Mercury Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={39} eccentricity={0.205} color="white" offset={[0, 0, 0]} />
        <Mercury />
      </group>

      {/* Venus Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={50} eccentricity={0.7} color="white" offset={[-30, 0, 2]} />
        <Venus />
      </group>

      {/* Earth Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={70} eccentricity={0.0167} color="white" offset={[0, 0, 0]} />
        <Earth />
      </group>

      {/* Mars Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={100} eccentricity={0.093} color="white" offset={[0, 0, 0]} />
        <Mars />
      </group>

      {/* Jupiter Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={150} eccentricity={0.049} color="white" offset={[0, 0, 0]} />
        <Jupiter />
      </group>

      {/* Saturn Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={95} eccentricity={0.56} color="white" offset={[5, 0, 0]} />
        <Saturn />
      </group>

      {/* Uranus Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={230} eccentricity={0.046} color="white" offset={[-30, 0, 2]} />
        <Uranus />
      </group>

      {/* Neptune Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={280} eccentricity={0.009} color="white" offset={[0, 0, 0]} />
        <Neptune />
      </group>

      {/* Pluto Orbit & Planet */}
      <group>
        <OrbitPath semiMajorAxis={320} eccentricity={0.25} color="white" offset={[-30, 0, 2]} />
        <Pluto />
      </group>
    </group>
  );
};

export default SolarSystem;
