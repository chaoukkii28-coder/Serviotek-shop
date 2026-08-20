import { products } from "@/lib/products";
import { produitsEnAvant } from "@/lib/vitrine";
import BlocsAccroche from "@/components/accueil/BlocsAccroche";
import OffresDuJour from "@/components/accueil/OffresDuJour";
import BandeauDefilant from "@/components/accueil/BandeauDefilant";
import GrilleProduits from "@/components/accueil/GrilleProduits";
import TuilesRayons from "@/components/accueil/TuilesRayons";

export default function Home() {
  return (
    <div className="min-h-screen bg-fond text-encre">
      <div className="bg-violet px-[clamp(12px,2.5vw,22px)] py-2.5 text-center font-mono text-[12.5px] tracking-[0.06em] text-white">
        LIVRAISON FRANCE · BELGIQUE · SUISSE · LUXEMBOURG · RETOURS 14 JOURS
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-3.5 px-[clamp(12px,2.5vw,22px)] pb-[60px] pt-3.5">
        <BlocsAccroche />
        <OffresDuJour />
        <BandeauDefilant />
        <GrilleProduits
          titre="Les plus achetés"
          produits={produitsEnAvant(6)}
          minWidth={112}
        />
        <TuilesRayons />
        <GrilleProduits
          id="catalogue"
          titre="Tout le catalogue"
          produits={products}
          minWidth={120}
          afficherCategorie
        />
      </div>
    </div>
  );
}
