-- ==================== BOTS TABLE ====================
-- Main table for storing trading bot configurations

ALTER TABLE bots 
-- Strategy Selection
ADD COLUMN IF NOT EXISTS strategy TEXT DEFAULT 'rsi' CHECK (strategy IN (
  'rsi', 'momentum', 'mean_reversion', 'macd', 'bollinger', 'ema_cross',
  'grid', 'dca', 'arbitrage', 'scalping', 'swing', 'breakout',
  'ichimoku', 'fibonacci', 'volume_profile', 'market_making'
)),

-- Position & Risk Management
ADD COLUMN IF NOT EXISTS max_position_size DECIMAL DEFAULT 1000,
ADD COLUMN IF NOT EXISTS take_profit_percent DECIMAL DEFAULT 10,
ADD COLUMN IF NOT EXISTS trailing_stop_percent DECIMAL DEFAULT 2,
ADD COLUMN IF NOT EXISTS max_daily_trades INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS max_daily_loss DECIMAL DEFAULT 500,

-- RSI Parameters
ADD COLUMN IF NOT EXISTS rsi_period INTEGER DEFAULT 14,
ADD COLUMN IF NOT EXISTS rsi_oversold INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS rsi_overbought INTEGER DEFAULT 70,

-- MACD Parameters
ADD COLUMN IF NOT EXISTS macd_fast INTEGER DEFAULT 12,
ADD COLUMN IF NOT EXISTS macd_slow INTEGER DEFAULT 26,
ADD COLUMN IF NOT EXISTS macd_signal INTEGER DEFAULT 9,

-- Moving Average Parameters
ADD COLUMN IF NOT EXISTS ma_short_period INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS ma_long_period INTEGER DEFAULT 30,

-- Bollinger Bands Parameters
ADD COLUMN IF NOT EXISTS bb_period INTEGER DEFAULT 20,
ADD COLUMN IF NOT EXISTS bb_std_dev DECIMAL DEFAULT 2,

-- EMA Parameters
ADD COLUMN IF NOT EXISTS ema_fast INTEGER DEFAULT 12,
ADD COLUMN IF NOT EXISTS ema_slow INTEGER DEFAULT 26,

-- Grid Trading Parameters
ADD COLUMN IF NOT EXISTS grid_levels INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS grid_spacing_percent DECIMAL DEFAULT 1,
ADD COLUMN IF NOT EXISTS grid_upper_price DECIMAL DEFAULT 0,
ADD COLUMN IF NOT EXISTS grid_lower_price DECIMAL DEFAULT 0,

-- DCA Parameters
ADD COLUMN IF NOT EXISTS dca_interval_hours INTEGER DEFAULT 24,
ADD COLUMN IF NOT EXISTS dca_amount DECIMAL DEFAULT 50,
ADD COLUMN IF NOT EXISTS dca_price_drop_percent DECIMAL DEFAULT 5,

-- Arbitrage Parameters
ADD COLUMN IF NOT EXISTS arb_min_profit_percent DECIMAL DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS arb_exchanges TEXT[] DEFAULT ARRAY['binance', 'coinbase', 'kraken'],

-- Scalping Parameters
ADD COLUMN IF NOT EXISTS scalp_profit_target DECIMAL DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS scalp_max_hold_time INTEGER DEFAULT 300,

-- Volume & Momentum
ADD COLUMN IF NOT EXISTS volume_threshold DECIMAL DEFAULT 1.5,
ADD COLUMN IF NOT EXISTS momentum_period INTEGER DEFAULT 14,

-- Ichimoku Parameters
ADD COLUMN IF NOT EXISTS ichimoku_conversion INTEGER DEFAULT 9,
ADD COLUMN IF NOT EXISTS ichimoku_base INTEGER DEFAULT 26,
ADD COLUMN IF NOT EXISTS ichimoku_span_b INTEGER DEFAULT 52,

