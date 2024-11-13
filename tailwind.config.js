/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B69FF",
        secondary: "#7E858E",
        success: "#1DB05F",
        warning: "#FFB800",
        general: "#171F46",
        error: "#FF0B37",
      },
    },
  },
  plugins: [],
};
