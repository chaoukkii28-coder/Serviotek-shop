"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const INTERVALLE_MS = 2600;

/**
 * Solution d'attente en l'absence de vidéo produit : fait défiler des photos
 * en boucle avec un fondu. Le jour où un vrai fichier vidéo existe, ce
 * composant se remplace par un <video autoPlay muted loop playsInline
 * poster={photos[0]} src="..." /> sans toucher au reste de MeilleureVente.tsx
 * (même conteneur `absolute inset-0`, même alt sur la première image).
 */
export default function SequencePhotos({ photos, alt }: { photos: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [anime, setAnime] = useState(true);
  const intervalle = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduitMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnime(!reduitMotion);
    if (reduitMotion) return;

    intervalle.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, INTERVALLE_MS);
    return () => {
      if (intervalle.current) clearInterval(intervalle.current);
    };
  }, [photos.length]);

  return (
    <div className="absolute inset-0">
      {photos.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          sizes="(max-width: 640px) 90vw, 420px"
          className="object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: anime ? (i === index ? 1 : 0) : i === 0 ? 1 : 0 }}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
