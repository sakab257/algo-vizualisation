import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { SortAlgorithm } from '@/lib/types';
import { algorithmData } from '@/lib/algorithms/algorithm-data';

interface AlgorithmInfoProps {
  algorithm: SortAlgorithm;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  const data = algorithmData[algorithm];

  const getStepsForAlgorithm = (alg: SortAlgorithm) => {
    switch (alg) {
      case 'selection':
        return [
          'Trouve le plus petit élément dans la partie non triée',
          'L\'échange avec le premier élément non trié',
          'Répète le processus pour la partie restante'
        ];
      case 'insertion':
        return [
          'Prend le prochain élément non trié',
          'Le compare avec les éléments triés de droite à gauche',
          'L\'insère à sa position correcte en décalant les autres'
        ];
      case 'merge':
        return [
          'Divise le tableau en deux moitiés',
          'Trie récursivement chaque moitié',
          'Fusionne les deux moitiés triées'
        ];
      case 'bubble':
        return [
          'Compare les éléments adjacents',
          'Échange-les s\'ils sont dans le mauvais ordre',
          'Répète jusqu\'au tri complet'
        ];
      case 'quick':
        return [
          'Choisit un pivot dans le tableau',
          'Partitionne le tableau autour du pivot',
          'Trie récursivement les deux partitions'
        ];
      default:
        return [];
    }
  };

  const getComplexityProgress = (complexity: string) => {
    switch (complexity) {
      case 'O(1)': return 10;
      case 'O(log n)': return 25;
      case 'O(n)': return 40;
      case 'O(n log n)': return 60;
      case 'O(n²)': return 80;
      case 'O(2^n)': return 100;
      default: return 50;
    }
  };

  const steps = getStepsForAlgorithm(algorithm);
  return (
    <Card className="mt-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Comment fonctionne {data.name} ?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
          <p className="text-foreground/90 text-center">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary mb-3">
              Étapes de l&apos;algorithme
            </h4>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border/50">
                  <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}
                         className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </Badge>
                  <p className="text-foreground/90">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary mb-3">
              Caractéristiques
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground/90 font-medium">Complexité temporelle</span>
                  <Badge variant={data.timeComplexity === 'O(n log n)' ? "default" : "destructive"} className="font-mono">
                    {data.timeComplexity}
                  </Badge>
                </div>
                <Progress value={getComplexityProgress(data.timeComplexity)} className="h-2" />
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground/90 font-medium">Complexité spatiale</span>
                  <Badge variant={data.spaceComplexity === 'O(1)' ? "default" : "secondary"} className="font-mono">
                    {data.spaceComplexity}
                  </Badge>
                </div>
                <Progress value={getComplexityProgress(data.spaceComplexity)} className="h-2" />
              </div>

              <Separator />

              <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground/90 font-medium">Stabilité</span>
                  <Badge variant={data.stable ? "default" : "outline"}>
                    {data.stable ? 'Stable' : 'Non stable'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {data.stable
                    ? 'Préserve l\'ordre des éléments égaux'
                    : 'Peut changer l\'ordre des éléments égaux'
                  }
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground/90 font-medium">Type</span>
                  <Badge variant="secondary">
                    {algorithm === 'merge' || algorithm === 'quick' ? 'Diviser pour régner' : 'Comparaison'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {algorithm === 'merge' || algorithm === 'quick'
                    ? 'Utilise la récursion pour diviser le problème'
                    : 'Compare directement les éléments'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cas d'usage pratiques */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border/50">
          <h4 className="text-lg font-semibold text-primary mb-3">
            💡 Quand utiliser {data.name} ?
          </h4>
          <div className="text-sm text-foreground/90 space-y-2">
            {algorithm === 'selection' && (
              <div>
                <p>✅ <strong>Bon pour :</strong> Petits tableaux, tri en place requis</p>
                <p>❌ <strong>Éviter pour :</strong> Gros tableaux, performance critique</p>
              </div>
            )}
            {algorithm === 'insertion' && (
              <div>
                <p>✅ <strong>Bon pour :</strong> Petits tableaux, données presque triées</p>
                <p>❌ <strong>Éviter pour :</strong> Gros tableaux désordonnés</p>
              </div>
            )}
            {algorithm === 'merge' && (
              <div>
                <p>✅ <strong>Bon pour :</strong> Gros tableaux, stabilité requise</p>
                <p>❌ <strong>Éviter pour :</strong> Mémoire limitée, tri en place requis</p>
              </div>
            )}
            {algorithm === 'bubble' && (
              <div>
                <p>✅ <strong>Bon pour :</strong> Apprentissage, très petits tableaux</p>
                <p>❌ <strong>Éviter pour :</strong> Production, tableaux &gt; 10 éléments</p>
              </div>
            )}
            {algorithm === 'quick' && (
              <div>
                <p>✅ <strong>Bon pour :</strong> Performance générale, tri en place</p>
                <p>❌ <strong>Éviter pour :</strong> Garantie O(n log n), stabilité requise</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmInfo;