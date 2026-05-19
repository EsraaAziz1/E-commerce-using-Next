// src/app/page.tsx
import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import CategoriesList from "@/components/categoriesList";
import FeaturedProducts from "@/components/FeaturedProducts";
import Spinner from "@/components/spinner";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <Suspense fallback={<Spinner />}>
          <CategoriesList />
        </Suspense>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <FeaturedProducts />
      </section>
    </div>
  );
}