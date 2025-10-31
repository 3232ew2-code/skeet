import { ArrowDown, ArrowUp, DollarSign, TrendingUp, Activity, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DashboardOverviewProps {
  portfolioValue: number;
  dailyPnL: number;
  dailyPnLPercent: number;
  totalTrades: number;
  winRate: number;
  activeStrategies: number;
}

export function DashboardOverview({ 
  portfolioValue, 
  dailyPnL, 
  dailyPnLPercent, 
  totalTrades,
  winRate,
  activeStrategies
}: DashboardOverviewProps) {
  const isProfitable = dailyPnL >= 0;
  
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      <Card className="border-l-4 border-l-[#00A6A6]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Portfolio Value</CardTitle>
          <DollarSign className="h-4 w-4 text-[#00A6A6]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl">${portfolioValue.toLocaleString()}</div>
        </CardContent>
      </Card>
      
      <Card className={`border-l-4 ${isProfitable ? 'border-l-[#00A6A6]' : 'border-l-[#F26522]'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Daily P&L</CardTitle>
          {isProfitable ? (
            <ArrowUp className="h-4 w-4 text-[#00A6A6]" />
          ) : (
            <ArrowDown className="h-4 w-4 text-[#F26522]" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl ${isProfitable ? 'text-[#00A6A6]' : 'text-[#F26522]'}`}>
            {isProfitable ? '+' : ''}{dailyPnL.toFixed(2)}
          </div>
          <p className={`text-xs ${isProfitable ? 'text-[#00A6A6]' : 'text-[#F26522]'}`}>
            {isProfitable ? '+' : ''}{dailyPnLPercent.toFixed(2)}%
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-[#F26522]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Total Trades</CardTitle>
          <Activity className="h-4 w-4 text-[#F26522]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl">{totalTrades}</div>
          <p className="text-xs text-muted-foreground">Today</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-[#008E97]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Win Rate</CardTitle>
          <Target className="h-4 w-4 text-[#008E97]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl">{winRate.toFixed(1)}%</div>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-[#00A6A6] bg-gradient-to-br from-[#00A6A6]/5 to-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Active Strategies</CardTitle>
          <TrendingUp className="h-4 w-4 text-[#00A6A6]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-[#00A6A6]">{activeStrategies}</div>
          <p className="text-xs text-muted-foreground">Running</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-[#FC4C02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Exchanges</CardTitle>
          <Activity className="h-4 w-4 text-[#FC4C02]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl">5</div>
          <p className="text-xs text-muted-foreground">Connected</p>
        </CardContent>
      </Card>
    </div>
  );
}
