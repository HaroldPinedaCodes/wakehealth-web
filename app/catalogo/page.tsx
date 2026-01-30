'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/products/SearchBar';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductGrid from '@/components/products/ProductGrid';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import { Product, Category } from '@/types';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('categoria');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const filteredProducts = useMemo(() => {
    return (products as Product[]).filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <>
      <div className="space-y-6 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories as Category[]}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <ProductGrid products={filteredProducts} />
    </>
  );
}

function CatalogoFallback() {
  return (
    <div className="space-y-6 mb-8">
      <div className="h-12 bg-card rounded-lg animate-pulse" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-24 bg-card rounded-full animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] bg-card rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Catálogo</h1>

        <Suspense fallback={<CatalogoFallback />}>
          <CatalogoContent />
        </Suspense>
      </div>
    </div>
  );
}
