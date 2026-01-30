import Hero from '@/components/home/Hero';
import CategoryCard from '@/components/home/CategoryCard';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import categories from '@/data/categories.json';
import { Category } from '@/types';

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(categories as Category[]).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />
    </>
  );
}
