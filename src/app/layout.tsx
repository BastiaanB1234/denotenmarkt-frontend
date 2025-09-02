import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
  title: 'De Notenmarkt - Premium noten en zuidvruchten',
  description: 'Premium noten, zaden en zuidvruchten. Vers gebrand en zorgvuldig geselecteerd voor de beste kwaliteit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
