import { decomposerPrix } from "@/lib/vitrine";

/** Prix façon Amazon : symbole et centimes petits, euros en gros. */
export default function PrixAmazon({
  prix,
  tailleSymbole,
  tailleEuros,
  tailleCentimes,
  className = "",
}: {
  prix: number;
  tailleSymbole: number;
  tailleEuros: number;
  tailleCentimes: number;
  className?: string;
}) {
  const { euros, centimes } = decomposerPrix(prix);

  return (
    <span
      className={`inline-flex items-baseline gap-[2px] font-mono font-bold ${className}`}
      style={{ color: "#16181a" }}
    >
      <span style={{ fontSize: tailleSymbole }}>€</span>
      <span style={{ fontSize: tailleEuros }}>{euros}</span>
      <span style={{ fontSize: tailleCentimes }}>{centimes}</span>
    </span>
  );
}
