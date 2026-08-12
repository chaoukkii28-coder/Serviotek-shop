// Fond décoratif fixe : lignes de trajectoires courbes (style routes aériennes)
// + petits points "nœuds", très discret, derrière tout le contenu du site.

const ROUTES = [
  { x1: 40, y1: 120, x2: 340, y2: 60, curve: -60 },
  { x1: 340, y1: 60, x2: 620, y2: 180, curve: 70 },
  { x1: 620, y1: 180, x2: 900, y2: 90, curve: -50 },
  { x1: 60, y1: 420, x2: 360, y2: 340, curve: 60 },
  { x1: 360, y1: 340, x2: 660, y2: 460, curve: -70 },
  { x1: 660, y1: 460, x2: 950, y2: 380, curve: 60 },
  { x1: 120, y1: 720, x2: 420, y2: 640, curve: -60 },
  { x1: 420, y1: 640, x2: 720, y2: 760, curve: 70 },
  { x1: 720, y1: 760, x2: 960, y2: 680, curve: -50 },
  { x1: 200, y1: 260, x2: 520, y2: 520, curve: 40 },
  { x1: 500, y1: 100, x2: 780, y2: 400, curve: -40 },
];

const NODES = [
  { x: 40, y: 120 }, { x: 340, y: 60 }, { x: 620, y: 180 }, { x: 900, y: 90 },
  { x: 60, y: 420 }, { x: 360, y: 340 }, { x: 660, y: 460 }, { x: 950, y: 380 },
  { x: 120, y: 720 }, { x: 420, y: 640 }, { x: 720, y: 760 }, { x: 960, y: 680 },
  { x: 200, y: 260 }, { x: 520, y: 520 }, { x: 500, y: 100 }, { x: 780, y: 400 },
];

function arcPath(r: { x1: number; y1: number; x2: number; y2: number; curve: number }) {
  const mx = (r.x1 + r.x2) / 2;
  const my = (r.y1 + r.y2) / 2 + r.curve;
  return `M ${r.x1} ${r.y1} Q ${mx} ${my} ${r.x2} ${r.y2}`;
}

export default function ConnectionBackground() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#C8FF3D" strokeOpacity="0.35" strokeWidth="1.4" fill="none">
        {ROUTES.map((r, i) => (
          <path key={i} d={arcPath(r)} strokeDasharray="1 7" strokeLinecap="round" />
        ))}
      </g>
      <g fill="#9CA3AF" fillOpacity="0.4">
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="3" />
        ))}
      </g>
    </svg>
  );
}
