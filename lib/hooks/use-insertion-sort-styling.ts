import { useMemo } from 'react';

interface UseInsertionSortStylingProps {
  array: number[];
  arraySize: number;
  sortedIndices: Set<number>;
  currentI: number;
  currentJ: number;
  keyIndex: number;
  shiftingIndices: Set<number>;
}

export function useInsertionSortStyling({
  array,
  arraySize,
  sortedIndices,
  currentI,
  currentJ,
  keyIndex,
  shiftingIndices
}: UseInsertionSortStylingProps) {
  const maxHeight = useMemo(() => {
    return Math.max(...array);
  }, [array]);

  const barWidth = useMemo(() => {
    const containerWidth = 800;
    const gap = 8;
    const totalGaps = (arraySize - 1) * gap;
    const availableWidth = containerWidth - totalGaps;
    return Math.max(20, Math.min(60, availableWidth / arraySize));
  }, [arraySize]);

  const getBarColor = useMemo(() => {
    return (index: number): string => {
      // Élément à insérer (key) - Violet
      if (index === keyIndex && keyIndex !== -1) {
        return '#8b5cf6'; // violet-500
      }

      // Éléments en cours de décalage - Bleu clair
      if (shiftingIndices.has(index)) {
        return '#60a5fa'; // blue-400
      }

      // Position d'insertion en cours - Jaune
      if (index === currentJ && currentJ !== -1) {
        return '#fbbf24'; // amber-400
      }

      // Partie triée - Vert
      if (sortedIndices.has(index)) {
        return '#22c55e'; // emerald-500
      }

      // Partie non triée - Gris
      if (currentI !== -1 && index > currentI) {
        return '#d1d5db'; // gray-300
      }

      // Partie triée (indices <= currentI, sauf si en traitement) - Vert clair
      if (currentI !== -1 && index < currentI) {
        return '#34d399'; // emerald-400
      }

      // Défaut - Gris
      return '#9ca3af'; // gray-400
    };
  }, [sortedIndices, currentI, currentJ, keyIndex, shiftingIndices]);

  return {
    maxHeight,
    barWidth,
    getBarColor
  };
}