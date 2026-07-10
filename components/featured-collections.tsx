'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/animations';

const collections = [
  {
    title: 'Women',
    description: 'Contemporary elegance',
    image: 'https://images.unsplash.com/photo-1595777707802-14b0fb8ce3c1?w=600&h=450&fit=crop',
    slug: 'clothing',
  },
  {
    title: 'Men',
    description: 'Refined style',
    image: 'https://images.unsplash.com/photo-1595848212624-e90b1e38b5f5?w=600&h=450&fit=crop',
    slug: 'clothing',
  },
  {
    title: 'Accessories',
    description: 'Perfect finishing touches',
    image: 'https://images.unsplash.com/photo-1560343090-b0cea6dc4d0d?w=600&h=450&fit=crop',
    slug: 'footwear',
  },
];

export function FeaturedCollections() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} style={{ marginBottom: 'var(--spacing-72)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-heading-lg)', fontWeight: 400, textAlign: 'center', marginBottom: 'var(--spacing-48)', color: 'var(--color-carbon)', letterSpacing: '-0.02em' }}>
        Featured Collections
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-48)' }}>
        {collections.map((collection, idx) => (
          <Link key={collection.slug + idx} href={`/category/${collection.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', animation: `fadeInUp calc(var(--duration-base) + ${idx * 50}ms) var(--easing-out)` }}>
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                style={{ objectFit: 'cover', transition: 'transform var(--duration-slow) ease' }}
                unoptimized
              />

              {/* Overlay on Hover */}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity var(--duration-fast) ease' }} className="collection-overlay" />

              {/* Text */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, margin: 0, marginBottom: 'var(--spacing-8)' }}>
                  {collection.title}
                </h3>
                <p style={{ fontSize: 'var(--text-caption)', fontWeight: 300, margin: 0 }}>
                  {collection.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        :hover > :first-child .collection-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
