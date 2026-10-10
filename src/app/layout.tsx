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

export const metadata: Metadata = {
  title: "Nanasphère",
  description: "L’art de lire le ciel, la sagesse de s’écouter.",
  // Aperçu privé (phase 1) : pas d'indexation tant que le site n'est pas ouvert.
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
