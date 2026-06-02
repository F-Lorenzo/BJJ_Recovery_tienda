const VALUES = [
  {
    number: "01",
    title: "Conocimiento de primera mano",
    body: "Somos practicantes de BJJ antes que vendedores. Cada producto lo usamos nosotros primero. Si no nos sirve a nosotros, no llega a la tienda.",
    accent: false,
  },
  {
    number: "02",
    title: "Productos que realmente funcionan",
    body: "Nada de marketing vacío. Seleccionamos basándonos en evidencia: estudios, feedback de la comunidad y nuestra propia experiencia en el tatami.",
    accent: true,
  },
  {
    number: "03",
    title: "Seguimiento personalizado",
    body: "No sos un número de pedido. Si tenés dudas sobre qué producto es mejor para tu entrenamiento, hablamos por WhatsApp y lo resolvemos juntos.",
    accent: false,
  },
];

export function ValueProposition() {
  return (
    <section className="py-20 md:py-28 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="font-body text-sage text-sm font-semibold uppercase tracking-widest mb-3">
            Por qué elegirnos
          </p>
          <h2
            className="font-display font-bold text-brand leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3vw + 1rem, 2.5rem)" }}
          >
            La diferencia la hace quién está del otro lado
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {VALUES.map((item) => (
            <div
              key={item.number}
              className={`rounded-2xl p-8 lg:p-10 ${
                item.accent
                  ? "bg-brand text-white"
                  : "bg-white text-ink"
              }`}
            >
              <span
                className={`font-display font-extrabold text-4xl block mb-6 ${
                  item.accent ? "text-white/20" : "text-sage/25"
                }`}
                aria-hidden="true"
              >
                {item.number}
              </span>
              <h3
                className={`font-display font-bold text-xl mb-4 ${
                  item.accent ? "text-white" : "text-brand"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`font-body text-base leading-relaxed ${
                  item.accent ? "text-white/75" : "text-muted"
                }`}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
