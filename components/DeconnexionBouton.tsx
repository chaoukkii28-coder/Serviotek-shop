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
      className="font-mono text-[12.5px] text-violet hover:opacity-70"
    >
      Se déconnecter
    </button>
  );
}
