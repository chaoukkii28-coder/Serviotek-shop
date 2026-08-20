import Image from "next/image";

/**
 * Tuile carrée avec un fond de secours rayé toujours visible derrière l'image
 * (évite un trou blanc si une image externe est lente ou indisponible).
 */
export default function Vignette({
  src,
  alt,
  sizes = "140px",
  sombre = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  sombre?: boolean;
  className?: string;
}) {
  const fond = sombre
    ? "bg-[repeating-linear-gradient(135deg,#2c2e31_0_4px,#34363a_4px_8px)]"
    : "bg-[repeating-linear-gradient(135deg,#e7e5df_0_6px,#f1efe9_6px_12px)]";

  return (
    <div className={`relative aspect-square overflow-hidden rounded-[3px] ${fond} ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
