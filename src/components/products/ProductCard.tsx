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
    <div className="card group hover:shadow-warm transition-all duration-300 animate-fade-in">
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-linen flex items-center justify-center">
              <span className="text-muted">Geen afbeelding</span>
            </div>
          )}
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-colors duration-300"></div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-lg font-display font-semibold text-ink mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xl font-display font-semibold text-primary-600">
            €{product.priceRange?.minVariantPrice?.amount || '0.00'}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!firstVariant}
            className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 disabled:bg-muted disabled:cursor-not-allowed transition-all duration-300 shadow-soft hover:shadow-warm group-hover:scale-105"
            title="Toevoegen aan winkelwagen"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
