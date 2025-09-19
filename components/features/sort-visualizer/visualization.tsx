import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VisualizationBar from '@/components/ui/visualization-bar';

interface VisualizationProps {
  array: number[];
  maxHeight: number;
  barWidth: number;
  getBarColor: (index: number) => string;
  isRunning: boolean;
  currentI: number;
  minIndex: number;
}

const Visualization: React.FC<VisualizationProps> = ({
  array,
  maxHeight,
  barWidth,
  getBarColor,
  isRunning,
  currentI,
  minIndex
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Visualisation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-center gap-2 h-80 p-4">
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
      </CardContent>
    </Card>
  );
};

export default Visualization;