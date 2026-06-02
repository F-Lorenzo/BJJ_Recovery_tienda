"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

gsap.registerPlugin(ScrollTrigger);

type ProductItem = Pick<
  Product,
  "id" | "slug" | "name" | "image" | "price" | "regularPrice" | "productCategories"
>;

// LoremFlickr URLs: keyword-matched real photos, lock= ensures consistency
const PLACEHOLDER_SEEDS = [
  "https://loremflickr.com/340/460/massage,gun,percussion?lock=10",
  "https://loremflickr.com/340/460/foam,roller,exercise?lock=11",
  "https://loremflickr.com/340/460/resistance,band,stretching?lock=12",
  "https://loremflickr.com/340/460/kinesiology,tape,sport?lock=13",
  "https://loremflickr.com/340/460/cream,lotion,muscle,recovery?lock=14",
  "https://loremflickr.com/340/460/heat,therapy,muscle?lock=15",
  "https://loremflickr.com/340/460/physiotherapy,tape,sport?lock=16",
  "https://loremflickr.com/340/460/soap,foam,cleaning?lock=17",
];

export function HorizontalProducts({ products }: { products: ProductItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current || products.length === 0) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      if (distance <= 0) return;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, [reduce, products]);

  /* Fallback — static grid on reduced motion */
  if (reduce) {
    return (
      <section className="bg-ink py-20 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-extrabold text-white text-3xl mb-10">
            Nuestros productos
          </h2>
          <div className="flex gap-6">
            {products.slice(0, 6).map((p, i) => (
              <ProductCard key={p.id} product={p} seed={PLACEHOLDER_SEEDS[i] ?? "product"} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative overflow-hidden bg-ink">
      <div
        ref={track}
        className="flex items-center"
        style={{ height: "100dvh", paddingLeft: "8vw", paddingRight: "8vw", gap: "32px" }}
      >
        {/* Left anchor label */}
        <div
          className="flex-shrink-0 flex flex-col justify-center"
          style={{ width: "260px", marginRight: "40px" }}
        >
          <div className="w-10 h-px bg-sage/40 mb-5" aria-hidden="true" />
          <h2
            className="font-display font-extrabold text-white leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Explorá todo el catálogo
          </h2>
          <p className="font-body text-white/35 text-sm mt-3">
            Deslizá para descubrir
          </p>
        </div>

        {/* Product cards */}
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            seed={PLACEHOLDER_SEEDS[i % PLACEHOLDER_SEEDS.length]}
          />
        ))}

        {/* End CTA */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width: "200px", marginLeft: "24px" }}
        >
          <Link href="/productos" className="group block">
            <div className="w-28 h-28 rounded-full border border-sage/30 flex flex-col items-center justify-center gap-1 group-hover:bg-sand/10 group-hover:border-sand/50 transition-all duration-300">
              <span className="font-display font-bold text-sand text-xs text-center leading-tight">
                Ver todos
              </span>
              <svg
                className="w-4 h-4 text-sand/60 group-hover:text-sand transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  seed,
}: {
  product: ProductItem;
  seed: string;
}) {
  // seed is already a full LoremFlickr URL when no real image exists
  const imageSrc = product.image?.sourceUrl || seed;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="flex-shrink-0 group block"
      style={{ width: "300px" }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: "300px", height: "420px", borderRadius: "20px" }}
      >
        <Image
          src={imageSrc}
          alt={product.image?.altText || product.name}
          fill
          sizes="300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(22,71,75,0.85) 0%, rgba(22,71,75,0.2) 45%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Category pill */}
        {product.productCategories?.nodes?.[0]?.name && (
          <div className="absolute top-4 left-4">
            <span className="font-body text-xs font-semibold text-white/70 uppercase tracking-wide bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              {product.productCategories.nodes[0].name}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-display font-bold text-white text-base leading-snug mb-1">
            {product.name}
          </p>
          <p className="font-display font-semibold text-sand text-lg">
            {formatPrice(product.price || product.regularPrice || "0")}
          </p>
        </div>
      </div>
    </Link>
  );
}
