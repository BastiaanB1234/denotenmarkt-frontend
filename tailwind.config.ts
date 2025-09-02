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
          50: '#F8F5F1',
          100: '#EFE9E2',
          200: '#E6DFD6',
          300: '#D4A373',
          400: '#9B8C80',
          500: '#7A4B2E',
          600: '#6B4129',
          700: '#5A3623',
          800: '#4A2C1E',
          900: '#2B2A28',
        },
        accent: '#D4A373',
        cream: '#F8F5F1',
        linen: '#EFE9E2',
        ink: '#2B2A28',
        muted: '#9B8C80',
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(122, 75, 46, 0.08)',
        'warm': '0 8px 32px -4px rgba(122, 75, 46, 0.12)',
        'lift': '0 12px 40px -6px rgba(122, 75, 46, 0.15)',
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
