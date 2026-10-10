// Repris des maquettes (Main.dc.html / Recit.dc.html) : SIGNS, build(), signIndex().
// Coordonnées dans un viewBox 100×130.

type Point = readonly [number, number];
type Chain = readonly Point[];

export type Sign = {
  name: string; // étiquette en capitales (cartes)
  nice: string; // forme courante (« Soleil en Lion »)
  lines: string; // tracé des liaisons
  dots: string; // tracé des étoiles
  len: number; // longueur du trait, pour l'animation de dessin
};

const RAW: { name: string; nice: string; chains: Chain[] }[] = [
  { name: "BÉLIER", nice: "Bélier", chains: [[[18, 62], [42, 48], [66, 52], [84, 68]]] },
  { name: "TAUREAU", nice: "Taureau", chains: [[[16, 28], [36, 50], [50, 62], [64, 50], [84, 28]], [[50, 62], [44, 88], [28, 106]], [[50, 62], [68, 92]]] },
  { name: "GÉMEAUX", nice: "Gémeaux", chains: [[[30, 22], [36, 45], [34, 70], [28, 100]], [[62, 18], [66, 42], [64, 72], [70, 104]], [[36, 45], [66, 42]], [[34, 70], [64, 72]]] },
  { name: "CANCER", nice: "Cancer", chains: [[[50, 20], [50, 58], [28, 94]], [[50, 58], [74, 102]]] },
  { name: "LION", nice: "Lion", chains: [[[26, 46], [34, 32], [48, 26], [60, 34], [58, 48], [46, 54]], [[58, 48], [70, 72], [86, 70], [78, 98], [58, 90], [70, 72]]] },
  { name: "VIERGE", nice: "Vierge", chains: [[[28, 30], [42, 40], [56, 32], [62, 52], [48, 66], [36, 86], [66, 92], [82, 106]], [[42, 40], [48, 66]]] },
  { name: "BALANCE", nice: "Balance", chains: [[[20, 94], [36, 60], [64, 60], [80, 94]], [[36, 60], [50, 30], [64, 60]]] },
  { name: "SCORPION", nice: "Scorpion", chains: [[[18, 28], [30, 40], [42, 50], [54, 58], [64, 72], [64, 92], [76, 104], [90, 96]], [[42, 50], [34, 66]]] },
  { name: "SAGITTAIRE", nice: "Sagittaire", chains: [[[22, 100], [40, 82], [56, 72], [70, 56], [84, 38]], [[56, 72], [44, 52], [60, 38], [70, 56]], [[70, 56], [82, 74]]] },
  { name: "CAPRICORNE", nice: "Capricorne", chains: [[[16, 40], [40, 54], [58, 88], [76, 62], [86, 32], [60, 44], [40, 54]]] },
  { name: "VERSEAU", nice: "Verseau", chains: [[[16, 52], [32, 40], [48, 54], [64, 42], [82, 56]], [[20, 88], [36, 76], [52, 90], [68, 78], [84, 92]]] },
  { name: "POISSONS", nice: "Poissons", chains: [[[18, 30], [30, 52], [44, 74], [60, 98], [72, 76], [88, 58]], [[18, 30], [28, 20], [36, 34], [18, 30]]] },
];

function build(chains: Chain[]) {
  let lines = "";
  let dots = "";
  let n = 0;
  let len = 0;
  const seen = new Set<string>();
  chains.forEach((ch) => {
    ch.forEach((p, i) => {
      lines += (i === 0 ? "M" : "L") + p[0] + " " + p[1] + " ";
      if (i > 0) len += Math.hypot(p[0] - ch[i - 1][0], p[1] - ch[i - 1][1]);
      const k = p[0] + "," + p[1];
      if (!seen.has(k)) {
        seen.add(k);
        const r = n % 3 === 0 ? 2.6 : 1.7;
        n++;
        dots += "M" + (p[0] - r) + " " + p[1] + "a" + r + " " + r + " 0 1 0 " + 2 * r + " 0a" + r + " " + r + " 0 1 0 " + -2 * r + " 0z";
      }
    });
  });
  return { lines, dots, len: Math.ceil(len) + 4 };
}

export const SIGNS: Sign[] = RAW.map(({ name, nice, chains }) => ({ name, nice, ...build(chains) }));

/** Signe solaire tropical à partir d'une date « AAAA-MM-JJ » (dates approximatives). */
export function signIndex(dateStr: string): number {
  const parts = (dateStr || "").split("-");
  if (parts.length < 3) return 4;
  const m = +parts[1];
  const d = +parts[2];
  const starts = [[20, 10], [19, 11], [21, 0], [20, 1], [21, 2], [21, 3], [23, 4], [23, 5], [23, 6], [23, 7], [22, 8], [22, 9]];
  const s = starts[m - 1];
  if (!s) return 4;
  return d >= s[0] ? s[1] : (s[1] + 11) % 12;
}

/** Date locale du jour au format « AAAA-MM-JJ » (côté client uniquement). */
export function todayISO(): string {
  const d = new Date();
  const pad = (v: number) => String(v).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}
