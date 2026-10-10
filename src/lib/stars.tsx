import type { CSSProperties } from "react";

// Étoiles générées de façon déterministe (maquettes). À n'appeler que depuis des
// composants serveur : Math.sin peut varier d'un moteur JS à l'autre, ce qui
// casserait l'hydratation si le calcul était refait dans le navigateur.

function starStyle(fx: number, fy: number, fz: number): CSSProperties {
  const sz = fz > 0.93 ? 3 : fz > 0.7 ? 2 : 1.4;
  return {
    left: (fx * 100).toFixed(2) + "%",
    top: (fy * 100).toFixed(2) + "%",
    width: sz,
    height: sz,
    background: fz > 0.9 ? "var(--gold-pale)" : "var(--cream)",
    opacity: +(0.25 + fz * 0.5).toFixed(2),
    animationDuration: (3 + fz * 5).toFixed(1) + "s",
    animationDelay: (fx * 4).toFixed(1) + "s",
  };
}

const frac = (v: number) => v - Math.floor(v);

/** Ciel de l'écran d'accueil : 110 points (Main.dc.html). */
export function gateStars(): CSSProperties[] {
  const out: CSSProperties[] = [];
  for (let i = 0; i < 110; i++) {
    out.push(
      starStyle(
        frac(Math.sin(i * 12.9898) * 43758.5453),
        frac(Math.sin(i * 78.233) * 12543.2381),
        frac(Math.sin(i * 39.346) * 9871.123),
      ),
    );
  }
  return out;
}

/** Une couche d'étoiles du récit (Recit.dc.html, layer(count, seed)). */
export function storyStars(count: number, seed: number): CSSProperties[] {
  const rnd = (i: number) => frac(Math.sin(i * 12.9898 + seed * 7.31) * 43758.5453);
  const out: CSSProperties[] = [];
  for (let i = 0; i < count; i++) out.push(starStyle(rnd(i), rnd(i + 91), rnd(i + 173)));
  return out;
}

export function StarList({ stars }: { stars: CSSProperties[] }) {
  return stars.map((s, i) => <div key={i} className="star" style={s} />);
}
