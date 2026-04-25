// Statistics.jsx — stat grid page
const StatisticsView = () => (
  <div>
    <div className="flex items-baseline justify-between mb-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold">Statistics</h1>
        <div className="text-[12px] text-zinc-500 mt-1">Year to date · 284 trades · 64,8% win rate</div>
      </div>
      <div className="bg-secondary rounded-lg p-1 flex">
        <span className="tab">Page 1</span>
        <span className="tab active">Page 2</span>
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4 mb-4">
      {[
        { l: "Net P/L", v: "+12.486,40 €", c: "#76b562", sub: "↑ 8,4% vs last month" },
        { l: "Win rate", v: "64,8%", c: "#3d3929", sub: "184W · 100L" },
        { l: "Avg win", v: "+142,30 €", c: "#3d3929", sub: "Median 98,00" },
        { l: "Avg loss", v: "-86,20 €", c: "#3d3929", sub: "Worst -420,00" },
      ].map(s => (
        <div key={s.l} className="bg-white rounded-xl border border-zinc-200 p-4 shadow-md">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">{s.l}</div>
          <div className="text-[28px] font-semibold mt-1 font-mono-display" style={{ color: s.c }}>{s.v}</div>
          <div className="text-[11px] text-zinc-400 mt-1">{s.sub}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-md col-span-2">
        <div className="flex items-baseline justify-between">
          <div className="font-display font-semibold">Equity curve</div>
          <div className="text-[11px] text-zinc-500 font-mono-display">YTD</div>
        </div>
        <svg viewBox="0 0 800 200" className="w-full h-48 mt-4">
          <defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#76b562" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#76b562" stopOpacity="0"/>
          </linearGradient></defs>
          <path d="M0,180 L40,172 L80,176 L120,160 L160,148 L200,155 L240,130 L280,136 L320,110 L360,102 L400,115 L440,82 L480,72 L520,80 L560,48 L600,56 L640,30 L680,36 L720,18 L760,10 L800,6 L800,200 L0,200 Z" fill="url(#eg)"/>
          <path d="M0,180 L40,172 L80,176 L120,160 L160,148 L200,155 L240,130 L280,136 L320,110 L360,102 L400,115 L440,82 L480,72 L520,80 L560,48 L600,56 L640,30 L680,36 L720,18 L760,10 L800,6" fill="none" stroke="#76b562" strokeWidth="2"/>
          {[40,80,120,160].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f4f1ee"/>)}
        </svg>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-md">
        <div className="font-display font-semibold">By strategy</div>
        <div className="mt-4 space-y-3">
          {[
            { n: "Opening Range Breakout", p: 82, v: "+4.120 €", c: "#76b562" },
            { n: "VWAP Reversion", p: 54, v: "+1.860 €", c: "#9999ff" },
            { n: "News Fade", p: 38, v: "-240 €", c: "#e96a5e" },
            { n: "FVG Fill", p: 68, v: "+2.840 €", c: "#fac666" },
          ].map(s => (
            <div key={s.n}>
              <div className="flex justify-between text-[12px]">
                <span>{s.n}</span>
                <span className="font-mono-display" style={{ color: s.c }}>{s.v}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full mt-1.5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: s.p + '%', background: s.c }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#1a1a1a] text-white rounded-xl p-5 col-span-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono-display">Profitability by session</div>
            <div className="text-[22px] font-semibold mt-1">Mornings are your edge.</div>
          </div>
          <div className="text-[11px] text-white/40 font-mono-display">+63% vs afternoon</div>
        </div>
        <div className="grid grid-cols-8 gap-1 mt-6 items-end h-28">
          {[40,55,72,88,95,78,62,30].map((h,i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-full rounded-t" style={{ height: h + '%', background: i<5 ? '#76b562' : '#e96a5e', opacity: 0.7 }}/>
              <span className="text-[9px] text-white/40 font-mono-display">{9+i}:00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
window.StatisticsView = StatisticsView;
