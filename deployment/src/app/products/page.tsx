import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts } from '@/lib/shopify';

export default async function ProductsPage() {
  // Haal echte producten op van Shopify
  const productsData = await getProducts(20);
  
  // Gebruik echte producten of fallback naar mock data
  const products = productsData?.edges?.map(edge => edge.node) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Onze Producten
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ontdek onze selectie van premium noten, zaden en zuidvruchten. 
            Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {productsData ? (
                <p>Geen producten gevonden in je Shopify store.</p>
              ) : (
                <p>Laden van producten...</p>
              )}
            </div>
          </div>
        )}

        {productsData?.pageInfo?.hasNextPage && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Meer Producten Laden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
