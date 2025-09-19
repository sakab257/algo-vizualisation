import { useCallback, useEffect } from 'react';
import { generateRandomArray } from '@/lib/utils';

interface UseArrayGenerationProps {
  arraySize: number;
  setArray: (array: number[]) => void;
  resetAnimation: () => void;
}

export function useArrayGeneration({
  arraySize,
  setArray,
  resetAnimation
}: UseArrayGenerationProps) {
  const generateArray = useCallback(() => {
    resetAnimation();
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
  }, [arraySize, setArray, resetAnimation]);

  // Générer un nouveau tableau quand la taille change
  useEffect(() => {
    generateArray();
  }, [generateArray]);

  return { generateArray };
}