
import type { Config } from "tailwindcss";
 
const config: Config = {
  // lib/ doit être scanné : les couleurs des rayons y sont déclarées sous
  // forme de chaînes (lib/categories.ts). Sans ce chemin, Tailwind ne voit
  // pas ces classes et ne génère pas le CSS correspondant — les pastilles de
  // couleur disparaissent alors du menu et de la page d'accueil.
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
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
 
