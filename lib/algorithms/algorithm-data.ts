import { AlgorithmInfo } from '@/lib/types';

export const algorithmData: Record<string, AlgorithmInfo> = {
  selection: {
    name: 'Tri par Sélection',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: false,
    description: 'Trouve le minimum et l\'échange avec le premier élément, puis répète pour le reste du tableau.'
  },
  insertion: {
    name: 'Tri par Insertion',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Construit la liste triée un élément à la fois en insérant chaque élément à sa place correcte.'
  },
  merge: {
    name: 'Tri Fusion',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    stable: true,
    description: 'Divise le tableau en deux moitiés, trie chaque moitié récursivement, puis fusionne les résultats.'
  },
  bubble: {
    name: 'Tri à Bulles',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: true,
    description: 'Compare les éléments adjacents et les échange s\'ils sont dans le mauvais ordre, répète jusqu\'à ce que le tableau soit trié.'
  },
  quick: {
    name: 'Tri Rapide',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    stable: false,
    description: 'Choisit un pivot, partitionne le tableau autour de ce pivot, puis trie récursivement les sous-tableaux.'
  }
};