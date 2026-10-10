import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const DESCRIPTION =
  "Lectures de tarot et thèmes astraux par Nana. Une lecture enregistrée en audio, rien que pour toi, à réécouter quand tu veux.";

// Renseigner le domaine définitif (nanasphere.com n'est pas encore réservé,
// HANDOVER §2) : sans URL absolue, les aperçus de partage restent vides.
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Nanasphère — L’art de lire le ciel, la sagesse de s’écouter",
    template: "%s · Nanasphère",
  },
  description: DESCRIPTION,
  applicationName: "Nanasphère",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Nanasphère",
    title: "Nanasphère — L’art de lire le ciel, la sagesse de s’écouter",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nanasphère",
    description: DESCRIPTION,
  },
  // Aperçu privé (phase 1). À RETIRER avant l'ouverture publique, sinon le site
  // reste invisible des moteurs de recherche.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#17172D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
