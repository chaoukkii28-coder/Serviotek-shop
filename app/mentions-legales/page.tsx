import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur du site, RCS, capital social, siège social, directeur de la publication et hébergeur.",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-16">
      <div className="mx-auto max-w-2xl rounded bg-white p-[clamp(24px,4vw,40px)]">
      <h1 className="mb-6 text-2xl font-bold tracking-[-0.03em]">Mentions légales</h1>
      <div className="space-y-4 text-[14.5px] leading-[1.6] text-grisTexte">
        <p><strong className="font-bold text-encre">Éditeur du site :</strong> Service, Société par actions simplifiée à associé unique (SASU)</p>
        <p><strong className="font-bold text-encre">RCS :</strong> 104 280 516 R.C.S. Paris</p>
        <p><strong className="font-bold text-encre">Capital social :</strong> 50 000,00 €</p>
        <p><strong className="font-bold text-encre">Siège social :</strong> Bureau 326, 59 rue de Ponthieu, 75008 Paris</p>
        <p><strong className="font-bold text-encre">Président :</strong> Monsieur Mohamed Chaouki Bouhadjera</p>
        <p><strong className="font-bold text-encre">Directeur de la publication :</strong> Monsieur Mohamed Chaouki Bouhadjera</p>
        <p><strong className="font-bold text-encre">Contact :</strong> service@serviotek.com</p>
        <p><strong className="font-bold text-encre">Hébergeur :</strong> Vercel Inc., 340 South Lemon Avenue #4133, Walnut, CA 91789, USA</p>
      </div>
      </div>
    </div>
  );
}
