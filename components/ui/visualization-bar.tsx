import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BarProps } from '@/lib/types';

const VisualizationBar: React.FC<BarProps> = ({
  value,
  index,
  maxHeight,
  barWidth,
  getBarColor
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center">
            <div
              className="border rounded-t-sm"
              style={{
                height: `${(value / maxHeight) * 280}px`,
                width: `${barWidth}px`,
                background: getBarColor(index),
                maxWidth: '30px'
              }}
            />
            <span className="text-xs mt-1 text-muted-foreground font-mono">
              {value}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Valeur: {value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VisualizationBar;