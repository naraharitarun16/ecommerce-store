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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-12 text-white sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to StoreMart
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Discover amazing products in clothing, footwear, and electronics at unbeatable prices.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/category/clothing"
              className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Shop Clothing
            </Link>
            <Link
              href="/category/electronics"
              className="inline-block rounded-lg bg-blue-700 px-6 py-3 font-medium text-white hover:bg-blue-800 transition-colors border border-blue-600"
            >
              Explore Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link href="/category/clothing" className="group">
            <div className="rounded-lg bg-gray-100 p-8 text-center hover:bg-gray-200 transition-colors">
              <div className="text-4xl mb-2">👕</div>
              <h3 className="font-semibold text-gray-900">Clothing</h3>
              <p className="text-sm text-gray-600 mt-1">Men, Women & Kids</p>
            </div>
          </Link>
          <Link href="/category/footwear" className="group">
            <div className="rounded-lg bg-gray-100 p-8 text-center hover:bg-gray-200 transition-colors">
              <div className="text-4xl mb-2">👟</div>
              <h3 className="font-semibold text-gray-900">Footwear</h3>
              <p className="text-sm text-gray-600 mt-1">Shoes & Sandals</p>
            </div>
          </Link>
          <Link href="/category/electronics" className="group">
            <div className="rounded-lg bg-gray-100 p-8 text-center hover:bg-gray-200 transition-colors">
              <div className="text-4xl mb-2">💻</div>
              <h3 className="font-semibold text-gray-900">Electronics</h3>
              <p className="text-sm text-gray-600 mt-1">Mobiles & Gadgets</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}
        <ProductGrid products={products} isLoading={isLoading} />
      </section>
    </div>
  );
}
