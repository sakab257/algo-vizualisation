import { sleep } from '@/lib/utils';
import { SortCallbacks } from './selection-sort';

export async function mergeSort(
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
    setLeftSubarray,
    setRightSubarray,
    setMergingIndex,
    setMergeRange,
    checkIsRunning
  } = callbacks;

  const arr = [...initialArray];
  const n = arr.length;

  // Fonction pour fusionner deux sous-tableaux triés
  async function merge(arr: number[], left: number, mid: number, right: number): Promise<void> {
    if (!checkIsRunning()) return;

    // Définir la zone de fusion
    if (setMergeRange) {
      setMergeRange({ start: left, end: right });
    }

    // Marquer les sous-tableaux gauche et droit
    if (setLeftSubarray) {
      setLeftSubarray(() => {
        const leftSet = new Set<number>();
        for (let i = left; i <= mid; i++) {
          leftSet.add(i);
        }
        return leftSet;
      });
    }

    if (setRightSubarray) {
      setRightSubarray(() => {
        const rightSet = new Set<number>();
        for (let i = mid + 1; i <= right; i++) {
          rightSet.add(i);
        }
        return rightSet;
      });
    }

    await sleep(speed);

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    // Fusionner les deux sous-tableaux
    while (i < leftArr.length && j < rightArr.length && checkIsRunning()) {
      setCurrentI(left + i);
      setCurrentJ(mid + 1 + j);
      if (setMergingIndex) setMergingIndex(k);
      await sleep(speed);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      setArray([...arr]);
      await sleep(speed);
      k++;
    }

    // Copier les éléments restants de leftArr
    while (i < leftArr.length && checkIsRunning()) {
      setCurrentI(left + i);
      if (setMergingIndex) setMergingIndex(k);
      arr[k] = leftArr[i];
      setArray([...arr]);
      await sleep(speed / 2);
      i++;
      k++;
    }

    // Copier les éléments restants de rightArr
    while (j < rightArr.length && checkIsRunning()) {
      setCurrentJ(mid + 1 + j);
      if (setMergingIndex) setMergingIndex(k);
      arr[k] = rightArr[j];
      setArray([...arr]);
      await sleep(speed / 2);
      j++;
      k++;
    }

    // Nettoyer les visualisations temporaires
    if (setLeftSubarray) setLeftSubarray(() => new Set());
    if (setRightSubarray) setRightSubarray(() => new Set());
    if (setMergingIndex) setMergingIndex(-1);
    if (setMergeRange) setMergeRange(null);

    // Marquer la section fusionnée comme triée
    setSortedIndices(prev => {
      const newSet = new Set(prev);
      for (let idx = left; idx <= right; idx++) {
        newSet.add(idx);
      }
      return newSet;
    });

    await sleep(speed / 2);
  }

  // Fonction récursive de merge sort
  async function mergeSortRecursive(arr: number[], left: number, right: number): Promise<void> {
    if (left >= right || !checkIsRunning()) return;

    const mid = Math.floor((left + right) / 2);

    // Nettoyer les indices triés pour cette section
    setSortedIndices(prev => {
      const newSet = new Set(prev);
      for (let i = left; i <= right; i++) {
        newSet.delete(i);
      }
      return newSet;
    });

    // Diviser et trier la moitié gauche
    setMinIndex(left);
    await sleep(speed);
    await mergeSortRecursive(arr, left, mid);

    // Diviser et trier la moitié droite
    setMinIndex(mid + 1);
    await sleep(speed);
    await mergeSortRecursive(arr, mid + 1, right);

    // Fusionner les deux moitiés triées
    setMinIndex(-1);
    await merge(arr, left, mid, right);
  }

  // Commencer le tri
  await mergeSortRecursive(arr, 0, n - 1);

  // Marquer tous les éléments comme triés à la fin
  if (checkIsRunning()) {
    setSortedIndices(new Set(Array.from({ length: n }, (_, i) => i)));
    setCurrentI(-1);
    setCurrentJ(-1);
    setMinIndex(-1);

    // Nettoyer les états spécifiques à Merge Sort
    if (setLeftSubarray) setLeftSubarray(() => new Set());
    if (setRightSubarray) setRightSubarray(() => new Set());
    if (setMergingIndex) setMergingIndex(-1);
    if (setMergeRange) setMergeRange(null);
  }
}