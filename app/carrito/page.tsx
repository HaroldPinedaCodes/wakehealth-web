'use client';

import Link from 'next/link';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import CheckoutForm from '@/components/cart/CheckoutForm';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-muted mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-muted mb-8">
            Agrega productos para comenzar tu pedido
          </p>
          <Link href="/catalogo">
            <Button variant="primary" size="lg">
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 border border-border">
              {items.map((item) => (
                <CartItem
                  key={`${item.productId}-${item.size}-${item.color}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <CartSummary />
            <CheckoutForm />
          </div>
        </div>
      </div>
    </div>
  );
}
