import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CheckCircle2, TrendingUp, Shield, Zap, BarChart3, Globe } from 'lucide-react';
import { Badge } from './ui/badge';

interface WelcomeDialogProps {
  open: boolean;
  onClose: () => void;
}

export function WelcomeDialog({ open, onClose }: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-[#00A6A6] to-[#008E97] p-2">
              <Zap className="h-6 w-6 text-white" />
            </div>
            Welcome to SKEET
          </DialogTitle>
          <DialogDescription>
            Strategic Key Entry & Exit Tactics - Your professional multi-exchange trading bot platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">100+ Exchanges</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Connect to Binance, Coinbase, Kraken, and 100+ other exchanges for crypto, stocks, and forex trading.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">16 Strategies</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pre-built strategies including RSI, MACD, Bollinger Bands, arbitrage, grid trading, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Risk Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced stop-loss, position sizing, daily limits, and emergency stop features.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Real-time Execution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast trade execution with live market data and instant order placement.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <h3>Trading Strategies Available</h3>
            
            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <Badge variant="secondary" style={{ backgroundColor: 'var(--skeet-aqua)', opacity: 0.1, color: 'var(--skeet-aqua)' }}>Technical</Badge>
                Technical Indicators
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  RSI Strategy
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  MACD Crossover
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Bollinger Bands
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  EMA Crossover
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Ichimoku Cloud
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Fibonacci
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <Badge variant="secondary" style={{ backgroundColor: 'var(--skeet-orange)', opacity: 0.1, color: 'var(--skeet-orange)' }}>Algorithmic</Badge>
                Algorithmic Trading
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Momentum
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Mean Reversion
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Breakout
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Swing Trading
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Volume Profile
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Scalping
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">Passive</Badge>
                Passive & Arbitrage
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Grid Trading
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Dollar Cost Averaging
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Cross-Exchange Arbitrage
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Market Making
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--skeet-aqua)', opacity: 0.05, borderColor: 'var(--skeet-aqua)' }}>
            <h4 className="mb-2" style={{ color: 'var(--skeet-aqua-dark)' }}>Getting Started</h4>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Start in <strong>Paper Trading</strong> mode to test strategies risk-free</li>
              <li>Configure your API keys in Settings → API Key Vault (encrypted storage)</li>
              <li>Select and activate strategies from the Strategies tab</li>
              <li>Configure each strategy's parameters (click Configure button)</li>
              <li>Monitor performance in real-time on the Dashboard</li>
              <li>Check out Documentation and Knowledge Center to learn more</li>
              <li>When ready, switch to <strong>Live Trading</strong> mode</li>
            </ol>
          </div>

          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h4 className="mb-2 text-destructive">⚠️ Important Disclaimers</h4>
            <ul className="space-y-1 text-sm text-destructive list-disc list-inside">
              <li>This is a prototype/demo environment - not for production trading</li>
              <li>Cryptocurrency and financial trading involves substantial risk</li>
              <li>Past performance does not guarantee future results</li>
              <li>Only trade with funds you can afford to lose</li>
              <li>Always use paper trading first to test strategies</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Get Started</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
