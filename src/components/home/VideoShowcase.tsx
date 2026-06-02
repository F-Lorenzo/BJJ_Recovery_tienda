import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function VideoShowcase() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Full-cover background image — sports physiotherapy / recovery */}
      <div className="absolute inset-0">
        <Image
          src="https://loremflickr.com/1920/1080/physiotherapy,sports,recovery,massage?lock=200"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Video — plays over static image */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      >
        {/* Replace with real product demo video */}
        <source
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
          type="video/mp4"
        />
      </video>

      {/* Asymmetric gradient — darker on left where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, oklch(28% 0.055 195 / 0.92) 0%, oklch(28% 0.055 195 / 0.7) 45%, oklch(28% 0.055 195 / 0.2) 80%)",
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
            className="font-body text-white/65 leading-relaxed mb-8"
            style={{
              fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.2rem)",
              maxWidth: "440px",
            }}
          >
            Los mejores deportistas lo saben: el tiempo fuera del tatami es tan
            importante como el tiempo dentro. Tu cuerpo necesita recuperarse para
            rendir al máximo.
          </p>

          <Link href="/productos">
            <Button size="lg" className="bg-sand! text-brand! hover:bg-white! font-extrabold">
              Ver todos los productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
