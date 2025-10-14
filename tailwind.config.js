/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF00E6',
        'electric-blue': '#00FFFF',
        'cyber-lime': '#D0FF00',
        'deep-black': '#0A0A0A',
      },
      fontFamily: {
        headline: ['"Orbitron"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 30px rgba(255, 0, 230, 0.35)',
        'neon-blue': '0 0 40px rgba(0, 255, 255, 0.35)',
        'neon-lime': '0 0 40px rgba(208, 255, 0, 0.35)',
      },
      backgroundImage: {
        'madooza-gradient': 'linear-gradient(90deg, #FF00E6, #00FFFF, #D0FF00)',
        'madooza-radial': 'radial-gradient(circle at top, rgba(255, 0, 230, 0.4), transparent 60%), radial-gradient(circle at bottom, rgba(0, 255, 255, 0.25), transparent 55%)',
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 0, 230, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(208, 255, 0, 0.6), 0 0 60px rgba(255, 0, 230, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
};
