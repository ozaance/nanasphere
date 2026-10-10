"use client";

import { recordEvent } from "@/app/actions";

const sent = new Set<string>();

/**
 * Envoie un événement de tunnel, au plus une fois par onglet et par clé.
 * Anonyme, sans cookie : rien à demander au visiteur.
 */
export function track(name: string, detail?: string) {
  const key = detail ? `${name}:${detail}` : name;
  if (sent.has(key)) return;
  sent.add(key);
  void recordEvent(name, detail);
}
