"use client";

import { useEffect, useState } from "react";

/**
 * Barre d'accès rapide. Elle n'apparaît qu'une fois l'accueil du récit passé,
 * pour ne pas couper l'entrée dans l'histoire, et donne les deux seules actions
 * qui comptent : voir les prix, laisser son e-mail.
 */
export function ActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0.15 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className={"actionbar" + (shown ? " on" : "")} aria-hidden={!shown}>
      <a href="#lectures" className="actionbar-link" tabIndex={shown ? undefined : -1}>
        Les lectures
      </a>
      <a href="#attente" className="btn-gold actionbar-cta" tabIndex={shown ? undefined : -1}>
        Être prévenu·e
      </a>
    </div>
  );
}
