// Phase statique : ces lignes préfigurent la table `offers` (HANDOVER.md §7) et
// seront lues en base dès la phase 2. Un prix inconnu reste `null` et s'affiche
// « [TARIF] » : ne jamais le remplacer par une valeur inventée.

export type Offer = {
  slug: string;
  name: string;
  kind: "tarot" | "theme" | "ecoute";
  desc: string;
  priceCents: number | null;
  priceFrom?: boolean; // « dès 25 € »
  active: boolean;
};

export const OFFERS: Offer[] = [
  {
    slug: "tarot-a-la-carte",
    name: "Tarot à la carte",
    kind: "tarot",
    desc: "Quelques cartes pour éclairer un moment précis.",
    priceCents: 2500, // 20 € × 1,25
    priceFrom: true,
    active: true,
  },
  {
    slug: "theme-astral-express",
    name: "Thème astral express",
    kind: "theme",
    desc: "Positions planétaires, ascendant et lune, expliqués simplement.",
    priceCents: 7500, // 60 € × 1,25
    active: true,
  },
  {
    slug: "theme-astral-complet",
    name: "Thème astral complet",
    kind: "theme",
    desc: "Ta cartographie du ciel en profondeur.",
    priceCents: 15000, // décision du 10/10/2026 (au lieu de ~120 €) ; les autres prix suivent (+25 %)
    active: true,
  },
  {
    slug: "sos-ecoute",
    name: "SOS écoute",
    kind: "ecoute",
    desc: "Un échange de 30 min ou 1 h pour déposer ce qui te pèse.",
    priceCents: null, // [TARIF]
    active: true,
  },
];

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export function priceLabel(o: Pick<Offer, "priceCents" | "priceFrom">): string {
  if (o.priceCents === null) return "[TARIF]";
  const p = euros.format(o.priceCents / 100);
  return o.priceFrom ? "dès " + p : p;
}

// Maison Nana : contenu et tarif non décidés (HANDOVER.md §2). Libellés de la maquette.
export const MAISON_PERKS = ["Un espace privé et confidentiel", "Un accompagnement personnalisé", "Un accès prioritaire"];
export const MAISON_PRICE_CENTS: number | null = null; // [TARIF] / mois
