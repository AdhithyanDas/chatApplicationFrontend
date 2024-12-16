// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   daisyui: {
//     themes: [],
//   },
//   plugins: [
//     require('daisyui')
//   ],
// }
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure your file paths are correct
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
};
