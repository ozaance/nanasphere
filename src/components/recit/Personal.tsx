"use client";

import type { CSSProperties } from "react";
import { Constellation, Crescent } from "@/components/Marks";
import { SIGNS, signIndex, todayISO, type Sign } from "@/lib/signs";
import { useVisitor } from "@/lib/visitor";
import { range } from "./range";

// Îlots client du récit : seuls ces morceaux dépendent du visiteur.
// Sans visiteur (« Je préfère juste regarder »), le chapitre I montre le signe
// que le Soleil traverse aujourd'hui.

function useSky(): { prenom: string | null; sign: Sign | null; personal: boolean } {
  const v = useVisitor();
  if (v === undefined) return { prenom: null, sign: null, personal: false };
  if (v === null) return { prenom: null, sign: SIGNS[signIndex(todayISO())], personal: false };
  return { prenom: v.prenom || null, sign: SIGNS[v.sign], personal: true };
}

export function HeroTitle() {
  const v = useVisitor();
  const pending = v === undefined;
  const prenom = v?.prenom;
  return (
    <h1 className={"hero-title cosmic-text" + (pending ? " await" : "")}>
      {prenom ? prenom + ", ton ciel te connaît déjà." : "Ton ciel te connaît déjà."}
    </h1>
  );
}

export function HeaderChip() {
  const { prenom, sign, personal } = useSky();
  if (!personal || !sign) return null;
  return (
    <span className="chip">
      {prenom ? prenom + " · " : ""}
      {sign.nice}
    </span>
  );
}

export function SunStage() {
  const { sign, personal } = useSky();
  const drawStyle = sign ? ({ strokeDasharray: sign.len, "--len": sign.len, ...range(4, 46) } as CSSProperties) : undefined;
  return (
    <>
      <div className="eyebrow sa k-up" style={range(0, 16)}>
        {personal || !sign ? "CHAPITRE I · TON SOLEIL" : "CHAPITRE I · LE CIEL DU MOMENT"}
      </div>
      <svg className="sun-art" viewBox="0 0 100 130" aria-hidden="true">
        <path className="sa k-draw" d={sign?.lines ?? ""} style={drawStyle} stroke="var(--gold)" strokeWidth="1" strokeOpacity=".9" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path className="sa k-in" d={sign?.dots ?? ""} style={range(30, 62)} fill="var(--cream)" />
      </svg>
      <div className="sun-name sa k-up" style={range(50, 66)}>
        {sign?.name ?? " "}
      </div>
      <p className="lead sa k-up" style={range(62, 84)}>
        {personal || !sign ? "Ton signe solaire, c’est la part de toi que tout le monde voit." : "En ce moment, le Soleil traverse le signe " + sign.nice + "."}
      </p>
    </>
  );
}

export function SunCard() {
  const { sign } = useSky();
  return (
    <div className="card-mid">
      <span className="frame" />
      <Crescent size={16} />
      <Constellation lines={sign?.lines ?? ""} dots={sign?.dots ?? ""} className="card-art" />
      <span className="card-name">{sign?.name ?? " "}</span>
    </div>
  );
}
