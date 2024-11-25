/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
      },
    },
  },
  plugins: [],
};
