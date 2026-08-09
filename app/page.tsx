import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const MESSAGES = [
  { icon: "🌱", label: "Produits durables" },
  { icon: "🔧", label: "Réparables" },
  { icon: "♻️", label: "Emballages responsables" },
];

// Positions des personnes dans le réseau (x, y, échelle, pulse ?)
const NODES = [
  { x: 60, y: 60, scale: 1, pulse: false },
  { x: 160, y: 40, scale: 1.3, pulse: true },
  { x: 260, y: 70, scale: 0.9, pulse: false },
  { x: 90, y: 150, scale: 0.9, pulse: false },
  { x: 150, y: 140, scale: 1.4, pulse: true },
  { x: 230, y: 160, scale: 0.9, pulse: false },
  { x: 120, y: 220, scale: 0.8, pulse: false },
  { x: 170, y: 220, scale: 0.8, pulse: false },
  { x: 210, y: 220, scale: 0.8, pulse: false },
];

const LINKS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        {/* Fond décoratif : dégradé doux + grille de points */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 78% 30%, rgba(200,255,61,0.16), transparent 55%), radial-gradient(circle, #E4E6EB 1px, transparent 1px)",
            backgroundSize: "auto, 22px 22px",
          }}
        />

        <div className="max-w-6xl mx-auto px-5 pt-14 pb-16">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            {/* Texte */}
            <div className="flex-1">
              <p className="font-mono text-volt text-sm mb-3">// petits objets, vrai usage</p>
              <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight leading-[1.05]">
                Tous connectés
              </h1>

              <div className="flex flex-wrap gap-2 mt-6">
                {MESSAGES.map((m) => (
                  <span
                    key={m.label}
                    className="inline-flex items-center gap-2 rounded-full border border-wire bg-panel px-3 py-1.5 text-xs font-medium text-mist shadow-sm"
                  >
                    <span aria-hidden="true">{m.icon}</span>
                    {m.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Illustration : réseau de personnes connectées */}
            <div className="flex-1 flex justify-center md:justify-end">
              <svg
                viewBox="0 0 320 260"
                className="w-full max-w-sm"
                role="img"
                aria-label="Illustration de personnes connectées entre elles"
              >
                <defs>
                  {/* Silhouette : tête + buste, centrée en (0,0), plus grande et nette */}
                  <g id="person">
                    <circle cx="0" cy="-10" r="7" fill="#C8FF3D" />
                    <path
                      d="M -12 16 C -12 2, 12 2, 12 16 L 12 19 C 12 21, -12 21, -12 19 Z"
                      fill="#C8FF3D"
                    />
                  </g>
                </defs>

                {/* Lignes de connexion */}
                <g stroke="#C7CBD3" strokeWidth="1.5" fill="none">
                  {LINKS.map(([a, b], i) => (
                    <line
                      key={i}
                      x1={NODES[a].x}
                      y1={NODES[a].y}
                      x2={NODES[b].x}
                      y2={NODES[b].y}
                    />
                  ))}
                </g>

                {/* Personnes */}
                {NODES.map((n, i) => (
                  <g
                    key={i}
                    transform={`translate(${n.x} ${n.y}) scale(${n.scale})`}
                    className={n.pulse ? "origin-center animate-pulse-slow" : ""}
                  >
                    <use href="#person" x="0" y="0" transform="translate(0,0)" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogue" className="max-w-6xl mx-auto px-5 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 rounded-full bg-volt" />
          <h2 className="font-display font-bold text-xl">Catalogue</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
