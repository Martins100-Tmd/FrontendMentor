/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html, js}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins"],
      },
      width: {
        92: ["92%"],
      },
      backgroundColor: {
        bg: ["rgb(7, 53, 54)"],
        op: ["rgba(0,0,0,0.5)"],
      },
      borderRadius: {
        4: ["3px"],
      },
    },
  },
  plugins: [],
};
