import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Play, 
  Pause, 
  Trash2, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  Activity,
  DollarSign,
  Bot,
  Plus,
  BarChart3
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';

interface BotConfig {
  id: string;
  name: string;
  strategy: string;
  exchange: string;
  symbol: string;
  isActive: boolean;
  performance: number;
  totalTrades: number;
  winRate: number;
  currentPnL: number;
  createdAt: string;
}

const MOCK_BOTS: BotConfig[] = [
  {
    id: '1',
    name: 'BTC Scalper Pro',
    strategy: 'Scalping',
    exchange: 'Binance',
    symbol: 'BTC/USDT',
    isActive: true,
    performance: 12.5,
    totalTrades: 156,
    winRate: 62.3,
    currentPnL: 1250.50,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'ETH Grid Master',
    strategy: 'Grid Trading',
    exchange: 'Coinbase',
    symbol: 'ETH/USDT',
    isActive: true,
    performance: 8.7,
    totalTrades: 89,
    winRate: 68.5,
    currentPnL: 870.25,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'SOL Momentum',
    strategy: 'Momentum Trading',
    exchange: 'Kraken',
    symbol: 'SOL/USDT',
    isActive: false,
    performance: -3.2,
    totalTrades: 45,
    winRate: 44.4,
    currentPnL: -320.75,
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Multi-Coin DCA',
    strategy: 'Dollar Cost Averaging',
    exchange: 'Binance',
    symbol: 'Multiple',
    isActive: true,
    performance: 15.3,
    totalTrades: 24,
    winRate: 75.0,
    currentPnL: 1530.00,
    createdAt: '2024-01-10',
  },
];

export function BotManagement() {
  const [bots, setBots] = useState<BotConfig[]>(MOCK_BOTS);
  const [botToDelete, setBotToDelete] = useState<string | null>(null);

  const handleToggleBot = (id: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === id ? { ...bot, isActive: !bot.isActive } : bot
    ));
    const bot = bots.find(b => b.id === id);
    toast.success(
      bot?.isActive 
        ? `${bot.name} paused` 
        : `${bot?.name} activated`
    );
  };

  const handleDeleteBot = (id: string) => {
    setBots(prev => prev.filter(bot => bot.id !== id));
    setBotToDelete(null);
    toast.success('Bot deleted successfully');
  };

  const totalActiveBots = bots.filter(b => b.isActive).length;
  const totalPnL = bots.reduce((sum, bot) => sum + bot.currentPnL, 0);
  const avgWinRate = bots.reduce((sum, bot) => sum + bot.winRate, 0) / bots.length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-[#00A6A6]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[#00A6A6]" />
              Active Bots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#00A6A6]">{totalActiveBots}</div>
            <p className="text-xs text-muted-foreground mt-1">of {bots.length} total</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#F26522]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-[#F26522]" />
              Total P&L
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-[#00A6A6]' : 'text-destructive'}`}>
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All-time performance</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#008E97]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#008E97]" />
              Avg Win Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#008E97]">{avgWinRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Across all bots</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#FC4C02]">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#FC4C02]" />
              Total Trades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#FC4C02]">
              {bots.reduce((sum, bot) => sum + bot.totalTrades, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Bot List */}
      <div className="grid gap-4 md:grid-cols-2">
        {bots.map((bot) => (
          <Card 
            key={bot.id} 
            className={`border-l-4 ${
              bot.isActive 
                ? 'border-l-[#00A6A6] bg-gradient-to-br from-[#00A6A6]/5 to-transparent' 
                : 'border-l-gray-400'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    {bot.name}
                    <Badge 
                      variant={bot.isActive ? 'default' : 'secondary'}
                      className={bot.isActive ? 'bg-[#00A6A6]' : ''}
                    >
                      {bot.isActive ? 'Active' : 'Paused'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {bot.strategy} • {bot.exchange} • {bot.symbol}
                  </CardDescription>
                </div>
                <Switch
                  checked={bot.isActive}
                  onCheckedChange={() => handleToggleBot(bot.id)}
                  className="data-[state=checked]:bg-[#00A6A6]"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Performance</p>
                  <p className={`font-bold ${bot.performance >= 0 ? 'text-[#00A6A6]' : 'text-destructive'}`}>
                    {bot.performance >= 0 ? '+' : ''}{bot.performance}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="font-bold">{bot.winRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Trades</p>
                  <p className="font-bold">{bot.totalTrades}</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-4 border border-[#00A6A6]/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current P&L</span>
                  <span className={`text-lg font-bold ${bot.currentPnL >= 0 ? 'text-[#00A6A6]' : 'text-destructive'}`}>
                    {bot.currentPnL >= 0 ? '+' : ''}${Math.abs(bot.currentPnL).toFixed(2)}
                    {bot.currentPnL >= 0 ? (
                      <TrendingUp className="inline h-4 w-4 ml-1" />
                    ) : (
                      <TrendingDown className="inline h-4 w-4 ml-1" />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 border-[#00A6A6]/30 hover:bg-[#00A6A6]/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#F26522]/30 hover:bg-[#F26522]/10"
                  onClick={() => handleToggleBot(bot.id)}
                >
                  {bot.isActive ? (
                    <><Pause className="h-4 w-4" /></>
                  ) : (
                    <><Play className="h-4 w-4" /></>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive/30 hover:bg-destructive/10"
                  onClick={() => setBotToDelete(bot.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!botToDelete} onOpenChange={() => setBotToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trading Bot?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the bot and all its configuration data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => botToDelete && handleDeleteBot(botToDelete)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
