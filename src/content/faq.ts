// Réassurance. Rien ici n'est inventé : chaque réponse vient du brief de Nana
// ou du HANDOVER. Les trous sont marqués et doivent être remplis par Nana.
//
// [DÉLAI] — sous combien de jours Nana livre-t-elle une lecture ? Inconnu.
//           C'est la première question que se pose un acheteur : à combler vite.

export type Step = { titre: string; texte: string };

export const STEPS: Step[] = [
  {
    titre: "Tu choisis ta lecture",
    texte: "Du tirage simple au thème complet, selon la profondeur que tu cherches.",
  },
  {
    titre: "Tu donnes tes infos de naissance",
    texte: "Ta date, et si tu les connais ton heure et ta ville. Elles servent à ta lecture, à rien d’autre.",
  },
  {
    titre: "Nana enregistre ta lecture",
    texte: "Elle la prépare et l’enregistre en audio, rien que pour toi. Compte [DÉLAI].",
  },
  {
    titre: "Tu réécoutes quand tu veux",
    texte: "Ta lecture reste rangée dans ton espace. Tu n’as pas à tout retenir le jour même.",
  },
];

export type QA = { q: string; r: string };

export const FAQ: QA[] = [
  {
    q: "Comment je reçois ma lecture ?",
    r: "En audio, dans ton espace personnel sur le site. Tu la réécoutes autant de fois que tu veux, quand tu veux. Rien n’est publié ailleurs et rien n’est public.",
  },
  {
    q: "Qu’est-ce que Nana a besoin de savoir sur moi ?",
    r: "Ton prénom et ta date de naissance. Ton heure et ta ville de naissance si tu les connais : elles permettent d’aller plus loin, notamment sur ton ascendant et ta lune. Si tu ne les as pas, la lecture se fait quand même.",
  },
  {
    q: "Est-ce que mon thème décide de ma vie ?",
    r: "Non. Le ciel éclaire tes tendances, jamais une fatalité. Ton libre arbitre reste ton pouvoir : tu es né avec ta couronne.",
  },
  {
    q: "Combien de temps avant de recevoir ma lecture ?",
    r: "Compte [DÉLAI] après ta commande. Tu es prévenu·e dès qu’elle est déposée dans ton espace.",
  },
  {
    q: "Et si je traverse un moment vraiment difficile ?",
    r: "Les lectures sont un éclairage intuitif et astrologique, dans un cadre de guidance et de bien-être. Elles ne remplacent pas un avis médical, juridique ou financier. Si ça va mal, le 3114 est joignable gratuitement, 24 h/24.",
  },
];
