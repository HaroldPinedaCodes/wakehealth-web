'use client';

import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/lib/store';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.productId, item.size, item.color);
    } else {
      updateQuantity(item.productId, item.size, item.color, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-foreground">{item.name}</h3>
        <p className="text-sm text-muted">
          Talla: {item.size} | Color: {item.color}
        </p>
        {item.customNote && (
          <p className="text-sm text-accent mt-1">
            Personalización: {item.customNote}
          </p>
        )}
        <p className="font-bold text-primary mt-1">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.productId, item.size, item.color)}
          className="text-muted hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>

        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 py-1 text-foreground hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <span className="px-3 py-1 text-foreground font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 py-1 text-foreground hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
