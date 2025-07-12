'use client'
import React from 'react'
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";

function ParticleLaptopSection() {
  const particlesInit = async (engine) => {
    await loadLinksPreset(engine);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          preset: "links",
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: {
              value: 100,
            },
            color: {
              value: ["#d946ef", "#8b5cf6"], 
            },
            size: {
              value: { min: 1, max: 3 },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
            },
            links: {
              enable: true,
              color: ["#ff4fdd", "#a78bfa"],
              distance: 100,
              width: 2,
              opacity: 0.4,
            },
            size: { value: 1 },
            move: {
              enable: true,
              speed: 1,
            },
            opacity: {
              value: 0.5,
            },
          },
        }}
      />
      {children}
    </div>
  );
}

export default ParticleLaptopSection