// Playbook.jsx — the Bible, turned into a product surface.
// Sub-tabs: Strategies · Mindset · Execution · Rules · Mistakes · Rituals · Setup

const { useState: usePBState, useMemo: usePBMemo } = React;

const PBTab = ({ id, label, active, onClick, count }) => (
  <button onClick={() => onClick(id)}
    className={`px-3 py-1.5 rounded-md text-[13px] transition ${active ? 'bg-white text-[#3d3929] shadow-sm' : 'text-zinc-500 hover:text-[#3d3929]'}`}>
    {label}
    {count != null && <span className="ml-1.5 text-[10px] text-zinc-400 font-mono-display">{count}</span>}
  </button>
);

const SectionHead = ({ kicker, title, lede }) => (
  <div className="mb-6">
    <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display">{kicker}</div>
    <h2 className="font-display text-[22px] font-semibold mt-1">{title}</h2>
    {lede && <p className="text-[13px] text-zinc-500 mt-1 max-w-2xl">{lede}</p>}
  </div>
);

/* ---------- Strategies tab ---------- */
const StrategyCardPB = ({ s }) => {
  const [open, setOpen] = usePBState(false);
  const D = s.diagram ? (window.BibleDiagrams[s.diagram] || null) : null;
  const isUser = !!s.userCreated;
  return (
    <div className={`bg-white rounded-xl border overflow-hidden mb-3 transition-all ${isUser ? 'border-claude/30' : 'border-zinc-200'}`}>
      <div className="p-5 grid grid-cols-[1fr_200px] gap-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono-display uppercase tracking-widest text-zinc-400">{s.timeframe}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-300"/>
                <span className="text-[10px] font-mono-display uppercase tracking-widest text-zinc-400">{s.id}</span>
                {isUser && <span className="text-[9px] font-mono-display uppercase tracking-widest bg-claude/10 text-claude px-1.5 py-0.5 rounded">yours</span>}
              </div>
              <div className="font-display font-semibold text-[17px]">{s.name}</div>
              <div className="text-[13px] text-zinc-500 mt-1 max-w-md">{s.tagline}</div>
            </div>
            <div className="flex items-center gap-1">
              {isUser && (
                <button
                  onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: { editing: s.id } })); }}
                  className="w-7 h-7 rounded-md text-zinc-400 hover:text-claude hover:bg-claude/10 flex items-center justify-center"
                  title="Edit">
                  <PenLine size={13}/>
                </button>
              )}
              <ChevronDown size={16} className={`text-zinc-400 transition-transform mt-1 ${open ? 'rotate-180' : ''}`}/>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-buy"/> Entry · {s.entry.length} rules
            </span>
            <span className="inline-flex items-center gap-1.5 text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-sell"/> Exit · {s.exit.length} rules
            </span>
            <span className="inline-flex items-center gap-1.5 text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-customYellow"/> SL · {s.sl.split(' ').slice(0,3).join(' ')}…
            </span>
          </div>
        </div>
        <div className="bg-primary rounded-lg border border-zinc-100 overflow-hidden flex items-center justify-center">
          {D || (
            <div className="text-center p-4">
              <div className="font-mono-display text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Your setup</div>
              <div className="text-[11px] text-zinc-400 italic">Diagram coming soon</div>
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="border-t border-zinc-100 bg-secondary/40 p-5 grid grid-cols-3 gap-5">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-2">When to use</div>
            <ul className="space-y-1.5">
              {s.when.map((x,i) => (
                <li key={i} className="text-[12px] text-zinc-600 flex gap-2">
                  <span className="text-claude mt-0.5">·</span><span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-buy font-mono-display mb-2">Entry</div>
            <ul className="space-y-1.5">
              {s.entry.map((x,i) => (
                <li key={i} className="text-[12px] text-zinc-600 flex gap-2">
                  <span className="text-zinc-400 mt-0.5 font-mono-display">{i+1}</span><span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-sell font-mono-display mb-2">Exit & SL</div>
            <ul className="space-y-1.5">
              {s.exit.map((x,i) => (
                <li key={i} className="text-[12px] text-zinc-600 flex gap-2">
                  <span className="text-zinc-400 mt-0.5 font-mono-display">{i+1}</span><span>{x}</span>
                </li>
              ))}
              <li className="text-[12px] text-sell bg-sellLight/50 rounded-md px-2 py-1.5 mt-2 flex gap-2">
                <span className="font-semibold">SL:</span><span>{s.sl}</span>
              </li>
            </ul>
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-5 pt-3 border-t border-zinc-200/70">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-2">Pros</div>
              {s.pros.map((p,i) => <div key={i} className="text-[12px] text-buy flex gap-1.5"><Check size={11} className="mt-1"/>{p}</div>)}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-2">Watch out</div>
              {s.cons.map((p,i) => <div key={i} className="text-[12px] text-sell flex gap-1.5"><X size={11} className="mt-1"/>{p}</div>)}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-2">Notes</div>
              {s.notes.map((p,i) => <div key={i} className="text-[12px] text-zinc-600 italic">"{p}"</div>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StrategiesTab = () => {
  const [q, setQ] = usePBState('');
  const { all, user } = window.useStrategies();
  const list = usePBMemo(() =>
    all.filter(s =>
      !q || s.name.toLowerCase().includes(q.toLowerCase()) || (s.tagline||'').toLowerCase().includes(q.toLowerCase())
    ), [q, all]);
  return (
    <div>
      <SectionHead kicker={`${all.length} setups · your evolving edge`} title="Strategy playbook"
        lede="Every trade you take should map to one of these. No setup, no trade. Click any card to expand entry/exit rules. Add your own as your edge evolves."/>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Filter: VWAP, O=H, breakout…"
            className="w-full bg-white border border-zinc-200 rounded-md pl-8 pr-3 py-2 text-[13px] outline-none focus:border-claude/50"/>
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"/>
        </div>
        <div className="text-[11px] text-zinc-400 font-mono-display">
          {list.length} / {all.length}
          {user.length > 0 && <span className="ml-2 text-claude">· {user.length} yours</span>}
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: {} }))}
          className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
          <Plus size={13}/> New strategy
        </button>
      </div>
      {list.map(s => <StrategyCardPB key={s.id} s={s}/>)}
      {list.length === 0 && (
        <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-10 text-center">
          <div className="text-[13px] text-zinc-500">No strategies match "{q}".</div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: {} }))}
            className="mt-3 text-[12px] text-claude hover:underline">Create a new one instead →</button>
        </div>
      )}
    </div>
  );
};

/* ---------- Mindset tab ---------- */
const MindsetTab = () => (
  <div>
    <SectionHead kicker="Mindset management" title="The holy grail is psychology"
      lede="Discipline Bhagwan che. Strategy without the right mind is gambling; mind without strategy is random. Both together compound."/>
    <div className="grid grid-cols-2 gap-3">
      {window.BibleData.mindset.map((m,i) => (
        <div key={i} className="bg-white rounded-xl border border-zinc-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono-display text-zinc-400">{String(i+1).padStart(2,'0')}</span>
            <div className="font-display font-semibold text-[15px]">{m.t}</div>
          </div>
          <p className="text-[13px] text-zinc-600 leading-relaxed">{m.b}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 bg-gradient-to-br from-claude/10 to-customYellow/10 rounded-xl border border-claude/20 p-6">
      <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display mb-3">Morning affirmations</div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {window.BibleData.affirmations.map((a,i) => (
          <div key={i} className="text-[13px] text-[#3d3929] flex gap-2">
            <span className="text-claude font-mono-display text-[11px] mt-0.5">{String(i+1).padStart(2,'0')}</span>
            <span>{a}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-6 bg-white rounded-xl border border-zinc-200 p-6">
      <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Goals</div>
      <div className="grid grid-cols-2 gap-3">
        {window.BibleData.goals.map((g,i) => (
          <div key={i} className="flex items-center gap-3 bg-secondary/50 rounded-md px-3 py-2.5">
            <div className="w-7 h-7 rounded-md bg-white border border-zinc-200 flex items-center justify-center font-mono-display text-[11px] text-claude">{i+1}</div>
            <div className="text-[13px]">{g}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Execution tab ---------- */
const ExecutionTab = () => (
  <div>
    <SectionHead kicker="Execution" title="How to actually place the trade"
      lede="The rules that separate green days from blow-ups. Read before open, re-read after every SL hit."/>
    <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
      {window.BibleData.execution.map((e,i) => (
        <div key={i} className={`grid grid-cols-[56px_1fr] gap-3 px-5 py-4 ${i>0 ? 'border-t border-zinc-100' : ''}`}>
          <div className="font-mono-display text-[11px] text-zinc-400 pt-0.5">{String(i+1).padStart(2,'0')}</div>
          <div className="text-[13px] text-zinc-700 leading-relaxed">{e}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-white rounded-xl border border-zinc-200 p-5">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">System</div>
        {window.BibleData.setup.system.map((s,i) => (
          <div key={i} className="text-[12px] text-zinc-700 flex gap-2 py-1"><span className="text-claude mt-0.5">·</span>{s}</div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 p-5">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Indicators</div>
        {window.BibleData.setup.indicators.map((s,i) => (
          <div key={i} className="text-[12px] text-zinc-700 flex gap-2 py-1"><span className="text-claude mt-0.5">·</span>{s}</div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 p-5">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Timeframes</div>
        {window.BibleData.setup.timeframes.map((s,i) => (
          <div key={i} className="text-[12px] text-zinc-700 flex gap-2 py-1"><span className="text-claude mt-0.5">·</span>{s}</div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Rules & Discipline tab ---------- */
const RulesTab = () => (
  <div>
    <SectionHead kicker="Rules & discipline" title="The non-negotiables"
      lede="Break these, break your P&L. The framed-on-the-wall section of the playbook."/>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-zinc-200 p-6">
        <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display mb-4">Discipline</div>
        {window.BibleData.discipline.map((d,i) => (
          <div key={i} className={`text-[13px] text-zinc-700 py-2.5 ${i>0?'border-t border-zinc-100':''} flex gap-3`}>
            <span className="font-mono-display text-[11px] text-zinc-400 pt-0.5 shrink-0">{String(i+1).padStart(2,'0')}</span>
            <span>{d}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {window.BibleData.rules.map((grp,gi) => (
          <div key={gi} className="bg-white rounded-xl border border-zinc-200 p-6">
            <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display mb-4">{grp.grp}</div>
            {grp.items.map((it,i) => (
              <div key={i} className={`text-[13px] text-zinc-700 py-2.5 ${i>0?'border-t border-zinc-100':''} flex gap-3`}>
                <span className="font-mono-display text-[11px] text-zinc-400 pt-0.5 shrink-0">{String(i+1).padStart(2,'0')}</span>
                <span>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Mistakes tab ---------- */
const MistakesTab = () => {
  const [checked, setChecked] = usePBState({});
  const toggle = (i) => setChecked(c => ({...c, [i]: !c[i]}));
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <div>
      <SectionHead kicker={`${window.BibleData.mistakes.length} mistakes · know thyself`} title="The mistakes list"
        lede="Every mistake you've ever made. Tick the ones you recognise — AlphaEdge will watch for them in your next trades."/>
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-white rounded-md border border-zinc-200 px-3 py-2 text-[12px] font-mono-display">
          <span className="text-claude font-semibold">{count}</span>
          <span className="text-zinc-400"> / {window.BibleData.mistakes.length} acknowledged</span>
        </div>
        <button onClick={() => setChecked({})} className="text-[12px] text-zinc-500 hover:text-[#3d3929]">Reset</button>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <div className="grid grid-cols-2">
          {window.BibleData.mistakes.map((m,i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            return (
              <label key={i} onClick={() => toggle(i)}
                className={`flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-secondary/60 ${row>0 ? 'border-t border-zinc-100' : ''} ${col===1 ? 'border-l border-zinc-100' : ''}`}>
                <div className={`w-4 h-4 rounded-sm border mt-0.5 flex items-center justify-center shrink-0 ${checked[i] ? 'bg-claude border-claude' : 'border-zinc-300'}`}>
                  {checked[i] && <Check size={11} className="text-white"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono-display text-[10px] text-zinc-400">{String(i+1).padStart(2,'0')}</span>
                    <span className={`text-[13px] ${checked[i] ? 'text-zinc-400 line-through' : 'text-zinc-700'}`}>{m}</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ---------- Rituals tab ---------- */
const RitualsTab = () => (
  <div>
    <SectionHead kicker="Pre-market ritual" title="Before the bell"
      lede="Five steps, every morning, in order. Clear the RAM. Set the plan. Trade with Shanti se."/>
    <div className="relative">
      <div className="absolute left-[27px] top-4 bottom-4 w-px bg-zinc-200"/>
      {window.BibleData.ritual.map((r,i) => (
        <div key={i} className="relative flex gap-5 pb-6 last:pb-0">
          <div className="relative z-10 w-[55px] shrink-0 flex items-start justify-center">
            <div className="w-14 h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
              <span className="font-mono-display text-[13px] text-claude">{String(i+1).padStart(2,'0')}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200 p-5 flex-1">
            <div className="font-display font-semibold text-[15px]">{r.t}</div>
            <div className="text-[13px] text-zinc-500 mt-1">{r.d}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 bg-white rounded-xl border border-zinc-200 p-6">
      <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-3">Price-action scans · 30 patterns</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 max-h-[280px] overflow-y-auto pr-2">
        {window.BibleData.priceAction.map((p,i) => (
          <div key={i} className="text-[12px] text-zinc-600 flex gap-2 py-1">
            <span className="font-mono-display text-[10px] text-zinc-400 shrink-0 w-5">{String(i+1).padStart(2,'0')}</span>
            <span>{p}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Playbook shell ---------- */
const PlaybookView = () => {
  const [tab, setTab] = usePBState('strategies');
  const tabs = [
    { id: 'strategies', l: 'Strategies', n: window.BibleStrategies.length },
    { id: 'mindset', l: 'Mindset', n: window.BibleData.mindset.length },
    { id: 'execution', l: 'Execution', n: window.BibleData.execution.length },
    { id: 'rules', l: 'Rules', n: window.BibleData.discipline.length + window.BibleData.rules.reduce((a,r)=>a+r.items.length,0) },
    { id: 'mistakes', l: 'Mistakes', n: window.BibleData.mistakes.length },
    { id: 'rituals', l: 'Rituals', n: window.BibleData.ritual.length },
  ];
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold">Playbook</h1>
          <div className="text-[12px] text-zinc-500 mt-1">Your personal trading bible · strategies, rules & psychology</div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="button-shadow-white rounded-[8px] text-[12px] px-3 py-1.5 flex items-center gap-1.5 text-[#3d3929]">
            <Book size={13}/> Print
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: {} }))}
            className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
            <Plus size={13}/> New strategy
          </button>
        </div>
      </div>
      <div className="bg-secondary rounded-lg p-1 inline-flex mb-6 gap-0.5">
        {tabs.map(t => <PBTab key={t.id} id={t.id} label={t.l} count={t.n} active={tab===t.id} onClick={setTab}/>)}
      </div>
      {tab==='strategies' && <StrategiesTab/>}
      {tab==='mindset' && <MindsetTab/>}
      {tab==='execution' && <ExecutionTab/>}
      {tab==='rules' && <RulesTab/>}
      {tab==='mistakes' && <MistakesTab/>}
      {tab==='rituals' && <RitualsTab/>}
    </div>
  );
};
window.PlaybookView = PlaybookView;
