'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-linen rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-ink mb-4">Je winkelwagen is leeg</h1>
          <p className="text-muted mb-8 leading-relaxed">Voeg wat producten toe om te beginnen met winkelen.</p>
          <Link href="/products" className="btn-primary">
            Bekijk Producten
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container-max section-padding">
        <h1 className="text-4xl font-display font-bold text-ink mb-8 text-balance">Winkelwagen</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card">
              {state.items.map((item) => {
                const firstImage = item.product.images?.edges?.[0]?.node;
                return (
                  <div key={`${item.product.id}-${item.variant.id}`} className="p-6 border-b border-primary-200 last:border-b-0">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden relative border border-primary-200">
                          {firstImage ? (
                            <Image
                              src={firstImage.url}
                              alt={firstImage.altText || item.product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-linen flex items-center justify-center">
                              <span className="text-muted text-xs">Geen afbeelding</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-display font-semibold text-ink mb-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted mb-2">
                          {item.variant.title}
                        </p>
                        <p className="text-xl font-display font-semibold text-primary-600">
                          €{item.variant.price.amount}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                          className="p-2 border border-primary-200 rounded-full hover:bg-primary-100 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-primary-600" />
                        </button>
                        <span className="w-12 text-center font-medium text-ink">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                          className="p-2 border border-primary-200 rounded-full hover:bg-primary-100 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-primary-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.product.id, item.variant.id)}
                        className="text-muted hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Verwijder uit winkelwagen"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h2 className="text-2xl font-display font-semibold text-ink mb-6">Besteloverzicht</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-muted">Aantal items:</span>
                  <span className="font-medium text-ink">{getTotalItems()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Subtotaal:</span>
                  <span className="font-medium text-ink">€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Verzendkosten:</span>
                  <span className="font-medium text-ink">€0.00</span>
                </div>
                <div className="border-t border-primary-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-display font-semibold text-ink">Totaal:</span>
                    <span className="text-xl font-display font-bold text-primary-600">€{getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="btn-primary w-full">
                  Afrekenen
                </button>
                <button
                  onClick={clearCart}
                  className="btn-secondary w-full"
                >
                  Winkelwagen legen
                </button>
                <Link
                  href="/products"
                  className="block w-full text-center bg-white border border-primary-200 text-ink py-3 px-6 rounded-full font-medium hover:bg-primary-50 transition-colors"
                >
                  Verder winkelen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
