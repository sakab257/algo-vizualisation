import { useState, useCallback, useRef } from 'react';
import { SortState, SortConfig } from '@/lib/types';

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

  const isRunningRef = useRef(false);

  const resetAnimation = useCallback(() => {
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
  }, []);

  const startSorting = useCallback(() => {
    setIsRunning(true);
    isRunningRef.current = true;
    setIsCompleted(false);
  }, []);

  const stopSorting = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
  }, []);

  const completeSorting = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
    setIsCompleted(true);
  }, []);

  const checkIsRunning = useCallback(() => {
    return isRunningRef.current;
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

    // Actions
    resetAnimation,
    startSorting,
    stopSorting,
    completeSorting,
    checkIsRunning
  };
}