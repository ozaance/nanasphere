import type { CSSProperties } from "react";
import Link from "next/link";
import { HELPLINE, LegalFooter } from "@/components/LegalFooter";
import { Logo } from "@/components/Marks";
import { MAISON_PERKS, MAISON_PRICE_CENTS, OFFERS, priceLabel } from "@/content/offers";
import { StarList, storyStars } from "@/lib/stars";
import { NanaVideo } from "./NanaVideo";
import { HeaderChip, HeroTitle, SunCard, SunStage } from "./Personal";
import { range } from "./range";
import "./recit.css";

// Récit déroulant — porté de Recit.dc.html. Composant serveur ; seuls les îlots
// de Personal.tsx s'exécutent dans le navigateur.

const offers = OFFERS.filter((o) => o.active);

// Forme d'onde décorative (34 barres) ; les 12 premières en or = déjà écouté.
const bars = Array.from({ length: 34 }, (_, i) => {
  const h = 10 + Math.round(30 * Math.abs(Math.sin(i * 0.8) * Math.cos(i * 0.31))) + (i % 5) * 2;
  const a = 52 + Math.round(i * 0.9);
  return { height: h, played: i < 12, ...range(a, a + 14) } as CSSProperties & { played: boolean };
});

export function Recit() {
  return (
    <div className="story" id="haut">
      <noscript>
        <style>{".hero-title.await{opacity:1}"}</style>
      </noscript>
      {/* en-tête fixe */}
      <header className="top">
        <Link href="/" className="top-brand" aria-label="Nanasphère, retour à l’accueil">
          <Logo size={30} stroke={1.3} />
          <span>Nanasphère</span>
        </Link>
        <HeaderChip />
      </header>

      {/* ciel qui reste en place derrière tout le récit */}
      <div className="sky" aria-hidden="true">
        <div className="sky-in cosmos">
          <svg className="wheel pg k-wheel" viewBox="0 0 400 400" fill="none" stroke="var(--gold)" strokeWidth=".35">
            <circle cx="200" cy="200" r="196" />
            <circle cx="200" cy="200" r="168" />
            <circle cx="200" cy="200" r="120" strokeDasharray="2 5" />
            <path d="M200 4 V396 M4 200 H396 M61 61 L339 339 M339 61 L61 339" opacity=".6" />
            <g fill="var(--gold-pale)" stroke="none">
              <circle cx="200" cy="4" r="2.4" /><circle cx="396" cy="200" r="2.4" /><circle cx="200" cy="396" r="2.4" />
              <circle cx="4" cy="200" r="2.4" /><circle cx="339" cy="61" r="1.8" /><circle cx="61" cy="339" r="1.8" />
            </g>
          </svg>
          <div className="layer pg k-drift1">
            <StarList stars={storyStars(55, 3)} />
          </div>
          <div className="layer pg k-drift2">
            <StarList stars={storyStars(55, 11)} />
          </div>
        </div>
      </div>

      {/* fil de la lune qui descend avec la lecture */}
      <div className="railwrap" aria-hidden="true">
        <div className="rail">
          <span className="rail-line" />
          <svg className="rail-dot pg k-rail" width="16" height="16" viewBox="0 0 40 40" fill="none" stroke="var(--gold-light)" strokeWidth="3" strokeLinecap="round">
            <path d="M23 9.5 A11 11 0 1 0 23 30.5 A8.6 8.6 0 0 1 23 9.5 Z" />
          </svg>
        </div>
      </div>

      <main>
        {/* ===== ACCUEIL DU RÉCIT ===== */}
        <section className="hero">
          <div className="hero-in">
            <div className="eyebrow">ASTROLOGIE INTUITIVE</div>
            <HeroTitle />
            <p className="hero-sig">L’art de lire le ciel, la sagesse de s’écouter.</p>
            <div className="cue" aria-hidden="true">
              <span>FAIS DÉFILER</span>
              <span className="cue-line" />
            </div>
          </div>
        </section>

        {/* ===== I · TON SOLEIL ===== */}
        <section className="chap pin" id="soleil">
          <div className="stage">
            <SunStage />
          </div>
        </section>

        {/* ===== II · TOUT TON CIEL ===== */}
        <section className="chap pin" id="ciel">
          <div className="stage">
            <div className="eyebrow sa k-up" style={range(0, 14)}>CHAPITRE II · TOUT TON CIEL</div>
            <h2 className="h2 h2-serif sa k-up" style={range(4, 24)}>Tu n’es pas qu’un seul signe.</h2>
            <div className="trio">
              <div className="card-side l sa k-fanl" style={range(14, 50)}>
                <span className="card-q">?</span>
                <span className="card-side-name">ASCENDANT</span>
              </div>
              <SunCard />
              <div className="card-side r sa k-fanr" style={range(14, 50)}>
                <span className="card-q">?</span>
                <span className="card-side-name">LUNE</span>
              </div>
            </div>
            <p className="lead sa k-up" style={range(50, 72)}>Ton ascendant, ta lune… ton ciel est une carte entière.</p>
            <a href="#lectures" className="btn-gold sa k-up" style={{ ...range(66, 90), marginTop: 20 }}>
              Découvrir mon ascendant et ma lune
            </a>
          </div>
        </section>

        {/* ===== III · CHACUN SA COURONNE ===== */}
        <section className="chap pin pin-long" id="nana">
          <div className="stage">
            <div className="eyebrow sa k-up" style={range(0, 12)}>CHAPITRE III · QUI EST NANA</div>
            <h2 className="h2 sa k-up" style={{ ...range(2, 18), marginBottom: 4 }}>Chacun sa couronne</h2>
            <div className="nana-wrap">
              <div className="portrait">
                <NanaVideo />
              </div>
              <div className="nana-text">
                <p className="nana-line sa k-cross" style={range(0, 34)}>
                  Nana, c’est la femme qui donne la vie, là où les projets prennent forme.
                </p>
                <p className="nana-line sa k-cross" style={range(33, 67)}>
                  Je lis le ciel comme une cartographie : elle éclaire tes tendances, jamais une fatalité. Ton libre arbitre reste ton pouvoir.
                </p>
                <p className="nana-line q sa k-cross" style={range(66, 100)}>
                  Tu es né avec ta couronne. Nul besoin d’envier le trône d’un autre.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== IV · LES LECTURES ===== */}
        <section className="chap pin" id="lectures">
          <div className="stage">
            <div className="eyebrow sa k-up" style={range(0, 12)}>CHAPITRE IV · LES LECTURES</div>
            <h2 className="h2 sa k-up" style={range(2, 20)}>Choisis la lecture qui te ressemble</h2>
            <ul className="offers">
              {offers.map((o, i) => (
                <li key={o.slug} className="offer sa k-up" style={range(18 + i * 16, 38 + i * 16)}>
                  <div className="offer-body">
                    <div className="offer-name">{o.name}</div>
                    <div className="offer-desc">{o.desc}</div>
                  </div>
                  <div className="offer-price">{priceLabel(o)}</div>
                </li>
              ))}
            </ul>
            <p className="helpline sa k-up" style={{ ...range(80, 96), marginTop: 14 }}>{HELPLINE}</p>
          </div>
        </section>

        {/* ===== V · MAISON NANA ===== */}
        <section className="chap pin" id="maison">
          <div className="stage maison">
            <div className="eyebrow sa k-up" style={range(0, 14)}>CHAPITRE V · TON ESPACE À TOI</div>
            <svg className="house" viewBox="0 0 300 340" fill="none" aria-hidden="true">
              <defs>
                <radialGradient id="warm" cx="50%" cy="78%" r="75%">
                  <stop offset="0" stopColor="#FFD79A" stopOpacity=".95" />
                  <stop offset=".5" stopColor="#E7A867" stopOpacity=".5" />
                  <stop offset="1" stopColor="#7A4A5A" stopOpacity=".15" />
                </radialGradient>
                <clipPath id="archclip">
                  <path d="M70 324 V150 A80 80 0 0 1 230 150 V324 Z" />
                </clipPath>
              </defs>
              <ellipse cx="150" cy="326" rx="120" ry="10" fill="var(--gold)" opacity=".12" />
              <g clipPath="url(#archclip)">
                <rect x="70" y="60" width="160" height="270" fill="url(#warm)" className="sa k-glow" style={range(6, 70)} />
                <circle cx="150" cy="230" r="46" fill="#FFE6B8" opacity=".5" className="sa k-glow" style={range(20, 80)} />
                <g className="sa k-doorl" style={{ ...range(8, 62), transformOrigin: "70px 0" }}>
                  <rect x="70" y="60" width="80" height="270" fill="var(--indigo-deep)" />
                  <path d="M110 150 H150 M110 190 H150" stroke="var(--gold)" strokeOpacity=".35" />
                  <circle cx="138" cy="236" r="3" fill="var(--gold-light)" />
                </g>
                <g className="sa k-doorr" style={{ ...range(8, 62), transformOrigin: "230px 0" }}>
                  <rect x="150" y="60" width="80" height="270" fill="var(--indigo-deep)" />
                  <path d="M150 150 H190 M150 190 H190" stroke="var(--gold)" strokeOpacity=".35" />
                  <circle cx="162" cy="236" r="3" fill="var(--gold-light)" />
                </g>
              </g>
              <path d="M70 324 V150 A80 80 0 0 1 230 150 V324" stroke="var(--gold-light)" strokeWidth="1.6" />
              <path d="M58 324 V146 A92 92 0 0 1 242 146 V324" stroke="var(--gold)" strokeOpacity=".4" />
              <path d="M150 38 L153 48 L163 51 L153 54 L150 64 L147 54 L137 51 L147 48 Z" fill="#FFE9B0" opacity=".9" />
            </svg>
            <h2 className="maison-title sa k-up" style={range(44, 62)}>Maison Nana</h2>
            <p className="lead sa k-up" style={{ ...range(52, 70), maxWidth: 440 }}>
              Un lieu où tu te sens chez toi. Ton espace privé, pour déposer ce que tu ressens, à ton rythme.
            </p>
            <ul className="perks">
              {MAISON_PERKS.map((t, i) => (
                <li key={t} className="chip sa k-up" style={range(70 + i * 3, 80 + i * 3)}>
                  {t}
                </li>
              ))}
            </ul>
            <div className="maison-price sa k-up" style={range(78, 92)}>
              {priceLabel({ priceCents: MAISON_PRICE_CENTS })} <span>par mois</span>
            </div>
            {/* Destination à définir (liste d'attente puis abonnement) */}
            <a href="#" className="btn-gold sa k-up" style={{ ...range(82, 98), marginTop: 14 }}>
              Entrer dans la Maison
            </a>
            <p className="helpline sa k-up" style={{ ...range(84, 100), marginTop: 12 }}>{HELPLINE}</p>
          </div>
        </section>

        {/* ===== VI · TA TRACE ===== */}
        <section className="chap pin" id="audio">
          <div className="stage">
            <div className="eyebrow sa k-up" style={range(0, 14)}>CHAPITRE VI · TA TRACE</div>
            <h2 className="h2 sa k-up" style={range(2, 22)}>Tes lectures, à réécouter quand tu veux</h2>
            <p className="lead sa k-up" style={{ ...range(14, 36), marginBottom: 26 }}>
              Chaque lecture est enregistrée en audio et rangée dans ton espace. Tu n’as pas à tout retenir : tout reste là.
            </p>
            <div className="player sa k-up" style={range(26, 50)}>
              <div className="player-title">Thème astral complet</div>
              <div className="player-date">Lecture du [DATE]</div>
              <div className="player-row">
                {/* Démonstration : aucun fichier audio dans cette version */}
                <button type="button" className="play" aria-label="Lire l’audio (démonstration)" disabled>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M5 2.5 L15 9 L5 15.5 Z" fill="var(--indigo)" />
                  </svg>
                </button>
                <div className="bars" aria-hidden="true">
                  {bars.map(({ played, ...style }, i) => (
                    <div key={i} className={"bar sa k-grow" + (played ? " played" : "")} style={style} />
                  ))}
                </div>
              </div>
              <div className="player-times">
                <span>0:00</span>
                <span>[DURÉE]</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FIN ===== */}
        <section className="final" id="fin">
          <div className="eyebrow">ET MAINTENANT</div>
          <h2 className="final-title cosmic-text">Ton ciel t’attend.</h2>
          <p className="lead" style={{ marginBottom: 26 }}>
            Choisis ta lecture. Nana s’occupe du reste, avec écoute et bienveillance.
          </p>
          <a href="#lectures" className="btn-gold">
            Réserver ma lecture
          </a>
          <a href="#haut" className="to-top">
            ↑ Revenir en haut
          </a>
          <LegalFooter />
        </section>
      </main>
    </div>
  );
}
