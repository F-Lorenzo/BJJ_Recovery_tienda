"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const isEmpty = items.length === 0;

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  function handleCoupon(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to Apollo mutation
    if (coupon.trim()) setCouponApplied(true);
  }

  return (
    <div className="min-h-screen bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <h1 className="font-display font-extrabold text-brand text-3xl md:text-4xl mb-10">
          Tu carrito
        </h1>

        {isEmpty ? (
          /* Empty state */
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-sage"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <h2 className="font-display font-bold text-brand text-xl mb-2">
              Tu carrito está más vacío que el tatami un lunes feriado
            </h2>
            <p className="font-body text-muted text-sm mb-8">
              Explorá nuestros productos y encontrá lo que tu cuerpo necesita.
            </p>
            <Link href="/productos">
              <Button size="lg">Ver productos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl p-4 sm:p-6 flex gap-4"
                >
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl bg-sand overflow-hidden">
                    {item.image?.sourceUrl ? (
                      <Image
                        src={item.image.sourceUrl}
                        alt={item.image.altText || item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/productos/${item.slug}`}
                      className="font-display font-semibold text-ink hover:text-brand transition-colors duration-200 block truncate"
                    >
                      {item.name}
                    </Link>
                    {item.variationName && (
                      <p className="font-body text-muted text-xs mt-0.5">
                        {item.variationName}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                      {/* Quantity */}
                      <div className="flex items-center border border-sage/30 rounded-lg overflow-hidden">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-ink hover:bg-sand transition-colors text-sm"
                          aria-label="Reducir cantidad"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-body text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-ink hover:bg-sand transition-colors text-sm"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + delete */}
                      <div className="flex items-center gap-4">
                        <span className="font-display font-bold text-brand">
                          {formatPrice(
                            parseFloat(
                              item.price.replace(/[^0-9.]/g, "")
                            ) * item.quantity
                          )}
                        </span>
                        <button
                          className="text-muted hover:text-alert transition-colors duration-200"
                          aria-label="Eliminar producto"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-ink text-lg mb-6">
                  Resumen del pedido
                </h2>

                {/* Coupon */}
                <form onSubmit={handleCoupon} className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Código de descuento"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 text-sm h-10"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="h-10 whitespace-nowrap"
                    >
                      Aplicar
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-brand mt-1.5 font-semibold">
                      Descuento aplicado. Bien jugado.
                    </p>
                  )}
                </form>

                {/* Totals */}
                <div className="space-y-3 border-t border-sage/15 pt-5">
                  <div className="flex justify-between font-body text-sm text-ink">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between font-body text-sm text-sage">
                    <span>Envío</span>
                    <span className="font-semibold text-brand">Incluido</span>
                  </div>
                  <div className="flex justify-between font-display font-bold text-lg text-ink border-t border-sage/15 pt-3 mt-3">
                    <span>Total</span>
                    <span className="text-brand">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button size="lg" className="w-full">
                    Iniciar compra
                  </Button>
                </Link>

                <p className="font-body text-xs text-muted text-center mt-4">
                  Pago seguro por transferencia bancaria
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
