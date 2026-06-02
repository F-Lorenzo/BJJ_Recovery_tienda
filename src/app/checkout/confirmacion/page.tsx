"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const CBU = "0000003100100000000000";
const ALIAS = "bjjrecovery.pagos";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs font-body font-semibold text-sage hover:text-brand transition-colors duration-200"
      aria-label={`Copiar ${label}`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

export default function ConfirmacionPage() {
  return (
    <div className="min-h-screen bg-sand py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Check + heading */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-8 h-8 text-white"
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
          </div>
          <h1 className="font-display font-extrabold text-brand text-3xl md:text-4xl mb-2">
            ¡Pedido confirmado!
          </h1>
          <p className="font-body text-muted text-base">
            Listo, tu pedido ya está en camino al tatami. Completá la
            transferencia para que lo despachemos.
          </p>
        </div>

        {/* Transfer data */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-display font-bold text-ink text-lg mb-5">
            Datos para la transferencia
          </h2>

          <dl className="space-y-4">
            {[
              { label: "CBU", value: CBU },
              { label: "Alias", value: ALIAS },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-3 border-b border-sage/15 last:border-0"
              >
                <div>
                  <dt className="font-body text-xs text-muted uppercase tracking-wide mb-0.5">
                    {label}
                  </dt>
                  <dd className="font-display font-semibold text-ink">
                    {value}
                  </dd>
                </div>
                <CopyButton value={value} label={label} />
              </div>
            ))}
          </dl>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="font-display font-bold text-ink text-lg mb-5">
            ¿Y ahora qué?
          </h2>
          <ol className="space-y-4">
            {[
              "Hacé la transferencia al CBU o alias de arriba.",
              "Envianos el comprobante por WhatsApp.",
              "Confirmamos el pago y despachamos en 48hs hábiles.",
              "Recibís tu pedido y volvés al tatami en forma.",
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 text-brand font-display font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="font-body text-sm text-ink leading-relaxed pt-0.5">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}?text=Hola! Ya transferí el pago del pedido`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button size="lg" className="w-full">
              Ya transferí — enviar comprobante
            </Button>
          </a>
          <Link href="/productos" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Seguir comprando
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
