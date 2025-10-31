import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-befc7cdb`;

interface RequestOptions {
  method?: string;
  body?: any;
}

async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', body } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
    },
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data;
}

export const api = {
  // Strategy configuration
  saveStrategyConfig: (config: any) => 
    apiRequest('/strategy/config', { method: 'POST', body: config }),
  
  getStrategyConfig: (strategyId: string) =>
    apiRequest(`/strategy/${strategyId}/config`),
  
  // Exchange connections
  connectExchange: (exchangeId: string, apiKey: string, apiSecret: string) =>
    apiRequest('/exchange/connect', { 
      method: 'POST', 
      body: { exchangeId, apiKey, apiSecret } 
    }),
  
  // Trade execution
  executeTrade: (tradeData: {
    mode: 'paper' | 'live';
    exchange: string;
    symbol: string;
    side: 'buy' | 'sell';
    amount: number;
    price: number;
    strategyId: string;
  }) => apiRequest('/trade/execute', { method: 'POST', body: tradeData }),
  
  closeTrade: (tradeId: string, exitPrice: number) =>
    apiRequest(`/trade/${tradeId}/close`, { method: 'POST', body: { exitPrice } }),
  
  getActiveTrades: () => apiRequest('/trades/active'),
  
  // Performance
  getPerformance: () => apiRequest('/performance'),
  
  // Market signals
  saveSignals: (signals: any[]) =>
    apiRequest('/signals', { method: 'POST', body: { signals } }),
  
  getSignals: () => apiRequest('/signals'),
};
