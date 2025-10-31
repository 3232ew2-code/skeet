import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Play, RefreshCw, Book, BookOpen } from 'lucide-react';

interface QuickActionsProps {
  onSimulateTrade: () => void;
  onRefreshData: () => void;
  onNavigate?: (tab: string) => void;
}

export function QuickActions({ onSimulateTrade, onRefreshData, onNavigate }: QuickActionsProps) {
  return (
    <Card className="border-l-4 border-l-[#008E97]">
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
        <CardDescription>Test the platform features</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button onClick={onSimulateTrade} size="sm" variant="outline">
          <Play className="h-4 w-4 mr-2" />
          Simulate Trade
        </Button>
        <Button onClick={onRefreshData} size="sm" variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
        {onNavigate && (
          <>
            <Button onClick={() => onNavigate('docs')} size="sm" variant="outline">
              <Book className="h-4 w-4 mr-2" />
              Docs
            </Button>
            <Button onClick={() => onNavigate('knowledge')} size="sm" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
