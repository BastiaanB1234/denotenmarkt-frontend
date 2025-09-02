import React from 'react';

export default function DebugShopifyPage() {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const testDomains = [
    'denotenmarkt.nl',
    'denotenmarkt.myshopify.com',
    'www.denotenmarkt.nl'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopify Debug</h1>
        
        {/* Environment Variables */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <div>
              <strong>Store Domain:</strong> {storeDomain || 'Niet geconfigureerd'}
            </div>
            <div>
              <strong>Access Token:</strong> {accessToken ? 'Geconfigureerd' : 'Niet geconfigureerd'}
            </div>
          </div>
        </div>

        {/* Test Domains */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Domains</h2>
          <p className="text-gray-600 mb-4">
            Probeer deze store domains in je .env.local bestand:
          </p>
          <div className="space-y-2">
            {testDomains.map((domain, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN={domain}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Instructies</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Open je <code>.env.local</code> bestand</li>
            <li>Vervang de store domain met een van de bovenstaande opties</li>
            <li>Herstart je development server: <code>npm run dev</code></li>
            <li>Ga naar <code>/test-shopify</code> om te testen</li>
            <li>Als het werkt, zie je je producten en collecties</li>
          </ol>
        </div>

        {/* Current Configuration */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Huidige Configuratie</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm overflow-auto">
{`# Shopify Storefront API Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=${storeDomain || 'your-store-domain'}
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=${accessToken ? '846acd8da631d118010f043cfb4333ac' : 'your-access-token'}

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
