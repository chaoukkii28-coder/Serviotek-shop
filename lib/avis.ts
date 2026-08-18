/**
 * Invitation à laisser un avis après un achat.
 *
 * Le lien n'est pas encore renseigné : il faut d'abord ouvrir un compte
 * chez un service d'avis (voir docs/avis-clients.md). Tant que la chaîne
 * ci-dessous est vide, aucune invitation n'est affichée au client — mieux
 * vaut ne rien proposer qu'un lien qui ne mène nulle part.
 */
export const LIEN_AVIS = "";

/** Nom du service affiché au client (« Laisser un avis sur Google »). */
export const NOM_SERVICE_AVIS = "Google";

export const avisActif = LIEN_AVIS.trim().length > 0;
