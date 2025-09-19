import { useMemo } from 'react';

interface UseMergeSortStylingProps {
  array: number[];
  arraySize: number;
  sortedIndices: Set<number>;
  currentI: number;
  currentJ: number;
  leftSubarray: Set<number>;
  rightSubarray: Set<number>;
  mergingIndex: number;
  mergeRange: { start: number; end: number } | null;
}

export function useMergeSortStyling({
  array,
  arraySize,
  sortedIndices,
  currentI,
  currentJ,
  leftSubarray,
  rightSubarray,
  mergingIndex,
  mergeRange
}: UseMergeSortStylingProps) {
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
      // Élément en cours de placement dans la fusion - Violet
      if (index === mergingIndex && mergingIndex !== -1) {
        return '#8b5cf6'; // violet-500
      }

      // Éléments en cours de comparaison dans la fusion
      if (index === currentI && currentI !== -1) {
        return '#ef4444'; // red-500 - Élément du sous-tableau gauche
      }
      if (index === currentJ && currentJ !== -1) {
        return '#3b82f6'; // blue-500 - Élément du sous-tableau droit
      }

      // Sous-tableau gauche en cours de fusion - Rouge clair
      if (leftSubarray.has(index)) {
        return '#fca5a5'; // red-300
      }

      // Sous-tableau droit en cours de fusion - Bleu clair
      if (rightSubarray.has(index)) {
        return '#93c5fd'; // blue-300
      }

      // Zone de fusion active (entre start et end) - Jaune
      if (mergeRange && index >= mergeRange.start && index <= mergeRange.end) {
        return '#fbbf24'; // amber-400
      }

      // Sections complètement fusionnées - Vert
      if (sortedIndices.has(index)) {
        return '#22c55e'; // emerald-500
      }

      // Défaut - Gris
      return '#9ca3af'; // gray-400
    };
  }, [sortedIndices, currentI, currentJ, leftSubarray, rightSubarray, mergingIndex, mergeRange]);

  return {
    maxHeight,
    barWidth,
    getBarColor
  };
}