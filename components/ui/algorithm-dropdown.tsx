import React from 'react';
import { SortAlgorithm } from '@/lib/types';
import { algorithmData } from '@/lib/algorithms/algorithm-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface AlgorithmDropdownProps {
  selectedAlgorithm: SortAlgorithm;
  onAlgorithmChange: (algorithm: SortAlgorithm) => void;
  disabled?: boolean;
}

const AlgorithmDropdown: React.FC<AlgorithmDropdownProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  disabled = false
}) => {
  const algorithms: SortAlgorithm[] = ['selection', 'insertion', 'merge', 'bubble', 'quick'];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Algorithme de Tri</label>
      <Select
        value={selectedAlgorithm}
        onValueChange={onAlgorithmChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir un algorithme" />
        </SelectTrigger>
        <SelectContent>
          {algorithms.map((algorithm) => {
            const data = algorithmData[algorithm];
            return (
              <SelectItem key={algorithm} value={algorithm}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{data.name}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{data.timeComplexity}</span>
                      <Badge variant={data.stable ? "secondary" : "outline"} className="text-xs h-4">
                        {data.stable ? 'Stable' : 'Instable'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlgorithmDropdown;