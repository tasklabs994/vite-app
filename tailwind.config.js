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
  plugins: [
    require("@tailwindcss/typography"),
    // Custom plugin to add default list styles
    function ({ addBase }) {
      addBase({
        "ul:not([class])": {
          listStyleType: "disc",
          marginLeft: "1.5rem",
          paddingLeft: "1.5rem",
        },
        "ol:not([class])": {
          listStyleType: "decimal",
          marginLeft: "1.5rem",
          paddingLeft: "1.5rem",
        },
      });
    },
  ],
};
