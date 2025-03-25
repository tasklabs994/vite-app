// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.jsx"],
  safelist: [
    "prose",
    "mx-auto",
    "p-4",
    "text-lg",
    "text-center",
    // Add any additional classes that your dynamic HTML relies on
  ],
  plugins: [require("@tailwindcss/typography")],
};
