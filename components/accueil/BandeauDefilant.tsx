const MESSAGES = [
  "LIVRAISON FRANCE, BELGIQUE, SUISSE ET LUXEMBOURG",
  "RETOURS SOUS 14 JOURS",
  "PRODUITS RÉPARABLES",
  "EMBALLAGES RESPONSABLES",
  "JUSQU'À -24 % CETTE SEMAINE",
  "PAIEMENT SÉCURISÉ",
];

/** Liste dupliquée pour que la boucle de -50% soit invisible. */
const DEFILEMENT = [...MESSAGES, ...MESSAGES];

export default function BandeauDefilant() {
  return (
    <section className="overflow-hidden rounded bg-violet">
      <div className="flex w-max animate-[marquee-defilement_26s_linear_infinite]">
        {DEFILEMENT.map((m, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 whitespace-nowrap px-[22px] py-[11px] font-mono text-[12.5px] tracking-[0.05em] text-white"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-vertClair" />
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}
