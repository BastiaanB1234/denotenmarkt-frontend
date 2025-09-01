export interface ShopifyImage {
  id: string;
  url: string;
  altText?: string;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyPrice;
  maxVariantPrice: ShopifyPrice;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  availableForSale: boolean;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  priceRange: ShopifyPriceRange;
  variants: {
    edges: {
      node: ShopifyVariant;
    }[];
  };
  options?: {
    id: string;
    name: string;
    values: string[];
  }[];
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ShopifyImage;
  productsCount: number;
}

export interface ShopifyProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
  };
}

export interface CartItem {
  id: string;
  title: string;
  price: ShopifyPrice;
  quantity: number;
  image?: ShopifyImage;
  variantId: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
