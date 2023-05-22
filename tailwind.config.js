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
      },
      spacing: {
        "card-420": "26.25rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
