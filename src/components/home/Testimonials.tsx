const TESTIMONIALS = [
  {
    quote:
      "Llevo 3 años entrenando BJJ y la pistola masajeadora cambió completamente mi recuperación post-entrenamiento. Antes me quedaba tieso dos días. Ahora vuelvo al tatami al día siguiente sin problema.",
    name: "Martín R.",
    role: "Faixa azul — 4 años de BJJ",
    initials: "MR",
    featured: true,
  },
  {
    quote:
      "El tape para dedos es básicamente obligatorio. La calidad es notablemente mejor que otras marcas que había probado.",
    name: "Lucía F.",
    role: "Faixa blanca — 1 año de BJJ",
    initials: "LF",
    featured: false,
  },
  {
    quote:
      "Me consultaron qué producto era mejor para mi rodilla antes de comprar. Eso no lo hace ninguna tienda.",
    name: "Diego M.",
    role: "Faixa púrpura — 7 años de BJJ",
    initials: "DM",
    featured: false,
  },
];

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <p className="font-body text-sage text-sm font-semibold uppercase tracking-widest mb-3">
            Lo que dice la comunidad
          </p>
          <h2
            className="font-display font-bold text-brand leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3vw + 1rem, 2.25rem)" }}
          >
            Del tatami a la tienda, y de vuelta al tatami
          </h2>
        </div>

        {/* Asymmetric layout: 1 featured large + 2 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured — spans 3 cols */}
          <figure className="lg:col-span-3 bg-brand rounded-2xl p-8 lg:p-10 flex flex-col">
            <div className="flex gap-1 mb-6" aria-label="5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-sand" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <blockquote className="font-display font-medium text-white text-xl lg:text-2xl leading-snug flex-1 mb-8" style={{ letterSpacing: "-0.01em" }}>
              &ldquo;{featured.quote}&rdquo;
            </blockquote>

            <figcaption className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-white text-sm">{featured.initials}</span>
              </div>
              <div>
                <p className="font-display font-semibold text-white text-sm">{featured.name}</p>
                <p className="font-body text-white/50 text-xs">{featured.role}</p>
              </div>
            </figcaption>
          </figure>

          {/* 2 smaller — span 2 cols, stacked */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {rest.map((t) => (
              <figure key={t.name} className="bg-sand rounded-2xl p-6 flex flex-col flex-1">
                <div className="flex gap-1 mb-4" aria-label="5 estrellas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-brand" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="font-body text-ink text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-white text-xs">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-ink text-sm">{t.name}</p>
                    <p className="font-body text-muted text-xs">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
