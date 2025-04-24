/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F2F4F8',
          300: '#CFDBEA',
          500: '#9FACBD',
          800: '#2D3034',
        },
        wine: '#722F37',
        claret: '#7F1734',
        maroon: '#800000',
        burgundy: '#800020',
        malbec: '#9B0047',
        merlot: '#7F171F',
        winedregs: '#673147',
        cabernet: '#8E5B6B',
        ruby: '#E0115F',
        garnet: '#830E0D',
        beaujolais: '#80304C',
        palepink: '#FADADD',
        bordeaux: '#4C0013',
        sangria: '#92000A',
        shiraz: '#802539',
        salmon: '#FA8072',
        syrah: '#6A282C',
        pinotnoir: '#653642',
      },
      boxShadow: {
        custom: '0px 2px 20px 0px #0000000A',
      },
    },
  },
  plugins: [],
};
