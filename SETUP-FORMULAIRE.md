# Connecter l'adresse mail au formulaire de devis

Le formulaire de la page Contact est déjà branché — il manque juste **l'identifiant Formspree** pour que les messages arrivent dans la boîte de Louis. **Compte 2 minutes**.

---

## Étape 1 — Créer un compte Formspree (gratuit)

1. Va sur **https://formspree.io**
2. Clique **« Get Started »** ou **« Sign Up »**
3. Crée le compte avec l'adresse **green.clean2201@gmail.com**
4. Confirme l'e-mail (Formspree t'envoie un lien)

Le plan gratuit autorise **50 demandes / mois** — largement suffisant pour démarrer.

---

## Étape 2 — Créer un formulaire

1. Une fois connecté → bouton **« New form »** (ou **« + New Project »** puis **« New Form »**)
2. **Form name** : `Devis Green Clean`
3. **Send to** : `green.clean2201@gmail.com` (déjà rempli si tu t'es inscrit avec)
4. Clique **« Create form »**

Formspree affiche alors une URL du type :
```
https://formspree.io/f/xyzabcde
```

L'identifiant est la dernière partie : `xyzabcde` (8 caractères).

---

## Étape 3 — Coller l'identifiant dans le code

Ouvre `contact.html` et cherche la ligne :

```html
action="https://formspree.io/f/REMPLACER_PAR_VOTRE_ID_FORMSPREE"
```

Remplace `REMPLACER_PAR_VOTRE_ID_FORMSPREE` par ton ID (ex. `xyzabcde`). La ligne devient :

```html
action="https://formspree.io/f/xyzabcde"
```

Sauvegarde, pousse sur GitHub — c'est fait.

---

## Étape 4 — Tester

1. Va sur le site → page Contact
2. Remplis le formulaire avec ton e-mail
3. Clique **Demander un devis gratuit**
4. La première fois, Formspree t'envoie un mail de **confirmation** sur green.clean2201@gmail.com — clique le lien pour activer la réception (action ponctuelle).
5. À partir de là, chaque demande arrive dans la boîte Gmail avec :
   - Le nom du client
   - Son e-mail (sur lequel il suffit de cliquer pour répondre)
   - Son téléphone, son code postal
   - La prestation souhaitée
   - Son message

---

## Ce qui se passe côté client

- Le client clique **« Demander un devis gratuit »**
- Le bouton affiche **« Envoi en cours… »**
- Le message vert **« Merci — j'ai bien reçu votre demande… »** apparaît
- En cas d'erreur, un message rouge propose d'écrire directement à `green.clean2201@gmail.com` ou d'appeler le `+32 491 11 32 53`

Le formulaire est protégé contre les robots (champ caché « honeypot » + filtres Formspree).

---

## Si vous changez d'avis

- **Plus de demandes ?** Plan PRO Formspree : 8 €/mois pour 1 000 demandes.
- **Vous voulez recevoir aussi sur une seconde adresse ?** Dans le dashboard Formspree → Settings du formulaire → ajouter un destinataire.
- **Spam ?** Formspree a un filtre intégré + reCAPTCHA optionnel à activer dans le dashboard.
