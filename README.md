# StoreMart - Ecommerce Store

A modern, minimal Flipkart-style ecommerce storefront built with Next.js 16, TypeScript, and Shopify Storefront API.

## Features

- **Product Catalog**: Browse products across Clothing, Footwear, and Electronics categories
- **Modern UI**: Clean, minimal design with responsive layouts
- **Product Filtering**: Filter by price range and sort options
- **Product Details**: Detailed product pages with images, descriptions, and variants
- **Dynamic Data**: Real-time product data from Shopify
- **Mobile Responsive**: Fully responsive design for all devices
- **Fast Performance**: Optimized images and lazy loading

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Shopify Storefront API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Shopify Store with Storefront API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/naraharitarun16/ecommerce-store.git
cd ecommerce-store
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Shopify credentials:
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

## Project Structure

```
ecommerce-store/
├── app/
│   ├── page.tsx              # Homepage with featured products
│   ├── layout.tsx            # Root layout with header & footer
│   ├── globals.css           # Global styles
│   ├── cart/page.tsx         # Shopping cart page
│   ├── category/
│   │   └── [slug]/page.tsx   # Category pages (Clothing, Footwear, Electronics)
│   └── products/
│       └── [id]/page.tsx     # Product detail page
├── components/
│   ├── header.tsx            # Main navigation header
│   ├── product-card.tsx      # Individual product card
│   └── product-grid.tsx      # Grid of product cards
├── lib/
│   ├── shopify.ts            # Shopify API client
│   └── types.ts              # TypeScript type definitions
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Key Pages

- **Homepage** (`/`) - Hero section with category highlights and featured products
- **Category** (`/category/clothing`, `/category/footwear`, `/category/electronics`) - Filtered product listings
- **Product Detail** (`/products/[id]`) - Full product information with images and variants
- **Cart** (`/cart`) - Shopping cart management

## API Integration

The store uses Shopify Storefront GraphQL API for:
- Fetching all products
- Fetching products by collection/category
- Searching products
- Getting product details with variants

All API calls are made from the `lib/shopify.ts` file.

## Styling

Uses Tailwind CSS v4 with:
- Clean white/gray color palette
- Blue accent color (#1890FF) for calls-to-action
- Modern minimal aesthetic
- Smooth transitions and hover effects
- Mobile-first responsive design

## Performance

- Static page generation where possible
- Image optimization with Next.js Image component
- Lazy loading for product images
- Optimized bundle size
- CSS pruning with Tailwind

## Development

### Run dev server:
```bash
pnpm dev
```

### Build for production:
```bash
pnpm build
pnpm start
```

### Type check:
```bash
pnpm exec tsc --noEmit
```

### Lint:
```bash
pnpm lint
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git push origin main
```

2. Import the repository into Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select the `ecommerce-store` repository
   - Add environment variables
   - Deploy

The store will be live at `your-domain.vercel.app`

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., shop.myshopify.com)
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Shopify Storefront API access token

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
