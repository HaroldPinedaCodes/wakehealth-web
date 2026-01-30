'use client';

import { useCartStore } from '@/lib/store';

export default function CartSummary() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Resumen del Pedido
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted">
          <span>Productos ({itemCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Envío</span>
          <span>Por coordinar</span>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span className="text-foreground">Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
