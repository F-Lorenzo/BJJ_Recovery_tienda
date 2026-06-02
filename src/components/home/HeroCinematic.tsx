"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";

export function HeroCinematic() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(headRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      })
        .from(
          subRef.current,
          { y: 32, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.55"
        )
        .from(
          ctaRef.current,
          { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" },
          "-=0.45"
        )
        .from(
          scrollRef.current,
          { opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      className="relative overflow-hidden bg-brand grain"
      style={{ minHeight: "100dvh" }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://picsum.photos/seed/bjj-grappling-sport/1920/1080"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        aria-hidden="true"
      >
        <source
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(28% 0.055 195 / 0.85) 0%, oklch(28% 0.055 195 / 0.5) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, transparent 40%, oklch(28% 0.055 195 / 0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
        style={{
          minHeight: "100dvh",
          paddingTop: "clamp(5rem, 10vh, 8rem)",
          paddingBottom: "clamp(5rem, 10vh, 8rem)",
        }}
      >
        <h1
          ref={headRef}
          className="font-display font-extrabold text-white"
          style={{
            fontSize: "clamp(3rem, 6.5vw + 1rem, 7rem)",
            letterSpacing: "-0.03em",
            lineHeight: "0.92",
            maxWidth: "860px",
          }}
        >
          Recuperate
          <br />
          más rápido.{" "}
          <em className="not-italic text-sand">
            Volvé
            <br className="hidden sm:block" /> al tatami.
          </em>
        </h1>

        <p
          ref={subRef}
          className="font-body text-white/60 mt-8 mb-10"
          style={{
            fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.2rem)",
            maxWidth: "480px",
            lineHeight: "1.65",
          }}
        >
          Productos de recuperación muscular seleccionados por practicantes de
          BJJ. Para que tu cuerpo esté listo al día siguiente.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <Link href="/productos">
            <Button
              size="lg"
              className="bg-sand! text-brand! hover:bg-white! font-extrabold tracking-tight"
            >
              Explorar productos
            </Button>
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=Hola! Quiero consultar sobre los productos`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white/25! text-white! hover:bg-white/8! hover:border-white/45!"
            >
              Consultar por WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-sand/60"
            style={{
              height: "50%",
              animation: "scroll-line 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
