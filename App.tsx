import { useState, useEffect } from 'react';
import { TradingHeader } from './components/TradingHeader';
import { DashboardOverview } from './components/DashboardOverview';
import { StrategyCard, Strategy } from './components/StrategyCard';
import { PerformanceChart } from './components/PerformanceChart';
import { ActiveTradesTable, ActiveTrade } from './components/ActiveTradesTable';
import { StrategyConfigDialog } from './components/StrategyConfigDialog';
import { SettingsDialog } from './components/SettingsDialog';
import { MarketInsights } from './components/MarketInsights';
import { MobileNav } from './components/MobileNav';
import { WelcomeDialog } from './components/WelcomeDialog';
import { QuickActions } from './components/QuickActions';
import { TradingPlatform } from './components/TradingPlatform';
import { BotManagement } from './components/BotManagement';
import { BotCreation } from './components/BotCreation';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { projectId, publicAnonKey } from './utils/supabase/info';

const STRATEGIES: Strategy[] = [
  // Technical Indicators
  { id: 'rsi', name: 'RSI Strategy', category: 'technical', description: 'Trade based on RSI overbought/oversold levels', isActive: false, performance: 12.5, trades: 45, winRate: 68.2 },
  { id: 'macd', name: 'MACD Crossover', category: 'technical', description: 'Signal line and MACD crossover strategy', isActive: true, performance: 8.3, trades: 32, winRate: 62.5 },
  { id: 'bollinger', name: 'Bollinger Bands', category: 'technical', description: 'Trade on Bollinger Band breakouts and reversions', isActive: false, performance: -2.1, trades: 28, winRate: 45.3 },
  { id: 'ema', name: 'EMA Crossover', category: 'technical', description: 'Fast and slow EMA crossover signals', isActive: true, performance: 15.7, trades: 52, winRate: 71.2 },
  { id: 'ichimoku', name: 'Ichimoku Cloud', category: 'technical', description: 'All-in-one indicator with cloud breakouts', isActive: false, performance: 6.2, trades: 19, winRate: 58.3 },
  { id: 'fibonacci', name: 'Fibonacci Retracement', category: 'technical', description: 'Trade key Fibonacci levels and reversals', isActive: false, performance: 4.8, trades: 15, winRate: 60.0 },
  
  // Algorithmic
  { id: 'momentum', name: 'Momentum Trading', category: 'algorithmic', description: 'Ride strong price movements and trends', isActive: true, performance: 18.2, trades: 67, winRate: 64.2 },
  { id: 'meanreversion', name: 'Mean Reversion', category: 'algorithmic', description: 'Profit from price returning to average', isActive: false, performance: 5.3, trades: 41, winRate: 55.8 },
  { id: 'breakout', name: 'Breakout Trading', category: 'algorithmic', description: 'Trade support/resistance breakouts', isActive: true, performance: 22.1, trades: 38, winRate: 73.7 },
  { id: 'swing', name: 'Swing Trading', category: 'algorithmic', description: 'Multi-day position trading strategy', isActive: false, performance: 9.6, trades: 12, winRate: 66.7 },
  { id: 'volume', name: 'Volume Profile', category: 'algorithmic', description: 'Trade high-volume price levels', isActive: false, performance: 7.4, trades: 29, winRate: 58.6 },
  { id: 'scalping', name: 'Scalping', category: 'algorithmic', description: 'High-frequency small profit trades', isActive: false, performance: 3.2, trades: 156, winRate: 52.6 },
  
  // Passive
  { id: 'grid', name: 'Grid Trading', category: 'passive', description: 'Automated buy/sell orders in grid pattern', isActive: false, performance: 11.3, trades: 89, winRate: 58.4 },
  { id: 'dca', name: 'Dollar Cost Averaging', category: 'passive', description: 'Regular periodic purchases', isActive: true, performance: 14.9, trades: 24, winRate: 75.0 },
  
  // Arbitrage
  { id: 'arbitrage', name: 'Cross-Exchange Arbitrage', category: 'arbitrage', description: 'Exploit price differences across exchanges', isActive: false, performance: 2.8, trades: 67, winRate: 89.6 },
  { id: 'marketmaking', name: 'Market Making', category: 'arbitrage', description: 'Provide liquidity and earn spreads', isActive: false, performance: 5.1, trades: 234, winRate: 54.3 },
];

const MOCK_PERFORMANCE_DATA = Array.from({ length: 30 }, (_, i) => ({
  time: `Day ${i + 1}`,
  value: 10000 + Math.random() * 2000 + i * 100,
  benchmark: 10000 + Math.random() * 1000 + i * 50,
}));

const MOCK_SIGNALS = [
  { symbol: 'BTC/USDT', exchange: 'Binance', signal: 'buy' as const, strength: 85, indicators: ['RSI', 'MACD', 'EMA'] },
  { symbol: 'ETH/USDT', exchange: 'Coinbase', signal: 'sell' as const, strength: 72, indicators: ['Bollinger', 'Volume'] },
  { symbol: 'SOL/USDT', exchange: 'Kraken', signal: 'buy' as const, strength: 68, indicators: ['Momentum', 'Breakout'] },
  { symbol: 'ADA/USDT', exchange: 'Binance', signal: 'neutral' as const, strength: 45, indicators: ['Mean Reversion'] },
];

