/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "atmos-dark": "#0a0a0f",
        "atmos-light": "#f4f4f5",
        primary: "#d6baff",
        secondary: "#d3fbff",
        tertiary: "#ddb7ff",
        "on-surface-variant": "#cdc2d7",
        "on-surface": "#e7defa",
        outline: "#968da0",
        "primary-container": "#aa73ff",
        "on-primary-container": "#3a0079",
        "secondary-container": "#00eefc",
        "on-secondary-container": "#00686f",
        "tertiary-container": "#b175ea",
        "surface-container-lowest": "#0f0b1e",
        "secondary-fixed": "#7df4ff",
        "secondary-fixed-dim": "#00dbe9",
        "primary-fixed-dim": "#d6baff",
        "tertiary-fixed-dim": "#ddb7ff",
        
      },
      spacing: {
        unit: "8px",
        margin: "40px",
        gutter: "24px",
        "container-padding": "32px",
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        serif: ["Crimson Text", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "gradient-flow": "gradient-flow 6s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: 0.8, filter: "brightness(1)" },
          "100%": { opacity: 1, filter: "brightness(1.2)" },
        },
        flash: {
          "0%, 95%, 98%": { opacity: 0 },
          "96%, 99%": { opacity: 1 },
        },
        "gradient-flow": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
