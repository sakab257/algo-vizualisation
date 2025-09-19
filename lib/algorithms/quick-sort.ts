import { sleep } from '@/lib/utils';
import { SortCallbacks } from './selection-sort';

export async function quickSort(
  initialArray: number[],
  speed: number,
  callbacks: SortCallbacks
): Promise<void> {
  const {
    setCurrentI,
    setCurrentJ,
    setMinIndex, // Utilisé pour le pivot
    setSortedIndices,
    setArray,
    checkIsRunning
  } = callbacks;

  const arr = [...initialArray];

  async function quickSortHelper(low: number, high: number): Promise<void> {
    if (!checkIsRunning() || low >= high) return;

    const pivotIndex = await partition(low, high);

    if (!checkIsRunning()) return;

    // Marquer le pivot comme trié
    setSortedIndices(prev => new Set([...prev, pivotIndex]));
    await sleep(speed);

    // Récursion sur les deux parties
    await quickSortHelper(low, pivotIndex - 1);
    if (checkIsRunning()) {
      await quickSortHelper(pivotIndex + 1, high);
    }
  }

  async function partition(low: number, high: number): Promise<number> {
    const pivot = arr[high];
    setMinIndex(high); // Montrer le pivot
    await sleep(speed);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!checkIsRunning()) break;

      setCurrentI(i + 1);
      setCurrentJ(j);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }

    // Placer le pivot à sa position finale
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);

    setCurrentI(-1);
    setCurrentJ(-1);
    setMinIndex(-1);

    return i + 1;
  }

  await quickSortHelper(0, arr.length - 1);

  // Marquer tous les éléments comme triés à la fin
  if (checkIsRunning()) {
    for (let i = 0; i < arr.length; i++) {
      setSortedIndices(prev => new Set([...prev, i]));
    }
    setCurrentI(-1);
    setCurrentJ(-1);
    setMinIndex(-1);
  }
}