import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-sand flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p
          className="font-display font-extrabold text-brand/10 select-none leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}
          aria-hidden="true"
        >
          404
        </p>
        <div className="-mt-6 relative z-10">
          <h1 className="font-display font-extrabold text-brand text-2xl md:text-3xl mb-3">
            Esta página no existe
          </h1>
          <p className="font-body text-muted text-base mb-8">
            Puede que la hayas escrito mal o que el link esté desactualizado.
            Lo que buscás probablemente está en el catálogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/productos">
              <Button size="lg">Ver productos</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">Ir al inicio</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
