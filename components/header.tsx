'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: isSticky ? 'fixed' : 'relative',
      top: 0,
      width: '100%',
      zIndex: 40,
      borderBottom: `1px solid var(--color-smoke)`,
      backgroundColor: 'var(--surface-canvas)',
      transition: 'box-shadow var(--duration-fast) ease',
      boxShadow: isSticky ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
    }}>
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
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="hidden md:block text-xs focus:outline-none"
                style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--color-carbon)',
                  borderBottom: searchFocused ? `2px solid var(--color-carbon)` : `1px solid var(--color-ash-gray)`,
                  backgroundColor: 'transparent',
                  padding: '4px 0',
                  width: searchFocused ? '180px' : '120px',
                  transition: 'width var(--duration-fast) ease, border-color var(--duration-fast) ease',
                }}
              />
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Link */}
            <Link
              href="/cart"
              className="text-sm"
              style={{ fontSize: 'var(--text-caption)', color: 'var(--color-carbon)', textDecoration: 'none', transition: 'opacity var(--duration-fast) ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
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
      {isSticky && <div style={{ height: '60px' }} />}
    </header>
  );
}
