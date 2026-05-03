// TradeDialog.jsx — log/edit a trade with playbook review.
// Saves to TradeStore via createTrade/updateTrade.

const { useState: useTD, useEffect: useTDEffect } = React;

const emptyForm = () => ({
  id: null,
  direction: 'BUY',
  symbol: '',
  entry: '',
  exit: '',
  qty: '',
  strategyId: null,
  rulesFollowed: {},
  mistakes: {},
  notes: '',
  learning: '',
  loggedAt: new Date().toISOString(),
});

const TradeDialog = () => {
  const [open, setOpen] = useTD(false);
  const [step, setStep] = useTD(1);
  const [form, setForm] = useTD(emptyForm);
  const [mistakeSearch, setMistakeSearch] = useTD('');
  const [error, setError] = useTD(null);
  const { all: allStrategies } = window.useStrategies();

  const set = (patch) => setForm(f => ({ ...f, ...patch }));
  const S = allStrategies.find(s => s.id === form.strategyId);

  const ruleOk = Object.values(form.rulesFollowed).filter(v => v === true).length;
  const ruleBad = Object.values(form.rulesFollowed).filter(v => v === false).length;
  const mistakeCount = Object.values(form.mistakes).filter(Boolean).length;

  const filteredMistakes = window.BibleData.mistakes
    .map((m,i) => ({ m, i }))
    .filter(({m}) => !mistakeSearch || m.toLowerCase().includes(mistakeSearch.toLowerCase()));

  const toggleRule = (id, v) => set({ rulesFollowed: { ...form.rulesFollowed, [id]: form.rulesFollowed[id] === v ? undefined : v }});
  const toggleMistake = (i) => set({ mistakes: { ...form.mistakes, [i]: !form.mistakes[i] }});

  const validateStep1 = () => {
    if (!form.symbol.trim()) return 'Symbol is required.';
    if (!form.entry || isNaN(parseFloat(form.entry))) return 'Entry price must be a number.';
    if (!form.exit || isNaN(parseFloat(form.exit))) return 'Exit price must be a number.';
    if (!form.qty || isNaN(parseFloat(form.qty)) || parseFloat(form.qty) <= 0) return 'Quantity must be a positive number.';
    return null;
  };

  const reset = () => { setForm(emptyForm()); setStep(1); setMistakeSearch(''); setError(null); };

  const save = () => {
    const err = validateStep1();
    if (err) { setError(err); setStep(1); return; }
    if (form.id) {
      window.updateTrade(form.id, form);
      window.toast('Trade updated', 'success');
    } else {
      window.createTrade(form);
      window.toast('Trade logged', 'success');
    }
    setOpen(false); reset();
  };

  // Global openers
  useTDEffect(() => {
    const onOpen = (e) => { reset(); setOpen(true); };
    const onEdit = (e) => {
      const id = e.detail?.id;
      const trade = (window.readTrades() || []).find(t => t.id === id);
      if (trade) { setForm({ ...emptyForm(), ...trade }); setStep(1); setOpen(true); }
    };
    const onStrategyCreated = (e) => {
      if (e.detail?.id) { set({ strategyId: e.detail.id }); setOpen(true); }
    };
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('tj-open-trade-dialog', onOpen);
    window.addEventListener('tj-edit-trade', onEdit);
    window.addEventListener('tj-strategy-created', onStrategyCreated);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('tj-open-trade-dialog', onOpen);
      window.removeEventListener('tj-edit-trade', onEdit);
      window.removeEventListener('tj-strategy-created', onStrategyCreated);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!open) {
    return (
      <button
        onClick={() => { reset(); setOpen(true); }}
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

  const ts = new Date(form.loggedAt);
  const tsLabel = ts.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed right-6 bottom-6 w-[420px] bg-white rounded-2xl border border-zinc-200 shadow-2xl shadow-zinc-300/50 z-50 overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <div className="font-display font-semibold text-[15px]">{form.id ? 'Edit trade' : 'Log a trade'}</div>
          <div className="text-[11px] text-zinc-400 font-mono-display">{tsLabel} · step {step} of 2</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setStep(1)} className={`w-6 h-1 rounded-full ${step===1 ? 'bg-claude' : 'bg-zinc-200'}`}/>
            <button onClick={() => { const e = validateStep1(); if (e) { setError(e); return; } setError(null); setStep(2); }} className={`w-6 h-1 rounded-full ${step===2 ? 'bg-claude' : 'bg-zinc-200'}`}/>
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
                <button onClick={() => set({direction:'BUY'})} className={`flex-1 rounded-md py-1.5 text-[12px] font-semibold transition ${form.direction==='BUY' ? 'bg-buyLight text-buy border border-buy/20' : 'bg-secondary text-zinc-500 border border-transparent'}`}>BUY</button>
                <button onClick={() => set({direction:'SELL'})} className={`flex-1 rounded-md py-1.5 text-[12px] font-semibold transition ${form.direction==='SELL' ? 'bg-sellLight text-sell border border-sell/20' : 'bg-secondary text-zinc-500 border border-transparent'}`}>SELL</button>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Symbol</label>
              <input value={form.symbol} onChange={e=>set({symbol:e.target.value})} placeholder="e.g. NIFTY 22500 PE" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none border border-transparent focus:border-zinc-200"/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Entry</label>
              <input value={form.entry} onChange={e=>set({entry:e.target.value})} placeholder="0.00" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none font-mono-display"/>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Exit</label>
              <input value={form.exit} onChange={e=>set({exit:e.target.value})} placeholder="0.00" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none font-mono-display"/>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Qty</label>
              <input value={form.qty} onChange={e=>set({qty:e.target.value})} placeholder="0" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none font-mono-display"/>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Strategy used</label>
            <div className="relative mt-1">
              <select value={form.strategyId || ''} onChange={e => {
                  const v = e.target.value;
                  if (v === '__new__') { window.dispatchEvent(new CustomEvent('tj-open-strategy-editor', { detail: {} })); return; }
                  set({ strategyId: v || null, rulesFollowed: {} });
                }}
                className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] outline-none appearance-none">
                <option value="">— Select strategy —</option>
                <optgroup label="Built-in playbook">
                  {allStrategies.filter(s => !s.userCreated).map(s => <option key={s.id} value={s.id}>{s.name} · {s.timeframe}</option>)}
                </optgroup>
                {allStrategies.some(s => s.userCreated) && (
                  <optgroup label="Your strategies">
                    {allStrategies.filter(s => s.userCreated).map(s => <option key={s.id} value={s.id}>{s.name} · {s.timeframe}</option>)}
                  </optgroup>
                )}
                <option value="__new__">+ Create new strategy…</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-2 text-zinc-400 pointer-events-none"/>
            </div>
            {S && <div className="text-[11px] text-zinc-500 mt-1.5 italic">{S.tagline}</div>}
          </div>
          {error && <div className="text-[11px] text-sell bg-sell/10 rounded-md px-2.5 py-1.5">{error}</div>}
          <div className="flex items-center justify-end pt-2">
            <button onClick={() => { const e = validateStep1(); if (e) { setError(e); return; } setError(null); setStep(2); }} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
              Next: review <ChevronDown size={11} className="-rotate-90"/>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-h-[70vh] overflow-y-auto">
          {S ? (
            <div className="p-5 border-b border-zinc-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display">Playbook check · {S.name}</div>
                  <div className="text-[12px] text-zinc-500 mt-0.5">Did you follow each rule?</div>
                </div>
                <div className="text-[11px] font-mono-display">
                  <span className="text-buy">✓{ruleOk}</span>
                  <span className="text-zinc-300 mx-1">/</span>
                  <span className="text-sell">✗{ruleBad}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {S.entry.map((r,i) => {
                  const id = `E${i}`; const v = form.rulesFollowed[id];
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary/60 rounded-md px-2.5 py-1.5 text-[12px] text-zinc-700">
                        <span className="text-[10px] font-mono-display text-buy mr-2">ENTRY</span>{r}
                      </div>
                      <button onClick={() => toggleRule(id, true)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===true ? 'bg-buy/15 border-buy text-buy' : 'border-zinc-200 text-zinc-300 hover:border-buy/40'}`}><Check size={13}/></button>
                      <button onClick={() => toggleRule(id, false)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===false ? 'bg-sell/15 border-sell text-sell' : 'border-zinc-200 text-zinc-300 hover:border-sell/40'}`}><X size={13}/></button>
                    </div>
                  );
                })}
                {S.exit.map((r,i) => {
                  const id = `X${i}`; const v = form.rulesFollowed[id];
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary/60 rounded-md px-2.5 py-1.5 text-[12px] text-zinc-700">
                        <span className="text-[10px] font-mono-display text-sell mr-2">EXIT</span>{r}
                      </div>
                      <button onClick={() => toggleRule(id, true)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===true ? 'bg-buy/15 border-buy text-buy' : 'border-zinc-200 text-zinc-300 hover:border-buy/40'}`}><Check size={13}/></button>
                      <button onClick={() => toggleRule(id, false)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${v===false ? 'bg-sell/15 border-sell text-sell' : 'border-zinc-200 text-zinc-300 hover:border-sell/40'}`}><X size={13}/></button>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-customYellow/10 rounded-md px-2.5 py-1.5 text-[12px] text-zinc-700">
                    <span className="text-[10px] font-mono-display text-customOrange mr-2">SL</span>{S.sl}
                  </div>
                  <button onClick={() => toggleRule('SL', true)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${form.rulesFollowed.SL===true ? 'bg-buy/15 border-buy text-buy' : 'border-zinc-200 text-zinc-300 hover:border-buy/40'}`}><Check size={13}/></button>
                  <button onClick={() => toggleRule('SL', false)} className={`w-7 h-7 rounded-md border flex items-center justify-center transition ${form.rulesFollowed.SL===false ? 'bg-sell/15 border-sell text-sell' : 'border-zinc-200 text-zinc-300 hover:border-sell/40'}`}><X size={13}/></button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 border-b border-zinc-100 text-[12px] text-zinc-500 italic">No strategy selected — skipping rule check.</div>
          )}

          <div className="p-5 border-b border-zinc-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-sell font-mono-display">Mistakes made</div>
                <div className="text-[12px] text-zinc-500 mt-0.5">Honest tagging · {mistakeCount} selected</div>
              </div>
            </div>
            <div className="relative mb-2">
              <input value={mistakeSearch} onChange={e=>setMistakeSearch(e.target.value)} placeholder={`Search ${window.BibleData.mistakes.length} mistakes…`}
                className="w-full bg-secondary rounded-md pl-8 pr-3 py-1.5 text-[12px] outline-none border border-transparent focus:border-zinc-200"/>
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"/>
            </div>
            <div className="max-h-[180px] overflow-y-auto pr-1 space-y-1">
              {filteredMistakes.slice(0, 20).map(({m, i}) => (
                <label key={i} onClick={() => toggleMistake(i)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-[12px] ${form.mistakes[i] ? 'bg-sell/10 text-sell' : 'hover:bg-secondary/60 text-zinc-700'}`}>
                  <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${form.mistakes[i] ? 'bg-sell border-sell' : 'border-zinc-300'}`}>
                    {form.mistakes[i] && <Check size={9} className="text-white"/>}
                  </div>
                  <span className="font-mono-display text-[10px] text-zinc-400 w-5 shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <span>{m}</span>
                </label>
              ))}
              {filteredMistakes.length > 20 && <div className="text-[11px] text-zinc-400 italic px-2 pt-1">{filteredMistakes.length - 20} more… refine search</div>}
            </div>
          </div>

          <div className="p-5">
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Learning</label>
            <textarea value={form.learning} onChange={e=>set({learning:e.target.value})} placeholder="What will you do differently next time?" className="w-full bg-secondary rounded-md px-2 py-1.5 text-[12px] mt-1 outline-none h-14 resize-none"></textarea>
            <div className="flex items-center justify-between pt-3">
              <button onClick={() => setStep(1)} className="text-[12px] text-zinc-500 hover:text-[#3d3929] flex items-center gap-1">
                <ChevronDown size={11} className="rotate-90"/> Back
              </button>
              <button onClick={save} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
                {form.id ? 'Save changes' : 'Save trade'} <Check size={11}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
window.TradeDialog = TradeDialog;
