export const HELPLINE = (
  <>
    Si tu traverses un moment très difficile, le <a href="tel:3114">3114</a> (prévention du suicide) est joignable gratuitement, 24 h/24.
  </>
);

// Liens en attente des pages légales (contenu à rédiger, voir HANDOVER.md §8).
export function LegalFooter() {
  return (
    <footer className="legal">
      <div className="legal-sig">L’art de lire le ciel, la sagesse de s’écouter.</div>
      <nav className="legal-links" aria-label="Informations légales">
        <a href="#">Mentions légales</a>
        <a href="#">CGV</a>
        <a href="#">Confidentialité</a>
        <a href="#">Contact</a>
      </nav>
      <p>
        Guidance et bien-être : les lectures proposées sont un éclairage intuitif et astrologique. Elles ne remplacent pas un
        avis médical, juridique ou financier.
      </p>
      <p className="helpline">{HELPLINE}</p>
      <p>Portrait créé avec l’aide de l’intelligence artificielle, à partir de photographies de Nana.</p>
    </footer>
  );
}
