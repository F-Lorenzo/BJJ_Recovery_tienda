"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Productos", href: "/productos" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-sage/10">
      {/* Skip to content — keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-extrabold text-xl text-brand tracking-tight hover:text-brand/80 transition-colors duration-200"
          >
            BJJ Recovery
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all duration-200",
                  pathname.startsWith(link.href)
                    ? "text-brand bg-brand/8"
                    : "text-ink hover:text-brand hover:bg-brand/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: registro + cart */}
          <div className="flex items-center gap-2">
            <Link
              href="/registro"
              className="hidden sm:block font-body text-sm font-semibold text-muted hover:text-brand transition-colors duration-200 px-3 py-2"
            >
              Registrate y obtené 10% off
            </Link>

            <Link
              href="/carrito"
              aria-label={`Ver carrito${itemCount > 0 ? ` — ${itemCount} ${itemCount === 1 ? "producto" : "productos"}` : ""}`}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-ink hover:text-brand hover:bg-brand/5 transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>

              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-alert text-white font-display font-bold text-[10px] flex items-center justify-center leading-none"
                  aria-hidden="true"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
