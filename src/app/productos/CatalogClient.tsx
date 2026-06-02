"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/types/product";

type ProductItem = Pick<
  Product,
  | "id"
  | "slug"
  | "name"
  | "image"
  | "price"
  | "regularPrice"
  | "salePrice"
  | "productTags"
  | "productCategories"
>;

interface CatalogClientProps {
  initialProducts: ProductItem[];
}

function getCategories(products: ProductItem[]): string[] {
  const cats = new Set<string>();
  for (const p of products) {
    for (const c of p.productCategories?.nodes ?? []) {
      if (c.name) cats.add(c.name);
    }
  }
  return Array.from(cats);
}

export function CatalogClient({ initialProducts }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => getCategories(initialProducts), [initialProducts]);

  const filtered = useMemo(() => {
    if (!activeCategory) return initialProducts;
    return initialProducts.filter((p) =>
      p.productCategories?.nodes?.some((c) => c.name === activeCategory)
    );
  }, [initialProducts, activeCategory]);

  return (
    <div className="min-h-screen bg-sand">
      {/* Page header */}
      <div className="bg-brand relative overflow-hidden" style={{ paddingTop: "clamp(3rem,8vh,5rem)", paddingBottom: "clamp(4rem,10vh,7rem)" }}>
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #e4dccf 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)", letterSpacing: "-0.025em" }}
          >
            Todos los productos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-white/50 text-base mt-3"
          >
            {initialProducts.length} productos disponibles
          </motion.p>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {["Todos", ...categories].map((cat) => {
              const isActive = cat === "Todos" ? !activeCategory : activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === "Todos" ? null : cat === activeCategory ? null : cat)}
                  className={cn(
                    "px-5 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200 active:scale-95",
                    isActive
                      ? "bg-brand text-white shadow-brand-sm"
                      : "bg-white text-ink hover:bg-sage/10 border border-sage/20"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Grid with stagger animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory ?? "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display font-bold text-brand text-xl mb-2">
                  Sin resultados en esta categoría
                </p>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="font-body text-sm text-muted hover:text-brand transition-colors mt-2"
                >
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(i * 0.05, 0.3),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
