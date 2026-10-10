"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Constellation, Crescent, Logo, Sparkle } from "@/components/Marks";
import { SIGNS, signIndex, todayISO } from "@/lib/signs";
import { saveVisitor } from "@/lib/visitor";
import { track } from "@/lib/track";
import "./gate.css";

type Screen = "accueil" | "formulaire" | "revelation";

// Éventail : rotation, creux et superposition calculés comme dans Main.dc.html.
const FAN = SIGNS.map((s, i) => {
  const t = (i - 5.5) / 5.5;
  return {
    ...s,
    style: {
      marginLeft: i === 0 ? 0 : "-3.2%",
      "--r": (t * 15).toFixed(1) + "deg",
      "--y": Math.round(t * t * 44) + "px",
      "--z": 12 - Math.round(Math.abs(i - 5.5)),
    } as CSSProperties,
  };
});

const delay = (s: number): CSSProperties => ({ animationDelay: s + "s" });

export function Gate({ stars, surtitre = "LIS TON CIEL" }: { stars: ReactNode; surtitre?: string }) {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("accueil");
  const [prenom, setPrenom] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [ville, setVille] = useState("");
  const [error, setError] = useState("");
  const opener = useRef<HTMLElement | null>(null);
  const revealTitle = useRef<HTMLHeadingElement>(null);

  const showForm = screen === "formulaire";
  const mine = SIGNS[signIndex(date)];
  const prenomAff = prenom.trim() || "[Prénom]";

  function openForm(e: { currentTarget: HTMLElement }) {
    opener.current = e.currentTarget;
    setError("");
    setScreen("formulaire");
    track("gate_ouvert");
  }

  function closeForm() {
    setError("");
    setScreen("accueil");
    opener.current?.focus();
  }

  useEffect(() => {
    if (!showForm) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setError("");
      setScreen("accueil");
      opener.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showForm]);

  useEffect(() => {
    if (screen === "revelation") {
      window.scrollTo(0, 0);
      revealTitle.current?.focus({ preventScroll: true });
    }
  }, [screen]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!prenom.trim() || !date) {
      setError("Indique ton prénom et ta date de naissance pour continuer.");
      return;
    }
    setError("");
    setScreen("revelation");
    track("gate_soumis");
  }

  function enterSite() {
    saveVisitor({ prenom: prenom.trim(), sign: signIndex(date) });
    router.push("/recit");
  }

  function justLook() {
    track("gate_contourne");
    saveVisitor(null);
    router.push("/recit");
  }

  function restart() {
    setPrenom("");
    setDate("");
    setHeure("");
    setVille("");
    setError("");
    setScreen("accueil");
  }

  return (
    <div className="cosmos gate">
      <div className="gate-stars" aria-hidden="true">
        {stars}
      </div>

      {screen !== "revelation" && (
        <section className="gate-screen">
          <div className="gate-glow" aria-hidden="true" />
          <svg className="gate-sky" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="var(--cream)">
              <circle cx="38" cy="70" r="1.1" opacity=".55" /><circle cx="92" cy="150" r=".8" opacity=".4" /><circle cx="352" cy="92" r="1.2" opacity=".55" />
              <circle cx="318" cy="200" r=".8" opacity=".4" /><circle cx="60" cy="290" r="1" opacity=".45" /><circle cx="372" cy="330" r=".9" opacity=".4" />
              <circle cx="140" cy="44" r=".8" opacity=".5" /><circle cx="252" cy="34" r="1" opacity=".45" /><circle cx="22" cy="560" r=".8" opacity=".35" />
              <circle cx="384" cy="600" r="1.1" opacity=".45" /><circle cx="120" cy="720" r=".9" opacity=".35" /><circle cx="290" cy="740" r="1" opacity=".35" />
            </g>
            <path d="M318 200 L352 92 L372 146 M352 92 L384 66" stroke="var(--gold)" strokeWidth=".6" strokeOpacity=".3" fill="none" />
          </svg>

          <div className="gate-body" inert={showForm}>
            <header className="gate-head">
              <div className="gate-brand">
                <Logo size={40} />
                <span>PRÉSENTE</span>
              </div>
              <span className="gate-handle">@nanasphere</span>
            </header>

            <div className="gate-main">
              <div className="gate-surtitre rise">{surtitre}</div>
              <div className="gate-title rise" style={delay(0.15)}>
                <h1 className="cosmic-text">Nanasphère</h1>
                <Sparkle size={30} className="glint" style={{ right: "1%", top: "-8%" }} />
                <Sparkle size={20} className="glint" style={{ left: "3%", bottom: "2%", animationDelay: "1.4s" }} />
              </div>

              <div className="fan">
                {FAN.map((card) => (
                  <button key={card.name} type="button" className="fan-card" style={card.style} aria-label={"Carte " + card.nice + ", ouvrir le formulaire"} onClick={openForm}>
                    <span className="frame" />
                    <Crescent size={16} />
                    <Constellation lines={card.lines} dots={card.dots} opacity={0.75} className="fan-art" />
                    <span className="fan-name">{card.name}</span>
                  </button>
                ))}
              </div>

              <p className="gate-hook rise" style={delay(0.35)}>
                Découvre ce que ton ciel a à te dire.
                <br />
                <span>Tu n’es pas qu’un seul signe.</span>
              </p>
              <button type="button" className="btn-gold gate-cta rise" style={delay(0.5)} onClick={openForm}>
                Découvrir mon ciel
              </button>
              {/* Le site ne doit pas être conditionné à la collecte (HANDOVER §8). */}
              <button type="button" className="gate-skip rise" style={delay(0.62)} onClick={justLook}>
                Entrer sans donner mes infos
              </button>
            </div>

            <footer className="gate-foot">
              <span>L’art de lire le ciel, la sagesse de s’écouter.</span>
              <span className="gate-foot-links">
                <a href="#">Mentions légales</a>
                <a href="#">Confidentialité</a>
              </span>
            </footer>
          </div>

          {showForm && (
            <div className="overlay" onClick={(e) => e.target === e.currentTarget && closeForm()}>
              <div className="modal" role="dialog" aria-modal="true" aria-labelledby="titre-form">
                <button type="button" className="icon-btn" aria-label="Fermer" onClick={closeForm}>
                  <svg width="14" height="14" viewBox="0 0 14 14" stroke="var(--cream)" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M1 1 L13 13 M13 1 L1 13" />
                  </svg>
                </button>
                <Crescent size={34} stroke={1.3} cross />
                <h2 id="titre-form">Ta carte du ciel</h2>
                <p className="modal-intro">Renseigne ces quelques infos pour entrer dans l’univers de Nana.</p>

                <form onSubmit={submit} noValidate>
                  <label>
                    <span className="field-label">PRÉNOM OU PSEUDO</span>
                    <input className="field" type="text" autoComplete="given-name" placeholder="Ton prénom" autoFocus value={prenom} onChange={(e) => { setPrenom(e.target.value); setError(""); }} />
                  </label>
                  <label>
                    <span className="field-label">DATE DE NAISSANCE</span>
                    <input className="field" type="date" max={todayISO()} value={date} onChange={(e) => { setDate(e.target.value); setError(""); }} />
                  </label>
                  <div className="field-row">
                    <label>
                      <span className="field-label optional">HEURE · FACULTATIF</span>
                      <input className="field" type="time" value={heure} onChange={(e) => setHeure(e.target.value)} />
                    </label>
                    <label>
                      <span className="field-label optional">VILLE · FACULTATIF</span>
                      <input className="field" type="text" autoComplete="address-level2" placeholder="Ville de naissance" value={ville} onChange={(e) => setVille(e.target.value)} />
                    </label>
                  </div>

                  {error && (
                    <p role="alert" className="form-error">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="btn-line submit">
                    Continuer
                    <svg width="30" height="12" viewBox="0 0 30 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                      <path d="M1 6 H22" />
                      <path d="M22 6 L25.5 2.5 L29 6 L25.5 9.5 Z" />
                    </svg>
                  </button>
                </form>

                <button type="button" className="just-look" onClick={justLook}>
                  Je préfère juste regarder
                </button>

                <p className="modal-note">
                  Tes informations restent privées : elles servent uniquement à personnaliser ton expérience.{" "}
                  <a href="#">Données personnelles</a>
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {screen === "revelation" && (
        <section className="reveal">
          <div className="reveal-glow" aria-hidden="true" />
          <svg className="reveal-moons" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <defs>
              <linearGradient id="gm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F0DCA4" /><stop offset="1" stopColor="#B99759" /></linearGradient>
              <radialGradient id="gh" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#E6C98A" stopOpacity=".45" /><stop offset="1" stopColor="#E6C98A" stopOpacity="0" /></radialGradient>
            </defs>
            <g fill="none" stroke="var(--gold)" strokeOpacity=".4" strokeWidth=".8">
              <circle cx="200" cy="400" r="190" />
              <circle cx="200" cy="400" r="130" strokeDasharray="2 5" />
              <ellipse cx="200" cy="400" rx="150" ry="330" />
              <path d="M200 40 V760" />
            </g>
            <circle cx="200" cy="400" r="95" fill="url(#gh)" />
            <g fill="url(#gm)">
              <path d="M200 66 A34 34 0 1 0 200 134 A24 34 0 1 1 200 66 Z" />
              <path d="M200 226 A34 34 0 1 0 200 294 Z" />
              <circle cx="200" cy="400" r="44" />
              <path d="M200 506 A34 34 0 1 1 200 574 Z" />
              <path d="M200 666 A34 34 0 1 1 200 734 A24 34 0 1 0 200 666 Z" />
            </g>
            <g fill="#E6C98A"><circle cx="50" cy="400" r="3" /><circle cx="350" cy="400" r="3" /><circle cx="106" cy="226" r="2.2" /><circle cx="294" cy="574" r="2.2" /></g>
          </svg>

          <div className="reveal-eyebrow">TA CARTE</div>
          <div className="reveal-card">
            <span className="frame" />
            <Crescent size={22} stroke={1.8} cross />
            <Constellation lines={mine.lines} dots={mine.dots} opacity={0.85} className="reveal-art" />
            <span className="reveal-name">{mine.name}</span>
          </div>
          <h2 className="reveal-title rise" style={delay(0.7)} ref={revealTitle} tabIndex={-1}>
            <span className="cosmic-text">Bienvenue, {prenomAff}.</span>
          </h2>
          <p className="reveal-sun rise" style={delay(0.85)}>Soleil en {mine.nice}</p>
          <p className="reveal-lead rise" style={delay(1)}>
            Ton soleil n’est qu’une partie de ton ciel. Ton ascendant et ta lune racontent le reste de ton histoire.
          </p>
          <div className="reveal-actions rise" style={delay(1.15)}>
            <button type="button" className="btn-gold" onClick={enterSite}>
              Entrer dans mon univers
            </button>
            <button type="button" className="btn-line" onClick={restart}>
              Recommencer
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
