import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CustomSliderProps } from '@/lib/types';
import { cn } from '@/lib/utils';

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onValueChange,
  disabled = false,
  unit = '',
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <Label className="text-sm font-semibold text-foreground">
        {label}: <span className="font-mono text-primary">{value[0]}{unit}</span>
      </Label>
      <Slider
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
};

export default CustomSlider;