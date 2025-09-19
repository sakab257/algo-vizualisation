import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SortAlgorithm } from '@/lib/types';
import { algorithmData } from '@/lib/algorithms/algorithm-data';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortAlgorithm;
  onAlgorithmChange: (algorithm: SortAlgorithm) => void;
  disabled?: boolean;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  disabled = false
}) => {
  const algorithms: SortAlgorithm[] = ['selection', 'insertion', 'merge'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Algorithme de Tri</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {algorithms.map((algorithm) => {
            const data = algorithmData[algorithm];
            const isSelected = selectedAlgorithm === algorithm;

            return (
              <div
                key={algorithm}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && onAlgorithmChange(algorithm)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{data.name}</h3>
                    {isSelected && (
                      <Badge variant="default" className="text-xs">
                        Sélectionné
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Temps:</span>
                      <code className="text-primary">{data.timeComplexity}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Espace:</span>
                      <code className="text-primary">{data.spaceComplexity}</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Stable:</span>
                      <Badge variant={data.stable ? "secondary" : "outline"} className="text-xs h-5">
                        {data.stable ? 'Oui' : 'Non'}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmSelector;