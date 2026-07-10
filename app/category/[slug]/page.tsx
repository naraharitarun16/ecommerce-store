'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { getProductsByCollection } from '@/lib/shopify';
import { ProductGrid } from '@/components/product-grid';
import { useParams } from 'next/navigation';

const categoryMap: Record<string, string> = {
  clothing: 'clothing',
  footwear: 'footwear',
  electronics: 'electronics',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
  const collectionHandle = categoryMap[slug] || slug;

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const data = await getProductsByCollection(collectionHandle, 50);
        if (data?.collectionByHandle?.products?.edges) {
          let productList = data.collectionByHandle.products.edges.map((edge: any) => edge.node);

          // Filter by price
          productList = productList.filter((p: Product) => {
            const price = parseFloat(p.priceRange.minVariantPrice.amount);
            return price >= priceRange[0] && price <= priceRange[1];
          });

          // Sort
          if (sortBy === 'price-low') {
            productList.sort(
              (a: Product, b: Product) =>
                parseFloat(a.priceRange.minVariantPrice.amount) -
                parseFloat(b.priceRange.minVariantPrice.amount)
            );
          } else if (sortBy === 'price-high') {
            productList.sort(
              (a: Product, b: Product) =>
                parseFloat(b.priceRange.minVariantPrice.amount) -
                parseFloat(a.priceRange.minVariantPrice.amount)
            );
          }

          setProducts(productList);
        }
      } catch (error) {
        console.error('[v0] Error fetching category products:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [collectionHandle, sortBy, priceRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
        <p className="mt-2 text-gray-600">Browse our {categoryTitle.toLowerCase()} collection</p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-1 block rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Price range</label>
            <input
              type="range"
              min="0"
              max="100000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="mt-1 block w-full sm:w-32"
            />
            <p className="mt-1 text-xs text-gray-600">Up to ${priceRange[1].toLocaleString()}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600">{products.length} products</p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} isLoading={isLoading} />
    </div>
  );
}
