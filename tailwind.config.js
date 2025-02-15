const defaultTheme = require('tailwindcss/defaultTheme');
const flowbite = require('flowbite/plugin');
import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [flowbite, typography],
};
