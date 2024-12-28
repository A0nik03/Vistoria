/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
     animation: {
        'slide-in': 'slideIn 0.8s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }, 
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
