"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils/cn";

const PROVINCES = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postcode: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postcode: "",
    notes: "",
  });

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to Apollo checkout mutation
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/checkout/confirmacion");
  }

  return (
    <div className="min-h-screen bg-sand py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-extrabold text-brand text-3xl md:text-4xl mb-10">
          Finalizar compra
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <fieldset className="bg-white rounded-2xl p-6 space-y-5">
              <legend className="font-display font-bold text-ink text-lg mb-4 block">
                Datos de contacto
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre *"
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <Input
                  label="Apellido *"
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Email *"
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                label="Teléfono *"
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="Ej: 11 1234-5678"
                value={form.phone}
                onChange={handleChange}
              />
            </fieldset>

            {/* Shipping address */}
            <fieldset className="bg-white rounded-2xl p-6 space-y-5">
              <legend className="font-display font-bold text-ink text-lg mb-4 block">
                Dirección de envío
              </legend>

              <Input
                label="Dirección *"
                id="address"
                name="address"
                required
                autoComplete="street-address"
                placeholder="Calle y número"
                value={form.address}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Ciudad *"
                  id="city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={handleChange}
                />
                <Input
                  label="Código postal *"
                  id="postcode"
                  name="postcode"
                  required
                  autoComplete="postal-code"
                  value={form.postcode}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-semibold text-ink mb-1 font-body"
                >
                  Provincia *
                </label>
                <select
                  id="province"
                  name="province"
                  required
                  value={form.province}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg border bg-white font-body text-ink",
                    "focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand",
                    "transition-colors duration-200 border-sage/40",
                    !form.province && "text-muted"
                  )}
                >
                  <option value="" disabled>
                    Seleccioná tu provincia
                  </option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-semibold text-ink mb-1 font-body"
                >
                  Notas (opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Instrucciones especiales para el envío…"
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-sage/40 bg-white font-body text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors duration-200 resize-none"
                />
              </div>
            </fieldset>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6">
              <h2 className="font-display font-bold text-ink text-lg mb-4">
                Método de pago
              </h2>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-sand border-2 border-brand">
                <div className="w-4 h-4 rounded-full border-2 border-brand flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-ink">
                    Transferencia bancaria
                  </p>
                  <p className="font-body text-xs text-muted">
                    Te enviamos los datos de CBU/alias al confirmar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-bold text-ink text-lg mb-5">
                Tu pedido
              </h2>

              <ul className="space-y-4 border-b border-sage/15 pb-5 mb-5">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3 text-sm">
                    <span className="font-body text-ink flex-1 leading-snug">
                      {item.name}
                      {item.variationName && (
                        <span className="text-muted block text-xs">
                          {item.variationName}
                        </span>
                      )}
                    </span>
                    <span className="font-body text-muted">×{item.quantity}</span>
                    <span className="font-display font-semibold text-brand whitespace-nowrap">
                      {formatPrice(
                        parseFloat(item.price.replace(/[^0-9.]/g, "")) *
                          item.quantity
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 mb-6">
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

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? "Confirmando…" : "Confirmar pedido"}
              </Button>

              <p className="font-body text-xs text-muted text-center mt-4 leading-relaxed">
                Al confirmar aceptás nuestros{" "}
                <a href="/terminos" className="underline hover:text-brand">
                  términos y condiciones
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
