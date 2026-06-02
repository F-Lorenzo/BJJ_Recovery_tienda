"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils/cn";

const PROVINCES = [
  "Buenos Aires","CABA","Catamarca","Chaco","Chubut","Córdoba","Corrientes",
  "Entre Ríos","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones",
  "Neuquén","Río Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe",
  "Santiago del Estero","Tierra del Fuego","Tucumán",
];

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; city: string; province: string; postcode: string; notes: string;
}

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", province: "", postcode: "", notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const subtotal = items.reduce((acc, item) => {
    return acc + (parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0) * item.quantity;
  }, 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/checkout/confirmacion");
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-brand" style={{ paddingTop: "clamp(2.5rem,6vh,4rem)", paddingBottom: "clamp(3rem,7vh,5rem)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-white"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)", letterSpacing: "-0.025em" }}
          >
            Finalizar compra
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: form fields ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contact */}
            <fieldset className="bg-white rounded-2xl p-6 space-y-4 shadow-product">
              <legend className="font-display font-bold text-ink text-lg mb-1 block">
                Datos de contacto
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Nombre *" id="firstName" name="firstName" required autoComplete="given-name" value={form.firstName} onChange={handleChange} />
                <Input label="Apellido *" id="lastName" name="lastName" required autoComplete="family-name" value={form.lastName} onChange={handleChange} />
              </div>
              <Input label="Email *" id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} />
              <Input label="Teléfono *" id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="11 1234-5678" value={form.phone} onChange={handleChange} />
            </fieldset>

            {/* Address */}
            <fieldset className="bg-white rounded-2xl p-6 space-y-4 shadow-product">
              <legend className="font-display font-bold text-ink text-lg mb-1 block">
                Dirección de envío
              </legend>
              <Input label="Calle y número *" id="address" name="address" required autoComplete="street-address" value={form.address} onChange={handleChange} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Ciudad *" id="city" name="city" required autoComplete="address-level2" value={form.city} onChange={handleChange} />
                <Input label="Código postal *" id="postcode" name="postcode" required autoComplete="postal-code" value={form.postcode} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-semibold text-ink mb-1 font-body">
                  Provincia *
                </label>
                <select
                  id="province" name="province" required
                  value={form.province} onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg border bg-white font-body text-ink min-h-[44px]",
                    "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand",
                    "transition-colors duration-200",
                    form.province ? "border-sage/30" : "border-sage/30 text-muted"
                  )}
                >
                  <option value="" disabled>Seleccioná tu provincia</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-ink mb-1 font-body">
                  Notas (opcional)
                </label>
                <textarea
                  id="notes" name="notes" rows={3}
                  placeholder="Instrucciones especiales para el envío..."
                  value={form.notes} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-sage/30 bg-white font-body text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors duration-200 resize-none"
                />
              </div>
            </fieldset>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-product">
              <h2 className="font-display font-bold text-ink text-lg mb-4">Método de pago</h2>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-brand/5 border-2 border-brand">
                <div className="w-5 h-5 mt-0.5 rounded-full border-2 border-brand flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-ink">Transferencia bancaria</p>
                  <p className="font-body text-xs text-muted mt-0.5">Recibís los datos de CBU/alias al confirmar el pedido</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: order summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-product sticky top-24">
              <h2 className="font-display font-bold text-ink text-lg mb-5">Tu pedido</h2>

              <ul className="space-y-3 border-b border-sage/15 pb-5 mb-5">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-3 text-sm">
                    <span className="font-body text-ink flex-1 leading-snug">
                      {item.name}
                      {item.variationName && <span className="text-muted block text-xs">{item.variationName}</span>}
                    </span>
                    <span className="font-body text-muted">x{item.quantity}</span>
                    <span className="font-display font-semibold text-brand whitespace-nowrap">
                      {formatPrice((parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0) * item.quantity)}
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

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                <AnimatePresence mode="wait" initial={false}>
                  {submitting ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" d="M12 3a9 9 0 100 18A9 9 0 0012 3z" strokeDasharray="56" strokeDashoffset="42" />
                      </svg>
                      Confirmando...
                    </motion.span>
                  ) : (
                    <motion.span key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Confirmar pedido
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              <p className="font-body text-xs text-muted text-center mt-3 leading-relaxed">
                Al confirmar aceptás nuestros{" "}
                <a href="/terminos" className="underline hover:text-brand">términos y condiciones</a>
              </p>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
