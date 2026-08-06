/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: '#eefcf3',
          100: '#d3f8e0',
          300: '#7de8ab',
          500: '#2ecc71',
          600: '#20a85c',
          700: '#188a4a',
        },
        sky: {
          50: '#eaf6ff',
          100: '#cdeaff',
          300: '#7cc9ff',
          500: '#2196f3',
          600: '#1478cc',
          700: '#0f5fa3',
        },
        sun: {
          300: '#ffe27a',
          500: '#ffc93c',
        },
        berry: {
          50: '#fff0f4',
          100: '#ffd9e3',
          400: '#ff6f91',
          500: '#ef476f',
          600: '#d43259',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '0 6px 0 rgba(0,0,0,0.12)',
        popSmall: '0 4px 0 rgba(0,0,0,0.12)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: 0 },
          '60%': { transform: 'scale(1.08)', opacity: 1 },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        pop: 'pop 0.35s ease-out',
        wiggle: 'wiggle 0.4s ease-in-out',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
