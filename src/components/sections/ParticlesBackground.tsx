"use client";

import { useCallback, useEffect, useRef } from "react";
import { loadFull } from "tsparticles";
import Particles from "@tsparticles/react";
import type { Container, Engine } from "@tsparticles/engine";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      console.log("Particles loaded successfully");
    }
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: ["connect", "grab"],
          parallax: {
            enable: true,
            force: 30,
            smooth: 10,
          },
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        connect: {
          distance: 150,
          duration: 0.5,
          opacity: 0.5,
        },
        grab: {
          distance: 200,
          duration: 0.4,
          opacity: 0.8,
          line_linked: {
            opacity: 0.6,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    particles: {
      color: {
        value: ["#8B5CF6", "#60A5FA", "#A855F7", "#7C3AED"],
        animation: {
          enable: true,
          speed: 20,
          sync: false,
        },
      },
      links: {
        color: {
          value: "#8B5CF6",
        },
        distance: 120,
        enable: true,
        opacity: 0.3,
        width: 1,
        shadow: {
          enable: true,
          color: "#8B5CF6",
          blur: 5,
        },
        triangles: {
          enable: false,
        },
        warp: true,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: true,
        speed: {
          min: 0.5,
          max: 2,
        },
        straight: false,
        trail: {
          enable: true,
          length: 10,
          fill: {
            color: {
              value: "#8B5CF6",
            },
          },
        },
        vibrate: true,
        warp: true,
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
        limit: {
          mode: "delete" as const,
          value: 120,
        },
      },
      opacity: {
        value: {
          min: 0.3,
          max: 0.8,
        },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          startValue: "random" as const,
          destroy: "none" as const,
        },
      },
      shape: {
        type: ["circle", "triangle", "polygon"],
        options: {
          polygon: {
            sides: 6,
          },
          triangle: {
            fill: true,
          },
        },
      },
      size: {
        value: {
          min: 1,
          max: 6,
        },
        animation: {
          enable: true,
          speed: 3,
          sync: false,
          startValue: "random" as const,
          destroy: "none" as const,
        },
      },
      shadow: {
        enable: true,
        color: "#8B5CF6",
        blur: 10,
        offset: {
          x: 0,
          y: 0,
        },
      },
      stroke: {
        color: {
          value: "#60A5FA",
          animation: {
            enable: true,
            speed: 50,
            sync: false,
          },
        },
        width: 0.5,
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
          color: {
            value: "#60A5FA",
          },
        },
      },
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 40,
            },
            links: {
              distance: 80,
            },
            move: {
              speed: {
                min: 0.3,
                max: 1,
              },
            },
          },
        },
      },
      {
        maxWidth: 480,
        options: {
          particles: {
            number: {
              value: 25,
            },
            links: {
              distance: 60,
              opacity: 0.2,
            },
            move: {
              speed: {
                min: 0.2,
                max: 0.8,
              },
            },
          },
        },
      },
    ],
    smooth: true,
    style: {
      position: "absolute" as const,
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      zIndex: "-1",
    },
    fullScreen: {
      enable: false,
      zIndex: -1,
    },
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <Particles
        id="nature-ai-particles"
        options={particlesOptions}
        className="absolute inset-0"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-violet-500/5 to-blue-500/5 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(96, 165, 250, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.06) 0%, transparent 30%)
          `,
        }}
      />
    </div>
  );
};