import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Play } from 'lucide-react';
import { SortAlgorithm } from '@/lib/types';
import { pseudocodeData, PseudocodeLine } from '@/lib/algorithms/pseudocode-data';
import { algorithmData } from '@/lib/algorithms/algorithm-data';

interface PseudocodeDisplayProps {
  algorithm: SortAlgorithm;
  currentStep?: number;
  isRunning: boolean;
}

const PseudocodeDisplay: React.FC<PseudocodeDisplayProps> = ({
  algorithm,
  currentStep,
  isRunning
}) => {
  const lines = pseudocodeData[algorithm] || [];
  const algorithmInfo = algorithmData[algorithm];

  const getIndentStyle = (indent: number) => ({
    paddingLeft: `${indent * 24}px`
  });

  const isLineActive = (lineId: number) => {
    return isRunning && currentStep === lineId;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="h-5 w-5" />
          Pseudocode - {algorithmInfo.name}
          {isRunning && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Play className="h-3 w-3" />
              En cours
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm">
          {lines.length > 0 ? (
            <div className="space-y-1">
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={`flex items-center transition-all duration-200 rounded px-2 py-1 ${
                    isLineActive(line.id)
                      ? 'bg-primary/20 border-l-2 border-primary shadow-sm'
                      : 'hover:bg-muted/50'
                  }`}
                  style={getIndentStyle(line.indent)}
                >
                  <span className="text-muted-foreground text-xs mr-3 min-w-[2rem] text-right">
                    {line.text ? line.id : ''}
                  </span>
                  <span className={`${
                    isLineActive(line.id)
                      ? 'font-semibold text-primary'
                      : line.text ? '' : 'text-muted-foreground'
                  }`}>
                    {line.text || ' '}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Pseudocode non disponible pour cet algorithme</p>
            </div>
          )}
        </div>

        {/* Informations complémentaires */}
        <div className="mt-4 pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Complexité temporelle:</span>
            <Badge variant="outline" className="font-mono">
              {algorithmInfo.timeComplexity}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Complexité spatiale:</span>
            <Badge variant="outline" className="font-mono">
              {algorithmInfo.spaceComplexity}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Stable:</span>
            <Badge variant={algorithmInfo.stable ? "secondary" : "outline"}>
              {algorithmInfo.stable ? 'Oui' : 'Non'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PseudocodeDisplay;