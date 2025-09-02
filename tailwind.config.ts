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
          50: '#FEFCFB',
          100: '#F9F5F3',
          200: '#F2EBE6',
          300: '#E8DDD6',
          400: '#DCC9BE',
          500: '#D0B5A6',
          600: '#C19F8E',
          700: '#B08875',
          800: '#9A7262',
          900: '#7D5D51',
        },
        accent: '#E8DDD6',
        cream: '#F8F5F1',
        linen: '#EFE9E2',
        ink: '#2B2A28',
        muted: '#9B8C80',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'], // Changed to lighter Inter
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.03)',
        'warm': '0 4px 20px -2px rgba(208, 181, 166, 0.08), 0 2px 8px -2px rgba(208, 181, 166, 0.05)',
        'lift': '0 8px 32px -4px rgba(208, 181, 166, 0.1), 0 4px 16px -2px rgba(208, 181, 166, 0.06)',
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
