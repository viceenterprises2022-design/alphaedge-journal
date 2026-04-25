// Strategies.jsx — rule-based strategy with priority chips (matches StrategyRules.tsx)
const priorityStyle = {
  high: { bg: '#fff1f2', fg: '#e11d48', dot: '#f43f5e' },
  medium: { bg: '#fffbeb', fg: '#d97706', dot: '#f59e0b' },
  low: { bg: '#ecfdf5', fg: '#059669', dot: '#10b981' },
};
const PriorityChip = ({ p }) => {
  const s = priorityStyle[p];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: s.bg, color: s.fg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }}/>
      {p.charAt(0).toUpperCase()+p.slice(1)} Priority
    </span>
  );
};

const openRules = [
  { r: "Price is above the 200 EMA", p: "high" },
  { r: "Volume spike > 2× average", p: "high" },
  { r: "Setup confirmed by a 5-min close", p: "medium" },
  { r: "News catalyst within last 24h", p: "low" },
];
const closeRules = [
  { r: "Take profit at 2R", p: "high" },
  { r: "Move stop to break-even after 1R", p: "medium" },
  { r: "Exit on reversal candle", p: "medium" },
  { r: "Hard stop at end of session", p: "low" },
];

const StrategyCard = ({ name, desc, open, close, openDefault=true }) => {
  const [isOpen, setIsOpen] = React.useState(openDefault);
  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden mb-3 shadow-md">
      <div className="flex items-center justify-between py-3 px-4 bg-secondary/60 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-3 items-center">
          <div className="p-1.5 bg-white rounded-md border border-zinc-200 shadow-sm">
            <ChevronDown size={14} className={`transition-transform ${isOpen?'':'-rotate-90'}`}/>
          </div>
          <div>
            <div className="font-semibold text-[14px]">{name}</div>
            <div className="text-[12px] text-zinc-500">{desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span className="text-[11px] font-mono-display text-buy">+2.840 €</span>
          <MoreHorizontal size={16}/>
          <Trash2 size={16}/>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-5 border-r border-zinc-100">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Open position rules</div>
            <table className="w-full text-[13px]">
              <thead><tr className="text-left text-zinc-400 text-[11px]">
                <th className="w-8"></th><th className="font-normal py-1">Name</th><th className="font-normal py-1">Priority</th>
              </tr></thead>
              <tbody>
                {open.map((r,i) => (
                  <tr key={i} className="border-t border-zinc-100">
                    <td className="py-2"><div className="w-4 h-4 border border-zinc-300 rounded-sm"/></td>
                    <td className="py-2">{r.r}</td>
                    <td className="py-2"><PriorityChip p={r.p}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 p-5">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Close position rules</div>
            <table className="w-full text-[13px]">
              <thead><tr className="text-left text-zinc-400 text-[11px]">
                <th className="w-8"></th><th className="font-normal py-1">Name</th><th className="font-normal py-1">Priority</th>
              </tr></thead>
              <tbody>
                {close.map((r,i) => (
                  <tr key={i} className="border-t border-zinc-100">
                    <td className="py-2"><div className="w-4 h-4 border border-zinc-300 rounded-sm"/></td>
                    <td className="py-2">{r.r}</td>
                    <td className="py-2"><PriorityChip p={r.p}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const StrategiesView = () => (
  <div>
    <div className="flex items-baseline justify-between mb-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold">Strategies</h1>
        <div className="text-[12px] text-zinc-500 mt-1">4 active · 2 archived</div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="bg-secondary rounded-lg p-1 flex">
          <span className="tab active">Rules</span>
          <span className="tab">History</span>
        </div>
        <button className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5"><Plus size={13}/> New strategy</button>
      </div>
    </div>
    <StrategyCard name="Opening Range Breakout" desc="First 15 minutes high/low break, trend confirmation" open={openRules} close={closeRules} openDefault={true}/>
    <StrategyCard name="VWAP Reversion" desc="Fade moves away from volume-weighted average price" open={openRules.slice(1)} close={closeRules.slice(0,3)} openDefault={false}/>
    <StrategyCard name="FVG Fill" desc="Fair value gap retrace on 1H timeframe" open={openRules.slice(0,3)} close={closeRules.slice(1)} openDefault={false}/>
  </div>
);
window.StrategiesView = StrategiesView;
