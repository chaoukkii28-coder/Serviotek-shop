"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className={images.length > 1 ? "grid grid-cols-[64px_1fr] gap-2.5" : ""}>
      {images.length > 1 && (
        <div className="flex flex-col gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-[3px] border-2 transition-colors ${
                i === active ? "border-violet" : "border-transparent hover:border-bordureChamp"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-square overflow-hidden rounded-[3px] bg-[repeating-linear-gradient(135deg,#e7e5df_0_6px,#f1efe9_6px_12px)]">
        <Image src={images[active]} alt={alt} fill sizes="(max-width: 640px) 90vw, 480px" className="object-cover" priority />
      </div>
    </div>
  );
}
