/** Cinq étoiles, remplies jusqu'à la note. Purement visuel. */
export default function Etoiles({
  note,
  taille = "text-base",
}: {
  note: number;
  taille?: string;
}) {
  return (
    <span className={`${taille} leading-none text-amber-500`} aria-hidden="true">
      {"★★★★★".slice(0, Math.round(note))}
      <span className="text-wire">{"★★★★★".slice(Math.round(note))}</span>
    </span>
  );
}
