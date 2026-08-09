import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";

const MESSAGES = [
  { icon: "🌱", label: "Produits durables" },
  { icon: "🔧", label: "Réparables" },
  { icon: "♻️", label: "Emballages responsables" },
];

// Visages répartis sur toute la largeur (position en %, décalage vertical, taille, pulse ?)
const FACES = [
  { left: "4%", offset: 10, size: 56, pulse: false, img: 12 },
  { left: "16%", offset: -6, size: 44, pulse: false, img: 5 },
  { left: "28%", offset: 14, size: 62, pulse: true, img: 33 },
  { left: "40%", offset: -10, size: 46, pulse: false, img: 47 },
  { left: "52%", offset: 6, size: 58, pulse: false, img: 20 },
  { left: "64%", offset: -12, size: 50, pulse: true, img: 65 },
  { left: "76%", offset: 8, size: 46, pulse: false, img: 25 },
  { left: "88%", offset: -4, size: 54, pulse: false, img: 8 },
  { left: "96%", offset: 12, size: 40, pulse: false, img: 40 },
];

const LINKS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [7, 8], [1, 3], [4, 6],
];

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
        <div className="max-w-6xl mx-auto px-5 pt-14">
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

        {/* Bande de visages en pleine largeur */}
        <div className="relative w-full h-56 sm:h-72 mt-10">
          <svg
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <g stroke="#D8DBE2" strokeWidth="1.5" fill="none">
              {LINKS.map(([a, b], i) => {
                const pa = FACES[a];
                const pb = FACES[b];
                const ax = parseFloat(pa.left) * 10;
                const bx = parseFloat(pb.left) * 10;
                const ay = 100 + pa.offset * 2;
                const by = 100 + pb.offset * 2;
                return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} />;
              })}
            </g>
          </svg>

          {FACES.map((f, i) => (
            <div
              key={i}
              className={`absolute rounded-full overflow-hidden border-2 border-white shadow-md ${
                f.pulse ? "animate-pulse-slow" : ""
              }`}
              style={{
                left: f.left,
                top: `calc(50% + ${f.offset}px)`,
                width: f.size,
                height: f.size,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src={`https://i.pravatar.cc/150?img=${f.img}`}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="catalogue" className="max-w-6xl mx-auto px-5 pt-10 pb-24">
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
