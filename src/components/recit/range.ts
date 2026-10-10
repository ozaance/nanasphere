import type { CSSProperties } from "react";

/** Fenêtre d'animation dans le chapitre, en % (--a → --b), comme dans Recit.dc.html. */
export const range = (a: number, b: number) => ({ "--a": a, "--b": b }) as CSSProperties;
