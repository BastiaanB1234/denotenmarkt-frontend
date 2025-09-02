# De Notenmarkt Webshop - Hostnet Deployment

## 🚀 Deployment Instructies voor Hostnet

### Wat je hebt:
- ✅ Volledig werkende Next.js webshop
- ✅ Shopify API integratie met echte producten
- ✅ Responsive design met Tailwind CSS
- ✅ Winkelwagen functionaliteit

### Stap 1: Upload naar Hostnet
1. **Log in bij je Hostnet control panel**
2. **Ga naar je hosting pakket**
3. **Upload alle bestanden uit deze `deployment` map naar je public_html directory**

### Stap 2: Node.js Configuratie
1. **Ga naar je Hostnet control panel**
2. **Zoek naar "Node.js" of "Application Manager"**
3. **Maak een nieuwe Node.js applicatie aan:**
   - **Application name:** `denotenmarkt-webshop`
   - **Node.js version:** `18.x` of hoger
   - **Start command:** `npm start`
   - **Document root:** `/public_html`

### Stap 3: Environment Variabelen
Voeg deze environment variabelen toe in je Hostnet control panel:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=denotenmarkt.nl
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=846acd8da631d118010f043cfb4333ac
NODE_ENV=production
```

### Stap 4: Installatie
1. **Open een terminal in je Hostnet hosting**
2. **Run deze commando's:**
```bash
cd public_html
npm install --production
npm run build
npm start
```

### Stap 5: DNS Configuratie
In je Hostnet DNS instellingen:
1. **Wijzig A record `denotenmarkt.nl`** naar je Hostnet server IP
2. **Wijzig CNAME record `www.denotenmarkt.nl`** naar je Hostnet server

### 🎉 Je webshop is nu live!
- **URL:** https://denotenmarkt.nl
- **Shopify integratie:** Volledig werkend
- **Echte producten:** Alle producten uit je Shopify store

### Ondersteuning
Als je problemen hebt met de deployment, neem contact op met Hostnet support.

---

**De Notenmarkt** - Premium noten en zuidvruchten webshop
