'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.edges[0]?.node.url || '/placeholder.jpg';
  const price = product.priceRange.minVariantPrice.amount;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode || 'USD',
  }).format(parseFloat(price));

  return (
    <Link href={`/products/${product.handle}`} style={{ textDecoration: 'none' }}>
      <div style={{ cursor: 'pointer', borderRadius: 0, border: 'none', overflow: 'hidden', backgroundColor: 'var(--surface-canvas)', transition: 'none' }}>
        {/* Image — Full bleed, no border, no shadow */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', backgroundColor: 'var(--surface-wash)', overflow: 'hidden' }}>
          <Image
            src={imageUrl}
            alt={product.images.edges[0]?.node.altText || product.title}
            fill
            style={{ objectFit: 'cover', borderRadius: 0 }}
            unoptimized
          />
        </div>

        {/* Caption — Below image, minimal */}
        <div style={{ paddingTop: 'var(--spacing-16)', paddingBottom: 'var(--spacing-24)' }}>
          <h3 style={{ fontSize: 'var(--text-caption)', fontWeight: 'var(--font-weight-regular)', color: 'var(--color-carbon)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 'var(--leading-body)' }}>
            {product.title}
          </h3>

          {/* Price */}
          <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-graphite)', marginTop: 'var(--spacing-8)', margin: 0 }}>
            {formattedPrice}
          </p>
        </div>
      </div>
    </Link>
  );
}
