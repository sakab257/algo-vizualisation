'use client';

import React, { useState, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Eye, GitCompare } from 'lucide-react';
import SortVisualizer from './selection-sort-visualizer';
import ComparisonMode from './comparison-mode';

const TabbedVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [speed, setSpeed] = useState(500);
  const [arraySize, setArraySize] = useState(10);

  return (
    <div className="min-h-screen p-3 sm:p-4 lg:p-8">
      <div className="w-full space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="text-center relative px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
            Sortify
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 max-w-2xl mx-auto leading-relaxed">
            Visualisation interactive des algorithmes de tri
          </p>
        </div>

        {/* Navigation par onglets */}
        <div className="flex justify-center px-2 sm:px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 spotify-card h-11 sm:h-12">
              <TabsTrigger value="single" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 md:px-4">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden min-[375px]:inline truncate">Vue Simple</span>
                <span className="min-[375px]:hidden">Simple</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3 md:px-4">
                <GitCompare className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden min-[375px]:inline truncate">Comparaison</span>
                <span className="min-[375px]:hidden">Comp.</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="mt-3 sm:mt-4 md:mt-6">
              <div className="w-full">
                <SortVisualizer />
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="mt-3 sm:mt-4 md:mt-6">
              <div className="w-full">
                <ComparisonMode arraySize={arraySize} speed={speed} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TabbedVisualizer;