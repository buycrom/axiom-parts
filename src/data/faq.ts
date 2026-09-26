/**
 * FAQ — réponses génériques / placeholders.
 * Remplacez par vos délais, matériaux et politiques réels.
 */
export const faqItems = [
  {
    id: "materiaux",
    question: "Quels matériaux utilisez-vous ?",
    answer:
      "Les matériaux varient selon la pièce et l'usage prévu. Les caractéristiques exactes sont indiquées sur chaque fiche produit. Contactez-nous si vous avez une contrainte spécifique.",
  },
  {
    id: "delai-fabrication",
    question: "Combien de temps faut-il pour fabriquer une pièce ?",
    answer:
      "Les délais dépendent du produit et de la charge de production. Indiquez ici vos délais réels (ex. : X à Y jours ouvrés).",
  },
  {
    id: "expedition",
    question: "Quels sont les délais d'expédition ?",
    answer:
      "À renseigner selon votre transporteur et votre zone de livraison. Les délais détaillés seront confirmés au checkout.",
  },
  {
    id: "compatibilite",
    question: "Comment savoir si une pièce est compatible ?",
    answer:
      "Chaque fiche produit liste clairement les équipements compatibles. Vous pouvez aussi utiliser le configurateur « Trouvez votre pièce » ou nous contacter avec votre modèle.",
  },
  {
    id: "personnalisees",
    question: "Faites-vous des pièces personnalisées ?",
    answer:
      "Oui. Envoyez-nous votre besoin via la page Sur mesure : description, dimensions, photos. Nous étudions la faisabilité et vous répondons.",
  },
  {
    id: "modification",
    question: "Puis-je demander une modification ?",
    answer:
      "Selon la pièce, des adaptations (dimensions, couleur, fixation) peuvent être étudiées. Décrivez votre besoin via le formulaire sur mesure.",
  },
  {
    id: "paiement",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Le paiement en ligne sera géré via une solution sécurisée (ex. Stripe). Les moyens exacts seront listés au checkout une fois l'intégration finalisée.",
  },
  {
    id: "modele-introuvable",
    question: "Que faire si je ne trouve pas mon modèle ?",
    answer:
      "Utilisez le formulaire Sur mesure. Indiquez marque, modèle, version et quelques dimensions — nous verrons si une pièce adaptée est possible.",
  },
] as const;
