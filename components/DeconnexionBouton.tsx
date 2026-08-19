"use client";

import { useRouter } from "next/navigation";

export default function DeconnexionBouton() {
  const router = useRouter();

  async function deconnecter() {
    await fetch("/api/compte/deconnexion", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={deconnecter}
      className="text-sm font-bold underline hover:opacity-70"
    >
      Se déconnecter
    </button>
  );
}
