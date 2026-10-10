// Version du texte de consentement affiché sous le formulaire. À incrémenter si
// ce texte change : la preuve doit dire à quoi la personne a consenti, pas
// seulement quand (RGPD, HANDOVER §8).
//
// Un fichier « use server » ne peut exporter que des fonctions asynchrones :
// cette constante et ce type vivent donc à part.
export const CONSENT_VERSION = "v1";

export type WaitlistState = {
  statut: "vide" | "ok" | "erreur";
  message?: string;
};
