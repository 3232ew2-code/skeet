import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { X } from 'lucide-react';

export interface ActiveTrade {
  id: string;
  exchange: string;
  symbol: string;
  side: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  strategy: string;
}

interface ActiveTradesTableProps {
  trades: ActiveTrade[];
  onCloseTrade: (id: string) => void;
}

export function ActiveTradesTable({ trades, onCloseTrade }: ActiveTradesTableProps) {
  return (
    <Card className="border-l-4 border-l-[#FC4C02]">
      <CardHeader>
        <CardTitle>Active Trades</CardTitle>
        <CardDescription>Currently open positions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Exchange</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>P&L</TableHead>
                <TableHead>Strategy</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    No active trades
                  </TableCell>
                </TableRow>
              ) : (
                trades.map((trade) => {
                  const isProfitable = trade.pnl >= 0;
                  return (
                    <TableRow key={trade.id}>
                      <TableCell>{trade.symbol}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{trade.exchange}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={trade.side === 'buy' ? 'default' : 'secondary'}>
                          {trade.side}
                        </Badge>
                      </TableCell>
                      <TableCell>{trade.amount}</TableCell>
                      <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                      <TableCell>${trade.currentPrice.toFixed(2)}</TableCell>
                      <TableCell className={isProfitable ? 'text-[#00A6A6]' : 'text-[#F26522]'}>
                        {isProfitable ? '+' : ''}${trade.pnl.toFixed(2)}
                        <div className="text-xs">
                          ({isProfitable ? '+' : ''}{trade.pnlPercent.toFixed(2)}%)
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {trade.strategy}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onCloseTrade(trade.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
