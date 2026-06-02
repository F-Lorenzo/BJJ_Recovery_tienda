"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const isEmpty = items.length === 0;

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  function handleCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!coupon.trim()) return;
    setCouponApplied(true);
    setCouponError("");
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Page header */}
      <div className="bg-brand" style={{ paddingTop: "clamp(2.5rem,6vh,4rem)", paddingBottom: "clamp(3rem,7vh,5rem)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-white"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            Tu carrito
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-brand-sm">
                <svg className="w-9 h-9 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-brand text-2xl mb-2">
                Tu carrito está más vacío que el tatami un lunes feriado
              </h2>
              <p className="font-body text-muted text-sm mb-8 max-w-xs mx-auto">
                Explorá nuestros productos y encontrá lo que tu cuerpo necesita.
              </p>
              <Link href="/productos">
                <Button size="lg">Ver productos</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Items */}
              <div className="lg:col-span-2 space-y-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
                    return (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 shadow-product"
                      >
                        {/* Image */}
                        <Link href={`/productos/${item.slug}`} className="flex-shrink-0">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-sand overflow-hidden">
                            {item.image?.sourceUrl ? (
                              <Image
                                src={item.image.sourceUrl}
                                alt={item.image.altText || item.name}
                                width={96} height={96}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-sage/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-sage/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                                  <rect x="3" y="3" width="18" height="18" rx="2" />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/productos/${item.slug}`} className="font-display font-semibold text-ink hover:text-brand transition-colors duration-200 block leading-snug">
                            {item.name}
                          </Link>
                          {item.variationName && (
                            <p className="font-body text-muted text-xs mt-0.5">{item.variationName}</p>
                          )}

                          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                            {/* Qty control */}
                            <div className="flex items-center border border-sage/25 rounded-lg overflow-hidden bg-sand">
                              <button className="w-9 h-9 flex items-center justify-center text-ink hover:bg-sage/15 transition-colors text-sm font-semibold" aria-label="Reducir">-</button>
                              <span className="w-8 text-center font-display font-semibold text-sm">{item.quantity}</span>
                              <button className="w-9 h-9 flex items-center justify-center text-ink hover:bg-sage/15 transition-colors text-sm font-semibold" aria-label="Aumentar">+</button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="font-display font-bold text-brand text-lg">
                                {formatPrice(itemPrice * item.quantity)}
                              </span>
                              <button className="text-muted hover:text-alert transition-colors duration-200 p-1" aria-label="Eliminar producto">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-product sticky top-24">
                  <h2 className="font-display font-bold text-ink text-lg mb-6">Resumen del pedido</h2>

                  {/* Coupon */}
                  <form onSubmit={handleCoupon} className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Código de descuento"
                        value={coupon}
                        onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                        className="flex-1 text-sm"
                        disabled={couponApplied}
                        error={couponError}
                      />
                      <Button type="submit" variant="outline" size="sm" disabled={couponApplied} className="whitespace-nowrap">
                        {couponApplied ? "Aplicado" : "Aplicar"}
                      </Button>
                    </div>
                    {couponApplied && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-brand mt-1.5 font-semibold"
                      >
                        Descuento aplicado. Bien jugado.
                      </motion.p>
                    )}
                  </form>

                  {/* Totals */}
                  <div className="space-y-3 border-t border-sage/15 pt-5 mb-6">
                    <div className="flex justify-between font-body text-sm text-ink">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-sage">
                      <span>Envío</span>
                      <span className="font-semibold text-brand">Incluido</span>
                    </div>
                    <div className="flex justify-between font-display font-bold text-lg text-ink border-t border-sage/15 pt-3">
                      <span>Total</span>
                      <span className="text-brand">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full">Iniciar compra</Button>
                  </Link>
                  <p className="font-body text-xs text-muted text-center mt-3">
                    Pago seguro por transferencia bancaria
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
