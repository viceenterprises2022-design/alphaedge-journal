// CalendarSection.jsx — visual calendar hero with fake month grid
const CalendarSection = () => {
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = i - 2; // start offset
    if (d < 1 || d > 30) return { d: '', type: 'empty' };
    const seed = (d * 7) % 11;
    if (seed < 4) return { d, type: 'buy', pnl: '+' + (60 + seed * 85) };
    if (seed < 7) return { d, type: 'sell', pnl: '-' + (40 + seed * 30) };
    if (seed < 9) return { d, type: 'zero', pnl: '0' };
    return { d, type: 'none' };
  });
  return (
    <section className="py-24 px-6 md:px-16 bg-secondary">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
          <span className="eyebrow">Calendar</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight tracking-tight">
            Visual Calendar.<br/>Simple. Powerful.
          </h2>
          <p className="text-[14px] text-zinc-500 mt-6 max-w-md leading-relaxed">
            See your trading year at a glance. Every winning day is green, every losing day is red.
            Click any day to jump into the full trade list and your journal entry.
          </p>
          <div className="mt-8 flex gap-6 text-[12px]">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-buyLight"></span>Winning day</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-sellLight"></span>Losing day</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-zinc-200"></span>Break-even</span>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-md">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="font-display font-semibold text-[15px]">March 2026</div>
              <div className="flex gap-1">
                <div className="w-7 h-7 rounded-md border border-zinc-200 flex items-center justify-center"><ChevronLeft size={14}/></div>
                <div className="w-7 h-7 rounded-md border border-zinc-200 flex items-center justify-center"><ChevronRight size={14}/></div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-[2px]">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(w => (
                <div key={w} className="text-[10px] text-zinc-400 text-center py-1 font-mono-display uppercase">{w}</div>
              ))}
              {days.map((c, i) => (
                <div key={i} className={`aspect-[1.3/1] rounded-md border-[0.5px] border-zinc-200 p-1.5 flex flex-col items-center ${c.type==='buy'?'bg-buyLight':c.type==='sell'?'bg-sellLight':c.type==='zero'?'bg-zinc-100':''}`}>
                  <span className="text-[10px] text-zinc-600">{c.d}</span>
                  {c.pnl && (
                    <span className="mt-auto text-[9px] font-mono-display px-1.5 py-0.5 rounded-full" style={{ background: c.type==='buy'?'rgba(118,181,98,0.4)':c.type==='sell'?'rgba(233,106,94,0.4)':'#e4e4e7' }}>{c.pnl}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.CalendarSection = CalendarSection;
