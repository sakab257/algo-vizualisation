import { sleep } from '@/lib/utils';

export interface SortCallbacks {
  setCurrentI: (index: number) => void;
  setCurrentJ: (index: number) => void;
  setMinIndex: (index: number) => void;
  setSortedIndices: (updater: (prev: Set<number>) => Set<number>) => void;
  setArray: (array: number[]) => void;
  checkIsRunning: () => boolean;

  // Callbacks spécifiques pour Insertion Sort
  setKeyIndex?: (index: number) => void;
  setShiftingIndices?: (updater: (prev: Set<number>) => Set<number>) => void;

  // Callbacks spécifiques pour Merge Sort
  setLeftSubarray?: (updater: (prev: Set<number>) => Set<number>) => void;
  setRightSubarray?: (updater: (prev: Set<number>) => Set<number>) => void;
  setMergingIndex?: (index: number) => void;
  setMergeRange?: (range: { start: number; end: number } | null) => void;
}

export async function selectionSort(
  initialArray: number[],
  speed: number,
  callbacks: SortCallbacks
): Promise<void> {
  const {
    setCurrentI,
    setCurrentJ,
    setMinIndex,
    setSortedIndices,
    setArray,
    checkIsRunning
  } = callbacks;

  const arr = [...initialArray];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (!checkIsRunning()) break;

    setCurrentI(i);
    let minIdx = i;
    setMinIndex(minIdx);

    await sleep(speed);

    // Trouver le minimum dans la partie non triée
    for (let j = i + 1; j < n; j++) {
      if (!checkIsRunning()) break;

      setCurrentJ(j);
      await sleep(speed);

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        setMinIndex(minIdx);
        await sleep(speed / 2);
      }
    }

    // Échanger si nécessaire
    if (minIdx !== i) {
      // Effectuer l'échange
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await sleep(speed);
    }

    // Marquer comme trié
    setSortedIndices(prev => new Set([...prev, i]));
    setCurrentJ(-1);
    await sleep(speed / 2);
  }

  // Marquer le dernier élément comme trié
  if (checkIsRunning()) {
    setSortedIndices(prev => new Set([...prev, n - 1]));
    setCurrentI(-1);
    setMinIndex(-1);
  }
}