'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  User, 
  Heart, 
  Package,
  BookOpen,
  Leaf,
  Home
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Producten', href: '/products', icon: Package },
    { name: 'Recepten', href: '/recipes', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Gezondheid', href: '/health', icon: Leaf },
    { name: 'Over Ons', href: '/about', icon: User },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-primary-200 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-xl md:text-2xl font-display font-medium text-primary-600 group-hover:text-primary-700 transition-colors">
              De Notenmarkt
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-ink hover:text-primary-600 transition-colors font-normal relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex text-ink hover:text-primary-600 hover:bg-primary-50/50">
              <Search className="h-4 w-4" />
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hidden md:flex text-ink hover:text-primary-600 hover:bg-primary-50/50">
              <Heart className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-ink hover:text-primary-600 hover:bg-primary-50/50">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-normal">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Account */}
            <Button variant="ghost" size="icon" className="hidden md:flex text-ink hover:text-primary-600 hover:bg-primary-50/50">
              <User className="h-4 w-4" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-primary-200 bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-ink hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile actions */}
              <div className="border-t border-primary-200 pt-4 px-4 space-y-2">
                <Link
                  href="/search"
                  className="flex items-center py-3 text-ink hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="h-5 w-5 mr-3" />
                  Zoeken
                </Link>
                <Link
                  href="/favorites"
                  className="flex items-center py-3 text-ink hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Favorieten
                </Link>
                <Link
                  href="/account"
                  className="flex items-center py-3 text-ink hover:bg-primary-50 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
