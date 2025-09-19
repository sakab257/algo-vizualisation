export interface SortState {
  array: number[];
  isRunning: boolean;
  currentI: number;
  currentJ: number;
  minIndex: number;
  sortedIndices: Set<number>;
  isCompleted: boolean;
  // États spécifiques pour Insertion Sort
  keyIndex: number;
  shiftingIndices: Set<number>;
  // États spécifiques pour Merge Sort
  leftSubarray: Set<number>;
  rightSubarray: Set<number>;
  mergingIndex: number;
  mergeRange: { start: number; end: number } | null;
  // Statistiques
  comparisons: number;
  swaps: number;
  startTime: number | null;
  endTime: number | null;
}

export interface SortConfig {
  speed: number;
  arraySize: number;
}

export interface BarProps {
  value: number;
  index: number;
  maxHeight: number;
  barWidth: number;
  getBarColor: (index: number) => string;
  isRunning: boolean;
  currentI: number;
  minIndex: number;
}

export interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

export interface CustomSliderProps {
  label: string;
  value: number[];
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number[]) => void;
  disabled?: boolean;
  unit?: string;
  className?: string;
}

export interface LegendItemProps {
  color: string;
  label: string;
}

export type SortAlgorithm = 'selection' | 'insertion' | 'merge' | 'bubble' | 'quick';

export interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  stable: boolean;
  description: string;
}

export interface SortStatistics {
  comparisons: number;
  swaps: number;
  duration: number | null;
  algorithm: string;
  arraySize: number;
}