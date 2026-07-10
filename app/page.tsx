'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/shopify';
import { ProductGrid } from '@/components/product-grid';
import { HeroSection } from '@/components/hero-section';
import { FeaturedCollections } from '@/components/featured-collections';
import { ProductCarousel } from '@/components/product-carousel';
import { Lookbook } from '@/components/lookbook';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProducts(12);
        if (data?.products?.edges) {
          const productList = data.products.edges.map((edge: any) => edge.node);
          setProducts(productList);
        }
      } catch (err) {
        console.error('[v0] Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const carouselProducts = products.slice(0, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Editorial Hero Section */}
      <HeroSection />

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Featured Products Carousel */}
      {carouselProducts.length > 0 && <ProductCarousel products={carouselProducts} title="New Arrivals" />}

      {/* Lookbook / Styled Outfits */}
      <Lookbook />

      {/* Grid of All Products */}
      <section>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-heading-lg)', fontWeight: 'var(--font-weight-regular)', textAlign: 'center', marginBottom: 'var(--spacing-48)', color: 'var(--color-carbon)', letterSpacing: '-0.02em', animation: 'fadeInUp var(--duration-base) var(--easing-out)' }}>
          All Products
        </h2>
        {error && (
          <div style={{ padding: 'var(--spacing-24)', marginBottom: 'var(--spacing-24)', borderTop: `1px solid var(--color-smoke)`, borderBottom: `1px solid var(--color-smoke)`, color: 'var(--color-graphite)', fontSize: 'var(--text-caption)' }}>
            {error}
          </div>
        )}
        <ProductGrid products={products} isLoading={isLoading} />
      </section>
    </div>
  );
}
