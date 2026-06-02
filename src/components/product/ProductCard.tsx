import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils/formatPrice";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Pick<
    Product,
    | "slug"
    | "name"
    | "image"
    | "price"
    | "regularPrice"
    | "salePrice"
    | "productTags"
  >;
}

function getFirstTag(product: ProductCardProps["product"]): string | null {
  return product.productTags?.nodes?.[0]?.name ?? null;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOnSale =
    product.salePrice &&
    product.regularPrice &&
    product.salePrice !== product.regularPrice;
  const tag = getFirstTag(product);

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
    >
      {/* Image */}
      <div className="relative aspect-square bg-sand overflow-hidden">
        {product.image?.sourceUrl ? (
          <Image
            src={product.image.sourceUrl}
            alt={product.image.altText || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sage/30">
            <svg
              className="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOnSale && (
            <Badge variant="alert">
              -{Math.round((1 - parseFloat(product.salePrice!.replace(/[^0-9.]/g, "")) / parseFloat(product.regularPrice!.replace(/[^0-9.]/g, ""))) * 100)}%
            </Badge>
          )}
          {tag && !isOnSale && <Badge>{tag}</Badge>}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-display font-semibold text-ink text-base leading-snug mb-2 group-hover:text-brand transition-colors duration-200">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="font-display font-bold text-brand text-lg">
            {formatPrice(product.price || product.regularPrice || "0")}
          </span>
          {isOnSale && (
            <span className="font-body text-muted text-sm line-through">
              {formatPrice(product.regularPrice || "0")}
            </span>
          )}
        </div>

        <p className="font-body text-muted text-xs mt-2">Envío incluido</p>
      </div>
    </Link>
  );
}
