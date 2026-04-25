// Calendar.jsx — in-app monthly calendar view
const CalendarView = () => {
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = i - 3;
    if (d < 1 || d > 31) return { d: '', empty: true };
    const seed = (d * 13) % 17;
    let type = 'none', pnl = null, trades = 0;
    if (d % 7 === 5 || d % 7 === 6) { return { d, weekend: true }; }
    if (seed < 5) { type = 'buy'; pnl = '+' + (80 + seed * 140).toLocaleString('de-DE'); trades = 1 + (seed % 4); }
    else if (seed < 9) { type = 'sell'; pnl = '-' + (50 + seed * 50).toLocaleString('de-DE'); trades = 1 + (seed % 3); }
    else if (seed < 11) { type = 'zero'; pnl = '0'; trades = 1; }
    return { d, type, pnl, trades };
  });
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold">March 2026</h1>
          <div className="text-[12px] text-zinc-500 mt-1">18 trading days · 14 winners · <span className="text-buy font-mono-display">+8.240,50 €</span> net</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-secondary rounded-lg p-1 flex">
            <span className="tab active">Month</span>
            <span className="tab">Year</span>
          </div>
          <button className="button-shadow-white rounded-md px-3 py-1.5 text-[12px] flex items-center gap-1.5"><ChevronLeft size={14}/></button>
          <button className="button-shadow-white rounded-md px-3 py-1.5 text-[12px]">Today</button>
          <button className="button-shadow-white rounded-md px-3 py-1.5 text-[12px] flex items-center gap-1.5"><ChevronRight size={14}/></button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-7 bg-secondary">
          {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(w => (
            <div key={w} className="text-[10px] uppercase tracking-widest text-zinc-500 py-2 px-3 font-mono-display border-r border-zinc-200 last:border-r-0">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((c, i) => (
            <div key={i} className={`min-h-[96px] border-r border-b border-zinc-100 p-2 flex flex-col ${c.empty ? 'bg-zinc-50/50' : c.weekend ? 'bg-zinc-50' : c.type==='buy' ? 'bg-buyLight' : c.type==='sell' ? 'bg-sellLight' : c.type==='zero' ? 'bg-zinc-100' : ''}`}>
              <span className="text-[11px] text-zinc-500">{c.d}</span>
              {c.pnl && (
                <>
                  <span className="mt-auto text-[12px] font-mono-display font-semibold calendar-banner-shadow inline-block self-start px-2 py-0.5 rounded-full"
                        style={{ background: c.type==='buy'?'rgba(118,181,98,0.4)':c.type==='sell'?'rgba(233,106,94,0.4)':'#e4e4e7' }}>
                    {c.pnl}
                  </span>
                  <span className="text-[10px] text-zinc-500 mt-1">{c.trades} trade{c.trades>1?'s':''}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
window.CalendarView = CalendarView;
