"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    number: "01",
    title: "Conocimiento de primera mano",
    body: "Somos practicantes de BJJ antes que vendedores. Cada producto lo usamos nosotros primero. Si no nos sirve a nosotros, no llega a la tienda.",
    bg: "#E4DCCF",
    titleColor: "#16474B",
    bodyColor: "#6b6b6b",
    numColor: "rgba(114,139,133,0.18)",
  },
  {
    number: "02",
    title: "Productos que realmente funcionan",
    body: "Seleccionamos basándonos en evidencia: estudios, feedback de la comunidad y nuestra propia experiencia en el tatami.",
    bg: "#16474B",
    titleColor: "#E4DCCF",
    bodyColor: "rgba(228,220,207,0.55)",
    numColor: "rgba(228,220,207,0.12)",
  },
  {
    number: "03",
    title: "Seguimiento personalizado",
    body: "No sos un número de pedido. Contanos cómo entrenás y qué molestias tenés. Te ayudamos a elegir lo que realmente necesita tu cuerpo.",
    bg: "#1A1A1A",
    titleColor: "#E4DCCF",
    bodyColor: "rgba(228,220,207,0.45)",
    numColor: "rgba(228,220,207,0.08)",
  },
];

export function StickyValueStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-value-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.91,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  /* Reduced motion: plain stacked sections */
  if (reduce) {
    return (
      <div>
        {CARDS.map((card) => (
          <div
            key={card.number}
            className="flex items-center justify-center py-24 px-4"
            style={{ backgroundColor: card.bg }}
          >
            <CardContent card={card} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {CARDS.map((card) => (
        <div
          key={card.number}
          className="gsap-value-card sticky top-0 flex items-center justify-center px-4"
          style={{ minHeight: "100dvh", backgroundColor: card.bg }}
        >
          <CardContent card={card} />
        </div>
      ))}
    </div>
  );
}

function CardContent({
  card,
}: {
  card: (typeof CARDS)[number];
}) {
  return (
    <div className="max-w-2xl w-full text-center">
      <span
        className="font-display font-extrabold block leading-none mb-4"
        style={{ fontSize: "clamp(5rem, 12vw, 10rem)", color: card.numColor }}
        aria-hidden="true"
      >
        {card.number}
      </span>
      <h3
        className="font-display font-extrabold leading-tight mb-6"
        style={{
          fontSize: "clamp(2rem, 4vw + 0.5rem, 3.25rem)",
          letterSpacing: "-0.025em",
          color: card.titleColor,
        }}
      >
        {card.title}
      </h3>
      <p
        className="font-body text-lg leading-relaxed mx-auto"
        style={{ color: card.bodyColor, maxWidth: "540px" }}
      >
        {card.body}
      </p>
    </div>
  );
}