export default function App() {
  const [mode, setMode] = useState<'paper' | 'live'>('paper');
  const [strategies, setStrategies] = useState<Strategy[]>(STRATEGIES);
  const [activeTrades, setActiveTrades] = useState<ActiveTrade[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [showStrategyConfig, setShowStrategyConfig] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(10000);
  const [dailyPnL, setDailyPnL] = useState(0);
  const [totalTrades, setTotalTrades] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [mobileTab, setMobileTab] = useState('dashboard');
  const [showWelcome, setShowWelcome] = useState(true);

  // Load active trades from server
  useEffect(() => {
    loadActiveTrades();
    loadPerformance();
    
    // Poll for updates every 5 seconds
    const interval = setInterval(() => {
      loadActiveTrades();
      updateTradesPrices();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadActiveTrades = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-befc7cdb/trades/active`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      const data = await response.json();
      if (data.success && data.trades) {
        const formattedTrades: ActiveTrade[] = data.trades.map((trade: any) => ({
          id: trade.id,
          exchange: trade.exchange,
          symbol: trade.symbol,
          side: trade.side,
          amount: trade.amount,
          entryPrice: trade.entryPrice,
          currentPrice: trade.currentPrice,
          pnl: ((trade.currentPrice - trade.entryPrice) * trade.amount * (trade.side === 'buy' ? 1 : -1)),
          pnlPercent: ((trade.currentPrice - trade.entryPrice) / trade.entryPrice * 100 * (trade.side === 'buy' ? 1 : -1)),
          strategy: trade.strategyId,
        }));
        setActiveTrades(formattedTrades);
      }
    } catch (error) {
      console.error('Error loading active trades:', error);
    }
  };

  const loadPerformance = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-befc7cdb/performance`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      const data = await response.json();
      if (data.success && data.performance) {
        setTotalTrades(data.performance.totalTrades);
        setWinRate(data.performance.winRate);
        setDailyPnL(data.performance.totalPnL);
      }
    } catch (error) {
      console.error('Error loading performance:', error);
    }
  };

  const updateTradesPrices = () => {
    // Simulate price updates
    setActiveTrades(prev => prev.map(trade => {
      const priceChange = (Math.random() - 0.5) * trade.currentPrice * 0.01;
      const newPrice = trade.currentPrice + priceChange;
      const pnl = (newPrice - trade.entryPrice) * trade.amount * (trade.side === 'buy' ? 1 : -1);
      const pnlPercent = ((newPrice - trade.entryPrice) / trade.entryPrice * 100 * (trade.side === 'buy' ? 1 : -1));
      
      return {
        ...trade,
        currentPrice: newPrice,
        pnl,
        pnlPercent,
      };
    }));
  };

  const handleToggleStrategy = (id: string, active: boolean) => {
    setStrategies(prev => 
      prev.map(s => s.id === id ? { ...s, isActive: active } : s)
    );
    
    const strategy = strategies.find(s => s.id === id);
    if (strategy) {
      toast.success(
        active 
          ? `${strategy.name} activated` 
          : `${strategy.name} deactivated`
      );
    }
  };

  const handleConfigureStrategy = (id: string) => {
    const strategy = strategies.find(s => s.id === id);
    if (strategy) {
      setSelectedStrategy(strategy);
      setShowStrategyConfig(true);
    }
  };

  const handleSaveStrategyConfig = async (config: any) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-befc7cdb/strategy/config`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(config),
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success('Strategy configuration saved');
      }
    } catch (error) {
      console.error('Error saving strategy config:', error);
      toast.error('Failed to save configuration');
    }
  };

  const handleCloseTrade = async (id: string) => {
    const trade = activeTrades.find(t => t.id === id);
    if (!trade) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-befc7cdb/trade/${id}/close`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ exitPrice: trade.currentPrice }),
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success(`Trade closed: ${trade.pnl >= 0 ? '+' : ''}$${trade.pnl.toFixed(2)}`);
        loadActiveTrades();
        loadPerformance();
      }
    } catch (error) {
      console.error('Error closing trade:', error);
      toast.error('Failed to close trade');
    }
  };

  const activeStrategies = strategies.filter(s => s.isActive).length;
  const dailyPnLPercent = (dailyPnL / portfolioValue) * 100;

  const handleSimulateTrade = async () => {
    const activeStrategy = strategies.find(s => s.isActive);
    if (!activeStrategy) {
      toast.error('Please activate at least one strategy first');
      return;
    }

    const symbols = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT'];
    const exchanges = ['binance', 'coinbase', 'kraken'];
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-befc7cdb/trade/execute`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            mode,
            exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            side: Math.random() > 0.5 ? 'buy' : 'sell',
            amount: Math.random() * 0.5 + 0.1,
            price: 40000 + Math.random() * 10000,
            strategyId: activeStrategy.id,
          }),
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success('Demo trade executed successfully!');
        loadActiveTrades();
      }
    } catch (error) {
      console.error('Error simulating trade:', error);
      toast.error('Failed to execute demo trade');
    }
  };

  const handleRefreshData = () => {
    loadActiveTrades();
    loadPerformance();
    toast.success('Data refreshed');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Toaster 
        toastOptions={{
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
          className: 'skeet-toast',
        }}
      />
      
      <TradingHeader
        mode={mode}
        onModeChange={setMode}
        onSettingsClick={() => setShowSettings(true)}
        onNavigate={setMobileTab}
      />

      <main className="container px-4 py-6 space-y-6">
        {/* Dashboard View */}
        <div className={mobileTab === 'dashboard' ? 'block md:block' : 'hidden md:block'}>
          <Breadcrumbs items={[
            { label: 'Home', active: false },
            { label: 'Dashboard', active: true },
          ]} />
          <DashboardOverview
            portfolioValue={portfolioValue}
            dailyPnL={dailyPnL}
            dailyPnLPercent={dailyPnLPercent}
            totalTrades={totalTrades}
            winRate={winRate}
            activeStrategies={activeStrategies}
          />

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <PerformanceChart data={MOCK_PERFORMANCE_DATA} />
            </div>
            <div className="space-y-4">
              <QuickActions 
                onSimulateTrade={handleSimulateTrade}
                onRefreshData={handleRefreshData}
                onNavigate={setMobileTab}
              />
              <MarketInsights signals={MOCK_SIGNALS} />
            </div>
          </div>
        </div>

        {/* Strategies View */}
        <div className={mobileTab === 'strategies' ? 'block md:block' : 'hidden md:block'}>
          <Breadcrumbs items={[
            { label: 'Home', active: false },
            { label: 'Trading Strategies', active: true },
          ]} />
          {mobileTab === 'strategies' && (
            <h2 className="mb-4 md:hidden">Trading Strategies</h2>
          )}
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-[#008E97]/10 to-[#F26522]/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F26522] data-[state=active]:to-[#FC4C02] data-[state=active]:text-white">Technical</TabsTrigger>
              <TabsTrigger value="algorithmic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008E97] data-[state=active]:to-[#00A6A6] data-[state=active]:text-white">Algo</TabsTrigger>
              <TabsTrigger value="passive" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white">Passive</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {strategies.map(strategy => (
                  <StrategyCard
                    key={strategy.id}
                    strategy={strategy}
                    onToggle={handleToggleStrategy}
                    onConfigure={handleConfigureStrategy}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategies
                  .filter(s => s.category === 'technical')
                  .map(strategy => (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      onToggle={handleToggleStrategy}
                      onConfigure={handleConfigureStrategy}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="algorithmic" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategies
                  .filter(s => s.category === 'algorithmic')
                  .map(strategy => (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      onToggle={handleToggleStrategy}
                      onConfigure={handleConfigureStrategy}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="passive" className="space-y-4 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strategies
                  .filter(s => s.category === 'passive' || s.category === 'arbitrage')
                  .map(strategy => (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      onToggle={handleToggleStrategy}
                      onConfigure={handleConfigureStrategy}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Trades View - Now Trading Platform */}
        <div className={mobileTab === 'trades' ? 'block md:block' : 'hidden md:block'}>
          <Breadcrumbs items={[
            { label: 'Home', active: false },
            { label: 'Trading Platform', active: true },
          ]} />
          {mobileTab === 'trades' && (
            <h2 className="mb-4 md:hidden">Trading Platform</h2>
          )}
          <TradingPlatform />
        </div>

        {/* Bot Management View */}
        <div className={mobileTab === 'bots' ? 'block md:block' : 'hidden md:hidden'}>
          <Breadcrumbs items={[
            { label: 'Home', active: false },
            { label: 'Bot Management', active: true },
          ]} />
          <h2 className="mb-4 md:hidden">Bot Management</h2>
          <BotManagement />
        </div>

        {/* Bot Creation View */}
        <div className={mobileTab === 'create' ? 'block md:block' : 'hidden md:hidden'}>
          <Breadcrumbs items={[
            { label: 'Home', active: false },
            { label: 'Bot Creation', active: true },
          ]} />
          <BotCreation />
        </div>
      </main>

      <MobileNav
        activeTab={mobileTab}
        onTabChange={setMobileTab}
        onSettingsClick={() => setShowSettings(true)}
      />

      <StrategyConfigDialog
        open={showStrategyConfig}
        onClose={() => setShowStrategyConfig(false)}
        strategy={selectedStrategy}
        onSave={handleSaveStrategyConfig}
      />

      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        mode={mode}
        onModeChange={setMode}
      />

      <WelcomeDialog
        open={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </div>
  );
}
