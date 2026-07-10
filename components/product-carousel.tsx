'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useScrollReveal } from '@/lib/animations';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

export function ProductCarousel({ products, title = 'Featured Products' }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const ref = useScrollReveal();

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 100);
    }
  };

  return (
    <section ref={ref} style={{ marginBottom: 'var(--spacing-72)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-heading-lg)', fontWeight: 400, textAlign: 'center', marginBottom: 'var(--spacing-48)', color: 'var(--color-carbon)', letterSpacing: '-0.02em' }}>
        {title}
      </h2>

      <div style={{ position: 'relative' }}>
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          style={{ display: 'flex', gap: 'var(--spacing-24)', overflowX: 'auto', scrollBehavior: 'smooth', paddingBottom: 'var(--spacing-24)', scrollbarWidth: 'none' }}
        >
          {products.map((product) => {
            const imageUrl = product.images.edges[0]?.node.url || '/placeholder.jpg';
            const price = product.priceRange.minVariantPrice.amount;
            const formattedPrice = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: product.priceRange.minVariantPrice.currencyCode || 'USD',
            }).format(parseFloat(price));

            return (
              <Link key={product.id} href={`/products/${product.handle}`} style={{ flexShrink: 0, width: '280px', textDecoration: 'none' }}>
                <div style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', backgroundColor: 'var(--surface-wash)', overflow: 'hidden', marginBottom: 'var(--spacing-16)' }}>
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      fill
                      style={{ objectFit: 'cover', transition: 'transform var(--duration-slow) ease' }}
                      unoptimized
                    />
                  </div>
                  <h3 style={{ fontSize: 'var(--text-caption)', fontWeight: 400, color: 'var(--color-carbon)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 'var(--leading-body)' }}>
                    {product.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-graphite)', marginTop: 'var(--spacing-8)', margin: 0 }}>
                    {formattedPrice}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            style={{ position: 'absolute', left: '-50px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--color-carbon)', opacity: 0.6, transition: 'opacity var(--duration-fast)' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            ←
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            style={{ position: 'absolute', right: '-50px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--color-carbon)', opacity: 0.6, transition: 'opacity var(--duration-fast)' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            →
          </button>
        )}
      </div>

      <style jsx>{`
        div[style*="overflowX"] {
          -ms-overflow-style: none;
        }
        div[style*="overflowX"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
