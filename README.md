# AXIOM — Boutique pièces fonctionnelles

Site e-commerce premium pour une marque de pièces fonctionnelles (simulation, flight sim, organisation, sur mesure).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Zustand (panier)
- Framer Motion (disponible) + animations CSS légères

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

- `src/data/` — produits démo, FAQ, catégories (**à remplacer**)
- `src/components/` — UI, produit, panier, formulaires
- `src/lib/` — config marque, panier, utils
- `src/app/` — pages SEO

## Remplacer les données démo

1. Éditer `src/data/products.ts`
2. Mettre à jour email / config dans `src/lib/config.ts`
3. Adapter les réponses FAQ dans `src/data/faq.ts`
4. Remplacer les placeholders d'images par de vraies photos

## Intégrations prévues

- Stripe : voir commentaires dans `CheckoutForm`
- Email / devis : `CustomQuoteForm` et `ContactForm` prêts pour `fetch` API
- Livraison offerte : activer `freeShippingThreshold` dans `config.ts` uniquement si règle réelle

## Scripts

- `npm run dev` — développement
- `npm run build` — build production
- `npm run start` — serveur production
