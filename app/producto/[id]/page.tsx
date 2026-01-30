'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SizeColorPicker from '@/components/products/SizeColorPicker';
import AddToCartButton from '@/components/products/AddToCartButton';
import products from '@/data/products.json';
import { Product } from '@/types';

export default function ProductoPage() {
  const params = useParams();
  const product = (products as Product[]).find((p) => p.id === params.id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [customNote, setCustomNote] = useState('');

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <Link href="/catalogo" className="text-primary hover:underline">
            &larr; Volver al catálogo
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center relative">
            <div className="text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            {product.customizable && (
              <span className="absolute top-4 right-4 bg-accent text-white text-sm px-3 py-1 rounded-full">
                Personalizable
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-muted leading-relaxed">{product.description}</p>

            <SizeColorPicker
              sizes={product.sizes}
              colors={product.colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />

            {product.customizable && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ¿Qué personalización deseas?
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Describe tu personalización: logo, texto, colores, etc."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                />
                <p className="text-sm text-muted mt-1">
                  Los detalles se coordinarán por WhatsApp
                </p>
              </div>
            )}

            <AddToCartButton
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              customNote={customNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
