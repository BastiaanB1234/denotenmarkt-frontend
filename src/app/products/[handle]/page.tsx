'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ShopifyProduct } from '@/types/shopify';

// Mock product voor demo doeleinden
const mockProduct: ShopifyProduct = {
  id: '1',
  title: 'Wireless Bluetooth Headphones',
  handle: 'wireless-bluetooth-headphones',
  description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals who need crystal clear sound quality.',
  images: {
    edges: [
      {
        node: {
          id: 'img1',
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
          altText: 'Wireless Headphones'
        }
      },
      {
        node: {
          id: 'img2',
          url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
          altText: 'Headphones Side View'
        }
      },
      {
        node: {
          id: 'img3',
          url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop',
          altText: 'Headphones Detail'
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
  },
  options: [
    {
      id: 'opt1',
      name: 'Color',
      values: ['Black', 'White', 'Blue']
    },
    {
      id: 'opt2',
      name: 'Size',
      values: ['Standard']
    }
  ]
};

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const { addItem } = useCart();

  // In een echte implementatie zou je hier de product data ophalen via API
  const product = mockProduct;

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(parseFloat(price.amount));
  };

  const handleAddToCart = () => {
    const selectedVariant = product.variants.edges[0]?.node;
    if (selectedVariant) {
      addItem(product, selectedVariant, quantity);
    }
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar producten
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
              {product.images.edges[selectedImage]?.node && (
                <Image
                  src={product.images.edges[selectedImage].node.url}
                  alt={product.images.edges[selectedImage].node.altText || product.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.map((image, index) => (
                  <button
                    key={image.node.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image.node.url}
                      alt={image.node.altText || product.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(product.priceRange.minVariantPrice)}
            </div>

            {/* Product Options */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {option.name}
                    </label>
                    <div className="flex space-x-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                            selectedOptions[option.name] === value
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aantal
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Toevoegen aan winkelwagen
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Gratis verzending</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">2 jaar garantie</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">30 dagen retour</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="bg-white rounded-lg p-6">
            <div className="prose max-w-none">
              <h3>Specificaties</h3>
              <ul>
                <li>Bluetooth 5.0 technologie</li>
                <li>40 uur speeltijd</li>
                <li>Noise cancellation</li>
                <li>Draadloze oplaadbaar</li>
                <li>Compatibel met alle apparaten</li>
              </ul>
              
              <h3>Inhoud van de verpakking</h3>
              <ul>
                <li>Wireless Bluetooth Headphones</li>
                <li>USB-C oplaadkabel</li>
                <li>Draagbare case</li>
                <li>Gebruikershandleiding</li>
                <li>Garantiekaart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
