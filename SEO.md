# SEO — Green Clean

Tout est prêt côté code. Voici ce qui a été fait et les **3 actions externes** qui restent à faire pour décrocher les premières positions.

---

## Ce qui est déjà en place dans le code

### Référencement local (le plus important)
- **Schema.org LocalBusiness** complet sur l'accueil avec : adresse, coordonnées GPS de Morlanwelz, n° TVA, horaires, 11 zones desservies, 3 services
- **Schema Service** sur la page Prestations + **BreadcrumbList** sur chaque sous-page
- **Schema Person** sur la page À propos pour Louis
- **Schema ContactPage** sur la page Contact
- **Géolocalisation HTML** (geo.region, geo.position, ICBM) sur chaque page
- **Section « Zone d'intervention »** sur l'accueil avec 15 villes du Hainaut

### Métadonnées
- Titre + description optimisés et uniques par page (avec « Morlanwelz », « Hainaut », « paysagiste »)
- Keywords ciblés par page
- Canonical URL par page
- Open Graph + Twitter Cards pour partage social
- Theme color, favicon, apple-touch-icon

### Technique
- `sitemap.xml` à la racine (avec image-sitemap pour Google Images)
- `robots.txt` à la racine
- Lazy loading sur toutes les images non critiques
- `fetchpriority="high"` sur l'image héro
- `lang="fr-BE"` pour bien cibler la Belgique francophone
- Pages légales en `noindex` (pour ne pas diluer)

---

## Les 3 actions à faire dès la mise en ligne

### 1. Acheter le nom de domaine

Recommandé : **green-clean.be** (Belgique → mieux pour Google Belgique)

Si le domaine est différent, lance cette commande pour tout mettre à jour :
```bash
find . -name "*.html" -o -name "*.xml" -o -name "*.txt" | xargs sed -i 's|green-clean.be|TON-DOMAINE.be|g'
```

### 2. Créer une fiche Google Business Profile

C'est **gratuit et c'est le levier #1** pour ressortir dans Google Maps et le pack local quand on cherche « paysagiste Morlanwelz » ou « jardinier Hainaut ».

→ https://business.google.com

Infos à mettre :
- Nom : Green Clean
- Catégorie : Paysagiste (catégorie principale) + Service d'entretien de jardin (secondaire)
- Adresse : Rue Abel Hélin 5, 7140 Morlanwelz
- Téléphone : +32 491 11 32 53
- Site : (l'URL finale)
- Horaires : 08:00–18:00 (lundi → samedi)
- Description : reprends le titre de l'accueil
- Photos : importe les 7 photos de réalisations + la photo de Louis + le logo

**Demande systématiquement des avis** aux 5 premiers clients : 5 avis 5 étoiles = très gros boost dans le pack local.

### 3. Soumettre le sitemap à Google + Bing

- **Google Search Console** : https://search.google.com/search-console
  → Ajouter la propriété → Sitemaps → soumettre `sitemap.xml`
- **Bing Webmaster Tools** : https://www.bing.com/webmasters
  → Même processus

---

## Mots-clés ciblés (par ordre de priorité)

1. paysagiste Morlanwelz
2. jardinier Hainaut
3. entretien jardin Morlanwelz / Hainaut
4. aménagement extérieur Hainaut
5. débroussaillage Hainaut / Wallonie
6. paysagiste La Louvière / Binche / Charleroi
7. entreprise parcs et jardins Wallonie
8. tonte pelouse / taille de haies + commune

---

## Pour aller plus loin (plus tard)

- Ajouter un blog (un article par mois sur « comment entretenir sa pelouse au printemps », « quelle haie choisir en Wallonie », etc.) = boost massif sur la longue traîne
- Créer une page par commune principale (ex. /paysagiste-la-louviere.html) → ultra-puissant pour le SEO local
- Inscrire l'entreprise sur les annuaires locaux belges : Pages d'Or, Yellow Pages, Hellopro, Werkmetzelfstandigen, Houzz, etc. (backlinks)
- Encourager les clients à laisser un avis Google après chaque chantier
