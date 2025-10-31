import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useState } from 'react';
import { Strategy } from './StrategyCard';

interface StrategyConfigDialogProps {
  open: boolean;
  onClose: () => void;
  strategy: Strategy | null;
  onSave: (config: any) => void;
}

export function StrategyConfigDialog({ open, onClose, strategy, onSave }: StrategyConfigDialogProps) {
  const [exchange, setExchange] = useState('binance');
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [positionSize, setPositionSize] = useState([10]);
  const [stopLoss, setStopLoss] = useState('2');
  const [takeProfit, setTakeProfit] = useState('5');
  const [maxDailyTrades, setMaxDailyTrades] = useState('10');

  if (!strategy) return null;

  const handleSave = () => {
    onSave({
      strategyId: strategy.id,
      exchange,
      symbol,
      positionSize: positionSize[0],
      stopLoss: parseFloat(stopLoss),
      takeProfit: parseFloat(takeProfit),
      maxDailyTrades: parseInt(maxDailyTrades),
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure {strategy.name}</DialogTitle>
          <DialogDescription>
            Customize parameters for this trading strategy
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="exchange">Exchange</Label>
            <Select value={exchange} onValueChange={setExchange}>
              <SelectTrigger id="exchange">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binance">Binance</SelectItem>
                <SelectItem value="coinbase">Coinbase Pro</SelectItem>
                <SelectItem value="kraken">Kraken</SelectItem>
                <SelectItem value="bitfinex">Bitfinex</SelectItem>
                <SelectItem value="huobi">Huobi</SelectItem>
                <SelectItem value="okx">OKX</SelectItem>
                <SelectItem value="bybit">Bybit</SelectItem>
                <SelectItem value="kucoin">KuCoin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbol">Trading Pair</Label>
            <Input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="BTC/USDT"
            />
          </div>

          <div className="space-y-2">
            <Label>Position Size (% of portfolio)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={positionSize}
                onValueChange={setPositionSize}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="w-12 text-right">{positionSize[0]}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss (%)</Label>
              <Input
                id="stopLoss"
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="takeProfit">Take Profit (%)</Label>
              <Input
                id="takeProfit"
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxDailyTrades">Max Daily Trades</Label>
            <Input
              id="maxDailyTrades"
              type="number"
              value={maxDailyTrades}
              onChange={(e) => setMaxDailyTrades(e.target.value)}
              placeholder="10"
            />
          </div>

          {strategy.category === 'technical' && (
            <div className="space-y-4 pt-4 border-t">
              <h4>Technical Indicator Parameters</h4>
              
              {strategy.id === 'rsi' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rsiPeriod">RSI Period</Label>
                    <Input id="rsiPeriod" type="number" defaultValue="14" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rsiOverbought">Overbought Level</Label>
                      <Input id="rsiOverbought" type="number" defaultValue="70" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rsiOversold">Oversold Level</Label>
                      <Input id="rsiOversold" type="number" defaultValue="30" />
                    </div>
                  </div>
                </>
              )}

              {strategy.id === 'macd' && (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="macdFast">Fast Period</Label>
                      <Input id="macdFast" type="number" defaultValue="12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="macdSlow">Slow Period</Label>
                      <Input id="macdSlow" type="number" defaultValue="26" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="macdSignal">Signal Period</Label>
                      <Input id="macdSignal" type="number" defaultValue="9" />
                    </div>
                  </div>
                </>
              )}

              {strategy.id === 'bollinger' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bbPeriod">Period</Label>
                      <Input id="bbPeriod" type="number" defaultValue="20" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bbStdDev">Standard Deviations</Label>
                      <Input id="bbStdDev" type="number" defaultValue="2" step="0.1" />
                    </div>
                  </div>
                </>
              )}

              {strategy.id === 'ema' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emaFast">Fast EMA Period</Label>
                      <Input id="emaFast" type="number" defaultValue="9" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emaSlow">Slow EMA Period</Label>
                      <Input id="emaSlow" type="number" defaultValue="21" />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {strategy.id === 'grid' && (
            <div className="space-y-4 pt-4 border-t">
              <h4>Grid Trading Parameters</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gridLevels">Grid Levels</Label>
                  <Input id="gridLevels" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gridSpacing">Grid Spacing (%)</Label>
                  <Input id="gridSpacing" type="number" defaultValue="1" step="0.1" />
                </div>
              </div>
            </div>
          )}

          {strategy.id === 'dca' && (
            <div className="space-y-4 pt-4 border-t">
              <h4>DCA Parameters</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dcaInterval">Interval (hours)</Label>
                  <Input id="dcaInterval" type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dcaAmount">Amount per order ($)</Label>
                  <Input id="dcaAmount" type="number" defaultValue="100" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
