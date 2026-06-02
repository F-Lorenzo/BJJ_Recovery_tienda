"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product, ProductVariation } from "@/types/product";

interface Props {
  product: Product;
}

export function ProductPageClient({ product }: Props) {
  const [selectedVariation, setSelectedVariation] =
    useState<ProductVariation | null>(
      product.variations?.nodes?.[0] ?? null
    );
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "descripcion" | "como-usarlo" | "envio"
  >("descripcion");
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const openCart = useCartStore((s) => s.openCart);

  const allImages = [
    product.image,
    ...(product.galleryImages?.nodes ?? []),
  ].filter(Boolean);

  const displayPrice = selectedVariation
    ? selectedVariation.price
    : product.price;
  const displayRegular = selectedVariation
    ? selectedVariation.regularPrice
    : product.regularPrice;
  const isOnSale = displayPrice && displayRegular && displayPrice !== displayRegular;

  function handleAddToCart() {
    // TODO: wire to Apollo mutation
    openCart();
  }

  const TABS = [
    { id: "descripcion", label: "Descripción" },
    { id: "como-usarlo", label: "Cómo usarlo" },
    { id: "envio", label: "Envío" },
  ] as const;

  return (
    <div className="bg-sand min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-body text-muted">
            <Link href="/" className="hover:text-brand transition-colors">
              Inicio
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/productos"
              className="hover:text-brand transition-colors"
            >
              Productos
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
              {allImages[activeImageIdx]?.sourceUrl ? (
                <Image
                  src={allImages[activeImageIdx]!.sourceUrl}
                  alt={allImages[activeImageIdx]!.altText || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sage/30">
                  <svg
                    className="w-24 h-24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={0.8}
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.productTags?.nodes?.map((tag) => (
                  <Badge key={tag.name}>{tag.name}</Badge>
                ))}
                {isOnSale && <Badge variant="alert">Oferta</Badge>}
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      i === activeImageIdx
                        ? "border-brand"
                        : "border-transparent hover:border-sage/40"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-pressed={i === activeImageIdx}
                  >
                    {img?.sourceUrl && (
                      <Image
                        src={img.sourceUrl}
                        alt={img.altText || ""}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Category */}
            {product.productCategories?.nodes?.[0] && (
              <p className="font-body text-sage text-sm font-semibold uppercase tracking-wider mb-3">
                {product.productCategories.nodes[0].name}
              </p>
            )}

            {/* Title */}
            <h1
              className="font-display font-extrabold text-ink leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-brand text-3xl">
                {formatPrice(displayPrice || "0")}
              </span>
              {isOnSale && (
                <span className="font-body text-muted text-lg line-through">
                  {formatPrice(displayRegular || "0")}
                </span>
              )}
              <span className="font-body text-sage text-sm ml-auto">
                Envío incluido
              </span>
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <div
                className="font-body text-muted text-base leading-relaxed mb-6 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription,
                }}
              />
            )}

            {/* Variations */}
            {product.variations?.nodes && product.variations.nodes.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-sm font-semibold text-ink mb-2">
                  Variante:{" "}
                  <span className="font-normal text-muted">
                    {selectedVariation?.name ?? "Seleccioná una opción"}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variations.nodes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariation(v)}
                      className={`px-4 py-2 rounded-lg border font-body text-sm font-semibold transition-all duration-200 ${
                        selectedVariation?.id === v.id
                          ? "border-brand bg-brand text-white"
                          : "border-sage/30 bg-white text-ink hover:border-brand"
                      }`}
                    >
                      {v.attributes?.nodes
                        ?.map((a) => a.value)
                        .join(" / ") || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 mb-8">
              {/* Qty */}
              <div className="flex items-center border border-sage/30 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-ink hover:bg-sand transition-colors duration-150"
                  aria-label="Reducir cantidad"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-10 text-center font-body font-semibold text-ink text-sm">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-ink hover:bg-sand transition-colors duration-150"
                  aria-label="Aumentar cantidad"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1"
              >
                Agregar al carrito
              </Button>
            </div>

            {/* Trust signals */}
            <ul className="space-y-2.5 border-t border-sage/15 pt-6">
              {[
                "Envío incluido a todo el país",
                "Pago por transferencia bancaria",
                "Atención personalizada por WhatsApp",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 font-body text-sm text-muted"
                >
                  <svg
                    className="w-4 h-4 text-brand flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-sage/15 pt-10">
          <div className="flex gap-1 mb-8 border-b border-sage/15">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 font-body text-sm font-semibold transition-colors duration-200 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-2xl">
            {activeTab === "descripcion" && product.description && (
              <div
                className="font-body text-ink text-base leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
            {activeTab === "como-usarlo" && (
              <div className="font-body text-ink text-base leading-relaxed space-y-4">
                <p className="text-muted">
                  Consultá las instrucciones de uso específicas para este
                  producto. Si tenés dudas, escribinos por WhatsApp.
                </p>
              </div>
            )}
            {activeTab === "envio" && (
              <div className="font-body text-ink text-base leading-relaxed space-y-3">
                <p>
                  <strong className="font-semibold">Envío incluido</strong> a
                  todo el país sin costo adicional.
                </p>
                <p className="text-muted">
                  Despachamos dentro de las 48hs hábiles de confirmado el pago.
                  El tiempo de entrega depende de tu zona.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {product.related?.nodes && product.related.nodes.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-brand text-2xl mb-8">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {product.related.nodes.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    ...p,
                    regularPrice: p.price || "",
                    productTags: { nodes: [] },
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
