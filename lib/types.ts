export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText?: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  priceV2: Money;
  availableForSale: boolean;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice?: Money;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  image?: Image;
}

export interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
  title: string;
  price: string;
  image?: string;
}
