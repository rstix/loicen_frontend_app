import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 350ms ease-in-out 1',
      },
    },
    colors: {
      gray: {
        DEFAULT: '#555555',
        darker: '#C6C6C6',
        light: '#ececec',
        dark: '#363636',
        very_dark: '#2D2D2D',
      },
      blue: {
        DEFAULT: '#2D6CDF',
      },
      black: {
        DEFAULT: '#000000',
      },
    },
  },
  plugins: [],
};
export default config;
