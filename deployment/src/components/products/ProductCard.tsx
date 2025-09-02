'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { ShopifyProduct } from '@/types/shopify';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant?.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (firstVariant) {
      addItem(product, firstVariant, 1);
    }
  };

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(parseFloat(price.amount));
  };

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Geen afbeelding</span>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleAddToCart}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
            title="Toevoegen aan winkelwagen"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
          <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200" title="Toevoegen aan favorieten">
            <Heart className="h-4 w-4" />
          </button>
          <Link
            href={`/products/${product.handle}`}
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-200"
            title="Bekijk product"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* Sale Badge */}
        {product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product.handle}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.priceRange.minVariantPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.priceRange.maxVariantPrice)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.priceRange.minVariantPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!firstVariant?.availableForSale}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            firstVariant?.availableForSale
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {firstVariant?.availableForSale ? 'Toevoegen aan winkelwagen' : 'Niet beschikbaar'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
