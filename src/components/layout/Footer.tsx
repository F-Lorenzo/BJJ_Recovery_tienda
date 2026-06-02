import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-display font-extrabold text-xl mb-3">
              BJJ Recovery
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Productos de recuperación muscular por y para deportistas de artes
              marciales.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-display font-semibold text-sm uppercase tracking-wide mb-3 text-white/50">
              Navegación
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { label: "Productos", href: "/productos" },
                { label: "Mi cuenta", href: "/mi-cuenta" },
                { label: "Contacto", href: "/contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-display font-semibold text-sm uppercase tracking-wide mb-3 text-white/50">
              Legal
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { label: "Política de envíos", href: "/politica-envios" },
                { label: "Términos y condiciones", href: "/terminos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} BJJ Recovery. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
