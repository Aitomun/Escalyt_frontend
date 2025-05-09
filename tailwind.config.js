/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#F8FAFC',
      
      },
      screens: {
        sm: "640px", // Small screens (e.g., phones)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops)
        xl: "1280px", // Extra large screens (e.g., desktops)
        "2xl": "1536px", // 2xl screens (e.g., large desktops)
      },
    },
  },
  plugins: [],
};