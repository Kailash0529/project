/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      fontFamily: {
        Montserrart: ["Montserrat", "sans-serif"],
        Handjet: ["Handjet", "cursive"],
        Chakra: ["Chakra Petch", "sans-serif"],
        Tektur: ["Tektur", "cursive"],
      },
      backgroundImage: {
        backgroundMainGradient: [
          "linear-gradient(160deg, rgba(255,0,174,1) 16%, rgba(0,81,233,1) 34%, rgba(14,3,82,1) 65%, rgba(24,1,60,1) 92%)",
        ],
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
