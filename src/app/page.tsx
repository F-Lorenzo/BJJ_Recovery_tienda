import type { Metadata } from "next";
import Link from "next/link";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { HorizontalProducts } from "@/components/home/HorizontalProducts";
import { CoverflowCarousel3D } from "@/components/home/CoverflowCarousel3D";
import { StickyValueStack } from "@/components/home/StickyValueStack";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { Testimonials } from "@/components/home/Testimonials";
import { Button } from "@/components/ui/Button";
import { getClient } from "@/lib/graphql/server-client";
import { GET_PRODUCTS } from "@/lib/graphql/queries/products";
import type { Product } from "@/types/product";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "BJJ Recovery | Recuperación muscular para deportistas de BJJ",
  description:
    "Productos de recuperación muscular seleccionados por y para practicantes de BJJ. Pistolas masajeadoras, tape, CBD, terapia de calor. Envío incluido.",
};

type ProductNode = Pick<
  Product,
  | "id"
  | "slug"
  | "name"
  | "image"
  | "price"
  | "regularPrice"
  | "salePrice"
  | "shortDescription"
  | "productTags"
  | "productCategories"
>;

export default async function HomePage() {
  let products: ProductNode[] = [];

  try {
    const { data } = await getClient().query<{
      products: { nodes: ProductNode[] };
    }>({
      query: GET_PRODUCTS,
      variables: { first: 12 },
    });
    products = data?.products?.nodes ?? [];
  } catch {
    // Degrade silently — page renders with placeholder imagery
  }

  return (
    <div className="overflow-x-hidden w-full max-w-full">
      {/* ATTENTION — cinematic hero with video */}
      <HeroCinematic />

      {/* Trust marquee */}
      <MarqueeStrip />

      {/* INTEREST — horizontal scroll product pan */}
      <HorizontalProducts products={products} />

      {/* INTEREST — 3D coverflow carousel */}
      <CoverflowCarousel3D products={products} />

      {/* DESIRE — sticky stack value props */}
      <StickyValueStack />

      {/* DESIRE — video showcase */}
      <VideoShowcase />

      {/* DESIRE — testimonials (asymmetric) */}
      <Testimonials />

      {/* ACTION — final CTA */}
      <section className="bg-brand py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-display font-extrabold text-white leading-tight mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.025em",
            }}
          >
            No sabés qué producto es el indicado para vos?
          </h2>
          <p className="font-body text-white/60 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Contanos cómo entrenás y qué molestias tenés. Te ayudamos a elegir
            lo que realmente necesita tu cuerpo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=Hola! Necesito ayuda para elegir un producto`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-sand! text-brand! hover:bg-white! font-extrabold"
              >
                Hablar con un practicante
              </Button>
            </a>
            <Link href="/productos">
              <Button
                variant="outline"
                size="lg"
                className="border-white/25! text-white! hover:bg-white/8!"
              >
                Ver catálogo completo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
