'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/components/ui/ToastProvider';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  customNote: string;
}

export default function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
  customNote,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      customNote,
      image: product.images[0] || '',
    });
    showToast('Producto agregado al carrito');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-foreground">Cantidad:</label>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-foreground hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="px-4 py-2 text-foreground font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-foreground hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleAddToCart} variant="accent" size="lg" className="w-full">
        Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
      </Button>
    </div>
  );
}
