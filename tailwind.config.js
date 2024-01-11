/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'grad-blue': '#22BBFE',
        'grad-purple': '#812EFF',
        'grad-red': '#F95595',
        'grey-hover': 'hsl(0,0%,65%)',
        'custom-bg-color': '#181A1E',
        'drop-down-color': '#202528',
      },
    },
  },
  plugins: [],
};
