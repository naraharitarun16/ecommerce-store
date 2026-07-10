'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/animations';

const lookbookItems = [
  {
    id: 1,
    title: 'Urban Essentials',
    description: 'Timeless pieces for the modern wardrobe. Mix comfort with style.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop',
    products: [
      { name: 'Classic Tee', price: '$45' },
      { name: 'Tailored Blazer', price: '$185' },
      { name: 'Minimalist Watch', price: '$120' },
    ],
  },
  {
    id: 2,
    title: 'Weekend Getaway',
    description: 'Effortless elegance for your next escape. Versatile and sophisticated.',
    image: 'https://images.unsplash.com/photo-1595607774223-ef52624120d2?w=600&h=700&fit=crop',
    products: [
      { name: 'Linen Shirt', price: '$89' },
      { name: 'Wide Leg Trousers', price: '$125' },
      { name: 'Leather Sandals', price: '$95' },
    ],
  },
];

export function Lookbook() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} style={{ marginBottom: 'var(--spacing-72)' }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-heading-lg)', fontWeight: 400, textAlign: 'center', marginBottom: 'var(--spacing-72)', color: 'var(--color-carbon)', letterSpacing: '-0.02em' }}>
        Featured Stories
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-72)' }}>
        {lookbookItems.map((item, idx) => (
          <div
            key={item.id}
            style={{
              display: 'grid',
              gridTemplateColumns: idx % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: 'var(--spacing-48)',
              alignItems: 'center',
              animation: `fadeInUp calc(var(--duration-base) + ${idx * 100}ms) var(--easing-out)`,
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', order: idx % 2 === 0 ? 0 : 1 }}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>

            {/* Content */}
            <div style={{ order: idx % 2 === 0 ? 1 : 0 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--color-carbon)', margin: 0, marginBottom: 'var(--spacing-16)' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-graphite)', marginBottom: 'var(--spacing-24)', lineHeight: 'var(--leading-body)' }}>
                {item.description}
              </p>

              {/* Product Picks */}
              <div style={{ marginBottom: 'var(--spacing-24)' }}>
                <p style={{ fontSize: 'var(--text-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-carbon)', marginBottom: 'var(--spacing-16)', margin: 0 }}>
                  Styled With
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
                  {item.products.map((product, pidx) => (
                    <li key={pidx} style={{ fontSize: 'var(--text-caption)', color: 'var(--color-graphite)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{product.name}</span>
                      <span>{product.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/category/clothing" style={{ display: 'inline-block' }}>
                <button style={{ padding: '10px 24px', fontSize: 'var(--text-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'var(--color-carbon)', color: 'var(--surface-canvas)', border: 'none', cursor: 'pointer', transition: 'all var(--duration-fast) ease' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                  Shop Look
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
