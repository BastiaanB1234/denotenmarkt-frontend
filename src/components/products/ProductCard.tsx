'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { ShopifyProduct } from '@/types/shopify';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const firstImage = product.images?.edges?.[0]?.node;
  const firstVariant = product.variants?.edges?.[0]?.node;

  const handleAddToCart = () => {
    if (firstVariant) {
      addItem(product, firstVariant, 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Geen afbeelding</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">
            €{product.priceRange?.minVariantPrice?.amount || '0.00'}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!firstVariant}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            title="Toevoegen aan winkelwagen"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
