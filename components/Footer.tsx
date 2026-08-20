import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-encre text-creme">
      <div className="mx-auto grid max-w-[1400px] gap-[34px] px-[clamp(12px,2.5vw,22px)] pb-[26px] pt-12 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        <div>
          <p className="mb-2.5 font-mono text-[17px] font-bold text-vertClair">SERVIOTEK</p>
          <p className="max-w-[34ch] text-sm leading-[1.55] text-[#9a9d9f]">
            Petits gadgets électriques du quotidien, au juste prix.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="mb-1 font-mono text-[11px] tracking-[0.1em] text-[#74777a]">INFOS</p>
          <Link href="/a-propos" className="text-sm text-clairMuted hover:text-white">À propos</Link>
          <Link href="/livraison" className="text-sm text-clairMuted hover:text-white">Livraison &amp; délais</Link>
          <Link href="/retours" className="text-sm text-clairMuted hover:text-white">Retours</Link>
          <Link href="/retractation" className="text-sm text-clairMuted hover:text-white">Formulaire de rétractation</Link>
          <Link href="/cgv" className="text-sm text-clairMuted hover:text-white">CGV</Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="mb-1 font-mono text-[11px] tracking-[0.1em] text-[#74777a]">CONTACT</p>
          <Link href="/contact" className="text-sm text-clairMuted hover:text-white">Nous écrire</Link>
          <a href="mailto:contact@serviotek.com" className="text-sm text-clairMuted hover:text-white">
            contact@serviotek.com
          </a>
          <Link href="/mentions-legales" className="text-sm text-clairMuted hover:text-white">Mentions légales</Link>
          <Link href="/confidentialite" className="text-sm text-clairMuted hover:text-white">Confidentialité</Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] border-t border-sepSombre px-[clamp(12px,2.5vw,22px)] py-4 font-mono text-[11px] text-[#74777a]">
        © {new Date().getFullYear()} SERVIOTEK — SASU
      </div>
    </footer>
  );
}
