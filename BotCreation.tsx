import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  Bot, 
  Zap, 
  Shield, 
  DollarSign,
  TrendingUp,
  Activity,
  Settings2,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const STRATEGIES = [
  { id: 'rsi', name: 'RSI Strategy', category: 'technical', difficulty: 'Easy' },
  { id: 'macd', name: 'MACD Crossover', category: 'technical', difficulty: 'Easy' },
  { id: 'bollinger', name: 'Bollinger Bands', category: 'technical', difficulty: 'Medium' },
  { id: 'ema', name: 'EMA Crossover', category: 'technical', difficulty: 'Easy' },
  { id: 'momentum', name: 'Momentum Trading', category: 'algorithmic', difficulty: 'Medium' },
  { id: 'meanreversion', name: 'Mean Reversion', category: 'algorithmic', difficulty: 'Medium' },
  { id: 'breakout', name: 'Breakout Trading', category: 'algorithmic', difficulty: 'Hard' },
  { id: 'grid', name: 'Grid Trading', category: 'passive', difficulty: 'Easy' },
  { id: 'dca', name: 'Dollar Cost Averaging', category: 'passive', difficulty: 'Easy' },
];

const EXCHANGES = [
  { id: 'binance', name: 'Binance', markets: ['Crypto'] },
  { id: 'coinbase', name: 'Coinbase', markets: ['Crypto'] },
  { id: 'kraken', name: 'Kraken', markets: ['Crypto'] },
  { id: 'oanda', name: 'OANDA', markets: ['Forex'] },
  { id: 'alpaca', name: 'Alpaca', markets: ['Stocks'] },
];

