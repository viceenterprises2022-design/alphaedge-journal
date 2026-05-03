// History.jsx — real trades, filter, search, delete, duplicate, edit-mistakes, edit-row
const HistoryView = () => {
  const trades = window.useTrades();
  const { all: allStrategies } = window.useStrategies();
  const [filter, setFilter] = React.useState('all');
  const [strategyFilter, setStrategyFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');

  const stratName = (id) => allStrategies.find(s => s.id === id)?.name || '—';

  const enriched = trades.map(t => ({
    ...t,
    win: (t.pnl || 0) > 0,
    strategyName: stratName(t.strategyId),
    mistakeCount: Object.values(t.mistakes || {}).filter(Boolean).length,
    rulesYes: Object.values(t.rulesFollowed || {}).filter(v => v === true).length,
    rulesNo: Object.values(t.rulesFollowed || {}).filter(v => v === false).length,
  }));

  const filtered = enriched
    .filter(t => filter === 'all' ? true : filter === 'wins' ? t.win : !t.win)
    .filter(t => strategyFilter === 'all' || t.strategyId === strategyFilter)
    .filter(t => !search || (t.symbol||'').toLowerCase().includes(search.toLowerCase()) || (t.id||'').toLowerCase().includes(search.toLowerCase()));

  const winCount = enriched.filter(t => t.win).length;
  const totalPnl = enriched.reduce((a, t) => a + (t.pnl || 0), 0);

  React.useEffect(() => {
    const onSearchEvt = (e) => setSearch(e.detail?.q || '');
    window.addEventListener('tj-global-search', onSearchEvt);
    return () => window.removeEventListener('tj-global-search', onSearchEvt);
  }, []);

  const onDelete = (id) => {
    if (confirm('Delete this trade?')) { window.deleteTrade(id); window.toast('Trade deleted', 'info'); }
  };
  const onDuplicate = (t) => {
    const { id, loggedAt, ...rest } = t;
    window.createTrade({ ...rest, loggedAt: new Date().toISOString() });
    window.toast('Trade duplicated', 'success');
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold">History</h1>
          <div className="text-[12px] text-zinc-500 mt-1">
            {trades.length} trade{trades.length!==1?'s':''} · {winCount} winner{winCount!==1?'s':''} · <span className={`font-mono-display ${totalPnl>=0?'text-buy':'text-sell'}`}>{window.fmtMoney(totalPnl,{signed:true})}</span> realised
          </div>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-12 text-center">
          <div className="font-display text-[18px] mb-2">No trades yet</div>
          <div className="text-[13px] text-zinc-500 mb-5">Log your first trade to start building your edge.</div>
          <button onClick={()=>window.dispatchEvent(new Event('tj-open-trade-dialog'))} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary inline-flex items-center gap-1.5">
            <Plus size={13}/> Log a trade
          </button>
        </div>
      ) : (
      <>
      <div className="bg-white rounded-xl border border-zinc-200 p-2.5 mb-3 flex items-center gap-2">
        <div className="bg-secondary rounded-lg p-1 flex">
          <span onClick={() => setFilter('all')} className={`tab ${filter==='all' ? 'active' : ''}`}>All <span className="font-mono-display text-[10px] text-zinc-400 ml-1">{trades.length}</span></span>
          <span onClick={() => setFilter('wins')} className={`tab ${filter==='wins' ? 'active' : ''}`}>Wins <span className="font-mono-display text-[10px] text-zinc-400 ml-1">{winCount}</span></span>
          <span onClick={() => setFilter('losses')} className={`tab ${filter==='losses' ? 'active' : ''}`}>Losses <span className="font-mono-display text-[10px] text-zinc-400 ml-1">{trades.length - winCount}</span></span>
        </div>
        <div className="relative flex-1 max-w-[280px]">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol or ID…" className="w-full bg-secondary rounded-md pl-8 pr-3 py-1.5 text-[12px] outline-none border border-transparent focus:border-zinc-200"/>
        </div>
        <div className="relative">
          <select value={strategyFilter} onChange={e => setStrategyFilter(e.target.value)} className="bg-secondary rounded-md pl-3 pr-7 py-1.5 text-[12px] outline-none appearance-none">
            <option value="all">All strategies</option>
            {allStrategies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"/>
        </div>
        <div className="ml-auto text-[11px] text-zinc-400 font-mono-display">{filtered.length} of {trades.length}</div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-[110px_60px_1fr_60px_140px_80px_80px_60px_70px_90px_80px] bg-secondary text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display py-2.5 px-3 border-b border-zinc-200">
          <div>Date · Time</div><div>Side</div><div>Symbol</div><div>Qty</div><div>Strategy</div>
          <div className="text-right">Entry</div><div className="text-right">Exit</div>
          <div className="text-center">Rules</div><div className="text-center">Mistakes</div>
          <div className="text-right">P/L</div><div className="text-center">Actions</div>
        </div>
        <div className="max-h-[560px] overflow-y-auto">
          {filtered.map((t, i) => {
            const dt = new Date(t.loggedAt);
            return (
              <div key={t.id} className={`grid grid-cols-[110px_60px_1fr_60px_140px_80px_80px_60px_70px_90px_80px] items-center text-[12px] py-2 px-3 border-b border-zinc-100 hover:bg-secondary/40 ${i%2===1?'bg-zinc-50/30':''}`}>
                <div>
                  <div className="text-[11px] font-mono-display">{dt.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</div>
                  <div className="text-[10px] text-zinc-400 font-mono-display">{dt.toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</div>
                </div>
                <div><span className={`px-1.5 py-0.5 rounded font-semibold text-[10px] font-mono-display ${t.direction==='BUY'?'bg-buyLight text-buy':'bg-sellLight text-sell'}`}>{t.direction}</span></div>
                <div className="truncate pr-2">{t.symbol || <span className="text-zinc-300">—</span>}</div>
                <div className="text-zinc-500 font-mono-display text-[11px]">{t.qty}</div>
                <div className="text-zinc-600 truncate pr-2 text-[11px]">{t.strategyName}</div>
                <div className="text-right font-mono-display text-[11px] text-zinc-500">{t.entry}</div>
                <div className="text-right font-mono-display text-[11px] text-zinc-500">{t.exit}</div>
                <div className="text-center font-mono-display text-[11px]">
                  {(t.rulesYes + t.rulesNo) === 0
                    ? <span className="text-zinc-300">—</span>
                    : <span><span className="text-buy">{t.rulesYes}</span><span className="text-zinc-300">/</span><span className="text-sell">{t.rulesNo}</span></span>}
                </div>
                <div className="text-center">
                  {t.mistakeCount === 0
                    ? <span className="text-zinc-300 text-[11px]">—</span>
                    : <span className="bg-sell/10 text-sell px-1.5 py-0.5 rounded font-mono-display text-[10px]">{t.mistakeCount}</span>}
                </div>
                <div className={`text-right font-mono-display font-semibold ${(t.pnl||0)>=0?'text-buy':'text-sell'}`}>{window.fmtMoney(t.pnl,{signed:true})}</div>
                <div className="flex items-center justify-center gap-1 text-zinc-400">
                  <button onClick={()=>window.dispatchEvent(new CustomEvent('tj-edit-trade',{detail:{id:t.id}}))} title="Edit" className="w-6 h-6 rounded hover:bg-secondary hover:text-claude flex items-center justify-center"><PenLine size={11}/></button>
                  <button onClick={()=>onDuplicate(t)} title="Duplicate" className="w-6 h-6 rounded hover:bg-secondary hover:text-[#3d3929] flex items-center justify-center"><Plus size={11}/></button>
                  <button onClick={()=>onDelete(t.id)} title="Delete" className="w-6 h-6 rounded hover:bg-sell/10 hover:text-sell flex items-center justify-center"><Trash2 size={11}/></button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div className="text-center py-12 text-[12px] text-zinc-400">No trades match these filters.</div>}
        </div>
      </div>
      </>)}
    </div>
  );
};
window.HistoryView = HistoryView;
