"use client";

import { useSyncExternalStore } from "react";

// Version statique (sans base) : on garde seulement le prénom et l'indice du
// signe, le temps de l'onglet. La date, l'heure et la ville de naissance ne sont
// jamais stockées ni envoyées.

export type Visitor = { prenom: string; sign: number };

const KEY = "nanasphere:visiteur";
const EVENT = "nanasphere:visiteur";

function read(): string | null {
  try {
    return window.sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function parse(raw: string | null): Visitor | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<Visitor>;
    if (typeof v.prenom !== "string" || typeof v.sign !== "number" || v.sign < 0 || v.sign > 11) return null;
    return { prenom: v.prenom, sign: v.sign };
  } catch {
    return null;
  }
}

export function saveVisitor(v: Visitor | null) {
  try {
    if (v) window.sessionStorage.setItem(KEY, JSON.stringify(v));
    else window.sessionStorage.removeItem(KEY);
  } catch {
    // stockage indisponible (navigation privée stricte) : le récit s'affiche sans personnalisation
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * `undefined` pendant le rendu serveur et l'hydratation, puis le visiteur
 * (ou `null` s'il a choisi de « juste regarder »).
 */
export function useVisitor(): Visitor | null | undefined {
  const raw = useSyncExternalStore(subscribe, read, () => undefined);
  return raw === undefined ? undefined : parse(raw);
}
