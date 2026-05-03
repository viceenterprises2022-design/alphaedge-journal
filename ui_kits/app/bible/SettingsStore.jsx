// SettingsStore.jsx — user preferences (currency, starting balance) + reset all
const SETTINGS_KEY = 'alphaedge-settings-v1';
const DEFAULT_SETTINGS = { currency: 'EUR', startingBalance: 0, locale: 'de-DE' };

const CURRENCIES = {
  EUR: { symbol: '€', locale: 'de-DE' },
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  INR: { symbol: '₹', locale: 'en-IN' },
};

const readSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch { return DEFAULT_SETTINGS; }
};
const writeSettings = (s) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event('tj-settings-changed'));
};

const useSettings = () => {
  const [s, setS] = React.useState(readSettings);
  React.useEffect(() => {
    const h = () => setS(readSettings());
    window.addEventListener('tj-settings-changed', h);
    return () => window.removeEventListener('tj-settings-changed', h);
  }, []);
  return s;
};
const updateSettings = (patch) => writeSettings({ ...readSettings(), ...patch });

const fmtMoney = (n, opts = {}) => {
  if (n == null || isNaN(n)) return '—';
  const s = readSettings();
  const c = CURRENCIES[s.currency] || CURRENCIES.EUR;
  const sign = opts.signed && n > 0 ? '+' : '';
  const formatted = Math.abs(n).toLocaleString(c.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${sign}${n < 0 ? '-' : ''}${formatted} ${c.symbol}`;
};

const resetAllData = () => {
  ['alphaedge-trades-v1', 'alphaedge-user-strategies-v1', 'alphaedge-journal-v1', SETTINGS_KEY].forEach(k => localStorage.removeItem(k));
  window.dispatchEvent(new Event('tj-trades-changed'));
  window.dispatchEvent(new Event('tj-strategies-changed'));
  window.dispatchEvent(new Event('tj-journal-changed'));
  window.dispatchEvent(new Event('tj-settings-changed'));
};

Object.assign(window, { useSettings, updateSettings, readSettings, fmtMoney, CURRENCIES, resetAllData });
