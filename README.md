# 🎯 Visualisateur d'Algorithmes de Tri

Une application web interactive et moderne pour visualiser les algorithmes de tri, construite avec **Next.js**, **React**, **TypeScript**, **Tailwind CSS** et **shadcn/ui**.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5+-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4+-38bdf8.svg)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black.svg)

## ✨ Fonctionnalités

- 🎨 **Interface moderne** avec shadcn/ui
- ⚡ **Animations fluides** et interactions en temps réel
- 🎮 **Contrôles interactifs** (vitesse, taille du tableau)
- 📱 **Design responsive** adapté à tous les écrans
- 🎯 **Visualisation claire** avec code couleur intuitif
- 📚 **Informations pédagogiques** sur les algorithmes
- 🔧 **Architecture modulaire** et extensible
- 🎭 **Composants réutilisables** avec shadcn/ui

## 📸 Aperçu

L'application affiche une visualisation interactive des **algorithmes de tri** avec :
- **Tri par sélection** - Algorithme de base avec visualisation des minimums
- **Tri par insertion** - Insertion progressive des éléments
- **Tri fusion** - Algorithme divide-and-conquer récursif
- Barres colorées représentant les éléments du tableau
- Animations montrant les comparaisons et échanges
- Légende claire des différents états
- Informations sur la complexité et les caractéristiques

## 🚀 Installation et Lancement

### Prérequis
- Node.js 18+
- npm, yarn, pnpm ou bun

### Installation
```bash
# Cloner le repository
git clone <url-du-repo>
cd algo-vizualisation

# Installer les dépendances
npm install
# ou
yarn install
# ou
pnpm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Production
```bash
# Build de production
npm run build
npm start
```

## 🏗️ Architecture du Projet

```
├── app/
│   ├── layout.tsx          # Layout principal Next.js
│   └── page.tsx            # Page d'accueil
├── components/
│   ├── ui/                 # Composants UI (shadcn/ui + wrappers)
│   │   ├── button.tsx            # Bouton shadcn/ui
│   │   ├── card.tsx              # Card shadcn/ui
│   │   ├── slider.tsx            # Slider shadcn/ui
│   │   ├── badge.tsx             # Badge shadcn/ui
│   │   ├── tooltip.tsx           # Tooltip shadcn/ui
│   │   ├── algorithm-selector.tsx # Sélecteur d'algorithmes
│   │   ├── control-button.tsx    # Wrapper pour boutons de contrôle
│   │   ├── custom-slider.tsx     # Wrapper pour sliders
│   │   ├── legend-item.tsx       # Éléments de légende
│   │   ├── progress.tsx          # Barre de progression
│   │   ├── select.tsx            # Composant select
│   │   ├── separator.tsx         # Séparateur
│   │   └── visualization-bar.tsx # Barres de visualisation
│   └── features/
│       └── sort-visualizer/      # Composants métier
│           ├── algorithm-info.tsx # Informations algorithme
│           ├── algorithm-legends.tsx # Légendes des algorithmes
│           ├── controls.tsx      # Panel de contrôle
│           ├── index.ts          # Exports des composants
│           ├── legend.tsx        # Légende des couleurs
│           ├── selection-sort-visualizer.tsx # Composant principal
│           └── visualization.tsx # Zone de visualisation
├── lib/
│   ├── algorithms/         # Implémentations des algorithmes
│   │   ├── algorithm-data.ts     # Données des algorithmes
│   │   ├── selection-sort.ts     # Tri par sélection
│   │   ├── insertion-sort.ts     # Tri par insertion
│   │   └── merge-sort.ts         # Tri fusion
│   ├── hooks/              # Hooks personnalisés React
│   │   ├── use-sort-state.ts     # État du tri
│   │   ├── use-array-generation.ts # Génération de tableaux
│   │   ├── use-bar-styling.ts    # Styles des barres
│   │   ├── use-insertion-sort-styling.ts # Styles spécifiques insertion
│   │   └── use-merge-sort-styling.ts # Styles spécifiques fusion
│   ├── types/              # Types TypeScript
│   │   └── index.ts              # Interfaces et types
│   └── utils/              # Utilitaires
│       └── index.ts              # Fonctions helper
```

### 🎯 Principes d'Architecture

- **Séparation des responsabilités** : UI, logique métier, et utilitaires séparés
- **shadcn/ui** : Composants UI modernes et accessibles
- **Composants réutilisables** : Wrappers personnalisés autour de shadcn/ui
- **Hooks personnalisés** : Logique d'état encapsulée et réutilisable
- **Types stricts** : TypeScript pour la sécurité des types
- **Clean Code** : Fichiers focalisés sur une responsabilité unique
- **Design System** : Cohérence visuelle avec shadcn/ui

## 🔧 Ajouter un Nouvel Algorithme

### 1. Créer l'implémentation de l'algorithme

```typescript
// lib/algorithms/bubble-sort.ts
import { sleep } from '@/lib/utils';
import { SortCallbacks } from './selection-sort';

export async function bubbleSort(
  initialArray: number[],
  speed: number,
  callbacks: SortCallbacks
): Promise<void> {
  const { setArray, checkIsRunning } = callbacks;
  const arr = [...initialArray];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (!checkIsRunning()) break;

    for (let j = 0; j < n - i - 1; j++) {
      if (!checkIsRunning()) break;

      // Logique de tri avec callbacks pour l'interface
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
  }
}
```

### 2. Ajouter les types nécessaires

```typescript
// lib/types/index.ts
export type SortAlgorithm = 'selection' | 'bubble' | 'insertion' | 'merge' | 'quick';

export interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
  description: string;
}
```

### 3. Créer un nouveau visualiseur (optionnel)

```typescript
// components/features/sort-visualizer/bubble-sort-visualizer.tsx
// Suivre la même structure que SelectionSortVisualizer
```

### 4. Ajouter le sélecteur d'algorithme

```typescript
// components/features/sort-visualizer/algorithm-selector.tsx
const AlgorithmSelector = ({ algorithm, onAlgorithmChange }) => {
  return (
    <select onChange={(e) => onAlgorithmChange(e.target.value)}>
      <option value="selection">Tri par Sélection</option>
      <option value="bubble">Tri à Bulles</option>
      {/* Autres algorithmes */}
    </select>
  );
};
```

## 🎨 Personnalisation du Design

### Couleurs des Barres
```typescript
// lib/utils.ts
export const getBarColors = {
  sorted: '#22c55e',    // green-500
  current: '#ef4444',   // red-500
  minimum: '#f59e0b',   // amber-500
  comparing: '#3b82f6', // blue-500
  default: '#9ca3af'    // gray-400
} as const;
```

### Thèmes avec shadcn/ui
```typescript
// Utiliser les variables CSS de shadcn/ui dans app/globals.css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... autres variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... autres variables pour le mode sombre */
}
```

### Composants shadcn/ui
```bash
# Ajouter de nouveaux composants
npx shadcn@latest add alert
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
```

## 📊 Composants Disponibles

### UI Components (`components/ui/`)

#### shadcn/ui Composants Natifs
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
```

#### `ControlButton` (Wrapper)
```typescript
<ControlButton
  variant="default" // shadcn variants: default, destructive, outline, secondary, ghost, link
  size="lg"
  onClick={handleClick}
  disabled={false}
>
  <Play size={20} />
  Démarrer
</ControlButton>
```

#### `CustomSlider` (Wrapper)
```typescript
<CustomSlider
  label="Vitesse"
  value={[speed]}        // Array pour shadcn Slider
  min={100}
  max={2000}
  onValueChange={(values) => setSpeed(values[0])}
  unit="ms"
/>
```

#### `VisualizationBar`
```typescript
<VisualizationBar
  value={42}
  index={0}
  maxHeight={200}
  barWidth={30}
  getBarColor={getBarColor}
  isRunning={true}
/>
```

### Hooks (`lib/hooks/`)

#### `useSortState`
```typescript
const {
  array,
  isRunning,
  startSorting,
  stopSorting,
  resetAnimation
} = useSortState(initialSize);
```

#### `useArrayGeneration`
```typescript
const { generateArray } = useArrayGeneration({
  arraySize,
  setArray,
  resetAnimation
});
```

## 🚀 Améliorations Possibles

### 🔥 Fonctionnalités Prioritaires
- [x] **Sélecteur d'algorithmes** - Support de multiples algorithmes (sélection, insertion, fusion)
- [ ] **Mode comparaison** - Comparer 2 algorithmes côte à côte
- [ ] **Statistiques temps réel** - Nombre de comparaisons, échanges
- [ ] **Sauvegarde de sessions** - Exporter/importer des configurations
- [ ] **Mode tutoriel** - Guide interactif pas à pas

### 🎨 Améliorations UX/UI
- [ ] **Mode sombre** - Support du thème sombre shadcn/ui
- [ ] **Composants avancés** - Dropdown, Tabs, Alert avec shadcn/ui
- [ ] **Animations natives** - Framer Motion avec shadcn/ui
- [ ] **Raccourcis clavier** - Contrôles au clavier
- [ ] **Mode plein écran** - Dialog shadcn/ui pour présentation

### ⚡ Performance et Technique
- [ ] **Web Workers** - Tri en arrière-plan pour gros tableaux
- [ ] **Canvas/WebGL** - Rendu haute performance
- [ ] **PWA** - Application installable
- [ ] **Tests unitaires** - Coverage complète
- [ ] **Storybook** - Documentation des composants

### 📚 Fonctionnalités Pédagogiques
- [ ] **Code source affiché** - Montrer le code en temps réel
- [ ] **Pseudocode interactif** - Surligner les lignes exécutées
- [ ] **Quiz intégrés** - Questions sur les algorithmes
- [ ] **Certification** - Badges de complétion
- [ ] **Partage social** - Partager des visualisations

### 🌐 Algorithmes à Ajouter
- [ ] **Tri à bulles** (Bubble Sort)
- [x] **Tri par insertion** (Insertion Sort) - ✅ Implémenté
- [x] **Tri fusion** (Merge Sort) - ✅ Implémenté
- [ ] **Tri rapide** (Quick Sort)
- [ ] **Tri par tas** (Heap Sort)
- [ ] **Tri comptage** (Counting Sort)
- [ ] **Tri par base** (Radix Sort)

## 📝 Stack Technique

- **Framework** : Next.js 15.5+ (App Router)
- **Langage** : TypeScript 5+
- **Styles** : Tailwind CSS 4+ + shadcn/ui
- **Composants UI** : shadcn/ui (Radix UI + Tailwind)
- **État** : React Hooks + Custom Hooks
- **Icons** : Lucide + Lucide React
- **Utilitaires** : clsx + tailwind-merge (cn)
- **Animations** : CSS Transitions natives
- **Build** : Turbopack (dev) / Webpack (prod)

Fait avec ❤️ pour l'apprentissage des algorithmes de tri