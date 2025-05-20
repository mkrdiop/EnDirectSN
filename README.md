# Zikcut - Plateforme de Création et Consommation Musicale IA

Bienvenue sur Zikcut, une plateforme musicale innovante, conçue pour les créateurs de musique, les influenceurs et les fans. Propulsée par Next.js, TypeScript et des technologies d'IA de pointe, Zikcut offre une suite complète d'outils pour créer, partager, monétiser et découvrir la musique de demain.

## ✨ Fonctionnalités

*   **🎵 Création de Pistes Audio IA :** Générez des morceaux de musique originaux dans divers genres et styles grâce à l'intelligence artificielle.
*   **🎬 Génération de Clips Vidéo IA :** Créez des clips vidéo captivants pour accompagner vos pistes musicales, en utilisant des outils IA.
*   **🎨 Conception de Pochettes d'Album IA :** Générez des pochettes d'album uniques et artistiques pour vos singles et albums.
*   **✍️ Assistant Paroles IA :** Obtenez de l'aide pour écrire des paroles inspirantes et créatives pour vos chansons.
*   **🚀 Outils de Distribution & Partage :** Partagez facilement votre musique sur la plateforme et potentiellement au-delà.
*   **🤝 Communauté & Connexion :** Mettez en relation les créateurs, les influenceurs et les fans de musique.
*   **💳 Monétisation (Maquette Sonatel Orange Money) :** Gérez vos revenus et intégrez Sonatel Orange Money pour des paiements fluides pour du contenu exclusif (Maquette pour la démo).
*   **💻 Interface Utilisateur Moderne :** Construit avec ShadCN UI et Tailwind CSS pour une expérience utilisateur élégante et réactive.

## 🛠️ Stack Technique

*   **Framework :** Next.js 15 (App Router)
*   **Langage :** TypeScript
*   **Styling :** Tailwind CSS, ShadCN UI
*   **Intelligence Artificielle :** Genkit (Google AI)
*   **Gestion de l'état (UI) :** React Hooks, Context API
*   **Validation de Formulaires :** React Hook Form, Zod

## 🚀 Démarrage Rapide

Suivez ces instructions pour mettre en place et faire fonctionner le projet sur votre machine locale.

### Prérequis

*   Node.js (version 18.x ou supérieure recommandée)
*   npm, yarn ou pnpm

### Installation

1.  **Clonez le dépôt :**
    ```bash
    git clone https://github.com/votre-utilisateur/zikcut.git
    cd zikcut
    ```

2.  **Installez les dépendances :**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3.  **Configurez les variables d'environnement :**
    Créez un fichier `.env` à la racine du projet en copiant `.env.example` (si fourni) ou en le créant manuellement.
    ```env
    # Exemple de variables nécessaires (principalement pour Genkit / Google AI)
    GOOGLE_API_KEY=VOTRE_CLE_API_GOOGLE_AI
    ```
    Assurez-vous d'obtenir une clé API valide depuis [Google AI Studio](https://aistudio.google.com/app/apikey) et activez l'API Generative Language.

### Lancer l'Application

1.  **Démarrez le serveur de développement Next.js :**
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:9002`.

2.  **Démarrez le serveur de développement Genkit (pour les fonctionnalités IA) :**
    Ouvrez un nouveau terminal et exécutez :
    ```bash
    npm run genkit:dev
    ```
    Ceci est nécessaire pour que les flux Genkit fonctionnent. Le serveur Genkit fonctionne généralement sur `http://localhost:4000`.

## 📂 Structure du Projet

```
zikcut/
├── src/
│   ├── ai/                  # Logique liée à l'IA avec Genkit
│   │   ├── flows/           # Définitions des flux Genkit (ex: génération audio, vidéo)
│   │   ├── genkit.ts        # Configuration globale de Genkit
│   │   └── dev.ts           # Point d'entrée pour le serveur de développement Genkit
│   ├── app/                 # Routes de l'application Next.js (App Router)
│   │   ├── (pages)/         # Groupes de routes pour les pages principales
│   │   │   ├── page.tsx     # Tableau de bord (page d'accueil de l'app)
│   │   │   └── ...          # Autres pages (génération IA, revenus, etc.)
│   │   ├── layout.tsx       # Layout principal de l'application
│   │   └── globals.css      # Styles globaux et variables de thème ShadCN
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/              # Composants ShadCN UI
│   │   ├── page-header.tsx  # Composant d'en-tête de page
│   │   └── ...              # Autres composants personnalisés
│   ├── hooks/               # Hooks React personnalisés
│   ├── lib/                 # Fonctions utilitaires et données mock
├── public/                  # Fichiers statiques
├── components.json          # Configuration ShadCN UI
├── next.config.ts           # Configuration Next.js
├── package.json             # Dépendances et scripts du projet
├── tailwind.config.ts       # Configuration Tailwind CSS
└── tsconfig.json            # Configuration TypeScript
```

## 📜 Scripts Disponibles

Dans le fichier `package.json`, vous trouverez plusieurs scripts utiles :

*   `npm run dev`: Lance l'application Next.js en mode développement.
*   `npm run genkit:dev`: Lance le serveur de développement Genkit pour les flux IA.
*   `npm run genkit:watch`: Lance le serveur de développement Genkit avec surveillance des modifications.
*   `npm run build`: Construit l'application pour la production.
*   `npm run start`: Lance le serveur de production Next.js (après `build`).
*   `npm run lint`: Exécute ESLint pour l'analyse statique du code.
*   `npm run typecheck`: Exécute le vérificateur de types TypeScript.

## 🤖 Fonctionnalités IA avec Genkit

Ce projet utilise **Genkit** pour intégrer des fonctionnalités d'intelligence artificielle générative pour la musique.
*   **Flux Définis :** Les fonctionnalités IA comme la génération de pistes audio, de clips vidéo, de pochettes d'album et l'assistance à l'écriture de paroles sont implémentées en tant que flux Genkit dans `src/ai/flows/`.
*   **Configuration :** L'instance Genkit est configurée dans `src/ai/genkit.ts`.
*   **Développement :** Un serveur de développement Genkit séparé (`npm run genkit:dev`) est nécessaire pour tester et exécuter ces flux localement.

## 🌐 Déploiement

Pour déployer cette application Next.js, vous pouvez utiliser des plateformes comme Vercel, Netlify, ou un serveur Node.js personnalisé. N'oubliez pas de configurer les variables d'environnement requises.

## 🤝 Contribution

Les contributions sont les bienvenues !
1.  Forkez le dépôt.
2.  Créez une nouvelle branche.
3.  Faites vos modifications.
4.  Commitez vos changements.
5.  Poussez vers la branche.
6.  Ouvrez une Pull Request.

## 📄 Licence

Ce projet est sous licence MIT (à ajouter si nécessaire).

---

Merci d'utiliser Zikcut ! Nous espérons que cette plateforme vous aidera à créer, partager et découvrir des musiques exceptionnelles.
