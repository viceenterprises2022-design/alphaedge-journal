// Strategies.jsx — real strategies CRUD; uses StrategyStore + computed P/L from trades
const priorityStyle = {
  high: { bg: '#fff1f2', fg: '#e11d48', dot: '#f43f5e' },
  medium: { bg: '#fffbeb', fg: '#d97706', dot: '#f59e0b' },
  low: { bg: '#ecfdf5', fg: '#059669', dot: '#10b981' },
};
const PriorityChip = ({ p }) => {
  const s = priorityStyle[p] || priorityStyle.medium;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: s.bg, color: s.fg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }}/>
      {(p||'medium').charAt(0).toUpperCase()+(p||'medium').slice(1)} Priority
    </span>
  );
};

const StrategyCard = ({ s, pnl, openDefault }) => {
  const [isOpen, setIsOpen] = React.useState(openDefault);
  const isUser = !!s.userCreated;
  const onDelete = (e) => {
    e.stopPropagation();
    if (!isUser) { window.toast('Built-in strategies can\'t be deleted', 'info'); return; }
    if (confirm(`Delete strategy "${s.name}"?`)) { window.deleteStrategy(s.id); window.toast('Strategy deleted','info'); }
  };
  const onEdit = (e) => {
    e.stopPropagation();
    if (!isUser) { window.toast('Built-in strategies can\'t be edited','info'); return; }
    window.dispatchEvent(new CustomEvent('tj-open-strategy-editor',{detail:{editing:s.id}}));
  };
  return (
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden mb-3 shadow-md">
      <div className="flex items-center justify-between py-3 px-4 bg-secondary/60 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-3 items-center">
          <div className="p-1.5 bg-white rounded-md border border-zinc-200 shadow-sm">
            <ChevronDown size={14} className={`transition-transform ${isOpen?'':'-rotate-90'}`}/>
          </div>
          <div>
            <div className="font-semibold text-[14px] flex items-center gap-2">
              {s.name}
              {isUser && <span className="text-[9px] font-mono-display uppercase tracking-widest bg-claude/10 text-claude px-1.5 py-0.5 rounded">yours</span>}
            </div>
            <div className="text-[12px] text-zinc-500">{s.tagline}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          {pnl !== 0 && <span className={`text-[11px] font-mono-display ${pnl>=0?'text-buy':'text-sell'}`}>{window.fmtMoney(pnl,{signed:true})}</span>}
          <button onClick={onEdit} className={`hover:text-claude ${!isUser?'opacity-30':''}`}><PenLine size={15}/></button>
          <button onClick={onDelete} className={`hover:text-sell ${!isUser?'opacity-30':''}`}><Trash2 size={15}/></button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-5 border-r border-zinc-100">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Open position rules · {s.entry.length}</div>
            {s.entry.length === 0 ? <div className="text-[12px] text-zinc-400 italic">No entry rules defined.</div> :
              <div className="space-y-2">{s.entry.map((r,i) => (<div key={i} className="text-[13px] flex items-center gap-2"><span className="font-mono-display text-[10px] text-zinc-400 w-6">{String(i+1).padStart(2,'0')}</span>{r}</div>))}</div>
            }
          </div>
          <div className="flex-1 p-5">
            <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Close position rules · {s.exit.length}</div>
            {s.exit.length === 0 ? <div className="text-[12px] text-zinc-400 italic">No exit rules defined.</div> :
              <div className="space-y-2">{s.exit.map((r,i) => (<div key={i} className="text-[13px] flex items-center gap-2"><span className="font-mono-display text-[10px] text-zinc-400 w-6">{String(i+1).padStart(2,'0')}</span>{r}</div>))}</div>
            }
            <div className="mt-3 text-[12px] text-customOrange bg-customYellow/10 rounded-md px-2.5 py-1.5"><span className="font-mono-display text-[10px] mr-2">SL</span>{s.sl}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const StrategiesView = () => {
  const { all, user } = window.useStrategies();
  const trades = window.useTrades();
  const pnlBy = React.useMemo(() => {
    const m = {};
    trades.forEach(t => { if (t.strategyId) m[t.strategyId] = (m[t.strategyId]||0) + (t.pnl||0); });
    return m;
  }, [trades]);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold">Strategies</h1>
          <div className="text-[12px] text-zinc-500 mt-1">{all.length} active · {user.length} yours</div>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: {} }))} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5"><Plus size={13}/> New strategy</button>
        </div>
      </div>
      {all.map((s,i) => <StrategyCard key={s.id} s={s} pnl={pnlBy[s.id]||0} openDefault={i===0}/>)}
    </div>
  );
};
window.StrategiesView = StrategiesView;
