export const Features = () => {
  return (
    <section
      // ref={featuresRef}
      className="bg-linear-to-b from-muted/50 to-background py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="text-[#2563eb]">NutriPoint</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprometidos con tu salud y rendimiento deportivo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="feature-card-animate text-center group p-6 rounded-xl bg-card border border-border/50 transition-smooth hover:shadow-xl hover:-translate-y-1">
            <div className="w-20 h-20 bg-linear-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 group-hover:text-[#2563eb] transition-smooth">
              Calidad Certificada
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Todos nuestros productos cuentan con certificaciones
              internacionales y pruebas de laboratorio
            </p>
          </div>

          <div className="feature-card-animate text-center group p-6 rounded-xl bg-card border border-border/50 transition-smooth hover:shadow-xl hover:-translate-y-1">
            <div className="w-20 h-20 bg-linear-to-br from-[#dc2626] to-[#b91c1c] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 group-hover:text-[#dc2626] transition-smooth">
              Envío Rápido
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Entrega en 24-48 horas en toda la península con seguimiento en
              tiempo real
            </p>
          </div>

          <div className="feature-card-animate text-center group p-6 rounded-xl bg-card border border-border/50 transition-smooth hover:shadow-xl hover:-translate-y-1">
            <div className="w-20 h-20 bg-linear-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl mb-3 group-hover:text-[#2563eb] transition-smooth">
              Compra Segura
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Pago 100% seguro con encriptación SSL y garantía de devolución
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
