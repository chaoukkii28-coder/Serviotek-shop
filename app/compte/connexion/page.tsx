import Link from "next/link";
import type { Metadata } from "next";
import FormulaireCompte from "@/components/FormulaireCompte";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="mb-6 text-center font-display text-3xl font-bold">Connexion</h1>
      <FormulaireCompte mode="connexion" />
      <p className="mt-5 text-center text-sm font-medium text-graphite">
        Pas encore de compte ?{" "}
        <Link href="/compte/inscription" className="font-bold underline hover:opacity-70">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
