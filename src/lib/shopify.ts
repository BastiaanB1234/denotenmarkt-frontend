import { GraphQLClient } from 'graphql-request';

// Probeer beide manieren van environment variabelen
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '846acd8da631d118010f043cfb4333ac';
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || 'denotenmarkt.nl';

// Debug logging
console.log('=== SHOPIFY ENVIRONMENT VARIABLES DEBUG ===');
console.log('Store Domain:', SHOPIFY_STORE_DOMAIN);
console.log('Token exists:', !!SHOPIFY_STOREFRONT_ACCESS_TOKEN);
console.log('Token length:', SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length || 0);
console.log('Token preview:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? `${SHOPIFY_STOREFRONT_ACCESS_TOKEN.substring(0, 8)}...` : 'undefined');
console.log('Full token:', SHOPIFY_STOREFRONT_ACCESS_TOKEN);
console.log('==========================================');

// Maak een nieuwe GraphQL client alleen als de environment variables beschikbaar zijn
let shopifyClient: GraphQLClient | null = null;

if (SHOPIFY_STOREFRONT_ACCESS_TOKEN && SHOPIFY_STORE_DOMAIN) {
  // Debug deze waarden direct voor de client creatie
  console.log('About to create client with:', {
    storeDomain: SHOPIFY_STORE_DOMAIN,
    tokenExists: !!SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    tokenValue: SHOPIFY_STOREFRONT_ACCESS_TOKEN
  });

  try {
    console.log('Creating GraphQL client...');
    const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;
    console.log('GraphQL endpoint:', endpoint);
    
    shopifyClient = new GraphQLClient(endpoint, {
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
    });
    console.log('✅ GraphQL client created successfully');
  } catch (error) {
    console.error('❌ Error creating GraphQL client:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
  }
} else {
  console.log('❌ Shopify environment variables not configured');
  console.log('Store Domain:', SHOPIFY_STORE_DOMAIN);
  console.log('Access Token:', SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Present' : 'Missing');
}

export default shopifyClient;

// Eenvoudige shop query voor testing
export const GET_SHOP_INFO = `
  query GetShopInfo {
    shop {
      name
      description
      primaryDomain {
        url
        host
      }
    }
  }
`;

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
        }
      }
    }
  }
`;

// Helper functies voor API calls
export const getShopInfo = async () => {
  if (!shopifyClient) {
    console.log('❌ GraphQL client not configured - cannot get shop info');
    return null;
  }

  try {
    console.log('🔍 Testing shop query...');
    const response = await shopifyClient.request(GET_SHOP_INFO);
    console.log('✅ Shop API response:', response);
    return response.shop;
  } catch (error) {
    console.error('❌ Error fetching shop info:', error);
    return null;
  }
};

export const getProducts = async (first: number = 20, after?: string) => {
  if (!shopifyClient) {
    console.log('❌ GraphQL client not configured - using mock data');
    return null;
  }

  try {
    console.log('🔍 Testing products query...');
    const response = await shopifyClient.request(GET_PRODUCTS, { first, after });
    console.log('✅ Products API response:', response);
    return response.products;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return null;
  }
};

export const getProductByHandle = async (handle: string) => {
  if (!shopifyClient) {
    console.log('❌ GraphQL client not configured - using mock data');
    return null;
  }

  try {
    const response = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, { handle });
    return response.product;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    return null;
  }
};

export const getCollections = async (first: number = 10) => {
  if (!shopifyClient) {
    console.log('❌ GraphQL client not configured - using mock data');
    return null;
  }

  try {
    console.log('🔍 Testing collections query...');
    const response = await shopifyClient.request(GET_COLLECTIONS, { first });
    console.log('✅ Collections API response:', response);
    return response.collections;
  } catch (error) {
    console.error('❌ Error fetching collections:', error);
    return null;
  }
};
