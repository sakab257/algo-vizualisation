'use client';

import React, { useCallback, useState } from 'react';
import { useSortState } from '@/lib/hooks/use-sort-state';
import { useArrayGeneration } from '@/lib/hooks/use-array-generation';
import { useBarStyling } from '@/lib/hooks/use-bar-styling';
import { useInsertionSortStyling } from '@/lib/hooks/use-insertion-sort-styling';
import { useMergeSortStyling } from '@/lib/hooks/use-merge-sort-styling';
import { selectionSort } from '@/lib/algorithms/selection-sort';
import { insertionSort } from '@/lib/algorithms/insertion-sort';
import { mergeSort } from '@/lib/algorithms/merge-sort';
import { bubbleSort } from '@/lib/algorithms/bubble-sort';
import { quickSort } from '@/lib/algorithms/quick-sort';
import { SortAlgorithm } from '@/lib/types';
import Controls from './controls';
import Visualization from './visualization';
import AlgorithmInfo from './algorithm-info';
import AlgorithmSelector from '@/components/ui/algorithm-selector';
import Statistics from './statistics';
import PseudocodeDisplay from './pseudocode-display';
import { algorithmData } from '@/lib/algorithms/algorithm-data';

const SortVisualizer: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortAlgorithm>('selection');
  const sortState = useSortState(10);

  // Gérer le changement d'algorithme
  const onAlgorithmChange = (newAlgorithm: SortAlgorithm) => {
    setSelectedAlgorithm(newAlgorithm);
    // Déclencher le reset et l'arrêt si nécessaire
    if (sortState.isRunning) {
      sortState.handleAlgorithmChange();
    }
  };
  const {
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
    resetAnimation,
    startSorting,
    stopSorting,
    completeSorting,
    checkIsRunning,
  } = sortState;

  const { generateArray } = useArrayGeneration({
    arraySize,
    setArray,
    resetAnimation
  });

  // Hook de coloration pour Selection Sort
  const selectionSortStyling = useBarStyling({
    array,
    arraySize,
    sortedIndices,
    currentI,
    currentJ,
    minIndex
  });

  // Hook de coloration pour Insertion Sort
  const insertionSortStyling = useInsertionSortStyling({
    array,
    arraySize,
    sortedIndices,
    currentI,
    currentJ,
    keyIndex,
    shiftingIndices
  });

  // Hook de coloration pour Merge Sort
  const mergeSortStyling = useMergeSortStyling({
    array,
    arraySize,
    sortedIndices,
    currentI,
    currentJ,
    leftSubarray,
    rightSubarray,
    mergingIndex,
    mergeRange
  });

  // Sélectionner le bon hook selon l'algorithme
  const { maxHeight, barWidth, getBarColor } =
    selectedAlgorithm === 'selection' ? selectionSortStyling :
    selectedAlgorithm === 'insertion' ? insertionSortStyling :
    mergeSortStyling;

  const runSortingAlgorithm = useCallback(async () => {
    if (checkIsRunning()) {
      stopSorting();
      return;
    }

    // Si l'algorithme est terminé, reset avant de redémarrer
    if (isCompleted) {
      resetAnimation();
    }

    startSorting();

    try {
      const callbacks = {
        setCurrentI,
        setCurrentJ,
        setMinIndex,
        setSortedIndices,
        setArray,
        checkIsRunning,
        // Callbacks spécifiques pour Insertion Sort
        setKeyIndex,
        setShiftingIndices,
        // Callbacks spécifiques pour Merge Sort
        setLeftSubarray,
        setRightSubarray,
        setMergingIndex,
        setMergeRange,
        // Callbacks pour statistiques
        setComparisons,
        setSwaps
      };

      switch (selectedAlgorithm) {
        case 'selection':
          await selectionSort(array, speed, callbacks);
          break;
        case 'insertion':
          await insertionSort(array, speed, callbacks);
          break;
        case 'merge':
          await mergeSort(array, speed, callbacks);
          break;
        case 'bubble':
          await bubbleSort(array, speed, callbacks);
          break;
        case 'quick':
          await quickSort(array, speed, callbacks);
          break;
        default:
          throw new Error(`Algorithme non supporté: ${selectedAlgorithm}`);
      }

      if (checkIsRunning()) {
        completeSorting();
      }
    } catch (error) {
      console.error('Erreur lors du tri:', error);
    } finally {
      stopSorting();
    }
  }, [
    selectedAlgorithm,
    array,
    speed,
    checkIsRunning,
    startSorting,
    stopSorting,
    completeSorting,
    isCompleted,
    resetAnimation,
    setComparisons,
    setSwaps,
    setKeyIndex,
    setLeftSubarray,
    setMergeRange,
    setMergingIndex,
    setRightSubarray,
    setShiftingIndices,
    setCurrentI,
    setCurrentJ,
    setMinIndex,
    setSortedIndices,
    setArray
  ]);

  return (
    <div className="space-y-8">

        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={onAlgorithmChange}
          disabled={isRunning}
        />

        <Controls
          isRunning={isRunning}
          isCompleted={isCompleted}
          speed={speed}
          arraySize={arraySize}
          onStart={runSortingAlgorithm}
          onReset={resetAnimation}
          onGenerate={generateArray}
          onSpeedChange={setSpeed}
          onSizeChange={setArraySize}
        />

        <Visualization
          array={array}
          maxHeight={maxHeight}
          barWidth={barWidth}
          getBarColor={getBarColor}
          isRunning={isRunning}
          currentI={currentI}
          minIndex={minIndex}
          algorithm={selectedAlgorithm}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Statistics
              comparisons={comparisons}
              swaps={swaps}
              startTime={startTime}
              endTime={endTime}
              isRunning={isRunning}
              algorithm={algorithmData[selectedAlgorithm].name}
            />

            <AlgorithmInfo algorithm={selectedAlgorithm} />
          </div>

          <PseudocodeDisplay
            algorithm={selectedAlgorithm}
            isRunning={isRunning}
          />
        </div>
    </div>
  );
};

export default SortVisualizer;