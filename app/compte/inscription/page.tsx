import Link from "next/link";
import type { Metadata } from "next";
import FormulaireCompte from "@/components/FormulaireCompte";

export const metadata: Metadata = { title: "Créer un compte" };

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-fond px-5 py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold tracking-[-0.03em]">Créer un compte</h1>
        <FormulaireCompte mode="inscription" />
        <p className="mt-5 text-center text-[14.5px] text-grisTexte">
          Déjà un compte ?{" "}
          <Link href="/compte/connexion" className="font-bold text-violet underline hover:opacity-70">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
