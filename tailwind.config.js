/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-600': '#5A9BD3', // Color personalizado para botones.
      },
      spacing: {
        '40': '10rem', // Tamaño personalizado para imágenes.
      },
      fontSize: {
        '2xl': ['1.5rem', '2rem'], // Tamaño de fuente personalizado.
        'xl': ['1.25rem', '1.75rem'],
      },
    },
  },
  plugins: [],
};
