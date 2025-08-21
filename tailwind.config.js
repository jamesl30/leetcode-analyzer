/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        leetcode: {
          easy: '#00b8a3',
          medium: '#ffc01e',
          hard: '#ff375f',
          dark: '#1a1a1a',
          gray: '#2d2d2d',
          'light-gray': '#f7f8fa'
        }
      },
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}