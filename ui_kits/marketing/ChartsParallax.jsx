// ChartsParallax.jsx — dark section with eyebrow + sticky title + stacked screenshots
const ChartsParallax = () => (
  <section className="relative gradient text-white py-32 px-6 md:px-16 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <span className="eyebrow bg-white/5 border-white/15 text-white/80">Charts</span>
      <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4 leading-tight tracking-tight">
        Your trading<br/>achievements,<br/><span className="text-zinc-400">all in one place.</span>
      </h2>
      <p className="mt-6 text-white/60 max-w-md text-[14px]">
        The Statistics page turns your trade history into charts using 10+ algorithms — win rate, equity curve, drawdown, session profitability, and more.
      </p>
      {/* faux chart panel */}
      <div className="mt-16 bg-[#1c1a19] rounded-2xl border border-white/10 p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/40 font-mono-display">Cumulative P/L · YTD</div>
            <div className="text-[44px] font-semibold mt-1 font-mono-display">+12.486,40 €</div>
          </div>
          <div className="flex gap-2 text-[11px]">
            {["1W","1M","3M","6M","YTD","1Y"].map(t => (
              <span key={t} className={`px-2.5 py-1 rounded-md border ${t==='YTD' ? 'bg-white/10 border-white/20' : 'border-white/10 text-white/50'}`}>{t}</span>
            ))}
          </div>
        </div>
        {/* mock chart */}
        <svg viewBox="0 0 800 200" className="w-full h-48">
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#76b562" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#76b562" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,160 L40,150 L80,152 L120,140 L160,130 L200,135 L240,118 L280,120 L320,102 L360,96 L400,108 L440,80 L480,72 L520,78 L560,54 L600,60 L640,40 L680,48 L720,30 L760,24 L800,16 L800,200 L0,200 Z" fill="url(#cg)"/>
          <path d="M0,160 L40,150 L80,152 L120,140 L160,130 L200,135 L240,118 L280,120 L320,102 L360,96 L400,108 L440,80 L480,72 L520,78 L560,54 L600,60 L640,40 L680,48 L720,30 L760,24 L800,16" fill="none" stroke="#76b562" strokeWidth="2"/>
          {[0,1,2,3].map(i => <line key={i} x1="0" y1={50+i*40} x2="800" y2={50+i*40} stroke="rgba(255,255,255,0.06)" />)}
        </svg>
        <div className="grid grid-cols-4 gap-6 mt-8 pt-6 border-t border-white/10">
          {[
            { l: "Win rate", v: "64,8%", c: "#76b562" },
            { l: "Avg R:R", v: "1 : 2,4", c: "#9999ff" },
            { l: "Best day", v: "+1.420 €", c: "#fac666" },
            { l: "Max drawdown", v: "-4,8%", c: "#e96a5e" },
          ].map(s => (
            <div key={s.l}>
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono-display">{s.l}</div>
              <div className="text-[22px] font-semibold mt-1 font-mono-display" style={{ color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
window.ChartsParallax = ChartsParallax;
