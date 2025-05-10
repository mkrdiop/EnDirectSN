# EnDirectAuSénégal - Plateforme de Streaming en Direct

Bienvenue sur EnDirectAuSénégal, une plateforme de streaming en direct riche en fonctionnalités, conçue pour les créateurs de contenu au Sénégal et au-delà. Propulsée par Next.js, TypeScript et des technologies d'IA de pointe, cette application offre une suite complète d'outils pour gérer, monétiser et améliorer vos diffusions en direct.

## ✨ Fonctionnalités

*   **📺 Configuration de Streaming HD :** Personnalisez vos streams avec des logos, des superpositions et des arrière-plans. Ajustez la résolution et la qualité d'enregistrement.
*   **📡 Multistreaming :** Diffusez simultanément sur plusieurs plateformes RTMP (ex: YouTube, Facebook, Twitch) pour atteindre un public plus large. Configurez jusqu'à 8 destinations.
*   **🤖 Moments Forts IA :** Générez automatiquement des extraits vidéo captivants de vos diffusions en direct grâce à l'intelligence artificielle.
*   **🌍 Traduction IA en Direct :** Traduisez le contenu parlé de votre stream en temps réel dans plusieurs langues pour une audience globale.
*   **💳 Paiements & Monétisation (Intégration Sonatel Orange Money) :** Gérez vos revenus et intégrez Sonatel Orange Money pour des paiements fluides (Maquette pour la démo).
*   **💻 Webinaire "En Direct" :** Organisez des webinaires jusqu'à 1000 spectateurs directement sur la plateforme, avec un temps de streaming illimité.
*   **🎨 Interface Utilisateur Moderne :** Construit avec ShadCN UI et Tailwind CSS pour une expérience utilisateur élégante et réactive.

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
    git clone https://github.com/votre-utilisateur/endirectausenegal.git
    cd endirectausenegal
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
    Ceci est nécessaire pour que les flux Genkit (traduction, moments forts) fonctionnent. Le serveur Genkit fonctionne généralement sur `http://localhost:4000`.

## 📂 Structure du Projet

```
endirectausenegal/
├── src/
│   ├── ai/                  # Logique liée à l'IA avec Genkit
│   │   ├── flows/           # Définitions des flux Genkit (ex: traduction, moments forts)
│   │   ├── genkit.ts        # Configuration globale de Genkit
│   │   └── dev.ts           # Point d'entrée pour le serveur de développement Genkit
│   ├── app/                 # Routes de l'application Next.js (App Router)
│   │   ├── (pages)/         # Groupes de routes pour les pages principales
│   │   │   ├── page.tsx     # Tableau de bord (page d'accueil)
│   │   │   └── ...          # Autres pages (multistreaming, paiements, etc.)
│   │   ├── layout.tsx       # Layout principal de l'application
│   │   └── globals.css      # Styles globaux et variables de thème ShadCN
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/              # Composants ShadCN UI
│   │   ├── page-header.tsx  # Composant d'en-tête de page
│   │   └── ...              # Autres composants personnalisés
│   ├── hooks/               # Hooks React personnalisés (ex: useToast, useIsMobile)
│   ├── lib/                 # Fonctions utilitaires (ex: cn pour classnames)
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

Ce projet utilise **Genkit** pour intégrer des fonctionnalités d'intelligence artificielle générative. Genkit facilite l'appel à des modèles de langage (LLM) et des modèles de génération d'images.

*   **Flux Définis :** Les fonctionnalités IA comme la création de moments forts et la traduction en direct sont implémentées en tant que flux Genkit dans `src/ai/flows/`.
*   **Configuration :** L'instance Genkit est configurée dans `src/ai/genkit.ts`, utilisant le plugin `googleAI` pour interagir avec les modèles Gemini de Google.
*   **Développement :** Un serveur de développement Genkit séparé (`npm run genkit:dev`) est nécessaire pour tester et exécuter ces flux localement.

## 🌐 Déploiement

Pour déployer cette application Next.js, vous pouvez utiliser des plateformes comme :

*   **Vercel :** Le créateur de Next.js, offrant une intégration transparente.
*   **Netlify :** Une autre option populaire pour les applications Jamstack.
*   **Serveur Node.js personnalisé :** Vous pouvez héberger l'application sur votre propre serveur.

N'oubliez pas de configurer les variables d'environnement requises sur votre plateforme d'hébergement. Les flux Genkit pourraient nécessiter une configuration spécifique pour le déploiement en production (ex: Firebase Cloud Functions si vous utilisez l'intégration Firebase de Genkit).

## 🤝 Contribution

Les contributions sont les bienvenues ! Si vous souhaitez améliorer cette application :

1.  Forkez le dépôt.
2.  Créez une nouvelle branche (`git checkout -b feature/nom-de-la-fonctionnalite`).
3.  Faites vos modifications.
4.  Commitez vos changements (`git commit -m 'Ajout de fonctionnalité X'`).
5.  Poussez vers la branche (`git push origin feature/nom-de-la-fonctionnalite`).
6.  Ouvrez une Pull Request.

Veuillez vous assurer que votre code respecte les conventions de style et passe les vérifications de linting et de typage.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails (si un fichier LICENSE est ajouté).

---

Merci d'utiliser EnDirectAuSénégal ! Nous espérons que cette plateforme vous aidera à créer et partager des contenus exceptionnels.
