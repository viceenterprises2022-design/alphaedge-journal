// Calendar.jsx — month view fed from real trades.
// Click a day → drill-down panel with its trades.

const CalendarView = () => {
  const trades = window.useTrades();
  const [cursor, setCursor] = React.useState(() => {
    const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = React.useState(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon-first
  const daysInMonth = lastDay.getDate();

  // Group trades by ISO date string
  const byDay = React.useMemo(() => {
    const map = {};
    trades.forEach(t => {
      const d = new Date(t.loggedAt);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      (map[key] = map[key] || []).push(t);
    });
    return map;
  }, [trades]);

  const monthTrades = trades.filter(t => {
    const d = new Date(t.loggedAt);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  const monthPnl = monthTrades.reduce((a, t) => a + (t.pnl || 0), 0);
  const winners = monthTrades.filter(t => (t.pnl || 0) > 0).length;
  const tradingDays = new Set(monthTrades.map(t => new Date(t.loggedAt).getDate())).size;

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push({ empty: true });
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${month}-${d}`;
    const list = byDay[key] || [];
    const pnl = list.reduce((a, t) => a + (t.pnl || 0), 0);
    const dow = new Date(year, month, d).getDay();
    const weekend = dow === 0 || dow === 6;
    let type = 'none';
    if (list.length > 0) type = pnl > 0 ? 'buy' : pnl < 0 ? 'sell' : 'zero';
    cells.push({ d, list, pnl, type, weekend, key });
  }
  while (cells.length % 7 !== 0) cells.push({ empty: true });

  const monthLabel = cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  const selected = selectedDay ? byDay[selectedDay] || [] : null;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold capitalize">{monthLabel}</h1>
          <div className="text-[12px] text-zinc-500 mt-1">
            {monthTrades.length === 0
              ? <span className="italic">No trades logged this month yet — hit ⌘K to log one.</span>
              : <>{tradingDays} trading day{tradingDays!==1?'s':''} · {winners} winner{winners!==1?'s':''} · <span className={`font-mono-display ${monthPnl>=0?'text-buy':'text-sell'}`}>{window.fmtMoney(monthPnl, {signed:true})}</span> net</>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setCursor(new Date(year, month-1, 1))} className="button-shadow-white rounded-md px-3 py-1.5 text-[12px] flex items-center gap-1.5"><ChevronLeft size={14}/></button>
          <button onClick={()=>setCursor(new Date(new Date().getFullYear(), new Date().getMonth(), 1))} className="button-shadow-white rounded-md px-3 py-1.5 text-[12px]">Today</button>
          <button onClick={()=>setCursor(new Date(year, month+1, 1))} className="button-shadow-white rounded-md px-3 py-1.5 text-[12px] flex items-center gap-1.5"><ChevronRight size={14}/></button>
        </div>
      </div>

      <div className={`grid gap-4 ${selected ? 'grid-cols-[1fr_320px]' : 'grid-cols-1'}`}>
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
          <div className="grid grid-cols-7 bg-secondary">
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(w => (
              <div key={w} className="text-[10px] uppercase tracking-widest text-zinc-500 py-2 px-3 font-mono-display border-r border-zinc-200 last:border-r-0">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((c, i) => (
              <div key={i}
                onClick={() => !c.empty && c.list && c.list.length > 0 && setSelectedDay(selectedDay === c.key ? null : c.key)}
                className={`min-h-[96px] border-r border-b border-zinc-100 p-2 flex flex-col ${c.empty ? 'bg-zinc-50/50' : c.weekend ? 'bg-zinc-50' : c.type==='buy' ? 'bg-buyLight cursor-pointer' : c.type==='sell' ? 'bg-sellLight cursor-pointer' : c.type==='zero' ? 'bg-zinc-100 cursor-pointer' : ''} ${selectedDay === c.key ? 'ring-2 ring-claude/60 ring-inset' : ''}`}>
                {!c.empty && <span className="text-[11px] text-zinc-500">{c.d}</span>}
                {c.list && c.list.length > 0 && (
                  <>
                    <span className="mt-auto text-[12px] font-mono-display font-semibold calendar-banner-shadow inline-block self-start px-2 py-0.5 rounded-full"
                          style={{ background: c.type==='buy'?'rgba(118,181,98,0.4)':c.type==='sell'?'rgba(233,106,94,0.4)':'#e4e4e7' }}>
                      {window.fmtMoney(c.pnl, {signed:true}).replace(/\s.*/,'')}
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1">{c.list.length} trade{c.list.length>1?'s':''}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {selected && (
          <div className="bg-white rounded-xl border border-zinc-200 p-4 self-start">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display">Day detail</div>
                <div className="font-display font-semibold text-[15px]">{new Date(year, month, parseInt(selectedDay.split('-')[2])).toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'})}</div>
              </div>
              <button onClick={()=>setSelectedDay(null)} className="text-zinc-400 hover:text-[#3d3929]"><X size={14}/></button>
            </div>
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {selected.map(t => (
                <div key={t.id} onClick={()=>window.dispatchEvent(new CustomEvent('tj-edit-trade',{detail:{id:t.id}}))}
                  className="border border-zinc-100 rounded-md p-2.5 hover:border-claude/40 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-1.5 py-0.5 rounded font-semibold text-[10px] font-mono-display ${t.direction==='BUY'?'bg-buyLight text-buy':'bg-sellLight text-sell'}`}>{t.direction}</span>
                    <span className={`text-[12px] font-mono-display font-semibold ${(t.pnl||0)>=0?'text-buy':'text-sell'}`}>{window.fmtMoney(t.pnl,{signed:true})}</span>
                  </div>
                  <div className="text-[12px]">{t.symbol}</div>
                  <div className="text-[10px] text-zinc-400 font-mono-display">{new Date(t.loggedAt).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}{t.strategyId && ` · ${(window.useStrategiesSnapshot && window.useStrategiesSnapshot(t.strategyId)) || ''}`}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
window.CalendarView = CalendarView;
