import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-wire mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm font-semibold text-graphite">
        <div>
          <p className="font-display font-bold text-graphite mb-2">SERVIOTEK</p>
          <p>Petits gadgets électriques du quotidien, au juste prix.</p>
        </div>
        <div>
          <p className="mb-2 font-bold text-graphite">Infos</p>
          <ul className="space-y-1">
            <li><Link href="/livraison" className="hover:opacity-70">Livraison &amp; délais</Link></li>
            <li><Link href="/retours" className="hover:opacity-70">Retours</Link></li>
            <li><Link href="/retractation" className="hover:opacity-70">Formulaire de rétractation</Link></li>
            <li><Link href="/cgv" className="hover:opacity-70">CGV</Link></li>
            <li><Link href="/mentions-legales" className="hover:opacity-70">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:opacity-70">Confidentialité</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-2 font-bold text-graphite">Contact</p>
          <p>contact@serviotek.com</p>
        </div>
      </div>
      <p className="pb-6 text-center text-xs font-semibold text-graphite/70">
        © {new Date().getFullYear()} Serviotek — SASU
      </p>
    </footer>
  );
}
