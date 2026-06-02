"use client";

import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
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

  const categories = useMemo(
    () => getCategories(initialProducts),
    [initialProducts]
  );

  const filtered = useMemo(() => {
    if (!activeCategory) return initialProducts;
    return initialProducts.filter((p) =>
      p.productCategories?.nodes?.some((c) => c.name === activeCategory)
    );
  }, [initialProducts, activeCategory]);

  return (
    <div className="min-h-screen bg-sand">
      {/* Page header */}
      <div className="bg-brand pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-body text-sage text-sm font-semibold uppercase tracking-widest mb-3">
            Tienda
          </p>
          <h1
            className="font-display font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3rem)" }}
          >
            Todos los productos
          </h1>
          <p className="font-body text-white/60 text-lg mt-3">
            {initialProducts.length} productos disponibles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200",
                !activeCategory
                  ? "bg-brand text-white"
                  : "bg-white text-ink hover:bg-sage/10 border border-sage/20"
              )}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={cn(
                  "px-4 py-2 rounded-full font-body text-sm font-semibold transition-all duration-200",
                  activeCategory === cat
                    ? "bg-brand text-white"
                    : "bg-white text-ink hover:bg-sage/10 border border-sage/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <ProductGrid products={filtered} columns={4} />
      </div>
    </div>
  );
}
