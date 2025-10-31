import { Activity, Settings, Zap, Bot, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TradingHeaderProps {
  mode: 'paper' | 'live';
  onModeChange: (mode: 'paper' | 'live') => void;
  onSettingsClick: () => void;
  onNavigate?: (tab: string) => void;
}

export function TradingHeader({ mode, onModeChange, onSettingsClick, onNavigate }: TradingHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-[#00A6A6] to-[#008E97] p-1.5">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold bg-gradient-to-r from-[#00A6A6] to-[#008E97] bg-clip-text text-transparent">
              SKEET
            </span>
            <span className="text-[10px] text-muted-foreground hidden sm:block">
              Strategic Key Entry & Exit
            </span>
          </div>
        </div>
        
        <div className="flex-1" />
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button variant="ghost" size="sm" className="gap-2">
                <Bot className="h-4 w-4" />
                Bots
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onNavigate?.('bots')}>
                <Bot className="h-4 w-4 mr-2" />
                Bot Management
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('create')}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Bot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Badge 
            variant={mode === 'live' ? 'destructive' : 'secondary'} 
            className="gap-1 hidden sm:flex"
          >
            <Activity className="h-3 w-3" />
            {mode === 'paper' ? 'Paper Trading' : 'Live Trading'}
          </Badge>
          
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onSettingsClick}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
