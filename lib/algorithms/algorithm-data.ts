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
  }
};