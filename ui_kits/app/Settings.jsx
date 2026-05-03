// Settings.jsx — currency, starting balance, reset all data
const SettingsView = () => {
  const s = window.useSettings();
  const trades = window.useTrades();
  const journal = window.useJournal();
  const { user: userStrats } = window.useStrategies();

  const [balance, setBalance] = React.useState(String(s.startingBalance || 0));
  React.useEffect(() => setBalance(String(s.startingBalance || 0)), [s.startingBalance]);

  const onCurrency = (code) => { window.updateSettings({ currency: code, locale: window.CURRENCIES[code].locale }); window.toast(`Currency set to ${code}`,'success'); };
  const onSaveBalance = () => {
    const n = parseFloat(balance) || 0;
    window.updateSettings({ startingBalance: n }); window.toast('Starting balance saved','success');
  };
  const onReset = () => {
    if (!confirm('This will delete ALL trades, journal entries, your custom strategies, and settings. Continue?')) return;
    window.resetAllData(); window.toast('All data cleared','info');
  };
  const onExport = () => {
    const blob = new Blob([JSON.stringify({ trades, journal, userStrategies: userStrats, settings: s }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `alphaedge-export-${new Date().toISOString().slice(0,10)}.json`; a.click();
    URL.revokeObjectURL(url); window.toast('Exported','success');
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-[28px] font-semibold">Settings</h1>
        <div className="text-[12px] text-zinc-500 mt-1">Preferences and data management.</div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-4">Currency</div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(window.CURRENCIES).map(([code, {symbol, locale}]) => (
            <button key={code} onClick={()=>onCurrency(code)}
              className={`rounded-lg border p-3 text-left transition ${s.currency===code ? 'border-claude bg-claude/5' : 'border-zinc-200 hover:border-zinc-300'}`}>
              <div className="text-[20px] font-mono-display">{symbol}</div>
              <div className="text-[12px] mt-1">{code}</div>
              <div className="text-[10px] text-zinc-400 font-mono-display">{locale}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-4">Starting balance</div>
        <div className="text-[12px] text-zinc-500 mb-3">Used as the baseline for the equity curve.</div>
        <div className="flex items-center gap-2">
          <input value={balance} onChange={e=>setBalance(e.target.value)} placeholder="0.00"
            className="flex-1 bg-secondary rounded-md px-3 py-2 text-[14px] outline-none font-mono-display border border-transparent focus:border-zinc-200"/>
          <span className="font-mono-display text-zinc-400">{(window.CURRENCIES[s.currency]||{}).symbol}</span>
          <button onClick={onSaveBalance} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary">Save</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-4">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-4">Data</div>
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div className="bg-secondary/50 rounded-md p-3">
            <div className="text-[20px] font-display font-semibold">{trades.length}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-display">Trades</div>
          </div>
          <div className="bg-secondary/50 rounded-md p-3">
            <div className="text-[20px] font-display font-semibold">{journal.length}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-display">Entries</div>
          </div>
          <div className="bg-secondary/50 rounded-md p-3">
            <div className="text-[20px] font-display font-semibold">{userStrats.length}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono-display">Custom strategies</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onExport} className="button-shadow-white rounded-md px-3 py-1.5 text-[12px] flex items-center gap-1.5"><FileText size={12}/> Export JSON</button>
          <button onClick={onReset} className="rounded-md px-3 py-1.5 text-[12px] bg-sell/10 text-sell hover:bg-sell hover:text-white border border-sell/20 flex items-center gap-1.5"><Trash2 size={12}/> Reset all data</button>
        </div>
      </div>

      <div className="text-[11px] text-zinc-400 text-center mt-8">All data stored locally in your browser. Nothing leaves this device.</div>
    </div>
  );
};
window.SettingsView = SettingsView;
