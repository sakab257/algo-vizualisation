import { useMemo, useCallback } from 'react';
import { getBarColors } from '@/lib/utils';

interface UseBarStylingProps {
  array: number[];
  arraySize: number;
  sortedIndices: Set<number>;
  currentI: number;
  currentJ: number;
  minIndex: number;
}

export function useBarStyling({
  array,
  arraySize,
  sortedIndices,
  currentI,
  currentJ,
  minIndex
}: UseBarStylingProps) {
  // Calcul sécurisé de la hauteur maximale
  const maxHeight = useMemo(() => {
    return array.length > 0 ? Math.max(...array) : 1;
  }, [array]);

  // Calcul de la largeur des barres
  const barWidth = useMemo(() => {
    return Math.max(300 / arraySize, 15);
  }, [arraySize]);

  // Fonction pour obtenir la couleur d'une barre
  const getBarColor = useCallback((index: number) => {
    if (sortedIndices.has(index)) return getBarColors.sorted;
    if (index === currentI) return getBarColors.current;
    if (index === minIndex && minIndex !== currentI) return getBarColors.minimum;
    if (index === currentJ) return getBarColors.comparing;
    return getBarColors.default;
  }, [sortedIndices, currentI, minIndex, currentJ]);

  return {
    maxHeight,
    barWidth,
    getBarColor
  };
}