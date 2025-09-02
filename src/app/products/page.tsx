import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';

export default async function ProductsPage() {
  // Haal echte producten op van Shopify
  const productsData = await getProducts(20);
  
  // Gebruik echte producten of fallback naar mock data
  const products = productsData?.edges?.map((edge: { node: ShopifyProduct }) => edge.node) || [];

  return (
    <div className="min-h-screen">
      <div className="container-max section-padding">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-ink mb-6 text-balance">Alle Producten</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Ontdek onze uitgebreide collectie van premium noten, zaden en zuidvruchten. 
            Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: ShopifyProduct, index: number) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted text-lg">
              {productsData ? (
                <p>Geen producten gevonden in je Shopify store.</p>
              ) : (
                <p>Laden van producten...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
