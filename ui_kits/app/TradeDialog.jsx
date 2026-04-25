// TradeDialog.jsx — log-a-trade modal, upgraded to capture playbook linkage:
// Strategy chosen · Rules followed (✓/✗) · Mistakes made (multi-select) · Notes

const { useState: useTD, useEffect: useTDEffect } = React;

const TradeDialog = () => {
  const [open, setOpen] = useTD(false);
  const [dir, setDir] = useTD('BUY');
  const { all: allStrategies } = window.useStrategies();
  const [strategy, setStrategy] = useTD('vwap');
  const [strategy, setStrategy] = useTD('vwap');
  const [step, setStep] = useTD(1); // 1 = trade details, 2 = playbook review
  const [rulesFollowed, setRulesFollowed] = useTD({});
  const [mistakesMade, setMistakesMade] = useTD({});
  const [mistakeSearch, setMistakeSearch] = useTD('');

  const S = allStrategies.find(s => s.id === strategy);
  const allRules = S ? [
    ...S.entry.map((r,i) => ({ id: `E${i}`, t: r, kind: 'entry' })),
    ...S.exit.map((r,i) => ({ id: `X${i}`, t: r, kind: 'exit' })),
    { id: 'SL', t: s => s.sl, kind: 'sl' },
  ] : [];

  const ruleOk = Object.values(rulesFollowed).filter(v => v === true).length;
  const ruleBad = Object.values(rulesFollowed).filter(v => v === false).length;
  const mistakeCount = Object.values(mistakesMade).filter(Boolean).length;

  const filteredMistakes = window.BibleData.mistakes
    .map((m,i) => ({ m, i }))
    .filter(({m}) => !mistakeSearch || m.toLowerCase().includes(mistakeSearch.toLowerCase()));

  const toggleRule = (id, v) => setRulesFollowed(r => ({...r, [id]: r[id] === v ? undefined : v}));
  const toggleMistake = (i) => setMistakesMade(m => ({...m, [i]: !m[i]}));

  // Global openers: nav-bar "Log a trade" button, keyboard shortcut, custom event
  useTDEffect(() => {
    const onEvt = () => setOpen(true);
    const onStrategyCreated = (e) => {
      if (e.detail?.id) { setStrategy(e.detail.id); setOpen(true); }
    };
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('tj-open-trade-dialog', onEvt);
    window.addEventListener('tj-strategy-created', onStrategyCreated);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('tj-open-trade-dialog', onEvt);
      window.removeEventListener('tj-strategy-created', onStrategyCreated);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Log a trade (⌘K)"
        className="fixed right-6 bottom-6 z-50 button-shadow rounded-full pl-3 pr-4 py-2.5 text-primary flex items-center gap-2 text-[13px] hover:scale-[1.02] transition-transform"
      >
        <span className="w-6 h-6 rounded-full bg-claude/90 flex items-center justify-center">
          <Plus size={14} className="text-white"/>
        </span>
        <span className="font-medium">Log a trade</span>
        <span className="text-[10px] font-mono-display text-zinc-400 ml-1 border border-zinc-600/40 rounded px-1.5 py-0.5">⌘K</span>
      </button>
    );
  }

  return (
    <div className="fixed right-6 bottom-6 w-[420px] bg-white rounded-2xl border border-zinc-200 shadow-2xl shadow-zinc-300/50 z-50 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <div className="font-display font-semibold text-[15px]">Log a trade</div>
          <div className="text-[11px] text-zinc-400 font-mono-display">Mar 9, 11:45 · step {step} of 2</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setStep(1)} className={`w-6 h-1 rounded-full ${step===1 ? 'bg-claude' : 'bg-zinc-200'}`}/>
            <button onClick={() => setStep(2)} className={`w-6 h-1 rounded-full ${step===2 ? 'bg-claude' : 'bg-zinc-200'}`}/>
          </div>
          <button onClick={() => setOpen(false)} title="Minimise (Esc)" className="w-6 h-6 rounded-md hover:bg-secondary flex items-center justify-center text-zinc-400 hover:text-[#3d3929]">
            <X size={14}/>
          </button>
        </div>
      </div>

      {step === 1 && (
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Direction</label>
              <div className="flex gap-1 mt-1">
                <button onClick={() => setDir('BUY')} className={`flex-1 rounded-md py-1.5 text-[12px] font-semibold transition ${dir==='BUY' ? 'bg-buyLight text-buy border border-buy/20' : 'bg-secondary text-zinc-500 border border-transparent'}`}>BUY</button>
                <button onClick={() => setDir('SELL')} className={`flex-1 rounded-md py-1.5 text-[12px] font-semibold transition ${dir==='SELL' ? 'bg-sellLight text-sell border border-sell/20' : 'bg-secondary text-zinc-500 border border-transparent'}`}>SELL</button>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Symbol</label>
              <input defaultValue="BANKNIFTY 52100 CE" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none border border-transparent focus:border-zinc-200"/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Entry</label>
              <input defaultValue="348.50" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none font-mono-display"/>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Exit</label>
              <input defaultValue="392.20" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none font-mono-display"/>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Qty</label>
              <input defaultValue="1500" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none font-mono-display"/>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Strategy used</label>
            <div className="relative mt-1">
              <select value={strategy} onChange={e => {
                  if (e.target.value === '__new__') {
                    window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: {} }));
                    return;
                  }
                  setStrategy(e.target.value); setRulesFollowed({});
                }}
                className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] outline-none appearance-none">
                <optgroup label="Built-in playbook">
                  {allStrategies.filter(s => !s.userCreated).map(s => <option key={s.id} value={s.id}>{s.name} · {s.timeframe}</option>)}
                </optgroup>
                {allStrategies.some(s => s.userCreated) && (
                  <optgroup label="Your strategies">
                    {allStrategies.filter(s => s.userCreated).map(s => <option key={s.id} value={s.id}>{s.name} · {s.timeframe}</option>)}
                  </optgroup>
                )}
                <option value="none">— No setup (flag this trade) —</option>
                <option value="__new__">+ Create new strategy…</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-2 text-zinc-400 pointer-events-none"/>
            </div>
            {S && <div className="text-[11px] text-zinc-500 mt-1.5 italic">{S.tagline}</div>}
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <div className="switch-btn active"></div>
              <span>Link to today's journal</span>
            </div>
            <button onClick={() => setStep(2)} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
              Next: review <ChevronDown size={11} className="-rotate-90"/>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Rules checklist */}
          <div className="p-5 border-b border-zinc-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display">Playbook check · {S?.name}</div>
                <div className="text-[12px] text-zinc-500 mt-0.5">Did you follow each rule?</div>
              </div>
              <div className="text-[11px] font-mono-display">
                <span className="text-buy">✓{ruleOk}</span>
                <span className="text-zinc-300 mx-1">/</span>
                <span className="text-sell">✗{ruleBad}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              {S && S.entry.map((r,i) => {
                const id = `E${i}`;
                const v = rulesFollowed[id];
                return (
                  <div key={id} className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary/60 rounded-md px-2.5 py-1.5 text-[12px] text-zinc-700">
                      <span className="text-[10px] font-mono-display text-buy mr-2">ENTRY</span>
                      {r}
                    </div>
                    <button onClick={() => toggleRule(id, true)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===true ? 'bg-buy/15 border-buy text-buy' : 'border-zinc-200 text-zinc-300 hover:border-buy/40'}`}>
                      <Check size={13}/>
                    </button>
                    <button onClick={() => toggleRule(id, false)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===false ? 'bg-sell/15 border-sell text-sell' : 'border-zinc-200 text-zinc-300 hover:border-sell/40'}`}>
                      <X size={13}/>
                    </button>
                  </div>
                );
              })}
              {S && S.exit.map((r,i) => {
                const id = `X${i}`;
                const v = rulesFollowed[id];
                return (
                  <div key={id} className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary/60 rounded-md px-2.5 py-1.5 text-[12px] text-zinc-700">
                      <span className="text-[10px] font-mono-display text-sell mr-2">EXIT</span>
                      {r}
                    </div>
                    <button onClick={() => toggleRule(id, true)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===true ? 'bg-buy/15 border-buy text-buy' : 'border-zinc-200 text-zinc-300 hover:border-buy/40'}`}>
                      <Check size={13}/>
                    </button>
                    <button onClick={() => toggleRule(id, false)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===false ? 'bg-sell/15 border-sell text-sell' : 'border-zinc-200 text-zinc-300 hover:border-sell/40'}`}>
                      <X size={13}/>
                    </button>
                  </div>
                );
              })}
              {S && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-customYellow/10 rounded-md px-2.5 py-1.5 text-[12px] text-zinc-700">
                    <span className="text-[10px] font-mono-display text-customOrange mr-2">SL</span>
                    {S.sl}
                  </div>
                  <button onClick={() => toggleRule('SL', true)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${rulesFollowed.SL===true ? 'bg-buy/15 border-buy text-buy' : 'border-zinc-200 text-zinc-300 hover:border-buy/40'}`}>
                    <Check size={13}/>
                  </button>
                  <button onClick={() => toggleRule('SL', false)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${rulesFollowed.SL===false ? 'bg-sell/15 border-sell text-sell' : 'border-zinc-200 text-zinc-300 hover:border-sell/40'}`}>
                    <X size={13}/>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mistakes */}
          <div className="p-5 border-b border-zinc-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-sell font-mono-display">Mistakes made</div>
                <div className="text-[12px] text-zinc-500 mt-0.5">Honest tagging · {mistakeCount} selected</div>
              </div>
            </div>
            <div className="relative mb-2">
              <input value={mistakeSearch} onChange={e=>setMistakeSearch(e.target.value)} placeholder="Search 49 mistakes…"
                className="w-full bg-secondary rounded-md pl-8 pr-3 py-1.5 text-[12px] outline-none border border-transparent focus:border-zinc-200"/>
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"/>
            </div>
            <div className="max-h-[180px] overflow-y-auto pr-1 space-y-1">
              {filteredMistakes.slice(0, 20).map(({m, i}) => (
                <label key={i} onClick={() => toggleMistake(i)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-[12px] ${mistakesMade[i] ? 'bg-sell/10 text-sell' : 'hover:bg-secondary/60 text-zinc-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${mistakesMade[i] ? 'bg-sell border-sell' : 'border-zinc-300'}`}>
                    {mistakesMade[i] && <Check size={9} className="text-white"/>}
                  </div>
                  <span className="font-mono-display text-[10px] text-zinc-400 w-5 shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <span>{m}</span>
                </label>
              ))}
              {filteredMistakes.length > 20 && <div className="text-[11px] text-zinc-400 italic px-2 pt-1">{filteredMistakes.length - 20} more… refine search</div>}
            </div>
          </div>

          {/* Notes + save */}
          <div className="p-5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Learning</label>
            <textarea placeholder="What will you do differently next time?" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none h-14 resize-none"></textarea>
            <div className="flex items-center justify-between pt-3">
              <button onClick={() => setStep(1)} className="text-[12px] text-zinc-500 hover:text-[#3d3929] flex items-center gap-1">
                <ChevronDown size={11} className="rotate-90"/> Back
              </button>
              <button className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
                Save trade <Check size={11}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
window.TradeDialog = TradeDialog;
