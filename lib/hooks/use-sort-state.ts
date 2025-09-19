import { useState, useCallback, useRef, useEffect } from 'react';

export function useSortState(initialSize: number = 10) {
  const [array, setArray] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentI, setCurrentI] = useState(-1);
  const [currentJ, setCurrentJ] = useState(-1);
  const [minIndex, setMinIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState(new Set<number>());
  const [isCompleted, setIsCompleted] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [arraySize, setArraySize] = useState(initialSize);

  // États spécifiques pour Insertion Sort
  const [keyIndex, setKeyIndex] = useState(-1);
  const [shiftingIndices, setShiftingIndices] = useState(new Set<number>());

  // États spécifiques pour Merge Sort
  const [leftSubarray, setLeftSubarray] = useState(new Set<number>());
  const [rightSubarray, setRightSubarray] = useState(new Set<number>());
  const [mergingIndex, setMergingIndex] = useState(-1);
  const [mergeRange, setMergeRange] = useState<{ start: number; end: number } | null>(null);

  // Statistiques
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const isRunningRef = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentAlgorithmRef = useRef<string | null>(null);

  const resetAnimation = useCallback(() => {
    // Annuler toutes les animations en cours
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    setCurrentI(-1);
    setCurrentJ(-1);
    setMinIndex(-1);
    setSortedIndices(new Set());
    setIsRunning(false);
    isRunningRef.current = false;
    setIsCompleted(false);

    // Reset des états spécifiques
    setKeyIndex(-1);
    setShiftingIndices(new Set());
    setLeftSubarray(new Set());
    setRightSubarray(new Set());
    setMergingIndex(-1);
    setMergeRange(null);

    // Reset des statistiques
    setComparisons(0);
    setSwaps(0);
    setStartTime(null);
    setEndTime(null);
  }, []);

  const startSorting = useCallback(() => {
    setIsRunning(true);
    isRunningRef.current = true;
    setIsCompleted(false);
    setStartTime(Date.now());
    setComparisons(0);
    setSwaps(0);
  }, []);

  const stopSorting = useCallback(() => {
    // Annuler toutes les animations en cours
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    setIsRunning(false);
    isRunningRef.current = false;
    setEndTime(Date.now());
  }, []);

  const completeSorting = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
    setIsCompleted(true);
    setEndTime(Date.now());
  }, []);

  const checkIsRunning = useCallback(() => {
    return isRunningRef.current;
  }, []);

  // Ajouter une fonction pour gérer les changements d'algorithme
  const handleAlgorithmChange = useCallback(() => {
    if (isRunningRef.current) {
      stopSorting();
    }
    resetAnimation();
  }, [stopSorting, resetAnimation]);

  // Cleanup effect pour nettoyer les timeouts
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    array,
    isRunning,
    currentI,
    currentJ,
    minIndex,
    sortedIndices,
    isCompleted,
    speed,
    arraySize,
    keyIndex,
    shiftingIndices,
    leftSubarray,
    rightSubarray,
    mergingIndex,
    mergeRange,
    comparisons,
    swaps,
    startTime,
    endTime,

    // Refs
    animationTimeoutRef,
    currentAlgorithmRef,

    // Setters
    setArray,
    setCurrentI,
    setCurrentJ,
    setMinIndex,
    setSortedIndices,
    setSpeed,
    setArraySize,
    setKeyIndex,
    setShiftingIndices,
    setLeftSubarray,
    setRightSubarray,
    setMergingIndex,
    setMergeRange,
    setComparisons,
    setSwaps,

    // Actions
    resetAnimation,
    startSorting,
    stopSorting,
    completeSorting,
    checkIsRunning,
    handleAlgorithmChange
  };
}