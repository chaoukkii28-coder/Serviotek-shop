import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { User } from "lucide-react";

const MESSAGES = [
  { icon: "🌱", label: "Produits durables" },
  { icon: "🔧", label: "Réparables" },
  { icon: "♻️", label: "Emballages responsables" },
];

// Positions en % dans la zone d'illustration (top, left, taille, pulse ?)
const PEOPLE = [
  { top: "10%", left: "20%", size: 34, pulse: false },
  { top: "5%", left: "55%", size: 46, pulse: true },
  { top: "20%", left: "85%", size: 30, pulse: false },
  { top: "45%", left: "10%", size: 30, pulse: false },
  { top: "48%", left: "50%", size: 50, pulse: true },
  { top: "50%", left: "80%", size: 30, pulse: false },
  { top: "82%", left: "30%", size: 26, pulse: false },
  { top: "85%", left: "58%", size: 26, pulse: false },
  { top: "80%", left: "78%", size: 26, pulse: false },
];

const LINKS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
];

// Conversion des % en coordonnées approximatives pour tracer les lignes (sur une grille 300x260)
const toXY = (p: { top: string; left: string }) => ({
  x: (parseFloat(p.left) / 100) * 300,
  y: (parseFloat(p.top) / 100) * 260,
});

export default function Home() {
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(#E4E6EB 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
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
              <div className="relative w-full max-w-sm aspect-[300/260]">
                {/* Lignes de connexion en fond */}
                <svg
                  viewBox="0 0 300 260"
                  className="absolute inset-0 w-full h-full"
                  aria-hidden="true"
                >
                  <g stroke="#D8DBE2" strokeWidth="1.5" fill="none">
                    {LINKS.map(([a, b], i) => {
                      const pa = toXY(PEOPLE[a]);
                      const pb = toXY(PEOPLE[b]);
                      return (
                        <line key={i} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} />
                      );
                    })}
                  </g>
                </svg>

                {/* Personnes */}
                {PEOPLE.map((p, i) => (
                  <div
                    key={i}
                    className={`absolute flex items-center justify-center rounded-full bg-volt/20 ${
                      p.pulse ? "animate-pulse-slow" : ""
                    }`}
                    style={{
                      top: p.top,
                      left: p.left,
                      width: p.size,
                      height: p.size,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <User
                      size={p.size * 0.6}
                      className="text-graphite"
                      strokeWidth={2.2}
                      fill="#C8FF3D"
                    />
                  </div>
                ))}
              </div>
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
