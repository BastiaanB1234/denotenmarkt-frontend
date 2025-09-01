import React from 'react';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts } from '@/lib/shopify';

// Fallback mock data voor demo doeleinden
const mockProducts = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones',
    handle: 'wireless-bluetooth-headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life.',
    images: {
      edges: [
        {
          node: {
            id: 'img1',
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            altText: 'Wireless Headphones'
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: { amount: '89.99', currencyCode: 'EUR' },
      maxVariantPrice: { amount: '89.99', currencyCode: 'EUR' }
    },
    variants: {
      edges: [
        {
          node: {
            id: 'var1',
            title: 'Default',
            price: { amount: '89.99', currencyCode: 'EUR' },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Smartphone Case Premium',
    handle: 'smartphone-case-premium',
    description: 'Premium protective case for your smartphone with stylish design.',
    images: {
      edges: [
        {
          node: {
            id: 'img2',
            url: 'https://images.unsplash.com/photo-1603313059737-4a9172892f44?w=400&h=400&fit=crop',
            altText: 'Smartphone Case'
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: { amount: '24.99', currencyCode: 'EUR' },
      maxVariantPrice: { amount: '29.99', currencyCode: 'EUR' }
    },
    variants: {
      edges: [
        {
          node: {
            id: 'var2',
            title: 'Default',
            price: { amount: '24.99', currencyCode: 'EUR' },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Laptop Stand Ergonomic',
    handle: 'laptop-stand-ergonomic',
    description: 'Ergonomic laptop stand for better posture and cooling.',
    images: {
      edges: [
        {
          node: {
            id: 'img3',
            url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
            altText: 'Laptop Stand'
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: { amount: '45.00', currencyCode: 'EUR' },
      maxVariantPrice: { amount: '45.00', currencyCode: 'EUR' }
    },
    variants: {
      edges: [
        {
          node: {
            id: 'var3',
            title: 'Default',
            price: { amount: '45.00', currencyCode: 'EUR' },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '4',
    title: 'USB-C Charging Cable',
    handle: 'usb-c-charging-cable',
    description: 'Fast charging USB-C cable with durable construction.',
    images: {
      edges: [
        {
          node: {
            id: 'img4',
            url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
            altText: 'USB-C Cable'
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: { amount: '12.99', currencyCode: 'EUR' },
      maxVariantPrice: { amount: '12.99', currencyCode: 'EUR' }
    },
    variants: {
      edges: [
        {
          node: {
            id: 'var4',
            title: 'Default',
            price: { amount: '12.99', currencyCode: 'EUR' },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '5',
    title: 'Wireless Mouse Gaming',
    handle: 'wireless-mouse-gaming',
    description: 'High-precision wireless gaming mouse with customizable buttons.',
    images: {
      edges: [
        {
          node: {
            id: 'img5',
            url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
            altText: 'Gaming Mouse'
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: { amount: '79.99', currencyCode: 'EUR' },
      maxVariantPrice: { amount: '79.99', currencyCode: 'EUR' }
    },
    variants: {
      edges: [
        {
          node: {
            id: 'var5',
            title: 'Default',
            price: { amount: '79.99', currencyCode: 'EUR' },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: '6',
    title: 'Mechanical Keyboard RGB',
    handle: 'mechanical-keyboard-rgb',
    description: 'RGB mechanical keyboard with customizable lighting and premium switches.',
    images: {
      edges: [
        {
          node: {
            id: 'img6',
            url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
            altText: 'Mechanical Keyboard'
          }
        }
      ]
    },
    priceRange: {
      minVariantPrice: { amount: '129.99', currencyCode: 'EUR' },
      maxVariantPrice: { amount: '129.99', currencyCode: 'EUR' }
    },
    variants: {
      edges: [
        {
          node: {
            id: 'var6',
            title: 'Default',
            price: { amount: '129.99', currencyCode: 'EUR' },
            availableForSale: true
          }
        }
      ]
    }
  }
];

export default async function ProductsPage() {
  // Probeer echte Shopify data op te halen, anders gebruik mock data
  let products = mockProducts;
  
  try {
    const shopifyProducts = await getProducts(20);
    if (shopifyProducts?.edges) {
      products = shopifyProducts.edges.map((edge: any) => edge.node);
    }
  } catch (error) {
    console.log('Using mock data - Shopify not configured yet');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alle Producten</h1>
          <p className="text-gray-600">Ontdek onze uitgebreide collectie van kwaliteitsproducten</p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Prijs:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Alle prijzen</option>
                  <option>Onder €25</option>
                  <option>€25 - €50</option>
                  <option>€50 - €100</option>
                  <option>Boven €100</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Categorie:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Alle categorieën</option>
                  <option>Elektronica</option>
                  <option>Accessoires</option>
                  <option>Gaming</option>
                </select>
              </div>
            </div>

            {/* Sorting and View */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sorteren:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Nieuwste eerst</option>
                  <option>Prijs: laag naar hoog</option>
                  <option>Prijs: hoog naar laag</option>
                  <option>Populair</option>
                </select>
              </div>

              <div className="flex items-center space-x-1">
                <button className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-50 transition-colors duration-200">
                  <Grid className="h-4 w-4" />
                </button>
                <button className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors duration-200">
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
              Vorige
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
              3
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
              Volgende
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
