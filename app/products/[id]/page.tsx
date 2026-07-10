'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { getProductByHandle } from '@/lib/shopify';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ZoomGallery } from '@/components/zoom-gallery';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const data = await getProductByHandle(id);
        if (data?.productByHandle) {
          setProduct(data.productByHandle);
        }
      } catch (error) {
        console.error('[v0] Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div className="py-12 text-center">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
          Back to store
        </Link>
      </div>
    );
  }

  const price = product.priceRange.minVariantPrice.amount;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode || 'USD',
  }).format(parseFloat(price));

  const imageUrl = product.images.edges[selectedImage]?.node.url || '/placeholder.jpg';

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        {' / '}
        <span className="text-gray-900">{product.title}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-48)' }}>
        {/* Image Gallery with Zoom */}
        <div>
          <ZoomGallery
            images={product.images.edges.map((edge) => ({
              url: edge.node.url,
              altText: edge.node.altText || product.title,
            }))}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="mt-2 text-2xl font-bold text-blue-600">{formattedPrice}</p>
          </div>

          <div className="space-y-4 border-t border-b border-gray-200 py-4">
            <div>
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600 line-clamp-4">{product.description}</p>
            </div>
          </div>

          {/* Variants */}
          {product.variants?.edges && product.variants.edges.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900">Variants</h3>
              <div className="mt-3 space-y-2">
                {product.variants.edges.map((edge) => (
                  <div key={edge.node.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={edge.node.id}
                      name="variant"
                      className="h-4 w-4"
                    />
                    <label htmlFor={edge.node.id} className="text-sm text-gray-700">
                      {edge.node.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>

          {/* More Info */}
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Easy returns within 30 days</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Secure checkout with Shopify</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
