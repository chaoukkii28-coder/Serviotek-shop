import Link from "next/link";
import type { Metadata } from "next";
import FormulaireContact from "@/components/FormulaireContact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contacter Serviotek par e-mail, réponse sous 24 h ouvrées.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-fond px-[clamp(12px,2.5vw,22px)] py-3.5">
      <div className="mx-auto grid max-w-[1400px] items-start gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        <div className="rounded bg-white p-[clamp(20px,3vw,32px)]">
          <h1 className="mb-2 text-2xl font-bold tracking-[-0.03em]">Nous écrire</h1>
          <p className="mb-6 text-[14.5px] text-grisTexte">Réponse sous 24 h ouvrées.</p>
          <FormulaireContact />
        </div>

        <div className="flex flex-col gap-3.5">
          <div className="rounded bg-white p-6">
            <p className="mb-3 font-mono text-[11px] tracking-[0.1em] text-grisLabel">CONTACT DIRECT</p>
            <a href="mailto:service@serviotek.com" className="text-[17px] font-medium text-encre hover:text-violet">
              service@serviotek.com
            </a>
            <p className="mt-2 text-[14px] text-grisTexte">Du lundi au vendredi, 9h–18h.</p>
          </div>

          <div className="rounded bg-encre p-6 text-creme">
            <p className="mb-3 font-mono text-[11px] tracking-[0.1em] text-vertClair">
              QUESTIONS FRÉQUENTES
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-[#d3d5d3]">
              <li><Link href="/livraison" className="hover:text-white">Combien de temps pour être livré ?</Link></li>
              <li><Link href="/retours" className="hover:text-white">Comment retourner un produit ?</Link></li>
              <li><Link href="/retractation" className="hover:text-white">Comment me rétracter ?</Link></li>
              <li><Link href="/cgv" className="hover:text-white">Où sont les conditions de vente ?</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
