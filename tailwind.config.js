/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1ED5A9',
        dark: {
          primary: '#0D1E32',
          secondary: '#113051',
        },
      },
    },
  },
  plugins: [],
}
