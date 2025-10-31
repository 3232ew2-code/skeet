-- ==================== API KEYS TABLE UPDATES ====================

-- Add new columns to existing api_keys table
ALTER TABLE api_keys
ADD COLUMN IF NOT EXISTS label TEXT,
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{"read": true, "trade": true, "withdraw": false}'::jsonb,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS last_tested_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_used_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS test_results JSONB;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_api_keys_user_exchange ON api_keys(user_id, exchange);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_api_keys_last_tested ON api_keys(last_tested_at);

-- Add comments for documentation
COMMENT ON COLUMN api_keys.label IS 'User-friendly name for the API key';
COMMENT ON COLUMN api_keys.permissions IS 'JSON object with read, trade, and withdraw permissions';
COMMENT ON COLUMN api_keys.is_active IS 'Whether this API key is currently active/enabled';
COMMENT ON COLUMN api_keys.last_tested_at IS 'Last time the API key connection was successfully tested';
COMMENT ON COLUMN api_keys.last_used_at IS 'Last time this API key was used for trading';
COMMENT ON COLUMN api_keys.test_results IS 'Results from the most recent connection test';

-- Create function to update last_used_at automatically
CREATE OR REPLACE FUNCTION update_api_key_last_used()
RETURNS TRIGGER AS $$
BEGIN
  -- Update last_used_at when a trade is made with this API key
  UPDATE api_keys 
  SET last_used_at = NOW()
  WHERE id = (
    SELECT api_key_id 
    FROM bots 
    WHERE id = NEW.bot_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to track API key usage
DROP TRIGGER IF EXISTS trigger_update_api_key_usage ON trades;
CREATE TRIGGER trigger_update_api_key_usage
AFTER INSERT ON trades
FOR EACH ROW
EXECUTE FUNCTION update_api_key_last_used();

-- Add constraint to ensure at least read permission is enabled
ALTER TABLE api_keys
ADD CONSTRAINT check_permissions_valid 
CHECK (
  (permissions->>'read')::boolean = true OR 
  (permissions->>'trade')::boolean = true
);

-- Create view for API key statistics
CREATE OR REPLACE VIEW api_key_stats AS
SELECT 
  ak.id,
  ak.user_id,
  ak.exchange,
  ak.label,
  ak.is_active,
  ak.created_at,
  ak.last_tested_at,
  ak.last_used_at,
  COUNT(DISTINCT b.id) as active_bots,
  COUNT(t.id) as total_trades,
  COALESCE(SUM(t.pnl), 0) as total_pnl
FROM api_keys ak
LEFT JOIN bots b ON b.api_key_id = ak.id AND b.active = true
LEFT JOIN trades t ON t.bot_id = b.id
GROUP BY ak.id, ak.user_id, ak.exchange, ak.label, ak.is_active, ak.created_at, ak.last_tested_at, ak.last_used_at;

COMMENT ON VIEW api_key_stats IS 'Statistics for each API key including bot count and trading performance';

-- RLS policies remain the same but let's ensure they're comprehensive
DROP POLICY IF EXISTS "Users can view own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can insert own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can update own API keys" ON api_keys;
DROP POLICY IF EXISTS "Users can delete own API keys" ON api_keys;

CREATE POLICY "Users can view own API keys"
  ON api_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own API keys"
  ON api_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys"
  ON api_keys FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys"
  ON api_keys FOR DELETE
  USING (auth.uid() = user_id);

-- Add RLS policy for the view
ALTER VIEW api_key_stats SET (security_invoker = true);

-- ==================== SAMPLE DATA (for testing) ====================
-- Uncomment to insert test data

/*
INSERT INTO api_keys (
  user_id,
  exchange,
  encrypted_api_key,
  encrypted_secret,
  label,
  permissions,
  is_active
) VALUES (
  auth.uid(),
  'binance',
  'test_encrypted_key_12345', -- This should be properly encrypted in production
  'test_encrypted_secret_67890', -- This should be properly encrypted in production
  'My Binance Trading Account',
  '{"read": true, "trade": true, "withdraw": false}'::jsonb,
  true
) ON CONFLICT DO NOTHING;
*/