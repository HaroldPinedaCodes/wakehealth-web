import config from '@/data/config.json';

export default function NosotrosPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Sobre Nosotros
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Nuestra Historia
            </h2>
            <p className="text-muted leading-relaxed">
              Wakehealth nació con la misión de proporcionar uniformes médicos de alta calidad
              y camisetas personalizadas a profesionales de la salud y empresas.
              Entendemos la importancia de vestir con profesionalismo y comodidad en el
              ambiente laboral.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Nuestra Misión
            </h2>
            <p className="text-muted leading-relaxed">
              Ofrecer productos de calidad superior que combinen funcionalidad,
              durabilidad y estilo. Nos especializamos en uniformes médicos que
              cumplen con los más altos estándares de la industria, así como
              camisetas personalizables para empresas que buscan fortalecer su
              identidad corporativa.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              ¿Por qué elegirnos?
            </h2>
            <ul className="space-y-4 text-muted">
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Materiales de alta calidad y durabilidad</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Personalización profesional para tu marca</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Atención personalizada vía WhatsApp</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3">✓</span>
                <span>Precios competitivos para pedidos corporativos</span>
              </li>
            </ul>
          </section>

          <section className="bg-card rounded-2xl p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Contáctanos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-muted">{config.companyEmail}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <span className="text-muted">{config.companyPhone}</span>
              </div>
              <div className="flex items-center space-x-3 md:col-span-2">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <span className="text-muted">{config.companyAddress}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
