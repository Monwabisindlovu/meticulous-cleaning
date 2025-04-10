/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'calm-blue': '#e6f2ff',
          'soft-yellow': '#fff8e1',
          'light-lavender': '#f4f0fa',
          'soft-beige': '#f9f6ec',
        },
      },
    },
    plugins: [],
  }
  
  