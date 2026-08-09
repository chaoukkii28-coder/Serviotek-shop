
import type { Config } from "tailwindcss";
 
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#14151A",
        panel: "#FFFFFF",
        volt: "#C8FF3D",
        wire: "#E4E6EB",
        mist: "#5B6169",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
 
