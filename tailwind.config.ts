
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

        // Système visuel de la refonte "boutique dense" (accueil, puis pages
        // internes au fur et à mesure). Coexiste avec les tokens ci-dessus
        // tant que toutes les pages n'ont pas été migrées.
        fond: "#eef0ec",
        encre: "#16181a",
        grisTexte: "#55585d",
        grisDiscret: "#6c706b",
        grisLabel: "#85888c",
        vert: "oklch(0.52 0.13 158)",
        vertClair: "oklch(0.82 0.14 158)",
        vertTexteSombre: "#0f1a14",
        violet: "oklch(0.48 0.17 295)",
        bordureChamp: "#d5d8d3",
        bordureSep: "#eceae4",
        bordureGrille: "#e7e5df",
        carteSombre: "#212325",
        carteSombreHover: "#2b2d30",
        boutonNav: "#26282a",
        sepSombre: "#2b2d2f",
        clairMuted: "#c8cac7",
        creme: "#f4f3ec",
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
 
