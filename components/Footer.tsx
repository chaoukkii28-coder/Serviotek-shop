import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-wire mt-24">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-mist">
        <div>
          <p className="font-display font-bold text-white mb-2">SERVIOTEK</p>
          <p>Petits gadgets électriques du quotidien, au juste prix.</p>
        </div>
        <div>
          <p className="text-white font-medium mb-2">Infos</p>
          <ul className="space-y-1">
            <li><Link href="/livraison" className="hover:text-white">Livraison &amp; délais</Link></li>
            <li><Link href="/retours" className="hover:text-white">Retours</Link></li>
            <li><Link href="/retractation" className="hover:text-white">Formulaire de rétractation</Link></li>
            <li><Link href="/cgv" className="hover:text-white">CGV</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-medium mb-2">Contact</p>
          <p>contact@serviotek.com</p>
        </div>
      </div>
      <p className="text-center text-xs text-mist/60 pb-6">
        © {new Date().getFullYear()} Serviotek — SASU
      </p>
    </footer>
  );
}