export function BotCreation() {
  const [step, setStep] = useState(1);
  const [botName, setBotName] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedExchange, setSelectedExchange] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [riskLevel, setRiskLevel] = useState([5]);
  const [positionSize, setPositionSize] = useState([10]);
  const [stopLoss, setStopLoss] = useState([2]);
  const [takeProfit, setTakeProfit] = useState([5]);
  const [enableTrailing, setEnableTrailing] = useState(false);

  const handleCreateBot = () => {
    if (!botName || !selectedStrategy || !selectedExchange || !selectedSymbol) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success(`Bot "${botName}" created successfully!`);
    
    // Reset form
    setBotName('');
    setSelectedStrategy('');
    setSelectedExchange('');
    setSelectedSymbol('');
    setStep(1);
  };

  const strategy = STRATEGIES.find(s => s.id === selectedStrategy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-[#00A6A6]" />
            Create New Trading Bot
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure and deploy an automated trading bot in minutes
          </p>
        </div>
        <Badge variant="outline" className="border-[#F26522] text-[#F26522]">
          Step {step} of 3
        </Badge>
      </div>

      {/* Creation Wizard */}
      <Tabs value={step.toString()} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-[#008E97]/10 to-[#F26522]/10">
          <TabsTrigger 
            value="1" 
            onClick={() => setStep(1)}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white"
          >
            1. Basic Setup
          </TabsTrigger>
          <TabsTrigger 
            value="2" 
            onClick={() => setStep(2)}
            disabled={!botName || !selectedStrategy}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F26522] data-[state=active]:to-[#FC4C02] data-[state=active]:text-white"
          >
            2. Exchange & Market
          </TabsTrigger>
          <TabsTrigger 
            value="3" 
            onClick={() => setStep(3)}
            disabled={!selectedExchange || !selectedSymbol}
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008E97] data-[state=active]:to-[#00A6A6] data-[state=active]:text-white"
          >
            3. Risk Management
          </TabsTrigger>
        </TabsList>

        {/* Step 1: Basic Setup */}
        <TabsContent value="1" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-[#00A6A6]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#00A6A6]" />
                  Bot Configuration
                </CardTitle>
                <CardDescription>Name your bot and select a strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="botName">Bot Name *</Label>
                  <Input
                    id="botName"
                    placeholder="e.g., BTC Scalper Pro"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    className="border-[#00A6A6]/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strategy">Trading Strategy *</Label>
                  <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                    <SelectTrigger id="strategy" className="border-[#00A6A6]/30">
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {STRATEGIES.map((strat) => (
                        <SelectItem key={strat.id} value={strat.id}>
                          {strat.name} ({strat.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {strategy && (
                  <div className="bg-gradient-to-br from-[#00A6A6]/10 to-[#F26522]/10 rounded-lg p-4 border border-[#00A6A6]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{strategy.name}</span>
                      <Badge className="bg-[#F26522]">{strategy.difficulty}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Category: {strategy.category}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#F26522]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#F26522]" />
                  Strategy Categories
                </CardTitle>
                <CardDescription>Choose from 16+ pre-built strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#00A6A6]/10 rounded-lg border border-[#00A6A6]/20">
                    <span className="font-medium">Technical Indicators</span>
                    <Badge variant="outline" className="bg-[#00A6A6] text-white">6</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#F26522]/10 rounded-lg border border-[#F26522]/20">
                    <span className="font-medium">Algorithmic</span>
                    <Badge variant="outline" className="bg-[#F26522] text-white">6</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#008E97]/10 rounded-lg border border-[#008E97]/20">
                    <span className="font-medium">Passive Strategies</span>
                    <Badge variant="outline" className="bg-[#008E97] text-white">4</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={() => setStep(2)}
              disabled={!botName || !selectedStrategy}
              className="bg-gradient-to-r from-[#00A6A6] to-[#008E97] hover:from-[#008E97] hover:to-[#00A6A6]"
            >
              Next: Exchange & Market
            </Button>
          </div>
        </TabsContent>

        {/* Step 2: Exchange & Market */}
        <TabsContent value="2" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-[#F26522]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#F26522]" />
                  Exchange Selection
                </CardTitle>
                <CardDescription>Choose where to trade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exchange">Exchange *</Label>
                  <Select value={selectedExchange} onValueChange={setSelectedExchange}>
                    <SelectTrigger id="exchange" className="border-[#F26522]/30">
                      <SelectValue placeholder="Select an exchange" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXCHANGES.map((exchange) => (
                        <SelectItem key={exchange.id} value={exchange.id}>
                          {exchange.name} ({exchange.markets.join(', ')})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symbol">Trading Pair/Symbol *</Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., BTC/USDT, EUR/USD, AAPL"
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="border-[#F26522]/30"
                  />
                </div>

                {selectedExchange && (
                  <div className="bg-gradient-to-br from-[#F26522]/10 to-[#00A6A6]/10 rounded-lg p-4 border border-[#F26522]/20">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Make sure you have configured your API keys for{' '}
                      {EXCHANGES.find(e => e.id === selectedExchange)?.name} in Settings.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#008E97]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#008E97]" />
                  Supported Exchanges
                </CardTitle>
                <CardDescription>100+ exchanges available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-2 text-[#00A6A6]">Cryptocurrency</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Binance</Badge>
                      <Badge variant="outline">Coinbase</Badge>
                      <Badge variant="outline">Kraken</Badge>
                      <Badge variant="outline">KuCoin</Badge>
                      <Badge variant="outline">+20 more</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[#F26522]">Forex</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">OANDA</Badge>
                      <Badge variant="outline">FXCM</Badge>
                      <Badge variant="outline">IG</Badge>
                      <Badge variant="outline">+10 more</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-[#008E97]">Stock Markets</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Alpaca</Badge>
                      <Badge variant="outline">TD Ameritrade</Badge>
                      <Badge variant="outline">+8 more</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button 
              onClick={() => setStep(3)}
              disabled={!selectedExchange || !selectedSymbol}
              className="bg-gradient-to-r from-[#F26522] to-[#FC4C02] hover:from-[#FC4C02] hover:to-[#F26522]"
            >
              Next: Risk Management
            </Button>
          </div>
        </TabsContent>

        {/* Step 3: Risk Management */}
        <TabsContent value="3" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-[#008E97]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#008E97]" />
                  Risk Parameters
                </CardTitle>
                <CardDescription>Configure your risk tolerance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Risk Level: {riskLevel[0]}/10</Label>
                  <Slider
                    value={riskLevel}
                    onValueChange={setRiskLevel}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-[#008E97] [&_[role=slider]]:border-[#008E97]"
                  />
                  <p className="text-xs text-muted-foreground">
                    {riskLevel[0] <= 3 ? 'Conservative' : riskLevel[0] <= 6 ? 'Moderate' : 'Aggressive'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Position Size: {positionSize[0]}% of portfolio</Label>
                  <Slider
                    value={positionSize}
                    onValueChange={setPositionSize}
                    max={50}
                    step={5}
                    className="[&_[role=slider]]:bg-[#00A6A6] [&_[role=slider]]:border-[#00A6A6]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stop Loss: {stopLoss[0]}%</Label>
                  <Slider
                    value={stopLoss}
                    onValueChange={setStopLoss}
                    max={20}
                    step={0.5}
                    className="[&_[role=slider]]:bg-[#F26522] [&_[role=slider]]:border-[#F26522]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Take Profit: {takeProfit[0]}%</Label>
                  <Slider
                    value={takeProfit}
                    onValueChange={setTakeProfit}
                    max={50}
                    step={1}
                    className="[&_[role=slider]]:bg-[#00A6A6] [&_[role=slider]]:border-[#00A6A6]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#00A6A6]/10 rounded-lg border border-[#00A6A6]/20">
                  <Label htmlFor="trailing" className="cursor-pointer">Enable Trailing Stop</Label>
                  <Switch
                    id="trailing"
                    checked={enableTrailing}
                    onCheckedChange={setEnableTrailing}
                    className="data-[state=checked]:bg-[#00A6A6]"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#00A6A6]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-[#00A6A6]" />
                  Configuration Summary
                </CardTitle>
                <CardDescription>Review your bot setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Bot Name</span>
                    <span className="font-medium">{botName}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Strategy</span>
                    <span className="font-medium">{strategy?.name}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Exchange</span>
                    <span className="font-medium">
                      {EXCHANGES.find(e => e.id === selectedExchange)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Symbol</span>
                    <span className="font-medium">{selectedSymbol}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Risk Level</span>
                    <Badge className="bg-[#008E97]">{riskLevel[0]}/10</Badge>
                  </div>
                  <div className="flex justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Position Size</span>
                    <span className="font-medium">{positionSize[0]}%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#00A6A6]/10 to-[#F26522]/10 rounded-lg p-4 border border-[#00A6A6]/30">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-[#00A6A6] mt-0.5" />
                    <div>
                      <h4>Ready to Deploy</h4>
                      <p className="text-sm text-muted-foreground">
                        Your bot will start in paper trading mode. Switch to live trading in Bot Management.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button 
              onClick={handleCreateBot}
              className="bg-gradient-to-r from-[#00A6A6] to-[#008E97] hover:from-[#008E97] hover:to-[#00A6A6]"
            >
              <Bot className="h-4 w-4 mr-2" />
              Create Bot
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
