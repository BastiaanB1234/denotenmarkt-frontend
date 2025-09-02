import React from 'react';
import { getProducts, getCollections, getShopInfo } from '@/lib/shopify';

export default async function TestApiPage() {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Test de API direct
  let shopResult = null;
  let productsResult = null;
  let collectionsResult = null;
  let apiError = null;

  try {
    // Test eerst de eenvoudige shop query
    shopResult = await getShopInfo();
    productsResult = await getProducts(5);
    collectionsResult = await getCollections(5);
  } catch (error) {
    apiError = error;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Configuratie Test</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-4">
            <div>
              <strong>Store Domain:</strong> 
              <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                {storeDomain || 'Niet geconfigureerd'}
              </span>
            </div>
            <div>
              <strong>Access Token:</strong> 
              <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded">
                {accessToken ? `${accessToken.substring(0, 8)}...` : 'Niet geconfigureerd'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API URL Test</h2>
          <p className="text-gray-600 mb-4">
            De Shopify API URL zou moeten zijn:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <code className="text-sm">
              https://{storeDomain}/api/2025-01/graphql.json
            </code>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API Test Resultaten</h2>
          
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-red-900 mb-2">API Error:</h3>
              <pre className="text-sm text-red-800 bg-red-100 p-3 rounded overflow-auto">
                {JSON.stringify(apiError, null, 2)}
              </pre>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shop Info Test:</h3>
              {shopResult ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">✅ Shop info succesvol opgehaald!</p>
                  <div className="mt-3">
                    <p className="text-green-700 text-sm font-semibold">Shop Details:</p>
                    <pre className="text-xs bg-green-100 p-2 rounded mt-1 overflow-auto">
                      {JSON.stringify(shopResult, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">⚠️ Shop info niet gevonden of API error</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Producten Test:</h3>
              {productsResult ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">✅ Producten succesvol opgehaald!</p>
                  <p className="text-green-700 text-sm mt-2">
                    Aantal producten: {productsResult.edges?.length || 0}
                  </p>
                  {productsResult.edges && productsResult.edges.length > 0 && (
                    <div className="mt-3">
                      <p className="text-green-700 text-sm font-semibold">Eerste product:</p>
                      <pre className="text-xs bg-green-100 p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(productsResult.edges[0].node, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">⚠️ Geen producten gevonden of API error</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Collecties Test:</h3>
              {collectionsResult ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">✅ Collecties succesvol opgehaald!</p>
                  <p className="text-green-700 text-sm mt-2">
                    Aantal collecties: {collectionsResult.edges?.length || 0}
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">⚠️ Geen collecties gevonden of API error</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Volgende Stappen</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Controleer of je store domain correct is</li>
            <li>Controleer of je access token geldig is</li>
            <li>Voeg producten toe aan je Shopify store</li>
            <li>Test de API verbinding</li>
          </ol>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">Mogelijke Oplossingen</h2>
          <div className="space-y-2 text-yellow-800">
            <p><strong>1. Store Domain:</strong> Probeer deze opties:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><code>denotenmarkt.myshopify.com</code></li>
              <li><code>www.denotenmarkt.nl</code></li>
              <li><code>denotenmarkt.nl</code></li>
            </ul>
            <p><strong>2. Access Token:</strong> Controleer of de token nog geldig is</p>
            <p><strong>3. Producten:</strong> Voeg producten toe aan je Shopify store</p>
          </div>
        </div>
      </div>
    </div>
  );
}
