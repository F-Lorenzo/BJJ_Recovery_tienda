import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products?: Pick<
    Product,
    "id" | "slug" | "name" | "image" | "price" | "regularPrice" | "salePrice" | "productTags"
  >[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}

const GRID_COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
};

export function ProductGrid({
  products,
  loading = false,
  columns = 4,
}: ProductGridProps) {
  if (loading) {
    return (
      <div className={`grid ${GRID_COLS[columns]} gap-4 md:gap-6`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <Skeleton className="aspect-square" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-16">
        <p className="font-display font-semibold text-brand text-xl mb-2">
          No hay productos disponibles
        </p>
        <p className="font-body text-muted text-sm">
          Volvé a intentarlo más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${GRID_COLS[columns]} gap-4 md:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
