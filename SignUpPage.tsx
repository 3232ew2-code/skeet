import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AnimatedLogo } from './AnimatedLogo';
import { LoadingSpinner } from './LoadingSpinner';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Mail, Lock, User, Zap, TrendingUp, Shield, DollarSign, BarChart3, Globe } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SignUpPageProps {
  onComplete: () => void;
}

export function SignUpPage({ onComplete }: SignUpPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Welcome to SKEET! 🎉');
    setIsLoading(false);
    onComplete();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Welcome back!');
    setIsLoading(false);
    onComplete();
  };

  const features = [
    { icon: Globe, title: '100+ Exchanges', description: 'Connect to any major exchange' },
    { icon: TrendingUp, title: '16 Strategies', description: 'Pre-built trading algorithms' },
    { icon: Shield, title: 'Risk Management', description: 'Advanced protection tools' },
    { icon: DollarSign, title: 'Paper Trading', description: 'Practice risk-free' },
    { icon: BarChart3, title: 'Analytics', description: 'Real-time performance tracking' },
    { icon: Zap, title: 'Auto Execution', description: 'Fast & reliable trading' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#1e293b] to-[#0a1628]">
        <LoadingSpinner size="lg" message="Setting up your account..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e293b] to-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <motion.div
          className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedLogo size="xl" />
          
          <div className="text-center space-y-4">
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-[#00A6A6] via-[#008E97] to-[#F26522] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              SKEET
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Strategic Key Entry & Exit Tactics
            </motion.p>
            <motion.p
              className="text-sm text-gray-400 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Your complete automated trading solution for crypto, forex, and stock markets
            </motion.p>
          </div>

          {/* Feature Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-gradient-to-br from-[#00A6A6]/10 to-[#F26522]/10 border border-[#00A6A6]/20 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(0, 166, 166, 0.5)' }}
                >
                  <Icon className="h-6 w-6 mx-auto mb-2 text-[#00A6A6]" />
                  <p className="text-xs font-medium text-gray-200">{feature.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right side - Auth Forms */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Mobile Logo */}
          <div className="flex lg:hidden justify-center mb-6">
            <AnimatedLogo size="lg" />
          </div>

          <Card className="border-[#00A6A6]/30 bg-card/50 backdrop-blur">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Zap className="h-5 w-5 text-[#00A6A6]" />
                </motion.div>
                Get Started with SKEET
              </CardTitle>
              <CardDescription>
                Join thousands of traders automating their strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-[#008E97]/10 to-[#F26522]/10">
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00A6A6] data-[state=active]:to-[#008E97] data-[state=active]:text-white"
                  >
                    Sign Up
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signin"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F26522] data-[state=active]:to-[#FC4C02] data-[state=active]:text-white"
                  >
                    Sign In
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#00A6A6]" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-[#00A6A6]/30 focus:border-[#00A6A6]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#00A6A6]" />
                        Email
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[#00A6A6]/30 focus:border-[#00A6A6]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-[#00A6A6]" />
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••���•••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-[#00A6A6]/30 focus:border-[#00A6A6]"
                        required
                      />
                    </div>

                    <div className="bg-gradient-to-br from-[#00A6A6]/10 to-[#F26522]/10 border border-[#00A6A6]/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-[#00A6A6] mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                          Start with <Badge className="bg-[#00A6A6] mx-1">$10,000</Badge> in paper trading funds to practice risk-free
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00A6A6] to-[#008E97] hover:from-[#008E97] hover:to-[#00A6A6]"
                    >
                      Create Account
                    </Button>

                    <Separator />

                    <div className="text-center text-xs text-muted-foreground">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#F26522]" />
                        Email
                      </Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[#F26522]/30 focus:border-[#F26522]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-[#F26522]" />
                        Password
                      </Label>
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-[#F26522]/30 focus:border-[#F26522]"
                        required
                      />
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="text-[#00A6A6] p-0 h-auto text-xs"
                    >
                      Forgot password?
                    </Button>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#F26522] to-[#FC4C02] hover:from-[#FC4C02] hover:to-[#F26522]"
                    >
                      Sign In
                    </Button>

                    <Separator />

                    <div className="bg-gradient-to-br from-[#F26522]/10 to-[#00A6A6]/10 border border-[#F26522]/20 rounded-lg p-3">
                      <p className="text-xs text-center text-muted-foreground">
                        Welcome back! Your bots are ready to trade
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Trust badges */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-[#00A6A6]" />
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-[#F26522]" />
              <span>Instant Setup</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
