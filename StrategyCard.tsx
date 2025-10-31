import { Play, Pause, Settings, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

export interface Strategy {
  id: string;
  name: string;
  category: 'technical' | 'algorithmic' | 'passive' | 'arbitrage';
  description: string;
  isActive: boolean;
  performance: number;
  trades: number;
  winRate: number;
}

interface StrategyCardProps {
  strategy: Strategy;
  onToggle: (id: string, active: boolean) => void;
  onConfigure: (id: string) => void;
}

const categoryStyles = {
  technical: { backgroundColor: 'var(--skeet-aqua)', opacity: 0.1 },
  algorithmic: { backgroundColor: 'var(--skeet-orange)', opacity: 0.1 },
  passive: { backgroundColor: 'var(--skeet-aqua-dark)', opacity: 0.1 },
  arbitrage: { backgroundColor: 'var(--skeet-orange-bright)', opacity: 0.1 },
};

const categoryTextColors = {
  technical: { color: 'var(--skeet-aqua-dark)' },
  algorithmic: { color: 'var(--skeet-orange)' },
  passive: { color: 'var(--skeet-aqua-dark)' },
  arbitrage: { color: 'var(--skeet-orange-bright)' },
};

export function StrategyCard({ strategy, onToggle, onConfigure }: StrategyCardProps) {
  const isProfitable = strategy.performance >= 0;
  
  const getBorderColor = () => {
    if (strategy.category === 'technical') return 'border-l-[#00A6A6]';
    if (strategy.category === 'algorithmic') return 'border-l-[#F26522]';
    if (strategy.category === 'passive') return 'border-l-[#008E97]';
    return 'border-l-[#FC4C02]';
  };
  
  return (
    <Card className={`border-l-4 ${getBorderColor()} ${strategy.isActive ? 'bg-gradient-to-br from-[#00A6A6]/5 to-transparent' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base">{strategy.name}</CardTitle>
            <CardDescription className="mt-1">{strategy.description}</CardDescription>
          </div>
          <Switch
            checked={strategy.isActive}
            onCheckedChange={(checked) => onToggle(strategy.id, checked)}
            className="data-[state=checked]:bg-[#00A6A6]"
          />
        </div>
        <Badge 
          variant="secondary"
          style={{
            ...categoryStyles[strategy.category],
            ...categoryTextColors[strategy.category]
          }}
        >
          {strategy.category}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Performance</span>
            <div className={`flex items-center gap-1 ${isProfitable ? 'text-[#00A6A6]' : 'text-[#F26522]'}`}>
              {isProfitable ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{isProfitable ? '+' : ''}{strategy.performance.toFixed(2)}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Trades</span>
            <span>{strategy.trades}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Win Rate</span>
            <span>{strategy.winRate.toFixed(1)}%</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onConfigure(strategy.id)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
