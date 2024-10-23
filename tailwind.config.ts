import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      cursor: {
        comment: 'url(/message.svg), pointer',
      },
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
      background: 'rgba(var(--background))',
      background_second: 'rgba(var(--background-second))',
      text: 'rgba(var(--text))',
      border: 'rgba(var(--border))',
      gray: {
        DEFAULT: '#555555',
        darker: '#C6C6C6',
        very_light: '#FAF8F8',
        light: '#ececec',
        dark: '#363636',
        very_dark: '#232525',
      },
      blue: {
        DEFAULT: '#2D6CDF',
      },
      black: {
        DEFAULT: '#000000',
      },
      red: {
        error: '#bf0202',
      },
      white: {
        DEFAULT: '#ffffff',
      },
    },
  },
  plugins: [],
};
export default config;
