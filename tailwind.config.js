/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fd',
          100: '#cceffa',
          200: '#99dff5',
          300: '#66cff0',
          400: '#33bfeb',
          500: '#00A8E8',  // Main blue
          600: '#0087ba',
          700: '#00668b',
          800: '#00445d',
          900: '#00222e',
        },
        secondary: {
          50: '#fff3ed',
          100: '#ffe7db',
          200: '#ffcfb7',
          300: '#ffb793',
          400: '#ff9f6f',
          500: '#FF6B35',  // Main orange
          600: '#cc562a',
          700: '#994020',
          800: '#662b15',
          900: '#33150b',
        },
        accent: {
          blue: '#00A8E8',
          orange: '#FF6B35',
          lightBlue: '#33bfeb',
          darkBlue: '#0087ba',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
