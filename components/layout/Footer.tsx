import Link from 'next/link';
import config from '@/data/config.json';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Wakehealth</h3>
            <p className="text-gray-300">
              Tu tienda de confianza para uniformes médicos y camisetas personalizadas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-gray-300 hover:text-primary transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="text-gray-300 hover:text-primary transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{config.companyEmail}</li>
              <li>{config.companyPhone}</li>
              <li>{config.companyAddress}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {config.companyName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
