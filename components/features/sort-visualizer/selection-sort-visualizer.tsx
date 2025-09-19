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
import { SortAlgorithm } from '@/lib/types';
import Controls from './controls';
import AlgorithmLegends from './algorithm-legends';
import Visualization from './visualization';
import AlgorithmInfo from './algorithm-info';
import AlgorithmSelector from '@/components/ui/algorithm-selector';

const SortVisualizer: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortAlgorithm>('selection');
  const sortState = useSortState(10);
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
    resetAnimation,
    startSorting,
    stopSorting,
    completeSorting,
    checkIsRunning
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
        setMergeRange
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
    setCurrentI,
    setCurrentJ,
    setMinIndex,
    setSortedIndices,
    setArray
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header simple */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Visualisateur d'Algorithmes de Tri
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Visualisation interactive des algorithmes de tri
          </p>
        </div>

        <AlgorithmSelector
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
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
        />

        <AlgorithmLegends algorithm={selectedAlgorithm} />

        <AlgorithmInfo algorithm={selectedAlgorithm} />
      </div>
    </div>
  );
};

export default SortVisualizer;