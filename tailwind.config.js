/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C1121F',          // Official Accent Crimson
          burgundy: '#8A0F18',     // Official Accent Dark
          ink: '#141414',          // Official Ink Background
          card: '#1C1C1C',         // Elevated Card Background
          cardLight: '#242424',    // Card hover / lighter section
          border: '#2E2E2E',       // Subtle border
          borderRed: 'rgba(193, 18, 31, 0.35)', // Red glowing border
          glow: 'rgba(193, 18, 31, 0.2)',
          muted: '#9E9E9E',        // Secondary text
          whatsapp: '#25D366',     // WhatsApp Green
        }
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 30px -5px rgba(193, 18, 31, 0.45)',
        'glow-red-lg': '0 0 50px -5px rgba(193, 18, 31, 0.6)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
