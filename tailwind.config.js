/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-foto": "url('/images/login.jpg')",
        "signup-foto": "url('/images/signup.jpg')",
      },
      dropShadow: {
        "left-shadow": "-25px 25px 25px rgb(0 0 0 / 0.15)",
      },
      fontFamily: {
        raleway: ["var(--font-raleway)"],
        roboto: ["var(--font-roboto)"],
      },
      colors: {
        "happy-memories-l": "#ff5858",
        "happy-memories-r": "#f09819",
        "nav-grey": "#A6ADAF",
        "nav-grey-200": "#2A303C",
        trash: "#FF0022",
        "cherry-700": "#c01525",
        "cherry-800": "#a41623",
      },
      spacing: {
        "card-420": "26.25rem",
        "add-product": "32rem",
        modal: "512px",
      },
      maxWidth: {
        "upload-image": "256px",
      },
      zIndex: {
        100: 100,
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
          "0%": { transform: "rotate(-3deg)" },
          "25%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-6deg)" },
          "75%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
