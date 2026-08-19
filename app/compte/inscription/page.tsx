import Link from "next/link";
import type { Metadata } from "next";
import FormulaireCompte from "@/components/FormulaireCompte";

export const metadata: Metadata = { title: "Créer un compte" };

export default function InscriptionPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="mb-6 text-center font-display text-3xl font-bold">Créer un compte</h1>
      <FormulaireCompte mode="inscription" />
      <p className="mt-5 text-center text-sm font-medium text-graphite">
        Déjà un compte ?{" "}
        <Link href="/compte/connexion" className="font-bold underline hover:opacity-70">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
