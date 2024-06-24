/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#52B788",
        "color-primary-lighter": "#c2fce1",
        "color-primary-medium": "#40916C",
        "color-primary-dark": "#1B4332",
      },
    },
  },
  plugins: [],
};
