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
    <Link href={`/products/${product.handle}`}>
      <div className="group cursor-pointer rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.images.edges[0]?.node.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
            {product.title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">{formattedPrice}</span>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors">
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
