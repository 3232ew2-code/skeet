import { useState } from 'react';
import { Book, ChevronDown, Key, Activity, Settings, TrendingUp, Shield, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

export function QuickStartGuide() {
  const [openSections, setOpenSections] = useState<string[]>(['overview']);

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-[#00A6A6]" />
          <h1>SKEET Platform Documentation</h1>
        </div>
        <p className="text-muted-foreground">
          Strategic Key Entry & Exit Tactics - Your comprehensive trading automation platform
        </p>
      </div>

      <Tabs defaultValue="quickstart" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="api">API Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart" className="space-y-4 mt-6">
          <ScrollArea className="h-[600px] pr-4">
            {/* Overview */}
            <Collapsible
              open={openSections.includes('overview')}
              onOpenChange={() => toggleSection('overview')}
            >
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#00A6A6]" />
                      <CardTitle>Platform Overview</CardTitle>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openSections.includes('overview') ? 'rotate-180' : ''}`} />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <p>
                      SKEET is a comprehensive trading bot platform supporting 100+ exchanges across crypto, stocks, and forex markets.
                    </p>
                    <div className="space-y-2">
                      <h4>Key Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                        <li>16 pre-built trading strategies</li>
                        <li>Paper and live trading modes</li>
                        <li>Real-time trade execution</li>
                        <li>Advanced risk management</li>
                        <li>Performance tracking & analytics</li>
                        <li>Multi-exchange arbitrage detection</li>
                        <li>Encrypted API key storage</li>
                      </ul>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Getting Started */}
            <Collapsible
              open={openSections.includes('getting-started')}
              onOpenChange={() => toggleSection('getting-started')}
            >
              <Card className="mt-4">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-[#F26522]" />
                      <CardTitle>Getting Started</CardTitle>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openSections.includes('getting-started') ? 'rotate-180' : ''}`} />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">1</Badge>
                        <div className="flex-1">
                          <h4>Choose Trading Mode</h4>
                          <p className="text-muted-foreground">
                            Start with Paper Trading mode to test strategies risk-free. Switch to Live Trading when ready.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">2</Badge>
                        <div className="flex-1">
                          <h4>Configure API Keys</h4>
                          <p className="text-muted-foreground">
                            Add your exchange API keys in Settings → API Key Vault. All keys are encrypted and stored securely.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">3</Badge>
                        <div className="flex-1">
                          <h4>Select & Configure Strategies</h4>
                          <p className="text-muted-foreground">
                            Choose from 16 strategies, customize parameters, and activate. Multiple strategies can run simultaneously.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0">4</Badge>
                        <div className="flex-1">
                          <h4>Monitor & Optimize</h4>
                          <p className="text-muted-foreground">
                            Track performance in real-time, adjust risk parameters, and optimize based on analytics.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Risk Management */}
            <Collapsible
              open={openSections.includes('risk')}
              onOpenChange={() => toggleSection('risk')}
            >
              <Card className="mt-4">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-[#00A6A6]" />
                      <CardTitle>Risk Management</CardTitle>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openSections.includes('risk') ? 'rotate-180' : ''}`} />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <p>SKEET includes comprehensive risk management tools:</p>
                    <div className="space-y-2">
                      <div>
                        <h4>Position Sizing</h4>
                        <p className="text-muted-foreground">
                          Configure maximum position size per trade and total portfolio allocation per strategy.
                        </p>
                      </div>
                      <div>
                        <h4>Stop Loss & Take Profit</h4>
                        <p className="text-muted-foreground">
                          Set automatic stop-loss and take-profit levels for every trade to protect capital.
                        </p>
                      </div>
                      <div>
                        <h4>Daily Loss Limits</h4>
                        <p className="text-muted-foreground">
                          Define maximum daily loss thresholds to automatically pause trading if limits are reached.
                        </p>
                      </div>
                      <div>
                        <h4>Drawdown Protection</h4>
                        <p className="text-muted-foreground">
                          Monitor portfolio drawdown and automatically reduce position sizes during losing streaks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Data & Security */}
            <Collapsible
              open={openSections.includes('security')}
              onOpenChange={() => toggleSection('security')}
            >
              <Card className="mt-4">
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-[#F26522]" />
                      <CardTitle>Data & Security</CardTitle>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${openSections.includes('security') ? 'rotate-180' : ''}`} />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <p>Your data security is our top priority:</p>
                    <div className="space-y-2">
                      <div>
                        <h4>Encrypted Storage</h4>
                        <p className="text-muted-foreground">
                          All API keys are encrypted at rest using industry-standard AES-256 encryption.
                        </p>
                      </div>
                      <div>
                        <h4>Secure Connections</h4>
                        <p className="text-muted-foreground">
                          All exchange connections use HTTPS/WSS with TLS 1.3+ for maximum security.
                        </p>
                      </div>
                      <div>
                        <h4>Read-Only Options</h4>
                        <p className="text-muted-foreground">
                          For monitoring only, configure API keys with read-only permissions.
                        </p>
                      </div>
                      <div>
                        <h4>Local Data</h4>
                        <p className="text-muted-foreground">
                          Trade history and performance data stored in secure Supabase database with row-level security.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4 mt-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {/* Technical Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Technical Indicator Strategies</CardTitle>
                  <CardDescription>Traditional technical analysis based trading</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4>RSI Strategy</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Trades based on RSI overbought (&gt;70) and oversold (&lt;30) levels. 
                        Buys when RSI crosses above 30, sells when crosses below 70.
                      </p>
                    </div>
                    <div>
                      <h4>MACD Crossover</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Monitors MACD line crossing signal line. Buy signal when MACD crosses above signal, 
                        sell when crosses below.
                      </p>
                    </div>
                    <div>
                      <h4>Bollinger Bands</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Buys when price touches lower band, sells at upper band. 
                        Uses 20-period SMA with 2 standard deviations.
                      </p>
                    </div>
                    <div>
                      <h4>EMA Crossover</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Fast EMA (12) crossing slow EMA (26). Buy on golden cross, sell on death cross.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Algorithmic Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle>Algorithmic Strategies</CardTitle>
                  <CardDescription>Advanced algorithmic trading approaches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4>Momentum Trading</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Identifies strong trends using rate of change and volume. 
                        Enters when momentum accelerates, exits on deceleration.
                      </p>
                    </div>
                    <div>
                      <h4>Mean Reversion</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Calculates price deviation from moving average. 
                        Buys when price is significantly below mean, sells above mean.
                      </p>
                    </div>
                    <div>
                      <h4>Breakout Trading</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Detects support/resistance levels and volume. 
                        Enters on breakout with high volume confirmation.
                      </p>
                    </div>
                    <div>
                      <h4>Scalping</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> High-frequency trading targeting small price movements. 
                        Uses tight spreads and quick execution with 1-5 minute timeframes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passive Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle>Passive Strategies</CardTitle>
                  <CardDescription>Set-and-forget automated strategies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4>Grid Trading</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Places buy/sell orders at predetermined price intervals. 
                        Profits from volatility in ranging markets. Automatically rebalances grid.
                      </p>
                    </div>
                    <div>
                      <h4>Dollar Cost Averaging (DCA)</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Purchases fixed dollar amount at regular intervals. 
                        Reduces timing risk and averages entry price over time.
                      </p>
                    </div>
                    <div>
                      <h4>Cross-Exchange Arbitrage</h4>
                      <p className="text-muted-foreground">
                        <strong>Algorithm:</strong> Monitors price differences across exchanges. 
                        Buys on low-price exchange, sells on high-price exchange simultaneously.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 mt-6">
          <ScrollArea className="h-[600px] pr-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-[#00A6A6]" />
                  <CardTitle>API Key Vault Setup</CardTitle>
                </div>
                <CardDescription>Secure configuration of exchange API keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4>Step 1: Generate API Keys on Exchange</h4>
                    <p className="text-muted-foreground mb-2">
                      For each exchange you want to trade on:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Log into your exchange account</li>
                      <li>Navigate to API Management section</li>
                      <li>Create new API key with appropriate permissions</li>
                      <li>For paper trading: Read-only permissions sufficient</li>
                      <li>For live trading: Enable spot trading permissions</li>
                      <li>Copy API Key and Secret immediately</li>
                    </ol>
                  </div>

                  <div>
                    <h4>Step 2: Add Keys to SKEET</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Open Settings → API Key Vault</li>
                      <li>Click "Add Exchange"</li>
                      <li>Select exchange from dropdown</li>
                      <li>Paste API Key and Secret</li>
                      <li>Optional: Add passphrase if required</li>
                      <li>Enable IP whitelist if supported</li>
                      <li>Click "Save & Encrypt"</li>
                    </ol>
                  </div>

                  <div>
                    <h4>Step 3: Test Connection</h4>
                    <p className="text-muted-foreground mb-2">
                      After adding keys:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                      <li>Click "Test Connection" button</li>
                      <li>Verify account balance loads correctly</li>
                      <li>Check that available trading pairs appear</li>
                      <li>Green status indicator confirms success</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-[#F26522] bg-[#F26522]/10 p-4">
                    <h4 className="text-[#FC4C02] flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security Best Practices
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mt-2">
                      <li>Never share API keys or secrets</li>
                      <li>Use IP whitelist when available</li>
                      <li>Disable withdrawal permissions</li>
                      <li>Regularly rotate API keys</li>
                      <li>Start with small amounts in live trading</li>
                      <li>Monitor API key usage in exchange dashboard</li>
                    </ul>
                  </div>

                  <div>
                    <h4>Supported Exchanges</h4>
                    <p className="text-muted-foreground mb-2">
                      SKEET supports 100+ exchanges including:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Badge variant="outline">Binance</Badge>
                      <Badge variant="outline">Coinbase</Badge>
                      <Badge variant="outline">Kraken</Badge>
                      <Badge variant="outline">Bybit</Badge>
                      <Badge variant="outline">OKX</Badge>
                      <Badge variant="outline">KuCoin</Badge>
                      <Badge variant="outline">Gate.io</Badge>
                      <Badge variant="outline">Huobi</Badge>
                      <Badge variant="outline">Bitfinex</Badge>
                      <Badge variant="outline">Gemini</Badge>
                      <Badge variant="outline">Bitstamp</Badge>
                      <Badge variant="outline">And 90+ more...</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
