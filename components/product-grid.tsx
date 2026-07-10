'use client';

import { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--spacing-48)' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ aspectRatio: '3/4', backgroundColor: 'var(--surface-wash)', borderRadius: 0, animation: 'pulse 2s infinite' }} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ paddingTop: 'var(--spacing-48)', paddingBottom: 'var(--spacing-48)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-graphite)' }}>No products found</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--spacing-48)' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
