import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LegendItemProps } from '@/lib/types';

const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => {
  return (
    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
      <div
        className="w-3 h-3 rounded-full border"
        style={{ background: color }}
      />
      <span className="text-sm">{label}</span>
    </Badge>
  );
};

export default LegendItem;