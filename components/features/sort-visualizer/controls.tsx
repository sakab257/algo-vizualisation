import React from 'react';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ControlButton from '@/components/ui/control-button';
import CustomSlider from '@/components/ui/custom-slider';

interface ControlsProps {
  isRunning: boolean;
  isCompleted: boolean;
  speed: number;
  arraySize: number;
  onStart: () => void;
  onReset: () => void;
  onGenerate: () => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  isRunning,
  isCompleted,
  speed,
  arraySize,
  onStart,
  onReset,
  onGenerate,
  onSpeedChange,
  onSizeChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contrôles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap justify-center gap-4">
          <ControlButton
            onClick={onStart}
            disabled={isCompleted}
            variant={isRunning ? 'destructive' : 'default'}
            size="lg"
            className="gap-2"
          >
            {isRunning ? (
              <>
                <Pause size={20} />
                Arrêter
              </>
            ) : (
              <>
                <Play size={20} />
                {isCompleted ? 'Terminé' : 'Démarrer'}
              </>
            )}
          </ControlButton>

          <ControlButton
            onClick={onReset}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RotateCcw size={20} />
            Reset
          </ControlButton>

          <ControlButton
            onClick={onGenerate}
            disabled={isRunning}
            variant="secondary"
            size="lg"
            className="gap-2"
          >
            <Shuffle size={20} />
            Nouveau
          </ControlButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomSlider
            label="Vitesse d'animation"
            value={[speed]}
            min={100}
            max={2000}
            step={100}
            onValueChange={(values) => onSpeedChange(values[0])}
            disabled={isRunning}
            unit="ms"
          />

          <CustomSlider
            label="Nombre d'éléments"
            value={[arraySize]}
            min={5}
            max={20}
            onValueChange={(values) => onSizeChange(values[0])}
            disabled={isRunning}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Controls;