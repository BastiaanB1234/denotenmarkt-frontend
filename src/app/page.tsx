import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Truck,
      title: 'Gratis Verzending',
      description: 'Gratis verzending bij bestellingen boven €50',
    },
    {
      icon: Shield,
      title: 'Veilige Betaling',
      description: '100% veilige betaling met SSL encryptie',
    },
    {
      icon: RefreshCw,
      title: 'Eenvoudig Retourneren',
      description: '30 dagen retourrecht op alle producten',
    },
    {
      icon: Star,
      title: 'Kwaliteitsgarantie',
      description: 'Alleen de beste producten voor onze klanten',
    },
  ];

  const categories = [
    {
      name: 'Elektronica',
      href: '/collections/electronics',
      image: '/images/electronics.jpg',
      description: 'De nieuwste gadgets en elektronica',
    },
    {
      name: 'Mode',
      href: '/collections/fashion',
      image: '/images/fashion.jpg',
      description: 'Trendy kleding en accessoires',
    },
    {
      name: 'Huis & Tuin',
      href: '/collections/home-garden',
      image: '/images/home.jpg',
      description: 'Alles voor in en rond het huis',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welkom bij <span className="text-yellow-300">ShopName</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ontdek onze uitgebreide collectie van kwaliteitsproducten. 
              Snelle verzending en uitstekende service gegarandeerd.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                Bekijk Producten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/collections"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Ontdek Collecties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Waarom kiezen voor ShopName?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We streven naar uitstekende service en klanttevredenheid met onze unieke voordelen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Populaire Categorieën
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ontdek onze diverse collecties en vind precies wat je zoekt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {category.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Meld je aan voor onze nieuwsbrief en ontvang exclusieve aanbiedingen en updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Jouw email adres"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Abonneren
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
