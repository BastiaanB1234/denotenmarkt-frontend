'use client';

import React, { useEffect, useState } from 'react';
import { getProductByHandle } from '@/lib/shopify';
import { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [handle, setHandle] = useState<string>('');
  const { addItem } = useCart();

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setHandle(resolvedParams.handle);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!handle) return;

    const fetchProduct = async () => {
      try {
        const productData = await getProductByHandle(handle);
        setProduct(productData);
        if (productData?.variants?.edges?.[0]?.node) {
          setSelectedVariant(productData.variants.edges[0].node);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addItem(product, selectedVariant, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Product laden...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product niet gevonden</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Terug naar producten
          </Link>
        </div>
      </div>
    );
  }

  const firstImage = product.images?.edges?.[0]?.node;
  const variants = product.variants?.edges?.map(edge => edge.node) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {firstImage ? (
                <img
                  src={firstImage.url}
                  alt={firstImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Geen afbeelding</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-blue-600">
                €{selectedVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount}
              </div>

              {/* Variant Selection */}
              {variants.length > 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Variant</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          selectedVariant?.id === variant.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{variant.title}</div>
                        <div className="text-sm text-gray-600">€{variant.price.amount}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Aantal</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Toevoegen aan winkelwagen</span>
              </button>

              {/* Back to Products */}
              <Link
                href="/products"
                className="block text-center text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Terug naar producten
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
