# 🚀 INSTRUCTIONS D'INSTALLATION - TAWKR

## 📋 RÉSUMÉ
Application de gestion des territoires commerciaux avec authentification, dashboard, et gestion des campagnes.

## 🔧 INSTALLATION

### 1. Prérequis
- Node.js 18+ : https://nodejs.org/
- npm (inclus avec Node.js)

### 2. Installation rapide
```bash
# Dans le dossier du projet
npm install

# Lancer en développement
npm run dev
```

### 3. Accès à l'application
- URL: http://localhost:5173
- Comptes de test :
  - Admin: admin@tawkr.com / admin123
  - Franchisé: franchise.bordeaux@tawkr.com / franchise123

## 📁 STRUCTURE DU PROJET
```
tawkr-app/
├── src/
│   ├── components/     # Composants UI
│   ├── contexts/       # Authentification
│   ├── data/          # Données mock
│   ├── pages/         # Pages de l'app
│   ├── types/         # Types TypeScript
│   └── App.tsx        # App principale
├── public/            # Assets statiques
├── package.json       # Dépendances
└── README.md         # Documentation
```

## 🎯 FONCTIONNALITÉS
✅ Authentification multi-rôles
✅ Dashboard avec métriques
✅ Gestion des territoires
✅ Campagnes marketing
✅ Système d'alertes
✅ Analytics et exports
✅ Interface responsive

## 🔧 COMMANDES
- `npm run dev` - Développement
- `npm run build` - Build production
- `npm run preview` - Prévisualiser build
- `npm run lint` - Vérifier le code

## 🚨 AIDE
En cas de problème :
1. Supprimer node_modules et package-lock.json
2. Relancer `npm install`
3. Vérifier que Node.js 18+ est installé

## 📞 SUPPORT
Application développée avec React + TypeScript + Vite + Tailwind CSS