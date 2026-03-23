"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  SiBitcoin,
  SiEthereum,
  SiSolana,
  SiPolygon,
  SiBinance,
} from "react-icons/si";

type TokenMarker = {
  key: string;
  leftPct: number;
  topPct: number;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  glow: string;
  drift: { x: number; y: number; dur: number };
};

const PALETTE = {
  cyan: "#22d3ee",
  blue: "#60a5fa",
  violet: "#8b5cf6",
  purple: "#a855f7",
} as const;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BlockchainThemeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const markers = useMemo<TokenMarker[]>(
    () => [
      {
        key: "btc",
        leftPct: 16,
        topPct: 42,
        color: PALETTE.cyan,
        Icon: SiBitcoin,
        glow: "rgba(34,211,238,0.55)",
        drift: { x: 8, y: -10, dur: 8.5 },
      },
      {
        key: "eth",
        leftPct: 34,
        topPct: 62,
        color: PALETTE.blue,
        Icon: SiEthereum,
        glow: "rgba(96,165,250,0.50)",
        drift: { x: -6, y: -8, dur: 10.2 },
      },
      {
        key: "sol",
        leftPct: 52,
        topPct: 38,
        color: PALETTE.violet,
        Icon: SiSolana,
        glow: "rgba(139,92,246,0.50)",
        drift: { x: 10, y: 8, dur: 9.1 },
      },
      {
        key: "matic",
        leftPct: 68,
        topPct: 58,
        color: PALETTE.purple,
        Icon: SiPolygon,
        glow: "rgba(168,85,247,0.50)",
        drift: { x: -9, y: 7, dur: 11.4 },
      },
      {
        key: "bsc",
        leftPct: 84,
        topPct: 44,
        color: "#fbbf24",
        Icon: SiBinance,
        glow: "rgba(251,191,36,0.35)",
        drift: { x: -8, y: 10, dur: 12.2 },
      },
    ],
    []
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let px = 0;
    let py = 0;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      // normalized [-1..1]
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      px = clamp(nx, -1, 1);
      py = clamp(ny, -1, 1);
      root.style.setProperty("--px", String(px));
      root.style.setProperty("--py", String(py));
    };

    // Start centered
    root.style.setProperty("--px", "0");
    root.style.setProperty("--py", "0");

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={
        {
          background:
            "radial-gradient(1200px 400px at 25% 0%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(1100px 520px at 80% 30%, rgba(139,92,246,0.10), transparent 60%), linear-gradient(120deg, #000000 0%, #040816 35%, #07021a 100%)",
        } as React.CSSProperties
      }
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(96,165,250,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Crypto hologram tokens */}
      {markers.map((m, idx) => {
        const Icon = m.Icon;
        return (
          <motion.div
            key={m.key}
            className="absolute"
            style={{
              left: `${m.leftPct}%`,
              top: `${m.topPct}%`,
              transform: "translate(-50%, -50%)",
            opacity: 0.33,
            filter: `drop-shadow(0 0 16px ${m.glow})`,
              zIndex: 2,
            }}
            animate={{
              x: [0, m.drift.x, 0],
              y: [0, m.drift.y, 0],
            opacity: [0.22, 0.42, 0.22],
            }}
            transition={{
              duration: m.drift.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.3,
            }}
          >
            <Icon size={26} color={m.color} />
          </motion.div>
        );
      })}

      {/* Blurred digital ledger / code-snippet texture */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "translate(calc(var(--px, 0) * -12px), calc(var(--py, 0) * -6px))",
        }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
          <g opacity="0.35" filter="blur(0.65px)">
            {[
              { x: 10, y: 22, w: 18, h: 3, c: "rgba(34,211,238,0.55)" },
              { x: 27, y: 33, w: 10, h: 2, c: "rgba(139,92,246,0.45)" },
              { x: 40, y: 18, w: 22, h: 3, c: "rgba(96,165,250,0.40)" },
              { x: 66, y: 30, w: 16, h: 2.5, c: "rgba(168,85,247,0.40)" },
              { x: 12, y: 66, w: 20, h: 2.5, c: "rgba(139,92,246,0.40)" },
              { x: 36, y: 74, w: 18, h: 2.5, c: "rgba(96,165,250,0.38)" },
              { x: 58, y: 62, w: 24, h: 3, c: "rgba(34,211,238,0.40)" },
              { x: 72, y: 80, w: 14, h: 2, c: "rgba(168,85,247,0.34)" },
            ].map((r, i) => (
              <rect
                key={i}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={0.8}
                fill={r.c}
              />
            ))}

            {/* hash-like hash fragments (abstract, no explicit text) */}
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 8 + i * 7.2;
              const y = 52 + (i % 3) * 8;
              const w = 4.5 + (i % 4);
              return (
                <rect
                  key={`hash-${i}`}
                  x={x}
                  y={y}
                  width={w}
                  height={0.9}
                  rx={0.4}
                  fill={i % 2 ? "rgba(34,211,238,0.35)" : "rgba(139,92,246,0.30)"}
                  opacity="0.65"
                />
              );
            })}
          </g>
        </svg>
      </div>

      {/* Focus zone for UI readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.52) 70%, rgba(0,0,0,0.72) 100%)",
          opacity: 0.78,
        }}
      />

      {/* Top overlay gradient (black -> transparent) */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "45vh",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.32) 35%, rgba(0,0,0,0.00) 100%)",
        }}
      />
    </div>
  );
}

