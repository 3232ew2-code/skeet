import { useState } from 'react';
import { BookOpen, TrendingUp, Shield, Code, Brain, BarChart3, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  tags: string[];
  icon: any;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Technical Indicators',
    category: 'Technical Analysis',
    description: 'Complete guide to RSI, MACD, Bollinger Bands and other indicators',
    tags: ['RSI', 'MACD', 'Technical', 'Beginner'],
    icon: TrendingUp,
    content: `Technical indicators are mathematical calculations based on price, volume, or open interest. They help traders identify patterns and potential trading opportunities.

**RSI (Relative Strength Index)**
- Momentum oscillator measuring speed and change of price movements
- Ranges from 0 to 100
- Above 70: Overbought condition (potential sell signal)
- Below 30: Oversold condition (potential buy signal)
- Best used in ranging markets

**MACD (Moving Average Convergence Divergence)**
- Trend-following momentum indicator
- Shows relationship between two moving averages
- MACD Line: 12-day EMA minus 26-day EMA
- Signal Line: 9-day EMA of MACD
- Histogram: MACD minus Signal Line
- Buy when MACD crosses above signal line
- Sell when MACD crosses below signal line

**Bollinger Bands**
- Volatility indicator with three lines
- Middle: 20-period simple moving average
- Upper/Lower: 2 standard deviations from middle
- Price touching lower band: Potential buy
- Price touching upper band: Potential sell
- Band squeeze indicates potential breakout

**Best Practices**
- Never rely on single indicator
- Combine multiple indicators for confirmation
- Adjust parameters based on timeframe and asset
- Test thoroughly in paper trading first`,
  },
  {
    id: '2',
    title: 'Risk Management Fundamentals',
    category: 'Risk Management',
    description: 'Essential risk management techniques for successful trading',
    tags: ['Risk', 'Position Sizing', 'Stop Loss', 'Essential'],
    icon: Shield,
    content: `Risk management is the most important aspect of trading. Even the best strategy will fail without proper risk controls.

**Position Sizing**
- Never risk more than 1-2% of capital per trade
- Calculate position size: (Account Balance × Risk %) / Stop Loss Distance
- Larger positions = larger potential profit BUT larger potential loss
- Smaller positions = more consistent, sustainable growth

**Stop Loss Strategies**
- **Fixed Percentage**: Stop at X% below entry (e.g., 2%)
- **Volatility-Based**: Use ATR (Average True Range) × multiplier
- **Support/Resistance**: Place stops below key support levels
- **Trailing Stops**: Move stop loss with profitable price movement
- Never move stop loss further from entry price

**Take Profit Levels**
- Set target before entering trade
- Risk/Reward ratio minimum 1:2 (risk $1 to make $2)
- Consider partial profits at multiple levels
- Use trailing take-profit to capture extended moves

**Daily Loss Limits**
- Set maximum daily/weekly loss threshold
- Stop trading when limit reached
- Prevents emotional revenge trading
- Protects capital during losing streaks

**Portfolio Risk**
- Total exposure across all strategies
- Correlation between assets
- Maximum drawdown tolerance
- Diversification across strategies and assets

**Emotional Discipline**
- Stick to your plan
- Accept losses as part of trading
- Don't increase position size to recover losses
- Take breaks after significant wins or losses`,
  },
  {
    id: '3',
    title: 'Algorithmic Trading Strategies',
    category: 'Advanced',
    description: 'Deep dive into momentum, mean reversion, and breakout strategies',
    tags: ['Algorithmic', 'Momentum', 'Mean Reversion', 'Advanced'],
    icon: Brain,
    content: `Algorithmic strategies use mathematical models to identify and execute trades automatically.

**Momentum Trading**
Rides strong trends by identifying accelerating price movements.

*Algorithm Logic:*
1. Calculate rate of change over multiple timeframes
2. Measure volume acceleration
3. Identify when both price and volume momentum align
4. Enter trade in direction of momentum
5. Exit when momentum decelerates

*Key Parameters:*
- Lookback period: 20-50 bars
- Momentum threshold: 2-3 standard deviations
- Volume confirmation: 150%+ of average
- Stop loss: 1-2 ATR below entry

**Mean Reversion**
Profits from price returning to statistical average.

*Algorithm Logic:*
1. Calculate moving average (typically 20-period)
2. Measure standard deviation from mean
3. When price moves 2+ std dev from mean, expect reversion
4. Enter counter-trend trade
5. Exit when price returns to mean

*Key Parameters:*
- Mean period: 20-200 bars (depends on timeframe)
- Entry threshold: 2-3 standard deviations
- Exit: Price returns to mean or crosses to other side
- Works best in ranging markets

**Breakout Trading**
Captures explosive moves when price breaks key levels.

*Algorithm Logic:*
1. Identify consolidation range or pattern
2. Detect support and resistance levels
3. Monitor for volume spike
4. Enter on breakout with volume confirmation
5. Use volatility stop (ATR-based)

*Key Parameters:*
- Consolidation period: Minimum 10-20 bars
- Breakout confirmation: Close above/below level
- Volume requirement: 200%+ of average
- False breakout protection: Wait for retest

**Combining Strategies**
- Momentum + Breakout: High-probability trending moves
- Mean Reversion + Volume: Quality reversal trades
- Time-based filters: Only trade during liquid hours`,
  },
  {
    id: '4',
    title: 'Grid Trading Explained',
    category: 'Passive Strategies',
    description: 'How to profit from market volatility using grid trading',
    tags: ['Grid Trading', 'Passive', 'Automation', 'Intermediate'],
    icon: BarChart3,
    content: `Grid trading is a passive strategy that profits from market volatility by placing buy and sell orders at predetermined price intervals.

**How Grid Trading Works**
1. Define price range (upper and lower bounds)
2. Divide range into equal grid intervals
3. Place buy orders at each level below current price
4. Place sell orders at each level above current price
5. As price moves, orders execute automatically
6. Profit from buying low and selling high repeatedly

**Example Grid Setup**
- Asset: BTC/USDT
- Price Range: $40,000 - $50,000
- Grid Levels: 20 grids
- Grid Size: $500 per level
- Investment: $10,000

Grid levels:
- Buy: $40,000, $40,500, $41,000... $45,000
- Sell: $45,500, $46,000, $46,500... $50,000

**Grid Types**

*Arithmetic Grid:*
- Equal price intervals
- Example: $100, $200, $300, $400
- Best for ranging markets

*Geometric Grid:*
- Equal percentage intervals
- Example: +5%, +10%, +15%, +20%
- Better for trending markets

**Profit Calculation**
Per grid profit = Grid size - Trading fees
Example: 
- Buy at $45,000, sell at $45,500
- Profit: $500 (0.1%) - fees (0.1%) = $450 per cycle

**Risk Management**
- Use only in ranging/sideways markets
- Set stop loss if price breaks range significantly
- Allocate limited % of portfolio (10-20%)
- Monitor for strong trends that could invalidate grid
- Consider reducing grid if volatility increases

**Optimization Tips**
- Backtest different grid sizes
- Adjust range based on historical volatility
- Use tighter grids in high-volume ranges
- Wider grids for lower volatility
- Rebalance grid periodically

**Best Markets for Grid Trading**
- Cryptocurrencies (high volatility)
- Forex pairs in ranging conditions
- Stable stocks oscillating around mean
- Avoid during strong trends`,
  },
  {
    id: '5',
    title: 'Dollar Cost Averaging Strategy',
    category: 'Passive Strategies',
    description: 'Long-term wealth building through systematic investing',
    tags: ['DCA', 'Passive', 'Long-term', 'Beginner'],
    icon: TrendingUp,
    content: `Dollar Cost Averaging (DCA) is a systematic investment strategy that reduces timing risk and emotional decision-making.

**Core Principle**
Invest a fixed dollar amount at regular intervals, regardless of price.

**How DCA Works**
1. Decide on investment amount (e.g., $500/month)
2. Choose time interval (daily, weekly, monthly)
3. Execute purchase automatically
4. Continue regardless of market conditions
5. Build position over time

**Benefits**

*Reduces Timing Risk:*
- Don't need to predict market tops/bottoms
- Average entry price over time
- Remove emotional decision-making

*Lower Average Cost:*
- Buy more units when price is low
- Buy fewer units when price is high
- Results in lower average cost per unit

*Emotional Discipline:*
- Systematic approach removes fear and greed
- Continue investing during market downturns
- Avoid panic selling

**Example**
Monthly investment: $1,000 in BTC

Month 1: BTC = $40,000 → Buy 0.025 BTC
Month 2: BTC = $35,000 → Buy 0.0286 BTC  
Month 3: BTC = $45,000 → Buy 0.0222 BTC
Month 4: BTC = $38,000 → Buy 0.0263 BTC

Total invested: $4,000
Total BTC: 0.1021 BTC
Average cost: $39,177 per BTC

vs. Lump Sum at Month 1: $40,000 per BTC

**Configuration in SKEET**
- Set investment amount
- Choose frequency (daily/weekly/monthly)
- Select asset(s) to purchase
- Enable/disable based on market conditions
- Set stop conditions (target price, portfolio %)

**Advanced DCA Techniques**

*Value DCA:*
- Increase purchases when price drops X%
- Decrease purchases when price rises X%
- Accelerate accumulation in dips

*Trend-Following DCA:*
- Only DCA during confirmed uptrends
- Pause during strong downtrends
- Use moving average as filter

*Target-Based DCA:*
- Set target number of units
- DCA until target reached
- Then switch to hold or different strategy

**Best Practices**
- Choose assets you believe in long-term
- Stick to schedule strictly
- Don't try to time entries
- Hold for minimum 1+ years
- Consider tax implications
- Rebalance periodically`,
  },
  {
    id: '6',
    title: 'Backtesting Your Strategies',
    category: 'Advanced',
    description: 'How to properly test and validate trading strategies',
    tags: ['Backtesting', 'Testing', 'Validation', 'Advanced'],
    icon: Code,
    content: `Backtesting is the process of testing a trading strategy using historical data to validate its effectiveness.

**Why Backtest?**
- Validate strategy logic before risking capital
- Understand expected win rate and drawdowns
- Optimize parameters for better performance
- Build confidence in your approach
- Identify potential issues

**Backtesting Process**

*Step 1: Define Strategy Rules*
- Entry conditions (when to buy)
- Exit conditions (when to sell)
- Position sizing rules
- Stop loss and take profit levels
- All parameters must be specific

*Step 2: Gather Historical Data*
- Use sufficient data (minimum 1-2 years)
- Include multiple market conditions
- Bull markets, bear markets, ranging
- High and low volatility periods
- Quality, clean data is essential

*Step 3: Run Simulation*
- Apply strategy rules to historical data
- Track all trades, entries, exits
- Calculate profit/loss for each trade
- Record max drawdown
- Track all metrics

*Step 4: Analyze Results*
- Total return
- Win rate
- Average win vs. average loss
- Profit factor
- Maximum drawdown
- Sharpe ratio
- Number of trades

**Key Metrics Explained**

*Win Rate:*
Percentage of profitable trades
- 50-60% is good for most strategies
- Higher isn't always better

*Profit Factor:*
Gross profit / Gross loss
- Above 1.5 is solid
- Above 2.0 is excellent

*Sharpe Ratio:*
Risk-adjusted returns
- Above 1.0 is acceptable
- Above 2.0 is very good

*Max Drawdown:*
Largest peak-to-trough decline
- How much can you lose?
- Can you handle this psychologically?

**Common Pitfalls**

*Overfitting:*
- Optimizing too much for past data
- Strategy won't work in future
- Solution: Use walk-forward testing

*Look-Ahead Bias:*
- Using future information in past trades
- Unrealistic results
- Solution: Carefully structure code

*Survivorship Bias:*
- Only testing stocks that still exist
- Ignores companies that failed
- Solution: Include delisted securities

*Cherry Picking:*
- Selecting favorable time periods
- Hiding poor performance periods
- Solution: Test full dataset

**Walk-Forward Testing**
1. Split data into segments
2. Optimize on first segment (in-sample)
3. Test on next segment (out-of-sample)
4. Roll forward and repeat
5. More realistic than single backtest

**Paper Trading**
After backtesting:
- Run strategy in paper trading mode
- Monitor performance in real-time
- Verify execution and slippage
- Test for 1-3 months minimum
- Only go live after consistent paper results

**SKEET Backtesting Features**
- Historical data for 100+ exchanges
- Strategy performance analytics
- Automatic metric calculation
- Visual equity curves
- Detailed trade logs
- Parameter optimization tools`,
  },
];

