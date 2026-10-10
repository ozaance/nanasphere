import { FAQ, STEPS } from "@/content/faq";
import { range } from "./range";

// Chapitre de réassurance, entre les lectures et la Maison : le visiteur vient
// de voir les prix, c'est là qu'il se demande « comment ça se passe ».

export function Steps() {
  return (
    <ol className="steps">
      {STEPS.map((s, i) => (
        <li key={s.titre} className="step sa k-up" style={range(14 + i * 14, 34 + i * 14)}>
          <span className="step-n" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="step-title">{s.titre}</h3>
            <p className="step-text">{s.texte}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * FAQ en <details> natif : s'ouvre sans JavaScript, reste accessible au clavier
 * et aux lecteurs d'écran, et son contenu est trouvable par Ctrl+F.
 */
export function Faq() {
  return (
    <div className="faq">
      {FAQ.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>
            <span>{item.q}</span>
            <svg className="faq-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3 5.5 L7 9.5 L11 5.5" />
            </svg>
          </summary>
          <p>{item.r}</p>
        </details>
      ))}
    </div>
  );
}