-- Market Making Parameters
ADD COLUMN IF NOT EXISTS spread_percent DECIMAL DEFAULT 0.2,
ADD COLUMN IF NOT EXISTS order_refresh_time INTEGER DEFAULT 60;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_bots_active ON bots(active);
CREATE INDEX IF NOT EXISTS idx_bots_strategy ON bots(strategy);
CREATE INDEX IF NOT EXISTS idx_bots_user_id ON bots(user_id);

-- ==================== TRADES TABLE ====================
-- Enhanced trades table to store strategy indicators

ALTER TABLE trades
ADD COLUMN IF NOT EXISTS strategy_signal TEXT,
ADD COLUMN IF NOT EXISTS indicators JSONB;

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_trades_bot_id ON trades(bot_id);
CREATE INDEX IF NOT EXISTS idx_trades_created_at ON trades(created_at);
CREATE INDEX IF NOT EXISTS idx_trades_bot_created ON trades(bot_id, created_at);

-- ==================== API KEYS TABLE ====================
-- Secure storage for exchange API credentials

CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exchange TEXT NOT NULL,
  encrypted_api_key TEXT NOT NULL,
  encrypted_secret TEXT NOT NULL,
  encrypted_passphrase TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_exchange ON api_keys(exchange);

-- RLS Policies
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own API keys"
  ON api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own API keys"
  ON api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys"
  ON api_keys FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys"
  ON api_keys FOR DELETE
  USING (auth.uid() = user_id);

-- ==================== LOGS TABLE ====================
-- Logging table for bot activities

CREATE TABLE IF NOT EXISTS logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error')),
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_logs_bot_id ON logs(bot_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at);
CREATE INDEX IF NOT EXISTS idx_logs_level ON logs(level);

-- RLS Policies
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view logs for their bots"
  ON logs FOR SELECT
  USING (
    bot_id IN (
      SELECT id FROM bots WHERE user_id = auth.uid()
    )
  );

-- ==================== BOT PERFORMANCE TABLE ====================
-- Track bot performance metrics

