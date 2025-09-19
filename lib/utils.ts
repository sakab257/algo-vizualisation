import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilities pour les algorithmes de tri
export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const generateRandomArray = (size: number, min: number = 20, max: number = 220): number[] =>
  Array.from({ length: size }, (): number => Math.floor(Math.random() * (max - min)) + min);

export const getBarColors = {
  sorted: '#22c55e',    // green-500
  current: '#ef4444',   // red-500
  minimum: '#f59e0b',   // amber-500
  comparing: '#3b82f6', // blue-500
  default: '#9ca3af'    // gray-400
} as const;
