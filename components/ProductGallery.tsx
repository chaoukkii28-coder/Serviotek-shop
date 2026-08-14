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
    <div>
      <div className="relative aspect-square bg-panel border border-wire rounded-2xl overflow-hidden">
        <Image src={images[active]} alt={alt} fill className="object-cover" priority />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-volt" : "border-wire hover:border-mist"
              }`}
              aria-label={`Photo ${i + 1}`}
            >
              <Image src={src} alt={`${alt} — photo ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
