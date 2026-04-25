// StrategyStore.jsx — single source of truth merging built-in + user-created strategies.
// Persists user strategies in localStorage. Exposes a React hook + event bus.

const STRATEGY_STORE_KEY = 'alphaedge-user-strategies-v1';

const readUserStrategies = () => {
  try {
    const raw = localStorage.getItem(STRATEGY_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};
const writeUserStrategies = (list) => {
  localStorage.setItem(STRATEGY_STORE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('tj-strategies-changed'));
};

const useStrategies = () => {
  const [user, setUser] = React.useState(readUserStrategies);
  React.useEffect(() => {
    const h = () => setUser(readUserStrategies());
    window.addEventListener('tj-strategies-changed', h);
    return () => window.removeEventListener('tj-strategies-changed', h);
  }, []);
  const all = React.useMemo(
    () => [...window.BibleStrategies, ...user.map(u => ({...u, userCreated: true}))],
    [user]
  );
  return { all, user, builtIn: window.BibleStrategies };
};

const createStrategy = (partial) => {
  const id = partial.id || `u-${Date.now().toString(36)}`;
  const next = {
    id,
    name: partial.name || 'Untitled strategy',
    tagline: partial.tagline || '',
    timeframe: partial.timeframe || '5 min',
    when: partial.when || [],
    entry: partial.entry || [],
    exit: partial.exit || [],
    sl: partial.sl || '20 points on premium',
    pros: partial.pros || [],
    cons: partial.cons || [],
    notes: partial.notes || [],
    diagram: null,
    createdAt: new Date().toISOString(),
  };
  writeUserStrategies([...readUserStrategies(), next]);
  return next;
};
const updateStrategy = (id, patch) => {
  writeUserStrategies(readUserStrategies().map(s => s.id === id ? {...s, ...patch} : s));
};
const deleteStrategy = (id) => {
  writeUserStrategies(readUserStrategies().filter(s => s.id !== id));
};

Object.assign(window, { useStrategies, createStrategy, updateStrategy, deleteStrategy, readUserStrategies });
