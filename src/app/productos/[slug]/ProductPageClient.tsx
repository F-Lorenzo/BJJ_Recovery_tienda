"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import type { Product, ProductVariation } from "@/types/product";

interface Props { product: Product }

const TABS = [
  { id: "descripcion", label: "Descripción" },
  { id: "como-usarlo", label: "Cómo usarlo" },
  { id: "envio", label: "Envío" },
] as const;

type TabId = typeof TABS[number]["id"];

export function ProductPageClient({ product }: Props) {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    product.variations?.nodes?.[0] ?? null
  );
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("descripcion");
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const openCart = useCartStore((s) => s.openCart);

  const allImages = [product.image, ...(product.galleryImages?.nodes ?? [])].filter(Boolean);
  const displayPrice = selectedVariation?.price ?? product.price;
  const displayRegular = selectedVariation?.regularPrice ?? product.regularPrice;
  const isOnSale = displayPrice && displayRegular && displayPrice !== displayRegular;

  function handleAddToCart() {
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-sand min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-body text-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand transition-colors">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/productos" className="hover:text-brand transition-colors">Productos</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* ── Gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.6, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-product"
            >
              {allImages[activeImg]?.sourceUrl ? (
                <Image
                  src={allImages[activeImg]!.sourceUrl}
                  alt={allImages[activeImg]!.altText || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <Image
                  src={`https://loremflickr.com/800/800/massage,recovery,muscle?lock=50`}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.productTags?.nodes?.map((tag) => (
                  <Badge key={tag.name}>{tag.name}</Badge>
                ))}
                {isOnSale && <Badge variant="alert">Oferta</Badge>}
              </div>
            </motion.div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === activeImg ? "border-brand scale-[1.04]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-pressed={i === activeImg}
                  >
                    {img?.sourceUrl && (
                      <Image src={img.sourceUrl} alt="" fill sizes="64px" className="object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {product.productCategories?.nodes?.[0] && (
              <p className="font-body text-sage text-sm font-semibold uppercase tracking-widest mb-3">
                {product.productCategories.nodes[0].name}
              </p>
            )}

            <h1
              className="font-display font-extrabold text-ink leading-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", letterSpacing: "-0.025em" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-brand" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                {formatPrice(displayPrice || "0")}
              </span>
              {isOnSale && (
                <span className="font-body text-muted text-lg line-through">
                  {formatPrice(displayRegular || "0")}
                </span>
              )}
              <span className="font-body text-sage text-sm ml-auto flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                Envío incluido
              </span>
            </div>

            {/* Short description */}
            {product.shortDescription && (
              <div
                className="font-body text-muted text-base leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />
            )}

            {/* Variations */}
            {product.variations?.nodes && product.variations.nodes.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-sm font-semibold text-ink mb-3">
                  Variante:{" "}
                  <span className="font-normal text-muted">
                    {selectedVariation?.attributes?.nodes?.map((a) => a.value).join(" / ") ?? "Seleccioná una opción"}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variations.nodes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariation(v)}
                      className={`px-4 py-2 rounded-lg border font-body text-sm font-semibold transition-all duration-200 active:scale-95 ${
                        selectedVariation?.id === v.id
                          ? "border-brand bg-brand text-white"
                          : "border-sage/30 bg-white text-ink hover:border-brand"
                      }`}
                    >
                      {v.attributes?.nodes?.map((a) => a.value).join(" / ") || v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center border border-sage/30 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-ink hover:bg-sand transition-colors duration-150"
                  aria-label="Reducir cantidad"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" d="M5 12h14" />
                  </svg>
                </button>
                <span className="w-10 text-center font-display font-semibold text-ink">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-ink hover:bg-sand transition-colors duration-150"
                  aria-label="Aumentar cantidad"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <motion.div className="flex-1" whileTap={{ scale: 0.97 }}>
                <Button onClick={handleAddToCart} size="lg" className="w-full gap-2">
                  <AnimatePresence mode="wait" initial={false}>
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Agregado
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        Agregar al carrito
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Trust list */}
            <ul className="space-y-2.5 border-t border-sage/15 pt-6">
              {[
                "Envío incluido a todo el país",
                "Pago seguro por transferencia bancaria",
                "Atención personalizada por WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-body text-sm text-muted">
                  <svg className="w-4 h-4 text-brand flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-16 md:mt-20 border-t border-sage/15 pt-10">
          <div className="flex gap-0 border-b border-sage/15 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-body text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-brand text-brand"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              {activeTab === "descripcion" && product.description && (
                <div
                  className="font-body text-ink text-base leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}
              {activeTab === "descripcion" && !product.description && (
                <p className="font-body text-muted">Sin descripción disponible.</p>
              )}
              {activeTab === "como-usarlo" && (
                <p className="font-body text-muted text-base leading-relaxed">
                  Consultá las instrucciones específicas de este producto. Para dudas sobre el modo de uso escribinos por WhatsApp.
                </p>
              )}
              {activeTab === "envio" && (
                <div className="space-y-3 font-body text-base">
                  <p><strong className="font-semibold text-ink">Envío incluido</strong> a todo el país sin costo adicional.</p>
                  <p className="text-muted">Despachamos dentro de las 48 hs hábiles de confirmado el pago. El tiempo de entrega varía según tu zona.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Related products ── */}
        {product.related?.nodes && product.related.nodes.length > 0 && (
          <div className="mt-16 md:mt-20">
            <h2 className="font-display font-bold text-brand mb-8" style={{ fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2rem)" }}>
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {product.related.nodes.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{ ...p, regularPrice: p.price || "", productTags: { nodes: [] } }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