CREATE TABLE IF NOT EXISTS bot_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_id UUID REFERENCES bots(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  total_trades INTEGER DEFAULT 0,
  winning_trades INTEGER DEFAULT 0,
  losing_trades INTEGER DEFAULT 0,
  total_pnl DECIMAL DEFAULT 0,
  total_fees DECIMAL DEFAULT 0,
  win_rate DECIMAL,
  avg_win DECIMAL,
  avg_loss DECIMAL,
  sharpe_ratio DECIMAL,
  max_drawdown DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bot_id, date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bot_performance_bot_id ON bot_performance(bot_id);
CREATE INDEX IF NOT EXISTS idx_bot_performance_date ON bot_performance(date);

-- RLS Policies
ALTER TABLE bot_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view performance for their bots"
  ON bot_performance FOR SELECT
  USING (
    bot_id IN (
      SELECT id FROM bots WHERE user_id = auth.uid()
    )
  );

-- ==================== FUNCTIONS ====================

-- Function to calculate daily bot performance
CREATE OR REPLACE FUNCTION calculate_bot_performance(p_bot_id UUID, p_date DATE)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  v_total_trades INTEGER;
  v_winning_trades INTEGER;
  v_losing_trades INTEGER;
  v_total_pnl DECIMAL;
  v_total_fees DECIMAL;
  v_win_rate DECIMAL;
  v_avg_win DECIMAL;
  v_avg_loss DECIMAL;
BEGIN
  -- Get trade stats for the day
  SELECT 
    COUNT(*),
    COUNT(*) FILTER (WHERE pnl > 0),
    COUNT(*) FILTER (WHERE pnl < 0),
    COALESCE(SUM(pnl), 0),
    COALESCE(SUM(fee), 0)
  INTO 
    v_total_trades,
    v_winning_trades,
    v_losing_trades,
    v_total_pnl,
    v_total_fees
  FROM trades
  WHERE bot_id = p_bot_id
    AND DATE(created_at) = p_date;

  -- Calculate win rate
  IF v_total_trades > 0 THEN
    v_win_rate := (v_winning_trades::DECIMAL / v_total_trades) * 100;
  ELSE
    v_win_rate := 0;
  END IF;

  -- Calculate average win
  SELECT AVG(pnl) INTO v_avg_win
  FROM trades
  WHERE bot_id = p_bot_id
    AND DATE(created_at) = p_date
    AND pnl > 0;

  -- Calculate average loss
  SELECT AVG(pnl) INTO v_avg_loss
  FROM trades
  WHERE bot_id = p_bot_id
    AND DATE(created_at) = p_date
    AND pnl < 0;

  -- Insert or update performance record
  INSERT INTO bot_performance (
    bot_id, date, total_trades, winning_trades, losing_trades,
    total_pnl, total_fees, win_rate, avg_win, avg_loss
  )
  VALUES (
    p_bot_id, p_date, v_total_trades, v_winning_trades, v_losing_trades,
    v_total_pnl, v_total_fees, v_win_rate, v_avg_win, v_avg_loss
  )
  ON CONFLICT (bot_id, date)
  DO UPDATE SET
    total_trades = EXCLUDED.total_trades,
    winning_trades = EXCLUDED.winning_trades,
    losing_trades = EXCLUDED.losing_trades,
    total_pnl = EXCLUDED.total_pnl,
    total_fees = EXCLUDED.total_fees,
    win_rate = EXCLUDED.win_rate,
    avg_win = EXCLUDED.avg_win,
    avg_loss = EXCLUDED.avg_loss;
END;
$$;

-- Trigger to update performance after trade
CREATE OR REPLACE FUNCTION update_performance_on_trade()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM calculate_bot_performance(NEW.bot_id, DATE(NEW.created_at));
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_performance
AFTER INSERT ON trades
FOR EACH ROW
EXECUTE FUNCTION update_performance_on_trade();

-- ==================== VIEWS ====================

-- View for bot summary statistics
CREATE OR REPLACE VIEW bot_summary AS
SELECT 
  b.id,
  b.name,
  b.exchange,
  b.symbol,
  b.strategy,
  b.mode,
  b.active,
  COUNT(t.id) as total_trades,
  COUNT(t.id) FILTER (WHERE t.pnl > 0) as winning_trades,
  COUNT(t.id) FILTER (WHERE t.pnl < 0) as losing_trades,
  COALESCE(SUM(t.pnl), 0) as total_pnl,
  COALESCE(SUM(t.fee), 0) as total_fees,
  CASE 
    WHEN COUNT(t.id) > 0 
    THEN (COUNT(t.id) FILTER (WHERE t.pnl > 0)::DECIMAL / COUNT(t.id)) * 100
    ELSE 0 
  END as win_rate
FROM bots b
LEFT JOIN trades t ON b.id = t.bot_id
GROUP BY b.id, b.name, b.exchange, b.symbol, b.strategy, b.mode, b.active;

-- ==================== COMMENTS ====================

COMMENT ON TABLE bots IS 'Trading bot configurations with all strategy parameters';
COMMENT ON TABLE trades IS 'Individual trades executed by bots';
COMMENT ON TABLE api_keys IS 'Encrypted exchange API credentials';
COMMENT ON TABLE logs IS 'Bot activity and error logs';
COMMENT ON TABLE bot_performance IS 'Daily performance metrics for each bot';
COMMENT ON VIEW bot_summary IS 'Aggregated statistics for each bot';

-- ==================== SAMPLE DATA ====================

-- Example bot configuration (optional - remove in production)
/*
INSERT INTO bots (
  name, exchange, symbol, mode, strategy,
  position_size, stop_loss_percent, take_profit_percent,
  rsi_period, rsi_oversold, rsi_overbought,
  max_daily_trades, max_daily_loss
) VALUES (
  'BTC RSI Bot',
  'binance',
  'BTC/USDT',
  'paper',
  'rsi',
  100,
  5,
  10,
  14,
  30,
  70,
  10,
  500
);
*/