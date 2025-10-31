import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { Badge } from './ui/badge';

interface Step {
  title: string;
  description: string;
  completed: boolean;
}

interface GettingStartedCardProps {
  steps: Step[];
  onDismiss: () => void;
}

export function GettingStartedCard({ steps, onDismiss }: GettingStartedCardProps) {
  const completedSteps = steps.filter(s => s.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">Getting Started</CardTitle>
            <CardDescription>Complete these steps to start trading</CardDescription>
          </div>
          <Badge variant="secondary">
            {completedSteps}/{steps.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className={`text-sm ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {step.title}
                </p>
                {!step.completed && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {completedSteps === steps.length && (
          <Button onClick={onDismiss} variant="outline" size="sm" className="w-full">
            Dismiss
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
