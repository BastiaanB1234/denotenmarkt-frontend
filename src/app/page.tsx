import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { getProducts, getShopInfo } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';

export default async function HomePage() {
  // Haal echte data op van Shopify
  const shopInfo = await getShopInfo();
  const productsData = await getProducts(4); // Toon 4 producten op homepage

  const products = productsData?.edges?.map((edge: { node: ShopifyProduct }) => edge.node) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container-max section-padding relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-balance animate-slide-up">
              {shopInfo?.name || 'De Notenmarkt'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white/90 animate-slide-up">
              {shopInfo?.description || 'Premium noten, zaden en zuidvruchten. Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/products" className="btn-primary">
                Bekijk Producten
              </Link>
              <Link href="/cart" className="btn-secondary">
                Winkelwagen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-ink mb-4 text-balance">
              Uitgelichte Producten
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Ontdek onze meest populaire noten en zuidvruchten, vers gebrand en klaar voor jou.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {products.length > 0 && (
            <div className="text-center mt-16">
              <Link href="/products" className="btn-primary">
                Bekijk Alle Producten
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-ink mb-3">Vers Gebrand</h3>
              <p className="text-muted leading-relaxed">Al onze noten worden vers gebrand voor de beste smaak en kwaliteit.</p>
            </div>

            <div className="text-center group">
              <div className="bg-accent/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-ink mb-3">Gezond & Natuurlijk</h3>
              <p className="text-muted leading-relaxed">100% natuurlijke producten zonder kunstmatige toevoegingen.</p>
            </div>

            <div className="text-center group">
              <div className="bg-primary-300/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-ink mb-3">Snelle Levering</h3>
              <p className="text-muted leading-relaxed">Bestel vandaag en ontvang je producten binnen 1-2 werkdagen.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
