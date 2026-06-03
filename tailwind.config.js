// Root Tailwind config. The design tokens stay the single source of truth in
// config/tailwind.tokens.js; this file spreads them into theme.extend and is
// loaded by Tailwind v4 through the @config directive in app/globals.css.
const tokens = require("./config/tailwind.tokens.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: tokens,
  },
  plugins: [],
};
