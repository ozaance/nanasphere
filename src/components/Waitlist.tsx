"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { joinWaitlist } from "@/app/actions";
import type { WaitlistState } from "@/lib/consent";
import { Crescent } from "@/components/Marks";
import "./waitlist.css";

const VIDE: WaitlistState = { statut: "vide" };

type Props = {
  /** D'où vient l'inscription, pour savoir quel endroit convertit. */
  source: string;
  titre?: string;
  texte?: string;
  cta?: string;
};

export function Waitlist({
  source,
  titre = "Sois prévenu·e à l’ouverture",
  texte = "Laisse ton e-mail : tu sauras en premier quand les lectures ouvrent.",
  cta = "Me prévenir",
}: Props) {
  const [state, action, pending] = useActionState(joinWaitlist, VIDE);
  const emailId = useId();
  const consentId = useId();
  const done = useRef<HTMLParagraphElement>(null);

  // React 19 réinitialise le formulaire après chaque action, y compris quand
  // elle échoue. Des champs contrôlés évitent que le visiteur perde sa saisie
  // parce qu'il a oublié de cocher la case.
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (state.statut === "ok") done.current?.focus();
  }, [state.statut]);

  if (state.statut === "ok") {
    return (
      <div className="wl wl-done">
        <Crescent size={28} stroke={1.4} cross />
        <p className="wl-done-title" tabIndex={-1} ref={done}>
          C’est noté.
        </p>
        <p className="wl-done-text">
          Tu recevras un message de Nana à l’ouverture. Rien d’autre, et tu peux te désinscrire à tout moment.
        </p>
      </div>
    );
  }

  return (
    <form className="wl" action={action}>
      <p className="wl-title">{titre}</p>
      <p className="wl-text">{texte}</p>

      <input type="hidden" name="source" value={source} />
      {/* piège à robots, invisible et hors du parcours au clavier */}
      <div className="wl-trap" aria-hidden="true">
        <label htmlFor={`${emailId}-site`}>Ne pas remplir</label>
        <input id={`${emailId}-site`} type="text" name="site" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="wl-row">
        <label htmlFor={emailId} className="sr-only">
          Ton adresse e-mail
        </label>
        <input
          id={emailId}
          className="wl-field"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="ton@email.fr"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={state.statut === "erreur" ? `${emailId}-err` : undefined}
          aria-invalid={state.statut === "erreur" || undefined}
        />
        <button type="submit" className="btn-gold wl-submit" disabled={pending}>
          {pending ? "Un instant…" : cta}
        </button>
      </div>

      <label className="wl-consent" htmlFor={consentId}>
        <input id={consentId} type="checkbox" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          J’accepte que Nanasphère conserve mon e-mail pour me prévenir de l’ouverture.{" "}
          {/* TODO: lier à la politique de confidentialité une fois rédigée (HANDOVER §8) */}
          <a href="#">Ce que deviennent mes données</a>
        </span>
      </label>

      <p className="wl-feedback" role="status" aria-live="polite" id={`${emailId}-err`}>
        {state.statut === "erreur" ? state.message : ""}
      </p>
    </form>
  );
}
