import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BarChart3, Shuffle } from 'lucide-react';

interface StatisticsProps {
  comparisons: number;
  swaps: number;
  startTime: number | null;
  endTime: number | null;
  isRunning: boolean;
  algorithm: string;
}

const Statistics: React.FC<StatisticsProps> = ({
  comparisons,
  swaps,
  startTime,
  endTime,
  isRunning,
  algorithm
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Mettre à jour le temps toutes les 100ms quand l'algorithme tourne
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const getDuration = () => {
    if (!startTime) return null;
    if (isRunning) {
      return currentTime - startTime;
    }
    return endTime ? endTime - startTime : null;
  };

  const formatDuration = (ms: number | null) => {
    if (ms === null) return '0ms';
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const duration = getDuration();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Statistiques en Temps Réel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Comparaisons */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Comparaisons</p>
              <p className="text-lg font-semibold">
                {comparisons.toLocaleString()}
                {isRunning && (
                  <span className="ml-1 text-sm text-muted-foreground animate-pulse">
                    •
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Échanges */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Shuffle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Échanges</p>
              <p className="text-lg font-semibold">
                {swaps.toLocaleString()}
                {isRunning && (
                  <span className="ml-1 text-sm text-muted-foreground animate-pulse">
                    •
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Durée */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durée</p>
              <p className="text-lg font-semibold">
                {formatDuration(duration)}
                {isRunning && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    En cours
                  </Badge>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Algorithme actuel */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Algorithme:</span>
            <Badge variant="outline" className="font-medium">
              {algorithm}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Statistics;