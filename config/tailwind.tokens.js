// Tailwind token extension for the Russian learning app.
// Import and spread into theme.extend in tailwind.config.js.
// Monochrome ink on cream, one vermilion accent for interaction rewards only.

module.exports = {
  colors: {
    ink: "#16140f",
    paper: "#f3ede0",
    paper2: "#e7dfcd",
    paper3: "#dcd2bb",
    greyish: "#8c867a",
    pop: "#ed4a2b",
  },
  fontFamily: {
    display: ['"Unbounded"', "system-ui", "sans-serif"],
    body: ['"Golos Text"', "system-ui", "sans-serif"],
  },
  boxShadow: {
    comic: "5px 5px 0 #16140f",
    "comic-sm": "3px 3px 0 #16140f",
  },
  borderRadius: {
    card: "16px",
    tag: "30px",
  },
  backgroundImage: {
    halftone: "radial-gradient(#16140f 0.6px, transparent 0.7px)",
  },
  backgroundSize: {
    dots: "7px 7px",
    "dots-lg": "11px 11px",
  },
  keyframes: {
    press: {
      "0%,8%": { transform: "none", boxShadow: "5px 5px 0 #16140f" },
      "16%,30%": { transform: "translate(4px,4px)", boxShadow: "0 0 0 #16140f" },
      "40%,100%": { transform: "none", boxShadow: "5px 5px 0 #16140f" },
    },
    stampIn: {
      "0%": { transform: "scale(0) rotate(-18deg)", opacity: "0" },
      "55%": { transform: "scale(1.2) rotate(-8deg)", opacity: "1" },
      "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
    },
    shake: {
      "0%,100%": { transform: "translateX(0)" },
      "20%": { transform: "translateX(-8px)" },
      "40%": { transform: "translateX(7px)" },
      "60%": { transform: "translateX(-6px)" },
      "80%": { transform: "translateX(4px)" },
    },
  },
  animation: {
    press: "press 0.35s ease",
    stampIn: "stampIn 0.4s cubic-bezier(.2,1.6,.4,1)",
    shake: "shake 0.4s ease",
  },
};
