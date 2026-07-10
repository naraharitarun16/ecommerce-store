'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getProducts } from '@/lib/shopify';
import { ProductGrid } from '@/components/product-grid';
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-72)' }}>
      {/* Category Section — Editorial Hero Tiles */}
      <section>
        <h2 style={{ fontSize: 'var(--text-heading-lg)', fontWeight: 'var(--font-weight-regular)', textAlign: 'center', marginBottom: 'var(--spacing-48)', color: 'var(--color-carbon)' }}>
          Choose Your Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-24)' }}>
          {['clothing', 'footwear', 'electronics'].map((cat) => (
            <Link key={cat} href={`/category/${cat}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: 'var(--surface-wash)', padding: 'var(--spacing-48)', textAlign: 'center', borderRadius: 0, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-divider)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-wash)'}>
                <h3 style={{ fontSize: 'var(--text-heading-sm)', fontWeight: 'var(--font-weight-regular)', color: 'var(--color-carbon)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {cat}
                </h3>
                <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-graphite)', marginTop: 'var(--spacing-8)' }}>
                  Discover our collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 style={{ fontSize: 'var(--text-heading-lg)', fontWeight: 'var(--font-weight-regular)', textAlign: 'center', marginBottom: 'var(--spacing-48)', color: 'var(--color-carbon)' }}>
          Featured Products
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
