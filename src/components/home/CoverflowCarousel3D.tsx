"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

type ProductItem = Pick<
  Product,
  "id" | "slug" | "name" | "image" | "price" | "regularPrice" | "shortDescription"
>;

// LoremFlickr: keyword-matched real photos for each product type
const PLACEHOLDER_SEEDS = [
  "https://loremflickr.com/240/340/massage,gun,percussion,therapy?lock=20",
  "https://loremflickr.com/240/340/neck,massage,physiotherapy?lock=21",
  "https://loremflickr.com/240/340/foam,roller,muscle,exercise?lock=22",
  "https://loremflickr.com/240/340/resistance,band,stretching,athlete?lock=23",
  "https://loremflickr.com/240/340/heat,therapy,warm,muscle?lock=24",
  "https://loremflickr.com/240/340/cbd,oil,cream,recovery?lock=25",
  "https://loremflickr.com/240/340/kinesiology,tape,physiotherapy?lock=26",
  "https://loremflickr.com/240/340/soap,mat,cleaning,gym?lock=27",
];

function getCardStyle(offset: number): {
  x: number;
  z: number;
  rotateY: number;
  opacity: number;
  scale: number;
  zIndex: number;
} {
  const abs = Math.abs(offset);
  return {
    x: offset * 260,
    z: abs === 0 ? 0 : -140 * abs,
    rotateY: offset * -38,
    opacity: abs > 2 ? 0 : abs === 0 ? 1 : 1 - abs * 0.28,
    scale: abs === 0 ? 1 : 1 - abs * 0.09,
    zIndex: 20 - abs,
  };
}

export function CoverflowCarousel3D({ products }: { products: ProductItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const count = Math.min(products.length, 7);

  const prev = useCallback(
    () => setActive((a) => (a - 1 + count) % count),
    [count]
  );
  const next = useCallback(
    () => setActive((a) => (a + 1) % count),
    [count]
  );

  if (products.length === 0) return null;
  const current = products[active];

  return (
    <section className="py-24 md:py-32 bg-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="font-display font-extrabold text-brand"
            style={{
              fontSize: "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Todo lo que tu cuerpo necesita
          </h2>
        </div>

        {/* Carousel stage */}
        <div
          className="relative flex items-center justify-center select-none"
          style={{
            height: "440px",
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
          role="region"
          aria-label="Carrusel de productos"
          aria-roledescription="carrusel"
        >
          {products.slice(0, count).map((product, i) => {
            let offset = (i - active + count) % count;
            if (offset > count / 2) offset -= count;
            if (Math.abs(offset) > 3) return null;

            const { x, z, rotateY, opacity, scale, zIndex } =
              getCardStyle(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={product.id}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${product.name}, ${i + 1} de ${count}`}
                aria-hidden={!isCenter}
                className="absolute cursor-pointer"
                animate={
                  reduce
                    ? { opacity: isCenter ? 1 : 0 }
                    : { x, z, rotateY, opacity, scale }
                }
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 24,
                  mass: 0.9,
                }}
                style={{ zIndex, transformStyle: "preserve-3d" }}
                onClick={() => !isCenter && setActive(i)}
                whileHover={isCenter ? { y: -4 } : undefined}
              >
                <div
                  className="relative overflow-hidden bg-white"
                  style={{
                    width: "240px",
                    height: "340px",
                    borderRadius: "18px",
                    boxShadow: isCenter
                      ? "0 24px 64px oklch(28% 0.055 195 / 0.22)"
                      : "0 8px 24px oklch(28% 0.055 195 / 0.10)",
                  }}
                >
                  <Image
                    src={
                      product.image?.sourceUrl ||
                      PLACEHOLDER_SEEDS[i % PLACEHOLDER_SEEDS.length]
                    }
                    alt={isCenter ? (product.image?.altText || product.name) : ""}
                    fill
                    sizes="240px"
                    className="object-cover"
                    priority={isCenter}
                  />
                  {isCenter && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(28% 0.055 195 / 0.7) 0%, transparent 55%)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Product info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-10"
            aria-live="polite"
          >
            <h3
              className="font-display font-bold text-brand mb-2"
              style={{ fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)" }}
            >
              {current.name}
            </h3>
            <p
              className="font-display font-extrabold text-ink mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)" }}
            >
              {formatPrice(current.price || current.regularPrice || "0")}
            </p>
            {current.shortDescription && (
              <p
                className="font-body text-muted text-sm max-w-sm mx-auto mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    current.shortDescription.replace(/<[^>]+>/g, "").slice(0, 90) +
                    "...",
                }}
              />
            )}
            <Link
              href={`/productos/${current.slug}`}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand hover:text-brand/65 transition-colors duration-200"
            >
              Ver producto
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-sage/30 flex items-center justify-center text-ink hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 active:scale-95"
            aria-label="Producto anterior"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Navegación del carrusel">
            {products.slice(0, count).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Producto ${i + 1}`}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? "24px" : "10px",
                  height: "10px",
                  backgroundColor:
                    i === active
                      ? "var(--color-brand)"
                      : "oklch(57% 0.035 185 / 0.3)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-sage/30 flex items-center justify-center text-ink hover:bg-brand hover:text-white hover:border-brand transition-all duration-200 active:scale-95"
            aria-label="Siguiente producto"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
