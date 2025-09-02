'use client';

import React, { useEffect, useState } from 'react';
import { getShopInfo, getProducts, getCollections } from '@/lib/shopify';
import { ShopifyShop, ShopifyProduct, ShopifyCollection } from '@/types/shopify';

export default function TestShopifyPage() {
  const [shopInfo, setShopInfo] = useState<ShopifyShop | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testShopifyAPI = async () => {
      try {
        setLoading(true);
        setError(null);

        // Test shop info
        const shop = await getShopInfo();
        setShopInfo(shop);

        // Test products
        const productsData = await getProducts(5);
        if (productsData?.edges) {
          setProducts(productsData.edges.map(edge => edge.node));
        }

        // Test collections
        const collectionsData = await getCollections(5);
        if (collectionsData?.edges) {
          setCollections(collectionsData.edges.map(edge => edge.node));
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Onbekende fout');
      } finally {
        setLoading(false);
      }
    };

    testShopifyAPI();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Shopify API testen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopify API Test</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Shop Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shop Informatie</h2>
          {shopInfo ? (
            <div className="space-y-2">
              <p><strong>Naam:</strong> {shopInfo.name}</p>
              <p><strong>Beschrijving:</strong> {shopInfo.description}</p>
              <p><strong>Domein:</strong> {shopInfo.primaryDomain.host}</p>
            </div>
          ) : (
            <p className="text-gray-500">Geen shop informatie beschikbaar</p>
          )}
        </div>

        {/* Products */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Producten ({products.length})</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-blue-600 font-medium">
                    €{product.priceRange.minVariantPrice.amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Geen producten gevonden</p>
          )}
        </div>

        {/* Collections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Collecties ({collections.length})</h2>
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((collection) => (
                <div key={collection.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{collection.title}</h3>
                  <p className="text-sm text-gray-600">{collection.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Geen collecties gevonden</p>
          )}
        </div>
      </div>
    </div>
  );
}
