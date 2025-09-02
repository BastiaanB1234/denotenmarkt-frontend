import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Star, Clock, Users, Award, Leaf, Truck } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts, getShopInfo } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';

export default async function HomePage() {
  const shopInfo = await getShopInfo();
  const productsData = await getProducts(6);
  const products = productsData?.edges?.map((edge: { node: ShopifyProduct }) => edge.node) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Ambachtelijke Stijl */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with wooden texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0zm0 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto rounded-full shadow-glow mb-8 bg-white/15 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
              <div className="text-white text-center">
                <Award className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm font-handwriting text-accent-200">Sinds 1952</p>
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-7xl font-display font-medium text-white mb-6 leading-tight">
            {shopInfo?.name || 'De Notenmarkt'}
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl font-handwriting text-accent-200 mb-4">
            Vers gebrand, zorgvuldig geselecteerd
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            {shopInfo?.description || 'Premium noten, zaden en zuidvruchten. Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto bg-accent-400 text-white hover:bg-accent-500 shadow-glow hover:shadow-glow transform hover:scale-105 transition-all duration-300">
                <ShoppingBag className="mr-3 h-6 w-6" />
                Ontdek Onze Noten
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white/50 text-white hover:bg-white/10 hover:border-white/70">
                <Heart className="mr-3 h-6 w-6" />
                Ons Verhaal
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <Award className="h-8 w-8 text-accent-300" />
              </div>
              <h3 className="text-lg font-display font-medium mb-2">Premium Kwaliteit</h3>
              <p className="text-sm text-white/70">Alleen de beste selectie</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <Clock className="h-8 w-8 text-accent-300" />
              </div>
              <h3 className="text-lg font-display font-medium mb-2">Vers Gebrand</h3>
              <p className="text-sm text-white/70">Dagelijks vers gebrand</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <Users className="h-8 w-8 text-accent-300" />
              </div>
              <h3 className="text-lg font-display font-medium mb-2">Familiebedrijf</h3>
              <p className="text-sm text-white/70">Sinds 1952</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent-300 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-linen">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-ink mb-6">
                Ons Verhaal
              </h2>
              <p className="text-lg text-ink/80 mb-6 leading-relaxed">
                Al sinds 1952 staat De Notenmarkt voor kwaliteit en ambachtelijkheid. 
                Wat begon als een kleine marktstal is uitgegroeid tot een vertrouwde naam 
                voor premium noten en zuidvruchten.
              </p>
              <p className="text-base text-ink/70 mb-8 leading-relaxed">
                Elke dag branden we vers en selecteren we zorgvuldig de beste producten 
                voor onze klanten. Traditie en kwaliteit gaan hand in hand.
              </p>
              <Link href="/about">
                <Button className="bg-primary-500 text-white hover:bg-primary-600">
                  Lees Meer Over Ons
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="w-full h-80 rounded-2xl shadow-warm bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                <div className="text-center text-primary-700">
                  <Award className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-display font-medium">Marktstal 1952</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-ink mb-6">
              Uitgelichte Producten
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Ontdek onze meest populaire noten en zuidvruchten, vers gebrand en klaar voor jou.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center mt-16">
              <Link href="/products">
                <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600 shadow-warm hover:shadow-lift transform hover:scale-105 transition-all duration-300">
                  Bekijk Alle Producten
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-ink mb-6">
              Waarom Kiezen voor De Notenmarkt?
            </h2>
            <p className="text-lg text-ink/70 max-w-2xl mx-auto">
              Onze toewijding aan kwaliteit en ambachtelijkheid maakt het verschil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Award className="h-10 w-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-display font-medium text-ink mb-4">Vers Gebrand</h3>
              <p className="text-ink/70 leading-relaxed">
                Al onze noten worden dagelijks vers gebrand voor de beste smaak en kwaliteit.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Leaf className="h-10 w-10 text-accent-600" />
              </div>
              <h3 className="text-xl font-display font-medium text-ink mb-4">100% Natuurlijk</h3>
              <p className="text-ink/70 leading-relaxed">
                Alleen natuurlijke producten zonder kunstmatige toevoegingen of conserveringsmiddelen.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Truck className="h-10 w-10 text-primary-700" />
              </div>
              <h3 className="text-xl font-display font-medium text-ink mb-4">Snelle Levering</h3>
              <p className="text-ink/70 leading-relaxed">
                Bestel vandaag en ontvang je verse producten binnen 1-2 werkdagen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-primary-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-ink mb-6">
            Blijf Op De Hoogte
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-2xl mx-auto">
            Ontvang 10% korting op je eerste bestelling en blijf op de hoogte van onze nieuwste producten en aanbiedingen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Je e-mailadres" 
              className="flex-1 px-4 py-3 rounded-full border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button className="bg-primary-500 text-white hover:bg-primary-600 px-8">
              Aanmelden
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-6">
            Klaar om te Proeven?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Ontdek onze uitgebreide collectie van premium noten en zuidvruchten. 
            Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50 shadow-glow">
                Bekijk Producten
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white/50 text-white hover:bg-white/10">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}