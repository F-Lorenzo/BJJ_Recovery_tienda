import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function VideoShowcase() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://loremflickr.com/1920/1080/massage,therapy,muscle?lock=3"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        {/* Replace with real product demo video */}
        <source
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays — asymmetric gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, oklch(28% 0.055 195 / 0.88) 0%, oklch(28% 0.055 195 / 0.6) 45%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
        style={{
          minHeight: "100dvh",
          paddingTop: "clamp(4rem, 8vh, 6rem)",
          paddingBottom: "clamp(4rem, 8vh, 6rem)",
        }}
      >
        <div className="max-w-lg">
          <h2
            className="font-display font-extrabold text-white leading-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            La recuperación es parte del entrenamiento
          </h2>
          <p
            className="font-body text-white/60 leading-relaxed mb-8"
            style={{
              fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.2rem)",
              maxWidth: "440px",
            }}
          >
            Los mejores deportistas lo saben: el tiempo fuera del tatami es tan
            importante como el tiempo dentro. Tu cuerpo necesita recuperarse para
            que puedas rendir al máximo.
          </p>

          <Link href="/productos">
            <Button
              size="lg"
              className="bg-sand! text-brand! hover:bg-white! font-extrabold"
            >
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
