"use server";

import { CONSENT_VERSION, type WaitlistState } from "@/lib/consent";
import { insertRow } from "@/lib/supabase";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function joinWaitlist(_prev: WaitlistState, data: FormData): Promise<WaitlistState> {
  // Piège à robots : un champ masqué que seul un automate remplit.
  if (data.get("site")) return { statut: "ok" };

  const email = String(data.get("email") ?? "").trim().toLowerCase();
  const consent = data.get("consent") === "on";

  if (!email) return { statut: "erreur", message: "Indique ton adresse e-mail." };
  if (email.length > 254 || !EMAIL.test(email)) {
    return { statut: "erreur", message: "Cette adresse e-mail ne semble pas valide." };
  }
  if (!consent) {
    return { statut: "erreur", message: "Coche la case pour que Nana puisse t’écrire." };
  }

  const res = await insertRow("waitlist", {
    email,
    consent_version: CONSENT_VERSION,
    source: String(data.get("source") ?? "").slice(0, 40) || null,
  });

  if (res === "indisponible") {
    return { statut: "erreur", message: "L’inscription n’a pas pu aboutir. Réessaie dans un moment." };
  }

  // Un doublon renvoie le même message qu'une réussite : sinon le formulaire
  // dirait qui est déjà inscrit, et n'importe qui pourrait tester des adresses.
  if (res === "ok") void recordEvent("waitlist_inscrit");
  return { statut: "ok" };
}

/** Événement de tunnel, anonyme. N'échoue jamais côté visiteur. */
export async function recordEvent(name: string, detail?: string): Promise<void> {
  await insertRow("funnel_events", { name, detail: detail ?? null }).catch(() => {});
}
