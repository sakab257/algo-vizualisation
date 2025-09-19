import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VisualizationBar from '@/components/ui/visualization-bar';
import LegendItem from '@/components/ui/legend-item';
import { SortAlgorithm } from '@/lib/types';

interface VisualizationProps {
  array: number[];
  maxHeight: number;
  barWidth: number;
  getBarColor: (index: number) => string;
  isRunning: boolean;
  currentI: number;
  minIndex: number;
  algorithm: SortAlgorithm;
}

const Visualization: React.FC<VisualizationProps> = ({
  array,
  maxHeight,
  barWidth,
  getBarColor,
  isRunning,
  currentI,
  minIndex,
  algorithm
}) => {
  const getLegendItems = () => {
    switch (algorithm) {
      case 'selection':
        return [
          { color: '#ef4444', label: 'Élément actuel (i)' },
          { color: '#f59e0b', label: 'Minimum trouvé' },
          { color: '#3b82f6', label: 'En comparaison (j)' },
          { color: '#22c55e', label: 'Éléments triés' },
          { color: '#9ca3af', label: 'Non triés' }
        ];

      case 'insertion':
        return [
          { color: '#8b5cf6', label: 'Élément à insérer (clé)' },
          { color: '#fbbf24', label: 'Position d\'insertion' },
          { color: '#60a5fa', label: 'Éléments en décalage' },
          { color: '#10b981', label: 'Partie triée' },
          { color: '#34d399', label: 'Partie triée (précédente)' },
          { color: '#d1d5db', label: 'Partie non triée' }
        ];

      case 'merge':
        return [
          { color: '#ef4444', label: 'Sous-tableau gauche (comparaison)' },
          { color: '#3b82f6', label: 'Sous-tableau droit (comparaison)' },
          { color: '#fca5a5', label: 'Sous-tableau gauche' },
          { color: '#93c5fd', label: 'Sous-tableau droit' },
          { color: '#8b5cf6', label: 'Élément en placement' },
          { color: '#fbbf24', label: 'Zone de fusion active' },
          { color: '#10b981', label: 'Sections fusionnées' }
        ];

      case 'bubble':
        return [
          { color: '#ef4444', label: 'Éléments en comparaison' },
          { color: '#f59e0b', label: 'Éléments échangés' },
          { color: '#22c55e', label: 'Éléments triés' },
          { color: '#9ca3af', label: 'Non triés' }
        ];

      case 'quick':
        return [
          { color: '#ef4444', label: 'Pivot' },
          { color: '#f59e0b', label: 'Éléments comparés' },
          { color: '#3b82f6', label: 'Partition gauche' },
          { color: '#8b5cf6', label: 'Partition droite' },
          { color: '#22c55e', label: 'Éléments triés' }
        ];

      default:
        return [];
    }
  };

  const legendItems = getLegendItems();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Visualisation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Visualisation des barres */}
          <div className="flex items-end justify-center gap-2 h-80 p-4 bg-muted/20 rounded-lg">
            {array.map((value, index) => (
              <VisualizationBar
                key={`${index}-${value}`}
                value={value}
                index={index}
                maxHeight={maxHeight}
                barWidth={barWidth}
                getBarColor={getBarColor}
                isRunning={isRunning}
                currentI={currentI}
                minIndex={minIndex}
              />
            ))}
          </div>

          {/* Légende intégrée */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-center mb-3 text-muted-foreground">Légende des Couleurs</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {legendItems.map((item, index) => (
                <LegendItem
                  key={index}
                  color={item.color}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Visualization;

