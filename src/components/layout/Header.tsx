'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-primary-200 sticky top-0 z-50 shadow-soft">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-2xl font-display font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
              De Notenmarkt
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-ink hover:text-primary-600 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/products"
              className="text-ink hover:text-primary-600 transition-colors font-medium relative group"
            >
              Producten
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-ink hover:text-primary-600 transition-colors font-medium relative group"
            >
              Over Ons
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-ink hover:text-primary-600 transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Zoek producten..."
                className="pl-10 pr-4 py-2 border border-primary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-linen/50 text-ink placeholder-muted"
              />
              <Search className="absolute left-3 h-4 w-4 text-muted" />
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative group">
              <div className="p-2 rounded-full bg-linen group-hover:bg-primary-200 transition-colors">
                <ShoppingCart className="h-5 w-5 text-primary-600 group-hover:text-primary-700 transition-colors" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-soft">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-linen hover:bg-primary-200 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-primary-600" />
              ) : (
                <Menu className="h-5 w-5 text-primary-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-200 py-4 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-ink hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-ink hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Producten
              </Link>
              <Link
                href="/about"
                className="text-ink hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Over Ons
              </Link>
              <Link
                href="/contact"
                className="text-ink hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Search */}
              <div className="flex items-center relative pt-2">
                <input
                  type="text"
                  placeholder="Zoek producten..."
                  className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-linen/50 text-ink placeholder-muted"
                />
                <Search className="absolute left-3 h-4 w-4 text-muted" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
