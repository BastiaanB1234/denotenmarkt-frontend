import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Star, Clock, Users, Award } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts, getShopInfo } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';

export default async function HomePage() {
  const shopInfo = await getShopInfo();
  const productsData = await getProducts(6);
  const products = productsData?.edges?.map((edge: { node: ShopifyProduct }) => edge.node) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Mobile First */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with texture */}
                       <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-64 h-64 mx-auto rounded-2xl shadow-warm mb-6 bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-white/80 text-center">
                <Award className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Premium Noten</p>
              </div>
            </div>
          </div>
          
                           <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-6 leading-tight">
                   {shopInfo?.name || 'De Notenmarkt'}
                 </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            {shopInfo?.description || 'Premium noten, zaden en zuidvruchten. Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.'}
          </p>

                           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                   <Link href="/products">
                     <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50 border border-white/20">
                       <ShoppingBag className="mr-2 h-5 w-5" />
                       Bekijk Producten
                     </Button>
                   </Link>
                   <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/70 text-white hover:bg-white/20">
                     <Heart className="mr-2 h-5 w-5" />
                     Favorieten
                   </Button>
                 </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-3 gap-4 text-white/80">
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Premium Kwaliteit</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Vers Gebrand</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">+1000 Klanten</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
                           <div className="text-center mb-12">
                   <h2 className="text-2xl md:text-3xl font-display font-semibold text-ink mb-4">
                     Uitgelichte Producten
                   </h2>
                   <p className="text-ink/70 text-base max-w-2xl mx-auto">
                     Ontdek onze meest populaire noten en zuidvruchten, vers gebrand en klaar voor jou.
                   </p>
                 </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: ShopifyProduct, index: number) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted text-lg">
                <p>Geen producten gevonden in je Shopify store.</p>
              </div>
            </div>
          )}

                           {products.length > 0 && (
                   <div className="text-center mt-12">
                     <Link href="/products">
                       <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600">
                         Bekijk Alle Producten
                       </Button>
                     </Link>
                   </div>
                 )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                               <div className="text-center group">
                     <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                       <Award className="h-6 w-6 text-primary-500" />
                     </div>
                     <h3 className="text-lg font-display font-semibold text-ink mb-3">Vers Gebrand</h3>
                     <p className="text-ink/70 leading-relaxed text-sm">
                       Al onze noten worden vers gebrand voor de beste smaak en kwaliteit.
                     </p>
                   </div>

                   <div className="text-center group">
                     <div className="bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                       <Heart className="h-6 w-6 text-primary-600" />
                     </div>
                     <h3 className="text-lg font-display font-semibold text-ink mb-3">Gezond & Natuurlijk</h3>
                     <p className="text-ink/70 leading-relaxed text-sm">
                       100% natuurlijke producten zonder kunstmatige toevoegingen.
                     </p>
                   </div>

                   <div className="text-center group">
                     <div className="bg-primary-200/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                       <Clock className="h-6 w-6 text-primary-600" />
                     </div>
                     <h3 className="text-lg font-display font-semibold text-ink mb-3">Snelle Levering</h3>
                     <p className="text-ink/70 leading-relaxed text-sm">
                       Bestel vandaag en ontvang je producten binnen 1-2 werkdagen.
                     </p>
                   </div>
          </div>
        </div>
      </section>

                   {/* CTA Section */}
             <section className="bg-primary-300 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ink mb-6">
            Klaar om te beginnen?
          </h2>
          <p className="text-ink/80 text-lg mb-8 max-w-2xl mx-auto">
            Ontdek onze uitgebreide collectie van premium noten en zuidvruchten. 
            Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-400 text-primary-700 hover:bg-primary-100">
                Bekijk Producten
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-primary-500 text-white hover:bg-primary-600">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
