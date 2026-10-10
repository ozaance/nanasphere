import "server-only";

// Un seul appel REST suffit (PostgREST), inutile d'embarquer @supabase/supabase-js
// pour une insertion : le projet reste à zéro dépendance côté client.

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

export type InsertResult = "ok" | "doublon" | "indisponible";

/**
 * Insère une ligne. La clé est publiable et les tables n'autorisent que
 * l'insertion (RLS) : rien ne peut être relu par cette voie.
 */
export async function insertRow(table: string, row: Record<string, unknown>): Promise<InsertResult> {
  if (!URL || !KEY) {
    console.error("[supabase] SUPABASE_URL ou SUPABASE_PUBLISHABLE_KEY manquante");
    return "indisponible";
  }

  let res: Response;
  try {
    res = await fetch(`${URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return "indisponible";
  }

  if (res.ok) return "ok";
  if (res.status === 409) return "doublon"; // violation de la contrainte d'unicité
  console.error("[supabase] %s %s — %s", table, res.status, await res.text().catch(() => ""));
  return "indisponible";
}
