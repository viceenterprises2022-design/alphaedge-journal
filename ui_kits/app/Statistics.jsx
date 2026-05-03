// Statistics.jsx — computed from real trades
const StatisticsView = () => {
  const trades = window.useTrades();
  const { all: allStrategies } = window.useStrategies();
  const settings = window.useSettings();

  if (trades.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="font-display text-[28px] font-semibold">Statistics</h1>
          <div className="text-[12px] text-zinc-500 mt-1">Insights appear once you've logged trades.</div>
        </div>
        <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-16 text-center">
          <div className="font-display text-[18px] mb-2">Nothing to compute yet</div>
          <div className="text-[13px] text-zinc-500 mb-5">Log a few trades, and we'll surface your edge here.</div>
          <button onClick={()=>window.dispatchEvent(new Event('tj-open-trade-dialog'))} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary inline-flex items-center gap-1.5">
            <Plus size={13}/> Log a trade
          </button>
        </div>
      </div>
    );
  }

  const wins = trades.filter(t => (t.pnl||0) > 0);
  const losses = trades.filter(t => (t.pnl||0) < 0);
  const net = trades.reduce((a,t) => a + (t.pnl||0), 0);
  const winRate = trades.length ? (wins.length / trades.length) * 100 : 0;
  const avgWin = wins.length ? wins.reduce((a,t) => a + t.pnl, 0) / wins.length : 0;
  const avgLoss = losses.length ? losses.reduce((a,t) => a + t.pnl, 0) / losses.length : 0;
  const worst = losses.length ? Math.min(...losses.map(t => t.pnl)) : 0;
  const bestDay = (() => {
    const byDay = {};
    trades.forEach(t => { const d = new Date(t.loggedAt).toDateString(); byDay[d]=(byDay[d]||0)+(t.pnl||0); });
    const entries = Object.entries(byDay);
    if (!entries.length) return null;
    return entries.sort((a,b)=>b[1]-a[1])[0];
  })();

  // Equity curve
  const sorted = [...trades].sort((a,b) => new Date(a.loggedAt) - new Date(b.loggedAt));
  let running = settings.startingBalance || 0;
  const points = sorted.map(t => { running += (t.pnl||0); return running; });
  const minY = Math.min(0, ...points);
  const maxY = Math.max(0, ...points, 1);
  const range = maxY - minY || 1;
  const w = 800, h = 200;
  const path = points.map((p,i) => {
    const x = (i / Math.max(points.length-1, 1)) * w;
    const y = h - ((p - minY) / range) * h;
    return `${i===0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const fillPath = points.length ? `${path} L${w},${h} L0,${h} Z` : '';

  // By strategy
  const byStrat = {};
  trades.forEach(t => {
    const id = t.strategyId || 'none';
    byStrat[id] = byStrat[id] || { id, pnl: 0, count: 0 };
    byStrat[id].pnl += (t.pnl||0); byStrat[id].count += 1;
  });
  const stratList = Object.values(byStrat).map(s => ({
    ...s,
    name: s.id === 'none' ? 'No strategy' : (allStrategies.find(x=>x.id===s.id)?.name || s.id),
  })).sort((a,b)=>Math.abs(b.pnl)-Math.abs(a.pnl));
  const stratMax = Math.max(...stratList.map(s=>Math.abs(s.pnl)), 1);

  // By session (hour)
  const buckets = Array.from({length:8}, ()=>0);
  trades.forEach(t => {
    const h = new Date(t.loggedAt).getHours();
    if (h >= 9 && h <= 16) buckets[h-9] += (t.pnl||0);
  });
  const bucketMax = Math.max(...buckets.map(Math.abs), 1);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold">Statistics</h1>
          <div className="text-[12px] text-zinc-500 mt-1">{trades.length} trade{trades.length!==1?'s':''} · {winRate.toFixed(1)}% win rate</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { l: "Net P/L", v: window.fmtMoney(net,{signed:true}), c: net>=0?'#76b562':'#e96a5e', sub: `${wins.length}W · ${losses.length}L` },
          { l: "Win rate", v: `${winRate.toFixed(1)}%`, c: '#3d3929', sub: `${wins.length} of ${trades.length}` },
          { l: "Avg win", v: window.fmtMoney(avgWin,{signed:true}), c: '#3d3929', sub: wins.length?`${wins.length} winners`:'—' },
          { l: "Avg loss", v: window.fmtMoney(avgLoss,{signed:true}), c: '#3d3929', sub: losses.length?`Worst ${window.fmtMoney(worst,{signed:true})}`:'—' },
        ].map(s => (
          <div key={s.l} className="bg-white rounded-xl border border-zinc-200 p-4 shadow-md">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">{s.l}</div>
            <div className="text-[24px] font-semibold mt-1 font-mono-display" style={{ color: s.c }}>{s.v}</div>
            <div className="text-[11px] text-zinc-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-md col-span-2">
          <div className="flex items-baseline justify-between">
            <div className="font-display font-semibold">Equity curve</div>
            <div className="text-[11px] text-zinc-500 font-mono-display">{trades.length} trades</div>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48 mt-4">
            <defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={net>=0?'#76b562':'#e96a5e'} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={net>=0?'#76b562':'#e96a5e'} stopOpacity="0"/>
            </linearGradient></defs>
            {fillPath && <path d={fillPath} fill="url(#eg)"/>}
            {path && <path d={path} fill="none" stroke={net>=0?'#76b562':'#e96a5e'} strokeWidth="2"/>}
            {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2={w} y2={y} stroke="#f4f1ee"/>)}
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-md">
          <div className="font-display font-semibold">By strategy</div>
          <div className="mt-4 space-y-3">
            {stratList.slice(0, 6).map(s => {
              const c = s.pnl >= 0 ? '#76b562' : '#e96a5e';
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-[12px]">
                    <span className="truncate pr-2">{s.name}</span>
                    <span className="font-mono-display shrink-0" style={{color:c}}>{window.fmtMoney(s.pnl,{signed:true})}</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: (Math.abs(s.pnl)/stratMax)*100 + '%', background: c }}/>
                  </div>
                </div>
              );
            })}
            {stratList.length === 0 && <div className="text-[12px] text-zinc-400 italic">No data</div>}
          </div>
        </div>
        <div className="bg-[#1a1a1a] text-white rounded-xl p-5 col-span-3">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono-display">Profitability by hour</div>
              <div className="text-[22px] font-semibold mt-1">
                {bestDay ? <>Best day: {new Date(bestDay[0]).toLocaleDateString(undefined,{month:'short',day:'numeric'})} · {window.fmtMoney(bestDay[1],{signed:true})}</> : 'Trade timing breakdown'}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 gap-1 mt-6 items-end h-28">
            {buckets.map((v,i) => {
              const pct = (Math.abs(v)/bucketMax)*100;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-full rounded-t" style={{ height: pct + '%', minHeight: v!==0?'4px':'0', background: v>=0 ? '#76b562' : '#e96a5e', opacity: 0.7 }}/>
                  <span className="text-[9px] text-white/40 font-mono-display">{9+i}:00</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
window.StatisticsView = StatisticsView;