export function KnowledgeCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = ARTICLES.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = Array.from(new Set(ARTICLES.map(a => a.category)));

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-[#00A6A6]" />
          <h1>Knowledge Center</h1>
        </div>
        <p className="text-muted-foreground">
          Educational resources, guides, and trading literature
        </p>
      </div>

      {!selectedArticle ? (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, strategies, concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-4 lg:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.slice(0, 4).map(category => (
                <TabsTrigger key={category} value={category} className="hidden sm:block">
                  {category.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredArticles.map(article => {
                    const Icon = article.icon;
                    return (
                      <Card
                        key={article.id}
                        className="cursor-pointer hover:border-[#00A6A6] transition-colors"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-[#00A6A6]/10 p-2">
                              <Icon className="h-5 w-5 text-[#00A6A6]" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base">{article.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {article.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredArticles
                      .filter(a => a.category === category)
                      .map(article => {
                        const Icon = article.icon;
                        return (
                          <Card
                            key={article.id}
                            className="cursor-pointer hover:border-[#00A6A6] transition-colors"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <CardHeader>
                              <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-[#00A6A6]/10 p-2">
                                  <Icon className="h-5 w-5 text-[#00A6A6]" />
                                </div>
                                <div className="flex-1">
                                  <CardTitle className="text-base">{article.title}</CardTitle>
                                  <CardDescription className="mt-1">
                                    {article.description}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2">
                                {article.tags.map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#00A6A6]/10 p-2">
                  <selectedArticle.icon className="h-6 w-6 text-[#00A6A6]" />
                </div>
                <div>
                  <CardTitle>{selectedArticle.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {selectedArticle.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedArticle.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={idx} className="mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('*') && paragraph.endsWith(':*')) {
                    return (
                      <h4 key={idx} className="mt-4 mb-2 text-[#00A6A6]">
                        {paragraph.replace(/\*/g, '')}
                      </h4>
                    );
                  }
                  return (
                    <p key={idx} className="mb-3 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-[#00A6A6] hover:underline"
              >
                ← Back to articles
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
