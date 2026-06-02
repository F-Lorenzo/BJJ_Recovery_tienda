import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative bg-brand overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-sage font-body text-sm font-semibold uppercase tracking-widest mb-6">
            Por y para deportistas de artes marciales
          </p>

          {/* Heading */}
          <h1
            className="font-display font-extrabold text-white leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw + 1rem, 5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Recuperate más rápido.{" "}
            <span className="text-sand">Volvé al tatami.</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            Productos de recuperación muscular seleccionados por practicantes de
            BJJ, para practicantes de BJJ. Tu cuerpo lo va a agradecer.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/productos">
              <Button
                variant="primary"
                size="lg"
                className="bg-sand! text-brand! hover:bg-sand/90! font-extrabold"
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
                className="border-white/30! text-white! hover:bg-white/10! hover:border-white/60!"
              >
                Consultar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(89% 0.025 80))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
