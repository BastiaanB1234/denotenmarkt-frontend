import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8DC',
          100: '#F5E6D3',
          200: '#E6D3B7',
          300: '#D2B48C',
          400: '#CD853F',
          500: '#8B4513',
          600: '#7A3E11',
          700: '#6B360F',
          800: '#5C2E0D',
          900: '#4D260B',
        },
        accent: {
          50: '#FDF6E3',
          100: '#F9E6B3',
          200: '#F4D03F',
          300: '#DAA520',
          400: '#B8860B',
          500: '#9A7209',
          600: '#7C5E07',
          700: '#5E4A05',
          800: '#403603',
          900: '#222201',
        },
        earth: {
          50: '#FAF9F6',
          100: '#F5F3F0',
          200: '#E8E5E0',
          300: '#D4CFC7',
          400: '#B8B0A5',
          500: '#9C9283',
          600: '#807461',
          700: '#64563F',
          800: '#48381D',
          900: '#2C1A00',
        },
        cream: '#FAF9F6',
        linen: '#F5F3F0',
        ink: '#2C1A00',
        muted: '#807461',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'handwriting': ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(139, 69, 19, 0.08), 0 10px 20px -2px rgba(139, 69, 19, 0.05)',
        'warm': '0 4px 20px -2px rgba(139, 69, 19, 0.12), 0 2px 8px -2px rgba(139, 69, 19, 0.08)',
        'lift': '0 8px 32px -4px rgba(139, 69, 19, 0.15), 0 4px 16px -2px rgba(139, 69, 19, 0.1)',
        'glow': '0 0 20px rgba(218, 165, 32, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'lift': 'lift 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
