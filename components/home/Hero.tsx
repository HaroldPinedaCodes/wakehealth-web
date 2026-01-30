import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Uniformes Médicos y Camisetas Personalizadas
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Calidad profesional para el sector salud y empresas.
            Personaliza tus camisetas con tu logo o diseño.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/catalogo">
              <Button variant="accent" size="lg">
                Ver Catálogo
              </Button>
            </Link>
            <Link href="/nosotros">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Conocenos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
