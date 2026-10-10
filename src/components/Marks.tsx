// Logo provisoire (croissant + croix) et pictos des maquettes.

const CRESCENT = "M23 9.5 A11 11 0 1 0 23 30.5 A8.6 8.6 0 0 1 23 9.5 Z";
const CROSS = "M29.5 13.5 V22 M25.5 17.8 H33.5";

/** Logo complet : cercle, croissant, croix. */
export function Logo({ size = 40, stroke = 1.2 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="var(--gold)" strokeWidth={stroke} strokeLinecap="round" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" opacity=".6" />
      <path d={CRESCENT} />
      <path d={CROSS} />
      <path d="M26.8 15 L32.2 20.6 M32.2 15 L26.8 20.6" opacity=".55" />
    </svg>
  );
}

/** Croissant seul (ou avec la croix), pour le haut des cartes. */
export function Crescent({ size = 16, stroke = 2, cross = false }: { size?: number; stroke?: number; cross?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="var(--gold)" strokeWidth={stroke} strokeLinecap="round" aria-hidden="true">
      <path d={CRESCENT} />
      {cross && <path d={CROSS} />}
    </svg>
  );
}

/** Constellation dans le viewBox 100×130 des maquettes. */
export function Constellation({ lines, dots, opacity = 0.8, className }: { lines: string; dots: string; opacity?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden="true">
      <path d={lines} stroke="var(--gold)" strokeWidth="1" strokeOpacity={opacity} fill="none" strokeLinejoin="round" />
      <path d={dots} fill="var(--cream)" />
    </svg>
  );
}

export function Sparkle({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size} style={style} aria-hidden="true">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="#FFE9B0" />
    </svg>
  );
}
