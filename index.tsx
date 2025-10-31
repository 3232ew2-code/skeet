import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-befc7cdb/health", (c) => {
  return c.json({ status: "ok" });
});

// Store strategy configuration
app.post("/make-server-befc7cdb/strategy/config", async (c) => {
  try {
    const body = await c.req.json();
    const { strategyId, ...config } = body;
    
    await kv.set(`strategy:${strategyId}:config`, config);
    
    return c.json({ success: true, message: "Strategy configured" });
  } catch (error) {
    console.log("Error configuring strategy:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get strategy configuration
app.get("/make-server-befc7cdb/strategy/:id/config", async (c) => {
  try {
    const strategyId = c.req.param("id");
    const config = await kv.get(`strategy:${strategyId}:config`);
    
    return c.json({ success: true, config });
  } catch (error) {
    console.log("Error getting strategy config:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Store exchange API keys (encrypted in real implementation)
app.post("/make-server-befc7cdb/exchange/connect", async (c) => {
  try {
    const body = await c.req.json();
    const { exchangeId, apiKey, apiSecret } = body;
    
    // In production, encrypt these values
    await kv.set(`exchange:${exchangeId}:credentials`, {
      apiKey,
      apiSecret,
      connected: true,
      connectedAt: new Date().toISOString(),
    });
    
    return c.json({ success: true, message: "Exchange connected" });
  } catch (error) {
    console.log("Error connecting exchange:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Execute trade (paper or live)
app.post("/make-server-befc7cdb/trade/execute", async (c) => {
  try {
    const body = await c.req.json();
    const { mode, exchange, symbol, side, amount, price, strategyId } = body;
    
    // Generate trade ID
    const tradeId = `trade:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;
    
    // Store trade
    const trade = {
      id: tradeId,
      mode,
      exchange,
      symbol,
      side,
      amount,
      entryPrice: price,
      currentPrice: price,
      strategyId,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(tradeId, trade);
    
    // Update trade list
    const trades = await kv.get("trades:active") || [];
    trades.push(tradeId);
    await kv.set("trades:active", trades);
    
    return c.json({ success: true, trade });
  } catch (error) {
    console.log("Error executing trade:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Close trade
app.post("/make-server-befc7cdb/trade/:id/close", async (c) => {
  try {
    const tradeId = c.req.param("id");
    const body = await c.req.json();
    const { exitPrice } = body;
    
    const trade = await kv.get(tradeId);
    if (!trade) {
      return c.json({ success: false, error: "Trade not found" }, 404);
    }
    
    // Update trade status
    trade.status = "closed";
    trade.exitPrice = exitPrice;
    trade.closedAt = new Date().toISOString();
    
    // Calculate P&L
    const pnl = trade.side === "buy"
      ? (exitPrice - trade.entryPrice) * trade.amount
      : (trade.entryPrice - exitPrice) * trade.amount;
    
    trade.pnl = pnl;
    trade.pnlPercent = (pnl / (trade.entryPrice * trade.amount)) * 100;
    
    await kv.set(tradeId, trade);
    
    // Remove from active trades
    const activeTrades = await kv.get("trades:active") || [];
    const updatedTrades = activeTrades.filter((id: string) => id !== tradeId);
    await kv.set("trades:active", updatedTrades);
    
    // Add to closed trades
    const closedTrades = await kv.get("trades:closed") || [];
    closedTrades.push(tradeId);
    await kv.set("trades:closed", closedTrades);
    
    return c.json({ success: true, trade });
  } catch (error) {
    console.log("Error closing trade:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get active trades
app.get("/make-server-befc7cdb/trades/active", async (c) => {
  try {
    const tradeIds = await kv.get("trades:active") || [];
    const trades = await Promise.all(
      tradeIds.map((id: string) => kv.get(id))
    );
    
    return c.json({ success: true, trades: trades.filter(Boolean) });
  } catch (error) {
    console.log("Error getting active trades:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get performance data
app.get("/make-server-befc7cdb/performance", async (c) => {
  try {
    const closedTradeIds = await kv.get("trades:closed") || [];
    const closedTrades = await Promise.all(
      closedTradeIds.map((id: string) => kv.get(id))
    );
    
    const validTrades = closedTrades.filter(Boolean);
    
    const totalPnL = validTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    const winningTrades = validTrades.filter(trade => trade.pnl > 0).length;
    const winRate = validTrades.length > 0 ? (winningTrades / validTrades.length) * 100 : 0;
    
    return c.json({
      success: true,
      performance: {
        totalPnL,
        totalTrades: validTrades.length,
        winRate,
        winningTrades,
        losingTrades: validTrades.length - winningTrades,
      },
    });
  } catch (error) {
    console.log("Error getting performance data:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Store market signals
app.post("/make-server-befc7cdb/signals", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("market:signals", body.signals);
    
    return c.json({ success: true });
  } catch (error) {
    console.log("Error storing signals:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get market signals
app.get("/make-server-befc7cdb/signals", async (c) => {
  try {
    const signals = await kv.get("market:signals") || [];
    return c.json({ success: true, signals });
  } catch (error) {
    console.log("Error getting signals:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);