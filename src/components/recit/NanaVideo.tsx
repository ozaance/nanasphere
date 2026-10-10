"use client";

import { useEffect, useRef } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

// Animation du portrait (chapitre III). Rien n'est téléchargé avant que le
// portrait soit visible à 50 % ; elle se joue une seule fois et reste figée sur
// sa dernière image. Mouvement réduit, économie de données, réseau très lent
// ou lecture refusée (iOS en économie d'énergie) : le poster reste affiché.
export function NanaVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        video.play().catch(() => {
          // lecture refusée : on garde le poster, sans message
        });
      },
      { threshold: 0.5 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="portrait-media"
      role="img"
      aria-label="Nana, longues locks et collier doré, sous un ciel indigo traversé d’une nébuleuse dorée"
      poster="/media/nana-muse-poster.jpg"
      width={720}
      height={960}
      muted
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
    >
      <source src="/media/nana-muse.webm" type='video/webm; codecs="vp9"' />
      <source src="/media/nana-muse.mp4" type="video/mp4" />
    </video>
  );
}
