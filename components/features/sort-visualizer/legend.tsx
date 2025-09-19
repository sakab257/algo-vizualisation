import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LegendItem from '@/components/ui/legend-item';
import { getBarColors } from '@/lib/utils';

const Legend: React.FC = () => {
  const legendItems = [
    { color: getBarColors.current, label: 'Position actuelle (i)' },
    { color: getBarColors.minimum, label: 'Minimum trouvé' },
    { color: getBarColors.comparing, label: 'Comparaison (j)' },
    { color: getBarColors.sorted, label: 'Élément trié' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Légende des couleurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-4">
          {legendItems.map((item, index) => (
            <LegendItem
              key={index}
              color={item.color}
              label={item.label}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Legend;