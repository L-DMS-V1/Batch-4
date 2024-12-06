// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this path to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#E9EFEC',
        accentBlue: '#6A9AB0',
        darkBlue: '#001F3F',
        mediumBlue: '#3A6D8C',
        lightGray: '#F9FAFB',
    },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
