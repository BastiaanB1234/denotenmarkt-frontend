import React from 'react';
import { getProducts, getCollections } from '@/lib/shopify';

export default async function TestShopifyPage() {
  let productsData = null;
  let collectionsData = null;
  let error = null;

  try {
    // Test producten ophalen
    productsData = await getProducts(5);
    
    // Test collecties ophalen
    collectionsData = await getCollections(5);
  } catch (err) {
    error = err;
    console.error('Shopify API Error:', err);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopify API Test</h1>
        
        {/* Environment Variables Check */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <div>
              <strong>Store Domain:</strong> {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'Niet geconfigureerd'}
            </div>
            <div>
              <strong>Access Token:</strong> {process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'Geconfigureerd' : 'Niet geconfigureerd'}
            </div>
          </div>
        </div>

        {/* API Test Results */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API Test Results</h2>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold mb-2">Error:</h3>
              <pre className="text-red-700 text-sm overflow-auto">{JSON.stringify(error, null, 2)}</pre>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Producten ({productsData?.edges?.length || 0})</h3>
                {productsData?.edges ? (
                  <div className="space-y-2">
                    {productsData.edges.map((edge: any, index: number) => (
                      <div key={edge.node.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium">{edge.node.title}</div>
                        <div className="text-sm text-gray-600">Handle: {edge.node.handle}</div>
                        <div className="text-sm text-gray-600">
                          Prijs: {edge.node.priceRange.minVariantPrice.amount} {edge.node.priceRange.minVariantPrice.currencyCode}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Geen producten gevonden</p>
                )}
              </div>

              {/* Collections */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Collecties ({collectionsData?.edges?.length || 0})</h3>
                {collectionsData?.edges ? (
                  <div className="space-y-2">
                    {collectionsData.edges.map((edge: any, index: number) => (
                      <div key={edge.node.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium">{edge.node.title}</div>
                        <div className="text-sm text-gray-600">Handle: {edge.node.handle}</div>
                        <div className="text-sm text-gray-600">Producten: {edge.node.productsCount}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Geen collecties gevonden</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Raw Data */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Raw API Response</h2>
          <div className="bg-gray-100 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm">
              {JSON.stringify({ products: productsData, collections: collectionsData }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
