'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-[#e6e6e6] bg-white" style={{ borderColor: 'var(--color-smoke)' }}>
      <div className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8" style={{ maxWidth: 'var(--page-max-width)' }}>
        <div className="flex items-center justify-between gap-8">
          {/* Left: Category Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/category/clothing"
              className="text-xs uppercase font-regular tracking-wide"
              style={{ fontSize: 'var(--text-caption)', fontWeight: 'var(--font-weight-regular)', color: 'var(--color-carbon)' }}
            >
              Women · Men · Kids
            </Link>
          </nav>

          {/* Center: Wordmark */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight flex-shrink-0"
            style={{ fontSize: 'var(--text-heading-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-carbon)', letterSpacing: '0.1em' }}
          >
            MYSHOPPY
          </Link>

          {/* Right: Utility Icons & Search */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search"
              className="hidden md:block text-xs focus:outline-none"
              style={{
                fontSize: 'var(--text-caption)',
                color: 'var(--color-carbon)',
                borderBottom: `1px solid var(--color-ash-gray)`,
                backgroundColor: 'transparent',
                padding: '4px 0',
                width: '120px'
              }}
            />
            
            {/* Cart Link */}
            <Link
              href="/cart"
              className="text-sm"
              style={{ fontSize: 'var(--text-caption)', color: 'var(--color-carbon)', textDecoration: 'none' }}
            >
              CART
            </Link>
          </div>

          {/* Mobile Menu - Simplified */}
          <nav className="md:hidden flex gap-4 text-xs uppercase" style={{ fontSize: 'var(--text-caption)' }}>
            <Link href="/category/clothing" style={{ color: 'var(--color-carbon)' }}>Shop</Link>
            <Link href="/cart" style={{ color: 'var(--color-carbon)' }}>Cart</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
