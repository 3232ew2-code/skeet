import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { useState } from 'react';
import { Shield, Key, Bell, DollarSign, Book, BookOpen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { QuickStartGuide } from './QuickStartGuide';
import { KnowledgeCenter } from './KnowledgeCenter';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'paper' | 'live';
  onModeChange: (mode: 'paper' | 'live') => void;
}

export function SettingsDialog({ open, onClose, mode, onModeChange }: SettingsDialogProps) {
  const [exchanges, setExchanges] = useState([
    { id: 'binance', name: 'Binance', connected: true },
    { id: 'coinbase', name: 'Coinbase Pro', connected: true },
    { id: 'kraken', name: 'Kraken', connected: false },
    { id: 'bitfinex', name: 'Bitfinex', connected: false },
    { id: 'huobi', name: 'Huobi', connected: false },
  ]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your trading bot configuration and exchange connections
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-gradient-to-r from-[#008E97]/10 to-[#F26522]/10">
            <TabsTrigger value="trading" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white">Trading</TabsTrigger>
            <TabsTrigger value="exchanges" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F26522] data-[state=active]:to-[#FC4C02] data-[state=active]:text-white">API Vault</TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008E97] data-[state=active]:to-[#00A6A6] data-[state=active]:text-white">Risk</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white">Alerts</TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F26522] data-[state=active]:to-[#FC4C02] data-[state=active]:text-white">Docs</TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#008E97] data-[state=active]:to-[#00A6A6] data-[state=active]:text-white">Learn</TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white">About</TabsTrigger>
          </TabsList>

          <TabsContent value="trading" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trading Mode</CardTitle>
                <CardDescription>
                  Switch between paper trading and live trading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Paper Trading Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Test strategies with simulated funds
                    </p>
                  </div>
                  <Switch
                    checked={mode === 'paper'}
                    onCheckedChange={(checked) => onModeChange(checked ? 'paper' : 'live')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Live Trading Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Trade with real funds - use with caution
                    </p>
                  </div>
                  <Switch
                    checked={mode === 'live'}
                    onCheckedChange={(checked) => onModeChange(checked ? 'live' : 'paper')}
                  />
                </div>

                {mode === 'live' && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">
                      ⚠️ Live trading is enabled. Real funds are at risk.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Paper Trading Balance</CardTitle>
                <CardDescription>
                  Configure your simulated trading balance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paperBalance">Initial Balance ($)</Label>
                  <Input
                    id="paperBalance"
                    type="number"
                    defaultValue="10000"
                    placeholder="10000"
                  />
                </div>
                <Button size="sm">Reset Paper Balance</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exchanges" className="space-y-4">
            <div className="space-y-3">
              {exchanges.map((exchange) => (
                <Card key={exchange.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-base">{exchange.name}</CardTitle>
                        {exchange.connected && (
                          <Badge variant="default" className="text-xs">Connected</Badge>
                        )}
                      </div>
                      <Switch checked={exchange.connected} />
                    </div>
                  </CardHeader>
                  {exchange.connected && (
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`${exchange.id}-api-key`}>API Key</Label>
                        <Input
                          id={`${exchange.id}-api-key`}
                          type="password"
                          placeholder="••••••••••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${exchange.id}-api-secret`}>API Secret</Label>
                        <Input
                          id={`${exchange.id}-api-secret`}
                          type="password"
                          placeholder="••••••••••••••••"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Test Connection</Button>
                        <Button size="sm">Save</Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h4>Security Notice</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                API keys are encrypted and stored securely. Never share your API keys.
                Use read-only keys when possible and enable IP whitelisting on your exchange.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Global Risk Limits</CardTitle>
                <CardDescription>
                  Set portfolio-wide risk management rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDailyLoss">Max Daily Loss (%)</Label>
                  <Input
                    id="maxDailyLoss"
                    type="number"
                    defaultValue="5"
                    placeholder="5"
                  />
                  <p className="text-xs text-muted-foreground">
                    Stop all trading if daily loss exceeds this percentage
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPositionSize">Max Position Size (% of portfolio)</Label>
                  <Input
                    id="maxPositionSize"
                    type="number"
                    defaultValue="10"
                    placeholder="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxOpenPositions">Max Open Positions</Label>
                  <Input
                    id="maxOpenPositions"
                    type="number"
                    defaultValue="10"
                    placeholder="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxSlippage">Max Slippage (%)</Label>
                  <Input
                    id="maxSlippage"
                    type="number"
                    defaultValue="0.5"
                    step="0.1"
                    placeholder="0.5"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emergency Stop</Label>
                    <p className="text-sm text-muted-foreground">
                      Close all positions and stop trading
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Stop All Trading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alert Settings</CardTitle>
                <CardDescription>
                  Configure when to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Trade Execution</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify on each trade execution
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profit Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when profit threshold is reached
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Loss Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when loss threshold is reached
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Strategy Activation</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when strategies start/stop
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="profitThreshold">Profit Alert Threshold ($)</Label>
                  <Input
                    id="profitThreshold"
                    type="number"
                    defaultValue="100"
                    placeholder="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lossThreshold">Loss Alert Threshold ($)</Label>
                  <Input
                    id="lossThreshold"
                    type="number"
                    defaultValue="50"
                    placeholder="50"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            <QuickStartGuide />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4">
            <KnowledgeCenter />
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-[#00A6A6] to-[#008E97] p-2">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>SKEET</CardTitle>
                    <CardDescription>Strategic Key Entry & Exit Tactics</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2">Platform Version</h4>
                  <p className="text-sm text-muted-foreground">v1.0.0 (Beta)</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="mb-2">Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>✓ 100+ Exchanges</div>
                    <div>✓ 16 Strategies</div>
                    <div>✓ Paper Trading</div>
                    <div>✓ Live Trading</div>
                    <div>✓ Risk Management</div>
                    <div>✓ Real-time Analytics</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-2">Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Check out the Documentation and Knowledge Center for guides and tutorials.
                  </p>
                </div>

                <div className="p-3 bg-[#00A6A6]/10 border border-[#00A6A6]/20 rounded-lg">
                  <p className="text-sm text-[#008E97]">
                    🐬 Themed with Miami Dolphins colors - Aqua & Orange
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
