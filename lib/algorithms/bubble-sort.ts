import { sleep } from '@/lib/utils';
import { SortCallbacks } from './selection-sort';

export async function bubbleSort(
  initialArray: number[],
  speed: number,
  callbacks: SortCallbacks
): Promise<void> {
  const {
    setCurrentI,
    setCurrentJ,
    setSortedIndices,
    setArray,
    checkIsRunning,
    setComparisons,
    setSwaps
  } = callbacks;

  const arr = [...initialArray];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (!checkIsRunning()) break;

    setCurrentI(i);
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (!checkIsRunning()) break;

      setCurrentJ(j);
      await sleep(speed);

      // Comparer les éléments adjacents
      setComparisons?.(prev => prev + 1);
      if (arr[j] > arr[j + 1]) {
        // Échanger les éléments
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        setSwaps?.(prev => prev + 1);
        swapped = true;
        await sleep(speed);
      }
    }

    // Marquer la dernière position comme triée
    setSortedIndices(prev => new Set([...prev, n - i - 1]));
    setCurrentJ(-1);
    await sleep(speed / 2);

    // Si aucun échange n'a eu lieu, le tableau est trié
    if (!swapped) {
      // Marquer tous les éléments restants comme triés
      for (let k = 0; k < n - i - 1; k++) {
        setSortedIndices(prev => new Set([...prev, k]));
      }
      break;
    }
  }

  // Marquer le premier élément comme trié
  if (checkIsRunning()) {
    setSortedIndices(prev => new Set([...prev, 0]));
    setCurrentI(-1);
  }
}