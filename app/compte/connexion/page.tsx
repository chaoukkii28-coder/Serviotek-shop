import Link from "next/link";
import type { Metadata } from "next";
import FormulaireCompte from "@/components/FormulaireCompte";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-fond px-5 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-[-0.03em]">Connexion</h1>
        <FormulaireCompte mode="connexion" />
        <p className="mt-5 text-center text-[14.5px] text-grisTexte">
          Pas encore de compte ?{" "}
          <Link href="/compte/inscription" className="font-bold text-violet underline hover:opacity-70">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
