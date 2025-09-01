# Shopify Webshop Frontend

Een moderne, headless Shopify webshop gebouwd met Next.js, TypeScript en Tailwind CSS.

## 🚀 Features

- **Moderne UI/UX**: Gebouwd met Tailwind CSS voor een professionele uitstraling
- **TypeScript**: Volledig getypeerd voor betere developer experience
- **Responsive Design**: Optimized voor alle apparaten
- **Winkelwagen Functionaliteit**: Volledig functionele winkelwagen met localStorage
- **Product Catalogus**: Product overzicht met filtering en sorting
- **SEO Optimized**: Meta tags en structured data
- **Performance**: Geoptimaliseerd voor snelheid
- **Accessibility**: WCAG compliant

## 🛠️ Technologieën

- **Next.js 14**: React framework met App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shopify Storefront API**: Headless commerce backend
- **GraphQL**: Data fetching
- **Lucide React**: Icon library
- **Framer Motion**: Animations (optioneel)

## 📋 Vereisten

- Node.js 18+ 
- npm of yarn
- Shopify account met Storefront API toegang

## 🚀 Installatie

1. **Clone het project**
   ```bash
   git clone <repository-url>
   cd shopify-webshop
   ```

2. **Installeer dependencies**
   ```bash
   npm install
   ```

3. **Configureer environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Vul je Shopify credentials in:
   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Start de development server**
   ```bash
   npm run dev
   ```

5. **Open je browser**
   ```
   http://localhost:3000
   ```

## 🔧 Shopify Setup

### 1. Maak een Shopify Store aan
- Ga naar [shopify.com](https://shopify.com)
- Maak een gratis account aan
- Voltooi de setup wizard

### 2. Configureer Storefront API
1. Ga naar je Shopify Admin
2. Navigeer naar **Settings > Apps and sales channels**
3. Klik op **Develop apps**
4. Maak een nieuwe app aan
5. Ga naar **Configuration > Storefront API**
6. Genereer een **Storefront access token**
7. Kopieer je store domain (bijv. `your-store.myshopify.com`)

### 3. Voeg producten toe
1. Ga naar **Products** in je Shopify Admin
2. Voeg je eerste producten toe
3. Zorg dat producten **published** zijn

## 📁 Project Structuur

```
src/
├── app/                    # Next.js App Router
│   ├── cart/              # Winkelwagen pagina
│   ├── products/          # Producten pagina
│   ├── layout.tsx         # Hoofdlayout
│   └── page.tsx           # Homepage
├── components/            # React componenten
│   ├── layout/           # Layout componenten
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── products/         # Product componenten
│       └── ProductCard.tsx
├── contexts/             # React contexts
│   └── CartContext.tsx   # Winkelwagen state management
├── lib/                  # Utility functies
│   └── shopify.ts        # Shopify API client
└── types/                # TypeScript types
    └── shopify.ts        # Shopify data types
```

## 🎨 Customization

### Kleuren aanpassen
Bewerk `tailwind.config.ts` om je merk kleuren toe te voegen:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    }
  }
}
```

### Logo wijzigen
Vervang de "ShopName" tekst in `Header.tsx` met je eigen logo:

```tsx
<Link href="/" className="text-2xl font-bold text-gray-900">
  Jouw Bedrijfsnaam
</Link>
```

### Product data aanpassen
De huidige implementatie gebruikt mock data. Voor echte Shopify integratie:

1. Update `src/lib/shopify.ts` met je API credentials
2. Vervang mock data in `src/app/products/page.tsx` met echte API calls
3. Implementeer server-side data fetching

## 🔌 API Integratie

### Producten ophalen
```typescript
import shopifyClient, { GET_PRODUCTS } from '@/lib/shopify';

const getProducts = async () => {
  const data = await shopifyClient.request(GET_PRODUCTS, {
    first: 20
  });
  return data.products;
};
```

### Enkele product ophalen
```typescript
import shopifyClient, { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify';

const getProduct = async (handle: string) => {
  const data = await shopifyClient.request(GET_PRODUCT_BY_HANDLE, {
    handle
  });
  return data.product;
};
```

## 🚀 Deployment

### Vercel (Aanbevolen)
1. Push je code naar GitHub
2. Verbind je repository met Vercel
3. Configureer environment variables in Vercel dashboard
4. Deploy!

### Andere platforms
- **Netlify**: Gebruik `npm run build` en upload de `out` directory
- **AWS Amplify**: Verbind je GitHub repository
- **DigitalOcean App Platform**: Upload je code

## 📱 Mobile Optimization

De webshop is volledig responsive met:
- Mobile-first design
- Touch-friendly interfaces
- Optimized images
- Fast loading times

## 🔒 Security

- Environment variables voor API keys
- Input validation
- XSS protection
- CSRF protection (via Next.js)

## 📊 Analytics

Voeg Google Analytics toe:

```typescript
// In _app.tsx of layout.tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## 🤝 Contributing

1. Fork het project
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📄 License

Dit project is gelicenseerd onder de MIT License.

## 🆘 Support

Voor vragen of problemen:
- Open een GitHub issue
- Raadpleeg de Shopify documentatie
- Check de Next.js documentatie

## 🔄 Updates

Houd je dependencies up-to-date:

```bash
npm update
npm audit fix
```

---

**Gemaakt met ❤️ voor moderne e-commerce**
