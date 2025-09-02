'use client';

import React, { useEffect, useState } from 'react';
import { getShopInfo } from '@/lib/shopify';
import { ShopifyShop } from '@/types/shopify';

export default function DebugShopifyPage() {
  const [shopInfo, setShopInfo] = useState<ShopifyShop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const debugShopify = async () => {
      try {
        setLoading(true);
        setError(null);

        const shop = await getShopInfo();
        setShopInfo(shop);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Onbekende fout');
      } finally {
        setLoading(false);
      }
    };

    debugShopify();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Shopify debuggen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopify Debug</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Shop Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shop Informatie</h2>
          {shopInfo ? (
            <div className="space-y-2">
              <p><strong>Naam:</strong> {shopInfo.name}</p>
              <p><strong>Beschrijving:</strong> {shopInfo.description}</p>
              <p><strong>Domein:</strong> {shopInfo.primaryDomain.host}</p>
              <p><strong>URL:</strong> {shopInfo.primaryDomain.url}</p>
            </div>
          ) : (
            <p className="text-gray-500">Geen shop informatie beschikbaar</p>
          )}
        </div>
      </div>
    </div>
  );
}
