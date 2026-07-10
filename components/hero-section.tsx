'use client';

import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '400px', overflow: 'hidden', marginBottom: 'var(--spacing-72)' }}>
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1595777707802-14b0fb8ce3c1?w=1600&h=900&fit=crop"
        alt="Hero Fashion"
        fill
        style={{ objectFit: 'cover' }}
        priority
        unoptimized
      />

      {/* Dark Gradient Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)' }} />

      {/* Content Overlay — Centered */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-24)', animation: 'fadeIn var(--duration-base) var(--easing-out)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', fontWeight: 400, color: '#ffffff', textAlign: 'center', margin: 0, lineHeight: 1.1, maxWidth: '90%', letterSpacing: '-0.02em' }}>
          Discover Curated Collections
        </h1>
        <p style={{ color: '#ffffff', marginTop: 'var(--spacing-24)', fontSize: 'var(--text-body)', fontWeight: 300 }}>
          Luxury fashion and lifestyle curated for you
        </p>
        <Link href="/category/clothing" style={{ marginTop: 'var(--spacing-48)' }}>
          <button style={{ padding: '12px 32px', fontSize: 'var(--text-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: '#ffffff', color: '#222222', border: 'none', cursor: 'pointer', transition: 'all var(--duration-fast) ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6e6e6'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
            Explore Now
          </button>
        </Link>
      </div>
    </section>
  );
}
