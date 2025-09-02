'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-muted">Product laden...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-ink mb-4">Product niet gevonden</h1>
          <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium">
            Terug naar producten
          </Link>
        </div>
      </div>
    );
  }

  const firstImage = product.images?.edges?.[0]?.node;
  const variants = product.variants?.edges?.map(edge => edge.node) || [];

  return (
    <div className="min-h-screen">
      <div className="container-max section-padding">
        <div className="card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-primary-200">
              {firstImage ? (
                <Image
                  src={firstImage.url}
                  alt={firstImage.altText || product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linen flex items-center justify-center">
                  <span className="text-muted">Geen afbeelding</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-display font-bold text-ink mb-4">{product.title}</h1>
                <p className="text-muted leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Price */}
              <div className="text-3xl font-display font-bold text-primary-600">
                €{selectedVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount}
              </div>

              {/* Variant Selection */}
              {variants.length > 1 && (
                <div>
                  <h3 className="text-xl font-display font-semibold text-ink mb-4">Variant</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-4 border rounded-xl text-left transition-all duration-300 ${
                          selectedVariant?.id === variant.id
                            ? 'border-primary-500 bg-primary-50 shadow-soft'
                            : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <div className="font-display font-medium text-ink">{variant.title}</div>
                        <div className="text-sm text-muted">€{variant.price.amount}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-xl font-display font-semibold text-ink mb-4">Aantal</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 border border-primary-200 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    <Minus className="h-5 w-5 text-primary-600" />
                  </button>
                  <span className="text-xl font-medium w-16 text-center text-ink">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 border border-primary-200 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    <Plus className="h-5 w-5 text-primary-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="btn-primary w-full text-lg py-4"
              >
                <ShoppingCart className="h-6 w-6 mr-2" />
                <span>Toevoegen aan winkelwagen</span>
              </button>

              {/* Back to Products */}
              <Link
                href="/products"
                className="block text-center text-primary-600 hover:text-primary-700 font-medium"
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
