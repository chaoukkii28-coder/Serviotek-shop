/**
 * Bloc « Assistance Technique Express » : service téléphonique optionnel et
 * payant (numéro surtaxé), distinct du service client.
 *
 * Ne s'affiche que si la variable d'environnement
 * NEXT_PUBLIC_NUMERO_ASSISTANCE contient un numéro à 10 chiffres
 * (ex. « 0 895 12 34 56 »). Tant que le numéro n'est pas commandé chez
 * l'opérateur, le bloc reste invisible : aucun faux numéro en ligne.
 *
 * Deux obligations à ne pas retirer :
 * - le tarif reste accolé au numéro (signalétique des numéros surtaxés) ;
 * - le contact gratuit reste affiché dessous : un numéro surtaxé est interdit
 *   pour le suivi de commande et les réclamations (Code de la consommation,
 *   art. L. 121-16, amende jusqu'à 15 000 € pour une société).
 */

const NUMERO = (process.env.NEXT_PUBLIC_NUMERO_ASSISTANCE || "").trim();

/** Doit correspondre exactement au palier réglé chez l'opérateur. */
const TARIF = "Service 0,80 € / min + prix appel";

/** Horaires auxquels quelqu'un décroche réellement. */
const HORAIRES = "Du lundi au vendredi, 9h–18h";

/** Canal gratuit pour tout ce qui touche à une commande. */
const EMAIL_GRATUIT = "service@serviotek.com";

export default function AssistanceExpress() {
  const chiffres = NUMERO.replace(/\D/g, "");
  if (chiffres.length !== 10) return null;

  return (
    <section className="rounded bg-white p-[22px]" aria-labelledby="assistance-express">
      <p className="mb-2 font-mono text-[11.5px] tracking-[0.1em] text-violet">
        SERVICE OPTIONNEL PAYANT
      </p>
      <h2 id="assistance-express" className="text-[16px] font-bold">
        Assistance Technique Express
      </h2>
      <p className="mt-1 text-[14.5px] leading-[1.6] text-grisTexte">
        Installation, appairage, réglages : un technicien vous guide en direct par téléphone.
      </p>

      {/* Le prix reste collé au numéro : ne pas les séparer. */}
      <div className="mt-4 flex flex-wrap overflow-hidden rounded border-2 border-violet">
        <a
          href={`tel:${chiffres}`}
          aria-label={`Appeler le ${NUMERO}. ${TARIF}`}
          className="flex flex-1 basis-[180px] items-center justify-center whitespace-nowrap bg-white px-3.5 py-2.5 font-mono text-[20px] font-bold text-violet"
        >
          {NUMERO}
        </a>
        <span className="flex flex-1 basis-[180px] items-center justify-center bg-violet px-3.5 py-2.5 text-center font-mono text-[12.5px] font-bold text-white">
          {TARIF}
        </span>
      </div>

      <p className="mt-2 text-[13px] text-grisTexte">
        {HORAIRES}. Le tarif est annoncé gratuitement au début de l&apos;appel.
      </p>

      <p className="mt-3 border-t border-bordureSep pt-3 text-[13px] text-grisTexte">
        Suivi de commande, retour ou réclamation ? C&apos;est gratuit :{" "}
        <a href={`mailto:${EMAIL_GRATUIT}`} className="font-bold text-encre underline hover:text-violet">
          {EMAIL_GRATUIT}
        </a>
      </p>
    </section>
  );
}
