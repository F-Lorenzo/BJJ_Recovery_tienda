import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative bg-brand overflow-hidden grain" style={{ minHeight: "min(90dvh, 700px)" }}>
      {/* Background image — dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://loremflickr.com/1920/1080/massage,sports,recovery,athlete?lock=2"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-brand/70" aria-hidden="true" />
      </div>

      {/* Subtle radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #e4dccf 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center" style={{ minHeight: "inherit" }}>
        <div className="py-20 md:py-28 max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-sage" aria-hidden="true" />
            <p className="text-sage font-body text-sm font-semibold uppercase tracking-widest">
              Por y para deportistas de artes marciales
            </p>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-extrabold text-white leading-[0.93] mb-6"
            style={{
              fontSize: "clamp(2.75rem, 6vw + 1rem, 5.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Recuperate más rápido.{" "}
            <em className="not-italic text-sand">Volvé al tatami.</em>
          </h1>

          {/* Subheading */}
          <p
            className="font-body text-white/65 leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.25rem)" }}
          >
            Productos de recuperación muscular seleccionados por practicantes de
            BJJ. Tu cuerpo lo va a agradecer.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/productos">
              <Button
                size="lg"
                className="bg-sand! text-brand! hover:bg-white! font-extrabold tracking-tight"
              >
                Ver productos
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
                className="border-white/25! text-white! hover:bg-white/10! hover:border-white/50!"
              >
                Consultar por WhatsApp
              </Button>
            </a>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex items-center gap-3">
            <div className="flex -space-x-2" aria-hidden="true">
              {["MR", "LF", "DM", "JP"].map((init) => (
                <div
                  key={init}
                  className="w-8 h-8 rounded-full bg-sage/40 border-2 border-white/20 flex items-center justify-center"
                >
                  <span className="font-display font-bold text-white text-[10px]">
                    {init}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-body text-white/50 text-sm">
              +200 deportistas ya recuperaron su juego
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
