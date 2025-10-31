import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface MarketSignal {
  symbol: string;
  exchange: string;
  signal: 'buy' | 'sell' | 'neutral';
  strength: number;
  indicators: string[];
}

interface MarketInsightsProps {
  signals: MarketSignal[];
}

export function MarketInsights({ signals }: MarketInsightsProps) {
  return (
    <Card className="border-l-4 border-l-[#F26522]">
      <CardHeader>
        <CardTitle>Market Insights</CardTitle>
        <CardDescription>AI-powered trading signals and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {signals.map((signal, index) => {
            const isBuy = signal.signal === 'buy';
            const isSell = signal.signal === 'sell';
            
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-[#00A6A6]/5 transition-colors"
              >
                <div className={`mt-1 ${isBuy ? 'text-[#00A6A6]' : isSell ? 'text-[#F26522]' : 'text-muted-foreground'}`}>
                  {isBuy ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : isSell ? (
                    <TrendingDown className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span>{signal.symbol}</span>
                    <Badge variant="outline" className="text-xs">
                      {signal.exchange}
                    </Badge>
                    <Badge 
                      variant={isBuy ? 'default' : isSell ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {signal.signal.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Strength:</span>
                    <div className="flex-1 max-w-[100px] h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isBuy ? 'bg-[#00A6A6]' : isSell ? 'bg-[#F26522]' : 'bg-muted-foreground'}`}
                        style={{ width: `${signal.strength}%` }}
                      />
                    </div>
                    <span className="text-sm">{signal.strength}%</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {signal.indicators.map((indicator, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
