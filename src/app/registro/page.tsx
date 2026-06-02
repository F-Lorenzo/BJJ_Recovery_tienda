"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegistroPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to Apollo registerUser mutation
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        {!submitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full font-body text-sm font-semibold mb-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                10% OFF en tu primera compra
              </div>
              <h1 className="font-display font-extrabold text-brand text-3xl mb-2">
                Creá tu cuenta
              </h1>
              <p className="font-body text-muted text-sm">
                Registrate y recibí el cupón{" "}
                <strong className="text-ink">BIENVENIDO10</strong> para usar en
                cualquier producto.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
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
                label="Contraseña *"
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
              />

              <Input
                label="Teléfono (opcional)"
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Para consultarte por WhatsApp"
                value={form.phone}
                onChange={handleChange}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full mt-2"
                disabled={loading}
              >
                {loading ? "Creando cuenta…" : "Crear cuenta y obtener 10% OFF"}
              </Button>
            </form>

            <p className="font-body text-xs text-muted text-center mt-5">
              ¿Ya tenés cuenta?{" "}
              <Link href="/mi-cuenta" className="text-brand font-semibold hover:underline">
                Ingresá acá
              </Link>
            </p>
          </>
        ) : (
          /* Success state */
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="font-display font-extrabold text-brand text-2xl mb-3">
              ¡Bienvenido/a!
            </h2>
            <p className="font-body text-muted text-sm mb-6">
              Tu cuenta fue creada. Usá el cupón para tu primera compra:
            </p>
            <div className="bg-white rounded-2xl p-6 mb-6">
              <p className="font-body text-muted text-xs uppercase tracking-wide mb-2">
                Tu cupón de descuento
              </p>
              <p className="font-display font-extrabold text-brand text-3xl tracking-widest">
                BIENVENIDO10
              </p>
            </div>
            <Link href="/productos">
              <Button size="lg">Explorar productos</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
