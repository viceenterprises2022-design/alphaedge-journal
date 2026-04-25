// StrategyEditor.jsx — modal for creating/editing user strategies.
// Opened via a global 'tj-open-strategy-editor' custom event (detail: { editing?: id }).

const { useState: useSE, useEffect: useSEEffect } = React;

const SEList = ({ label, items, setItems, placeholder }) => {
  const addRow = () => setItems([...items, '']);
  const updateRow = (i, v) => setItems(items.map((x,idx) => idx===i ? v : x));
  const removeRow = (i) => setItems(items.filter((_,idx) => idx!==i));
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">{label}</label>
        <button onClick={addRow} className="text-[11px] text-claude hover:text-claude/80 flex items-center gap-1">
          <Plus size={11}/> Add
        </button>
      </div>
      <div className="space-y-1.5">
        {items.length === 0 && (
          <div className="text-[11px] text-zinc-400 italic bg-secondary/40 rounded-md px-2.5 py-2">
            No {label.toLowerCase()} yet. Click "Add" to create one.
          </div>
        )}
        {items.map((v, i) => (
          <div key={i} className="flex gap-1.5">
            <span className="font-mono-display text-[11px] text-zinc-400 pt-2 w-5 text-right shrink-0">{i+1}.</span>
            <input
              value={v}
              onChange={(e) => updateRow(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-secondary rounded-md px-2.5 py-1.5 text-[12px] outline-none border border-transparent focus:border-claude/40"
            />
            <button onClick={() => removeRow(i)} className="w-7 h-7 rounded-md text-zinc-400 hover:text-sell hover:bg-sell/10 flex items-center justify-center">
              <X size={12}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const StrategyEditor = () => {
  const [openE, setOpenE] = useSE(false);
  const [editingId, setEditingId] = useSE(null);
  const [form, setForm] = useSE({
    name: '', tagline: '', timeframe: '5 min',
    when: [], entry: [], exit: [], sl: '20 points on premium',
    pros: [], cons: [], notes: [],
  });

  useSEEffect(() => {
    const onOpen = (e) => {
      const id = e.detail?.editing;
      if (id) {
        const all = [...window.BibleStrategies, ...window.readUserStrategies()];
        const s = all.find(x => x.id === id);
        if (s) {
          setEditingId(id);
          setForm({
            name: s.name, tagline: s.tagline, timeframe: s.timeframe,
            when: [...s.when], entry: [...s.entry], exit: [...s.exit], sl: s.sl,
            pros: [...s.pros], cons: [...s.cons], notes: [...s.notes],
          });
        }
      } else {
        setEditingId(null);
        setForm({
          name: '', tagline: '', timeframe: '5 min',
          when: [''], entry: [''], exit: [''], sl: '20 points on premium',
          pros: [], cons: [], notes: [],
        });
      }
      setOpenE(true);
    };
    const onEsc = (e) => { if (e.key === 'Escape') setOpenE(false); };
    window.addEventListener('tj-open-strategy-editor', onOpen);
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('tj-open-strategy-editor', onOpen);
      window.removeEventListener('keydown', onEsc);
    };
  }, []);

  if (!openE) return null;

  const isUserStrategy = editingId && !window.BibleStrategies.find(s => s.id === editingId);
  const canSave = form.name.trim().length > 0;

  const save = () => {
    // Strip empty rows
    const clean = (arr) => arr.map(s => s.trim()).filter(Boolean);
    const payload = {
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      timeframe: form.timeframe,
      when: clean(form.when),
      entry: clean(form.entry),
      exit: clean(form.exit),
      sl: form.sl.trim() || '20 points on premium',
      pros: clean(form.pros),
      cons: clean(form.cons),
      notes: clean(form.notes),
    };
    if (editingId && isUserStrategy) {
      window.updateStrategy(editingId, payload);
    } else {
      const created = window.createStrategy(payload);
      // Notify any open TradeDialog to pre-select the new one
      window.dispatchEvent(new CustomEvent('tj-strategy-created', { detail: { id: created.id } }));
    }
    setOpenE(false);
  };

  const remove = () => {
    if (!isUserStrategy) return;
    if (confirm(`Delete "${form.name}"? This cannot be undone.`)) {
      window.deleteStrategy(editingId);
      setOpenE(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#3d3929]/40 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={(e) => { if (e.target === e.currentTarget) setOpenE(false); }}>
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl shadow-zinc-900/20 w-[640px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-5 pb-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-claude font-mono-display">{editingId ? 'Edit strategy' : 'New strategy'}</div>
            <div className="font-display font-semibold text-[17px] mt-0.5">
              {editingId ? form.name || 'Untitled' : 'Capture a new setup'}
            </div>
          </div>
          <button onClick={() => setOpenE(false)} className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-zinc-400 hover:text-[#3d3929]">
            <X size={16}/>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-[1fr_160px] gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Name</label>
              <input
                autoFocus
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="e.g. Opening-range fade"
                className="w-full bg-secondary rounded-md px-3 py-2 text-[14px] mt-1 outline-none border border-transparent focus:border-claude/40 font-display"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Timeframe</label>
              <select
                value={form.timeframe}
                onChange={(e) => setForm({...form, timeframe: e.target.value})}
                className="w-full bg-secondary rounded-md px-3 py-2 text-[13px] mt-1 outline-none appearance-none cursor-pointer"
              >
                <option>1 min</option>
                <option>3 min</option>
                <option>5 min</option>
                <option>3 / 5 min</option>
                <option>15 min</option>
                <option>1 hour</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">One-line tagline</label>
            <input
              value={form.tagline}
              onChange={(e) => setForm({...form, tagline: e.target.value})}
              placeholder="e.g. Fade the first 15-min range when VIX is muted"
              className="w-full bg-secondary rounded-md px-3 py-2 text-[13px] mt-1 outline-none border border-transparent focus:border-claude/40 italic"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SEList label="When to use" items={form.when} setItems={v => setForm({...form, when: v})} placeholder="Condition for taking this trade"/>
            <SEList label="Entry" items={form.entry} setItems={v => setForm({...form, entry: v})} placeholder="How you enter"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SEList label="Exit" items={form.exit} setItems={v => setForm({...form, exit: v})} placeholder="How you exit"/>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display">Stop loss</label>
              <input
                value={form.sl}
                onChange={(e) => setForm({...form, sl: e.target.value})}
                className="w-full bg-secondary rounded-md px-3 py-2 text-[13px] mt-1.5 outline-none border border-transparent focus:border-claude/40"
              />
              <div className="text-[10px] text-zinc-400 mt-1.5">Keep it concrete — "20 pts on premium", "below setup candle"…</div>
            </div>
          </div>

          <details className="group">
            <summary className="text-[11px] text-zinc-500 cursor-pointer flex items-center gap-1.5 select-none">
              <ChevronDown size={12} className="group-open:rotate-180 transition-transform"/>
              Optional · pros, cons, notes
            </summary>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <SEList label="Pros" items={form.pros} setItems={v => setForm({...form, pros: v})} placeholder="What works well"/>
              <SEList label="Watch out" items={form.cons} setItems={v => setForm({...form, cons: v})} placeholder="Failure modes"/>
              <SEList label="Notes" items={form.notes} setItems={v => setForm({...form, notes: v})} placeholder="Reminders"/>
            </div>
          </details>
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 bg-secondary/40 flex items-center justify-between">
          <div>
            {isUserStrategy && (
              <button onClick={remove} className="text-[12px] text-sell hover:underline flex items-center gap-1">
                <Trash2 size={12}/> Delete
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpenE(false)} className="text-[12px] text-zinc-500 hover:text-[#3d3929] px-3 py-1.5">Cancel</button>
            <button
              onClick={save}
              disabled={!canSave}
              className={`button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5 ${!canSave ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <Check size={12}/> {editingId ? 'Save changes' : 'Create strategy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
window.StrategyEditor = StrategyEditor;
