import { ImageResponse } from "next/og";

// Aperçu affiché quand le lien est partagé (le lien en bio TikTok est la source
// de vérité contre les usurpations, HANDOVER §6). Généré par Next, sans asset.

export const alt = "Nanasphère — L’art de lire le ciel, la sagesse de s’écouter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Récupère une police en TTF chez Google Fonts. Le moteur d'image ne lit pas le
 * woff2 que sert `next/font`, d'où ce détour : l'ancien User-Agent fait servir
 * du TrueType. En cas d'échec, on rend l'image sans police de marque plutôt que
 * de faire échouer la construction du site.
 */
async function police(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8)" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [titre, texte] = await Promise.all([police("Cinzel", 700), police("Manrope", 500)]);
  const fonts = [
    titre && { name: "Cinzel", data: titre, weight: 700 as const, style: "normal" as const },
    texte && { name: "Manrope", data: texte, weight: 500 as const, style: "normal" as const },
  ].filter((f) => f !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#17172D",
          backgroundImage:
            "radial-gradient(45% 60% at 20% 15%, rgba(185,151,89,.22), transparent 70%), radial-gradient(50% 65% at 85% 30%, rgba(92,66,170,.42), transparent 70%), radial-gradient(55% 70% at 30% 90%, rgba(36,66,150,.35), transparent 72%)",
          color: "#F3EBDD",
        }}
      >
        <svg width="92" height="92" viewBox="0 0 40 40" fill="none" stroke="#B99759" strokeWidth="1.2" strokeLinecap="round">
          <circle cx="20" cy="20" r="18.5" opacity=".6" />
          <path d="M23 9.5 A11 11 0 1 0 23 30.5 A8.6 8.6 0 0 1 23 9.5 Z" />
          <path d="M29.5 13.5 V22 M25.5 17.8 H33.5" />
        </svg>
        <div
          style={{
            marginTop: 34,
            fontFamily: "Cinzel",
            fontSize: 96,
            letterSpacing: 4,
            color: "#FAF8F4",
          }}
        >
          Nanasphère
        </div>
        <div style={{ marginTop: 22, fontFamily: "Manrope", fontSize: 34, color: "#D8BC82" }}>
          L’art de lire le ciel, la sagesse de s’écouter.
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
