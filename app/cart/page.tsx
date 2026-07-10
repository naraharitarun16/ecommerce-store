'use client';

import Link from 'next/link';

export default function CartPage() {
  // Cart functionality would be implemented here with state management
  // For MVP, showing empty cart

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Start shopping to add items to your cart</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 h-fit sticky top-24">
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>$0.00</span>
            </div>
          </div>

          <button
            disabled
            className="mt-6 w-full rounded-lg bg-gray-400 px-4 py-3 font-medium text-white cursor-not-allowed"
          >
            Proceed to Checkout
          </button>

          <Link
            href="/"
            className="mt-3 block text-center text-sm text-blue-600 hover:text-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <span>Secure checkout with Shopify</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <span>Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">↩️</span>
            <span>Easy 30-day returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
