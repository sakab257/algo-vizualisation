import React from 'react';
import { Button } from '@/components/ui/button';
import { ControlButtonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  disabled = false,
  variant = 'default',
  size = 'default',
  children,
  className
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};

export default ControlButton;