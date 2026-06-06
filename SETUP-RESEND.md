# Activer le formulaire — 2 minutes chrono

Le formulaire envoie maintenant via **Resend** (service e-mail moderne, 3000 envois/mois gratuits).
Une seule étape avant que ça marche : **donner sa clé API à Vercel**.

---

## 1. Récupérer la clé Resend (1 min)

1. Aller sur **https://resend.com**
2. Cliquer **« Sign Up »** — tu peux te connecter avec Google (clic, c'est instantané)
3. Une fois sur le dashboard, à gauche → **« API Keys »**
4. Cliquer **« Create API Key »**
5. Nom : `Green Clean` · Permission : `Full Access` (ou `Sending Access`)
6. **Copier la clé** affichée (commence par `re_...`). ⚠ Elle ne s'affiche qu'une fois.

---

## 2. Coller la clé dans Vercel (1 min)

1. Aller sur **https://vercel.com/dashboard**
2. Cliquer sur le projet **vandal-multiservices** (ou son nom actuel)
3. Onglet **« Settings »** (en haut)
4. Section **« Environment Variables »** (à gauche)
5. Ajouter :
   - **Key** : `RESEND_API_KEY`
   - **Value** : la clé copiée à l'étape 1 (`re_...`)
   - **Environments** : cocher les trois (Production, Preview, Development)
6. Cliquer **« Save »**

---

## 3. Redéployer (10 sec)

1. Toujours dans le projet Vercel → onglet **« Deployments »**
2. Sur le dernier déploiement (le plus récent) → menu **« ⋯ »** → **« Redeploy »**
3. Confirmer

**C'est fini.** Va sur la page Contact, remplis le formulaire, soumets → Louis reçoit le mail dans Gmail dans la minute.

---

## Pourquoi c'est mieux que tout ce qu'on a essayé

- **Pas d'activation par mail** (pas de bouton qui plante)
- **Pas de quota mensuel ridicule** (3000 envois/mois gratuits — la concurrence est à 50)
- **L'e-mail arrive instantanément**, mis en forme proprement (table verte, fond léger)
- **Cliquer Répondre dans Gmail** répond direct au client (champ `Reply-To` configuré)
- **Aucune dépendance JS** : la clé est cachée côté serveur, jamais exposée dans le navigateur
- **Anti-spam** : honeypot + validation des champs requis côté serveur

## Pour ajouter d'autres destinataires

Dans `api/contact.js`, ligne 5 :
```js
const TO_EMAIL = 'green.clean2201@gmail.com';
```

Devient :
```js
const TO_EMAIL = ['green.clean2201@gmail.com', 'autre@email.com'];
```

(Resend accepte un tableau directement.)

## Si plus tard tu veux que ça envoie depuis `bonjour@green-clean.be`

Dans Resend → Domains → ajouter `green-clean.be` → suivre les DNS records → puis changer `FROM_EMAIL` dans `api/contact.js` :
```js
const FROM_EMAIL = 'Green Clean <bonjour@green-clean.be>';
```
