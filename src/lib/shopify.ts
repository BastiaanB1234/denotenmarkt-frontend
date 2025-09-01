import { StorefrontApiClient } from '@shopify/storefront-api-client';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing Shopify environment variables');
}

// Maak een nieuwe Storefront API client
const shopifyClient = new StorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  apiVersion: '2024-01',
});

export default shopifyClient;

// GraphQL queries voor producten
export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        id
        name
        values
      }
    }
  }
`;

export const GET_COLLECTIONS = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            id
            url
            altText
          }
          productsCount
        }
      }
    }
  }
`;

// Helper functies voor API calls
export const getProducts = async (first: number = 20, after?: string) => {
  try {
    const response = await shopifyClient.query({
      query: GET_PRODUCTS,
      variables: { first, after },
    });
    return response.data?.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};

export const getProductByHandle = async (handle: string) => {
  try {
    const response = await shopifyClient.query({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    return response.data?.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const getCollections = async (first: number = 10) => {
  try {
    const response = await shopifyClient.query({
      query: GET_COLLECTIONS,
      variables: { first },
    });
    return response.data?.collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return null;
  }
};
