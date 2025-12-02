# 🚀 Guide de Déploiement - Noël Magique

## 📍 Fichiers Importants

### Fichier index.html
**Emplacement** : `idee2/index.html` (racine du projet)

Ce fichier est le point d'entrée de votre application. Il contient :
- Les balises meta pour le SEO
- Les liens vers Google Fonts
- Le conteneur `<div id="root">` où React s'injecte
- Le script qui charge votre application React

### Fichier _redirects
**Emplacement** : `idee2/public/_redirects`

Ce fichier est crucial pour le déploiement sur Netlify. Il redirige toutes les routes vers `index.html` pour que React Router fonctionne correctement.

---

## 🌐 Options de Déploiement

### Option 1 : Netlify (Recommandé - Le Plus Simple)

#### Étape 1 : Préparer le build
```bash
cd idee2
npm run build
```
Cela créera un dossier `dist/` avec tous les fichiers optimisés.

#### Étape 2 : Déployer sur Netlify

**Méthode A : Via l'interface web (Drag & Drop)**
1. Allez sur https://app.netlify.com/
2. Connectez-vous ou créez un compte gratuit
3. Cliquez sur "Add new site" → "Deploy manually"
4. Glissez-déposez le dossier `dist/` dans la zone de dépôt
5. Votre site sera en ligne en quelques secondes !

**Méthode B : Via GitHub (Automatique)**
1. Votre code est déjà sur GitHub : https://github.com/Dory-Gen/nono2025.git
2. Allez sur https://app.netlify.com/
3. Cliquez sur "Add new site" → "Import an existing project"
4. Choisissez "GitHub" et sélectionnez votre repo `nono2025`
5. Configurez :
   - **Base directory** : `idee2`
   - **Build command** : `npm run build`
   - **Publish directory** : `idee2/dist`
6. Cliquez sur "Deploy site"

**Avantages** :
- ✅ Déploiement automatique à chaque push sur GitHub
- ✅ HTTPS gratuit
- ✅ CDN mondial
- ✅ Domaine personnalisé gratuit (.netlify.app)

---

### Option 2 : Vercel

#### Étape 1 : Installer Vercel CLI (optionnel)
```bash
npm i -g vercel
```

#### Étape 2 : Déployer

**Méthode A : Via CLI**
```bash
cd idee2
vercel
```
Suivez les instructions à l'écran.

**Méthode B : Via GitHub**
1. Allez sur https://vercel.com/
2. Connectez-vous avec GitHub
3. Importez votre repo `nono2025`
4. Configurez :
   - **Root Directory** : `idee2`
   - **Framework Preset** : Vite
5. Cliquez sur "Deploy"

---

### Option 3 : GitHub Pages

#### Étape 1 : Installer gh-pages
```bash
cd idee2
npm install --save-dev gh-pages
```

#### Étape 2 : Modifier package.json
Ajoutez dans `package.json` :
```json
{
  "homepage": "https://dory-gen.github.io/nono2025",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Étape 3 : Déployer
```bash
npm run deploy
```

#### Étape 4 : Configurer vite.config.js
Ajoutez :
```javascript
export default defineConfig({
  base: '/nono2025/',
  // ... reste de la config
})
```

---

## 📦 Structure après Build

Après `npm run build`, le dossier `dist/` contiendra :
```
dist/
├── index.html          ← Fichier HTML principal
├── assets/
│   ├── index-[hash].js  ← JavaScript compilé
│   ├── index-[hash].css ← CSS compilé
│   └── ...
├── music/              ← Vos fichiers MP3
└── _redirects          ← Règles de redirection
```

**Important** : C'est le contenu du dossier `dist/` qu'il faut déployer, pas le dossier `idee2/` complet !

---

## ✅ Checklist avant déploiement

- [ ] Tester localement avec `npm run dev`
- [ ] Vérifier que tous les jeux fonctionnent
- [ ] Ajouter les fichiers MP3 de Noël dans `public/music/`
- [ ] Tester le build : `npm run build`
- [ ] Vérifier le dossier `dist/` créé
- [ ] Tester le build localement : `npm run preview`
- [ ] Commit et push sur GitHub

---

## 🎯 Recommandation

**Pour vous, je recommande Netlify via GitHub** car :
1. Votre code est déjà sur GitHub
2. Déploiement automatique à chaque modification
3. Configuration simple
4. Gratuit et performant
5. Le fichier `_redirects` est déjà en place

---

## 🆘 En cas de problème

### Problème : Les routes ne fonctionnent pas (404)
**Solution** : Vérifiez que le fichier `public/_redirects` existe avec :
```
/*    /index.html   200
```

### Problème : Les fichiers audio ne se chargent pas
**Solution** : Vérifiez que les fichiers MP3 sont bien dans `public/music/` avant le build.

### Problème : Le site est blanc après déploiement
**Solution** : Vérifiez la console du navigateur pour les erreurs. Souvent c'est un problème de chemin de base (base path).

---

## 📞 Support

Pour toute question : contact@keztechnologie.com

Bon déploiement ! 🎄🚀
