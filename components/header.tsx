'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded"></div>
            <span className="text-xl font-semibold text-gray-900">StoreMart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/category/clothing" className="text-sm text-gray-700 hover:text-gray-900">
              Clothing
            </Link>
            <Link href="/category/footwear" className="text-sm text-gray-700 hover:text-gray-900">
              Footwear
            </Link>
            <Link href="/category/electronics" className="text-sm text-gray-700 hover:text-gray-900">
              Electronics
            </Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="hidden md:block px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 w-48"
            />
            <Link
              href="/cart"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              🛒 Cart
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
            <Link href="/category/clothing" className="text-sm text-gray-700 hover:text-gray-900">
              Clothing
            </Link>
            <Link href="/category/footwear" className="text-sm text-gray-700 hover:text-gray-900">
              Footwear
            </Link>
            <Link href="/category/electronics" className="text-sm text-gray-700 hover:text-gray-900">
              Electronics
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
