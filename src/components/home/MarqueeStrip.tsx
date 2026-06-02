"use client";

import { useReducedMotion } from "motion/react";

const ITEMS = [
  "100% orgánico",
  "Envío incluido",
  "Por y para deportistas de BJJ",
  "Atención personalizada",
  "Recuperación comprobada",
  "Sin pasos raros",
];

export function MarqueeStrip() {
  const reduce = useReducedMotion();

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="bg-brand border-y border-sage/20 py-3 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="flex gap-12 whitespace-nowrap"
        style={
          reduce
            ? {}
            : {
                animation: "marquee-scroll 28s linear infinite",
                width: "max-content",
              }
        }
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 font-body text-sm font-semibold text-white/60 uppercase tracking-widest flex-shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-sage/50" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-scroll { animation: none; }
        }
      `}</style>
    </div>
  );
}
