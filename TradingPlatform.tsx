import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';

// Mock data for charts
const generateCandleData = (length: number) => {
  const data = [];
  let price = 50000;
  for (let i = 0; i < length; i++) {
    const change = (Math.random() - 0.5) * 2000;
    price += change;
    data.push({
      time: `${i}:00`,
      value: price,
      volume: Math.random() * 1000000,
    });
  }
  return data;
};

const cryptoData = generateCandleData(24);
const forexData = generateCandleData(24);
const stockData = generateCandleData(24);

export function TradingPlatform() {
  const [marketType, setMarketType] = useState<'crypto' | 'forex' | 'stocks'>('crypto');
  const [selectedExchange, setSelectedExchange] = useState('binance');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');

  const exchanges = {
    crypto: ['Binance', 'Coinbase', 'Kraken', 'KuCoin', 'Bybit', 'OKX', 'Huobi', 'Gate.io'],
    forex: ['OANDA', 'Interactive Brokers', 'FXCM', 'IG', 'Plus500', 'eToro'],
    stocks: ['Alpaca', 'TD Ameritrade', 'E*TRADE', 'Robinhood', 'Interactive Brokers', 'Charles Schwab'],
  };

  const symbols = {
    crypto: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'ADA/USDT', 'DOT/USDT', 'AVAX/USDT'],
    forex: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF', 'NZD/USD'],
    stocks: ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX'],
  };

  const getChartData = () => {
    switch (marketType) {
      case 'crypto':
        return cryptoData;
      case 'forex':
        return forexData;
      case 'stocks':
        return stockData;
      default:
        return cryptoData;
    }
  };

  const currentPrice = getChartData()[getChartData().length - 1]?.value || 0;
  const priceChange = currentPrice - (getChartData()[0]?.value || 0);
  const priceChangePercent = ((priceChange / (getChartData()[0]?.value || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Market Type Tabs */}
      <Tabs value={marketType} onValueChange={(v) => setMarketType(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-[#008E97]/10 to-[#F26522]/10 border border-[#00A6A6]/20">
          <TabsTrigger 
            value="crypto"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white"
          >
            Crypto Markets
          </TabsTrigger>
          <TabsTrigger 
            value="forex"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F26522] data-[state=active]:to-[#FC4C02] data-[state=active]:text-white"
          >
            Forex
          </TabsTrigger>
          <TabsTrigger 
            value="stocks"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008E97] data-[state=active]:to-[#00A6A6] data-[state=active]:text-white"
          >
            Stock Exchange
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="space-y-4 mt-6">
          <TradingContent
            marketType="crypto"
            exchanges={exchanges.crypto}
            symbols={symbols.crypto}
            selectedExchange={selectedExchange}
            setSelectedExchange={setSelectedExchange}
            selectedSymbol={selectedSymbol}
            setSelectedSymbol={setSelectedSymbol}
            chartData={getChartData()}
            currentPrice={currentPrice}
            priceChange={priceChange}
            priceChangePercent={priceChangePercent}
          />
        </TabsContent>

        <TabsContent value="forex" className="space-y-4 mt-6">
          <TradingContent
            marketType="forex"
            exchanges={exchanges.forex}
            symbols={symbols.forex}
            selectedExchange={selectedExchange}
            setSelectedExchange={setSelectedExchange}
            selectedSymbol={selectedSymbol}
            setSelectedSymbol={setSelectedSymbol}
            chartData={getChartData()}
            currentPrice={currentPrice}
            priceChange={priceChange}
            priceChangePercent={priceChangePercent}
          />
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4 mt-6">
          <TradingContent
            marketType="stocks"
            exchanges={exchanges.stocks}
            symbols={symbols.stocks}
            selectedExchange={selectedExchange}
            setSelectedExchange={setSelectedExchange}
            selectedSymbol={selectedSymbol}
            setSelectedSymbol={setSelectedSymbol}
            chartData={getChartData()}
            currentPrice={currentPrice}
            priceChange={priceChange}
            priceChangePercent={priceChangePercent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TradingContentProps {
  marketType: string;
  exchanges: string[];
  symbols: string[];
  selectedExchange: string;
  setSelectedExchange: (value: string) => void;
  selectedSymbol: string;
  setSelectedSymbol: (value: string) => void;
  chartData: any[];
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
}

function TradingContent({
  marketType,
  exchanges,
  symbols,
  selectedExchange,
  setSelectedExchange,
  selectedSymbol,
  setSelectedSymbol,
  chartData,
  currentPrice,
  priceChange,
  priceChangePercent,
}: TradingContentProps) {
  const isPositive = priceChange >= 0;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Chart */}
      <Card className="lg:col-span-2 border-l-4 border-l-[#00A6A6]">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedSymbol}
                <Badge variant={isPositive ? 'default' : 'destructive'} className={isPositive ? 'bg-[#00A6A6]' : ''}>
                  {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
                </Badge>
              </CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold text-foreground">
                  ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`ml-2 ${isPositive ? 'text-[#00A6A6]' : 'text-destructive'}`}>
                  {isPositive ? '+' : ''}${Math.abs(priceChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </CardDescription>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedExchange} onValueChange={setSelectedExchange}>
                <SelectTrigger className="w-[180px] border-[#00A6A6]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exchanges.map((exchange) => (
                    <SelectItem key={exchange} value={exchange.toLowerCase()}>
                      {exchange}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="w-[140px] border-[#F26522]/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {symbols.map((symbol) => (
                    <SelectItem key={symbol} value={symbol}>
                      {symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A6A6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00A6A6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00A6A6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Side Panel with Market Info */}
      <div className="space-y-4">
        <Card className="border-l-4 border-l-[#F26522]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#F26522]" />
              Market Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">24h Volume</span>
              <span className="font-bold">${(Math.random() * 10000000).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">24h High</span>
              <span className="font-bold text-[#00A6A6]">${(currentPrice * 1.05).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">24h Low</span>
              <span className="font-bold text-[#F26522]">${(currentPrice * 0.95).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Market Cap</span>
              <span className="font-bold">${(Math.random() * 100000000000).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#008E97]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#008E97]" />
              Volume Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="volume" stroke="#F26522" strokeWidth={2} dot={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#00A6A6]/10 to-[#F26522]/10 border-[#00A6A6]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#00A6A6]" />
              Quick Trade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full bg-gradient-to-r from-[#00A6A6] to-[#008E97] hover:from-[#008E97] hover:to-[#00A6A6]">
              Buy {selectedSymbol.split('/')[0]}
            </Button>
            <Button className="w-full bg-gradient-to-r from-[#F26522] to-[#FC4C02] hover:from-[#FC4C02] hover:to-[#F26522]">
              Sell {selectedSymbol.split('/')[0]}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
