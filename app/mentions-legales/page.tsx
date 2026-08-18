import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur du site, RCS, capital social, siège social, directeur de la publication et hébergeur.",
};

export default function MentionsLegales() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 prose-invert">
      <h1 className="font-display font-bold text-2xl mb-6">Mentions légales</h1>
      <div className="space-y-4 text-sm text-mist leading-relaxed">
        <p><strong className="font-bold text-graphite">Éditeur du site :</strong> Service, Société par actions simplifiée à associé unique (SASU)</p>
        <p><strong className="font-bold text-graphite">RCS :</strong> 104 280 516 R.C.S. Paris</p>
        <p><strong className="font-bold text-graphite">Capital social :</strong> 50,00 €</p>
        <p><strong className="font-bold text-graphite">Siège social :</strong> Bureau 326, 59 rue de Ponthieu, 75008 Paris</p>
        <p><strong className="font-bold text-graphite">Président :</strong> Monsieur Mohamed Chaouki Bouhadjera</p>
        <p><strong className="font-bold text-graphite">Directeur de la publication :</strong> Monsieur Mohamed Chaouki Bouhadjera</p>
        <p><strong className="font-bold text-graphite">Contact :</strong> contact@serviotek.com</p>
        <p><strong className="font-bold text-graphite">Hébergeur :</strong> Vercel Inc., 340 South Lemon Avenue #4133, Walnut, CA 91789, USA</p>
      </div>
    </div>
  );
}
