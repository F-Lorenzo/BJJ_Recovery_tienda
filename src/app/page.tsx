import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ValueProposition } from "@/components/home/ValueProposition";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductGrid } from "@/components/product/ProductGrid";
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

interface ProductsData {
  products: {
    nodes: Pick<
      Product,
      | "id"
      | "slug"
      | "name"
      | "image"
      | "price"
      | "regularPrice"
      | "salePrice"
      | "productTags"
    >[];
  };
}

export default async function HomePage() {
  let products: ProductsData["products"]["nodes"] = [];

  try {
    const { data } = await getClient().query<ProductsData>({
      query: GET_PRODUCTS,
      variables: { first: 8 },
    });
    products = data?.products?.nodes ?? [];
  } catch {
    // Silently degrade — page renders without products
  }

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Featured products */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="font-body text-sage text-sm font-semibold uppercase tracking-widest mb-2">
                Nuestros productos
              </p>
              <h2
                className="font-display font-bold text-brand leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.25rem)" }}
              >
                Todo lo que tu cuerpo necesita
              </h2>
            </div>
            <Link
              href="/productos"
              className="font-body text-sm font-semibold text-brand hover:text-brand/70 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              Ver todos →
            </Link>
          </div>

          <ProductGrid products={products} columns={4} />
        </div>
      </section>

      <ValueProposition />
      <Testimonials />

      {/* CTA final */}
      <section className="bg-brand py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="font-display font-extrabold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw + 0.5rem, 2.75rem)" }}
          >
            ¿No sabés qué producto es el indicado para vos?
          </h2>
          <p className="font-body text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Contanos cómo entrenás y qué molestias tenés. Te ayudamos a elegir
            lo que realmente necesita tu cuerpo.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=Hola! Necesito ayuda para elegir un producto`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-sand! text-brand! hover:bg-sand/90! font-extrabold"
            >
              Hablar con un practicante
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
