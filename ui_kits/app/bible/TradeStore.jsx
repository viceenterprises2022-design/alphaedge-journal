// TradeStore.jsx — single source of truth for logged trades.
// Persists to localStorage. Exposes a React hook + CRUD helpers.

const TRADE_STORE_KEY = 'alphaedge-trades-v1';

const readTrades = () => {
  try {
    const raw = localStorage.getItem(TRADE_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};
const writeTrades = (list) => {
  localStorage.setItem(TRADE_STORE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('tj-trades-changed'));
};

const useTrades = () => {
  const [trades, setTrades] = React.useState(readTrades);
  React.useEffect(() => {
    const h = () => setTrades(readTrades());
    window.addEventListener('tj-trades-changed', h);
    return () => window.removeEventListener('tj-trades-changed', h);
  }, []);
  return trades;
};

const newTradeId = () => `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;

const computePnL = (t) => {
  const e = parseFloat(t.entry), x = parseFloat(t.exit), q = parseFloat(t.qty);
  if (isNaN(e) || isNaN(x) || isNaN(q)) return null;
  return t.direction === 'BUY' ? (x - e) * q : (e - x) * q;
};

const createTrade = (partial) => {
  const id = partial.id || newTradeId();
  const trade = {
    id,
    direction: partial.direction || 'BUY',
    symbol: partial.symbol || '',
    entry: partial.entry || '',
    exit: partial.exit || '',
    qty: partial.qty || '',
    strategyId: partial.strategyId || null,
    rulesFollowed: partial.rulesFollowed || {},
    mistakes: partial.mistakes || {},
    notes: partial.notes || '',
    learning: partial.learning || '',
    loggedAt: partial.loggedAt || new Date().toISOString(),
  };
  trade.pnl = computePnL(trade);
  writeTrades([trade, ...readTrades()]);
  return trade;
};
const updateTrade = (id, patch) => {
  const next = readTrades().map(t => {
    if (t.id !== id) return t;
    const merged = { ...t, ...patch };
    merged.pnl = computePnL(merged);
    return merged;
  });
  writeTrades(next);
};
const deleteTrade = (id) => {
  writeTrades(readTrades().filter(t => t.id !== id));
};

Object.assign(window, { useTrades, createTrade, updateTrade, deleteTrade, readTrades, computePnL });
