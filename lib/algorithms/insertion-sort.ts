import { sleep } from '@/lib/utils';
import { SortCallbacks } from './selection-sort';

export async function insertionSort(
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
    setKeyIndex,
    setShiftingIndices,
    checkIsRunning
  } = callbacks;

  const arr = [...initialArray];
  const n = arr.length;

  // Le premier élément est considéré comme trié
  setSortedIndices(prev => new Set([...prev, 0]));
  await sleep(speed);

  for (let i = 1; i < n; i++) {
    if (!checkIsRunning()) break;

    setCurrentI(i);
    const key = arr[i];

    // Montrer l'élément à insérer (clé)
    if (setKeyIndex) setKeyIndex(i);
    await sleep(speed);

    let j = i - 1;

    // Nettoyer les indices de décalage précédents
    if (setShiftingIndices) {
      setShiftingIndices(() => new Set());
    }

    // Déplacer les éléments plus grands vers la droite
    while (j >= 0 && checkIsRunning()) {
      setCurrentJ(j);
      await sleep(speed);

      if (arr[j] > key) {
        // Ajouter cet index aux éléments en cours de décalage
        if (setShiftingIndices) {
          setShiftingIndices(prev => new Set([...prev, j]));
        }

        // Décaler l'élément vers la droite
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep(speed);
        j--;
      } else {
        break;
      }
    }

    // Insérer l'élément à sa position correcte
    if (checkIsRunning()) {
      arr[j + 1] = key;
      setArray([...arr]);

      // Nettoyer les visualisations
      if (setShiftingIndices) {
        setShiftingIndices(() => new Set());
      }
      if (setKeyIndex) setKeyIndex(-1);

      // Marquer tous les éléments de 0 à i comme triés
      setSortedIndices(prev => {
        const newSet = new Set(prev);
        for (let idx = 0; idx <= i; idx++) {
          newSet.add(idx);
        }
        return newSet;
      });

      await sleep(speed);
    }

    setCurrentJ(-1);
  }

  // Nettoyage final
  if (checkIsRunning()) {
    setCurrentI(-1);
    setMinIndex(-1);
    if (setKeyIndex) setKeyIndex(-1);
    if (setShiftingIndices) {
      setShiftingIndices(() => new Set());
    }
  }
}