'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SortAlgorithm } from '@/lib/types';
import { algorithmData } from '@/lib/algorithms/algorithm-data';
import { useSortState } from '@/lib/hooks/use-sort-state';
import { useArrayGeneration } from '@/lib/hooks/use-array-generation';
import { useBarStyling } from '@/lib/hooks/use-bar-styling';
import { selectionSort } from '@/lib/algorithms/selection-sort';
import { insertionSort } from '@/lib/algorithms/insertion-sort';
import { mergeSort } from '@/lib/algorithms/merge-sort';
import { bubbleSort } from '@/lib/algorithms/bubble-sort';
import { quickSort } from '@/lib/algorithms/quick-sort';
import AlgorithmDropdown from '@/components/ui/algorithm-dropdown';
import Visualization from './visualization';
import Statistics from './statistics';
import { Play, Pause, RotateCcw, Shuffle, Settings, Trophy, Zap } from 'lucide-react';
import CustomSlider from '@/components/ui/custom-slider';
import { Badge } from '@/components/ui/badge';

interface ComparisonModeProps {
  arraySize: number;
  speed: number;
}

const ComparisonMode: React.FC<ComparisonModeProps> = ({ arraySize: initialArraySize, speed: initialSpeed }) => {
  const [algorithm1, setAlgorithm1] = useState<SortAlgorithm>('selection');
  const [algorithm2, setAlgorithm2] = useState<SortAlgorithm>('bubble');
  const [isRunning, setIsRunning] = useState(false);
  const [localArraySize, setLocalArraySize] = useState(initialArraySize);
  const [localSpeed, setLocalSpeed] = useState(initialSpeed);
  const [showSettings, setShowSettings] = useState(false);

  // État pour l'algorithme 1
  const sortState1 = useSortState(localArraySize);
  const { generateArray: generateArray1 } = useArrayGeneration({
    arraySize: localArraySize,
    setArray: sortState1.setArray,
    resetAnimation: sortState1.resetAnimation
  });

  // État pour l'algorithme 2
  const sortState2 = useSortState(localArraySize);
  const { generateArray: generateArray2 } = useArrayGeneration({
    arraySize: localArraySize,
    setArray: sortState2.setArray,
    resetAnimation: sortState2.resetAnimation
  });

  // Hooks de style
  const styling1 = useBarStyling({
    array: sortState1.array,
    arraySize: localArraySize,
    sortedIndices: sortState1.sortedIndices,
    currentI: sortState1.currentI,
    currentJ: sortState1.currentJ,
    minIndex: sortState1.minIndex
  });

  const styling2 = useBarStyling({
    array: sortState2.array,
    arraySize: localArraySize,
    sortedIndices: sortState2.sortedIndices,
    currentI: sortState2.currentI,
    currentJ: sortState2.currentJ,
    minIndex: sortState2.minIndex
  });

  const generateSameArray = useCallback(() => {
    const newArray = Array.from({ length: localArraySize }, () =>
      Math.floor(Math.random() * 300) + 10
    );

    sortState1.setArray([...newArray]);
    sortState2.setArray([...newArray]);
    sortState1.resetAnimation();
    sortState2.resetAnimation();
  }, [localArraySize, sortState1, sortState2]);

  const runAlgorithm = useCallback(async (
    algorithm: SortAlgorithm,
    sortState: any
  ) => {
    const callbacks = {
      setCurrentI: sortState.setCurrentI,
      setCurrentJ: sortState.setCurrentJ,
      setMinIndex: sortState.setMinIndex,
      setSortedIndices: sortState.setSortedIndices,
      setArray: sortState.setArray,
      checkIsRunning: sortState.checkIsRunning,
      setComparisons: sortState.setComparisons,
      setSwaps: sortState.setSwaps
    };

    switch (algorithm) {
      case 'selection':
        await selectionSort(sortState.array, localSpeed, callbacks);
        break;
      case 'insertion':
        await insertionSort(sortState.array, localSpeed, callbacks);
        break;
      case 'merge':
        await mergeSort(sortState.array, localSpeed, callbacks);
        break;
      case 'bubble':
        await bubbleSort(sortState.array, localSpeed, callbacks);
        break;
      case 'quick':
        await quickSort(sortState.array, localSpeed, callbacks);
        break;
    }

    if (sortState.checkIsRunning()) {
      sortState.completeSorting();
    }
  }, [localSpeed]);

  const startComparison = useCallback(async () => {
    if (isRunning) {
      sortState1.stopSorting();
      sortState2.stopSorting();
      setIsRunning(false);
      return;
    }

    setIsRunning(true);
    sortState1.startSorting();
    sortState2.startSorting();

    try {
      await Promise.all([
        runAlgorithm(algorithm1, sortState1),
        runAlgorithm(algorithm2, sortState2)
      ]);
    } catch (error) {
      console.error('Erreur lors de la comparaison:', error);
    } finally {
      setIsRunning(false);
    }
  }, [isRunning, algorithm1, algorithm2, sortState1, sortState2, runAlgorithm]);

  const resetComparison = useCallback(() => {
    sortState1.resetAnimation();
    sortState2.resetAnimation();
    setIsRunning(false);
  }, [sortState1, sortState2]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 sm:pb-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Mode Comparaison
            <Badge variant="secondary" className="ml-auto text-xs">
              Face à Face
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Sélection des algorithmes améliorée */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground text-center">
              Choisissez vos challengers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Challenger 1</span>
                </div>
                <AlgorithmDropdown
                  selectedAlgorithm={algorithm1}
                  onAlgorithmChange={setAlgorithm1}
                  disabled={isRunning}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">Challenger 2</span>
                </div>
                <AlgorithmDropdown
                  selectedAlgorithm={algorithm2}
                  onAlgorithmChange={setAlgorithm2}
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>

          {/* Contrôles centralisés */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 p-4 bg-muted/20 rounded-lg border border-border/50">
            <Button
              onClick={startComparison}
              variant={isRunning ? "destructive" : "default"}
              size="lg"
              className="flex items-center gap-2 px-6 py-3 font-semibold"
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  Arrêter le Combat
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Lancer le Défi !
                </>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={resetComparison}
                variant="outline"
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <Button
                onClick={generateSameArray}
                variant="outline"
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <Shuffle className="h-4 w-4" />
                Nouveau Tableau
              </Button>

              <Button
                onClick={() => setShowSettings(!showSettings)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Paramètres */}
          {showSettings && (
            <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/50">
              <h4 className="text-sm font-medium mb-4">Paramètres de comparaison</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSlider
                  label="Vitesse d'animation"
                  value={[localSpeed]}
                  min={50}
                  max={2000}
                  step={50}
                  onValueChange={(values) => setLocalSpeed(values[0])}
                  disabled={isRunning}
                  unit="ms"
                />
                <CustomSlider
                  label="Nombre d'éléments"
                  value={[localArraySize]}
                  min={5}
                  max={15}
                  onValueChange={(values) => {
                    setLocalArraySize(values[0]);
                    // Regénérer les tableaux avec la nouvelle taille
                    setTimeout(() => generateSameArray(), 100);
                  }}
                  disabled={isRunning}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section de combat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Algorithme 1 */}
        <div className="space-y-4">
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-blue-700 dark:text-blue-300">{algorithmData[algorithm1].name}</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {algorithmData[algorithm1].timeComplexity}
                  </Badge>
                  {sortState1.isCompleted && !sortState2.isCompleted && (
                    <Badge className="bg-green-500 text-white animate-pulse">
                      🏆 Gagnant !
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Visualization
                array={sortState1.array}
                maxHeight={styling1.maxHeight}
                barWidth={styling1.barWidth}
                getBarColor={styling1.getBarColor}
                isRunning={sortState1.isRunning}
                currentI={sortState1.currentI}
                minIndex={sortState1.minIndex}
                algorithm={algorithm1}
              />
            </CardContent>
          </Card>

          <Statistics
            comparisons={sortState1.comparisons}
            swaps={sortState1.swaps}
            startTime={sortState1.startTime}
            endTime={sortState1.endTime}
            isRunning={sortState1.isRunning}
            algorithm={algorithmData[algorithm1].name}
          />
        </div>

        {/* Algorithme 2 */}
        <div className="space-y-4">
          <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50/50 to-transparent dark:from-red-950/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-red-700 dark:text-red-300">{algorithmData[algorithm2].name}</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    {algorithmData[algorithm2].timeComplexity}
                  </Badge>
                  {sortState2.isCompleted && !sortState1.isCompleted && (
                    <Badge className="bg-green-500 text-white animate-pulse">
                      🏆 Gagnant !
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Visualization
                array={sortState2.array}
                maxHeight={styling2.maxHeight}
                barWidth={styling2.barWidth}
                getBarColor={styling2.getBarColor}
                isRunning={sortState2.isRunning}
                currentI={sortState2.currentI}
                minIndex={sortState2.minIndex}
                algorithm={algorithm2}
              />
            </CardContent>
          </Card>

          <Statistics
            comparisons={sortState2.comparisons}
            swaps={sortState2.swaps}
            startTime={sortState2.startTime}
            endTime={sortState2.endTime}
            isRunning={sortState2.isRunning}
            algorithm={algorithmData[algorithm2].name}
          />
        </div>
      </div>

      {/* Résumé de la comparaison */}
      {(sortState1.startTime || sortState2.startTime) && (
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Résumé de la Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Comparaisons */}
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Comparaisons</div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-blue-600">{sortState1.comparisons.toLocaleString()}</div>
                  <div className="text-sm font-medium text-red-600">{sortState2.comparisons.toLocaleString()}</div>
                </div>
                {sortState1.comparisons !== sortState2.comparisons && (
                  <div className="text-xs mt-1">
                    {sortState1.comparisons < sortState2.comparisons ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">Blue gagne</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">Red gagne</Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Échanges */}
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Échanges</div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-blue-600">{sortState1.swaps.toLocaleString()}</div>
                  <div className="text-sm font-medium text-red-600">{sortState2.swaps.toLocaleString()}</div>
                </div>
                {sortState1.swaps !== sortState2.swaps && (
                  <div className="text-xs mt-1">
                    {sortState1.swaps < sortState2.swaps ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">Blue gagne</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">Red gagne</Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Durée */}
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Temps (réel)</div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-blue-600">
                    {sortState1.endTime && sortState1.startTime
                      ? `${(sortState1.endTime - sortState1.startTime)}ms`
                      : sortState1.startTime ? `${Date.now() - sortState1.startTime}ms` : '0ms'
                    }
                  </div>
                  <div className="text-sm font-medium text-red-600">
                    {sortState2.endTime && sortState2.startTime
                      ? `${(sortState2.endTime - sortState2.startTime)}ms`
                      : sortState2.startTime ? `${Date.now() - sortState2.startTime}ms` : '0ms'
                    }
                  </div>
                </div>
              </div>

              {/* Statut */}
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Statut</div>
                <div className="space-y-1">
                  <div className="text-xs">
                    {sortState1.isCompleted ? (
                      <Badge className="bg-green-500 text-white">Terminé</Badge>
                    ) : sortState1.isRunning ? (
                      <Badge variant="secondary" className="animate-pulse">En cours</Badge>
                    ) : (
                      <Badge variant="outline">En attente</Badge>
                    )}
                  </div>
                  <div className="text-xs">
                    {sortState2.isCompleted ? (
                      <Badge className="bg-green-500 text-white">Terminé</Badge>
                    ) : sortState2.isRunning ? (
                      <Badge variant="secondary" className="animate-pulse">En cours</Badge>
                    ) : (
                      <Badge variant="outline">En attente</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparisonMode;