// Journal.jsx — CRUD journal entries with sidebar list + editor pane
const JournalView = () => {
  const items = window.useJournal();
  const [activeId, setActiveId] = React.useState(null);

  React.useEffect(() => {
    if (!activeId && items.length > 0) setActiveId(items[0].id);
    if (activeId && !items.find(e => e.id === activeId)) setActiveId(items[0]?.id || null);
  }, [items, activeId]);

  const active = items.find(e => e.id === activeId);

  const onNew = () => {
    const e = window.createEntry({ title: 'Untitled entry', body: '' });
    setActiveId(e.id);
  };
  const onDelete = (id) => {
    if (confirm('Delete this entry?')) { window.deleteEntry(id); window.toast('Entry deleted','info'); }
  };

  return (
    <div className="grid grid-cols-[260px_1fr] gap-6 h-[calc(100vh-180px)]">
      <div className="bg-white rounded-xl border border-zinc-200 p-3 overflow-y-auto">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono-display">Entries · {items.length}</div>
          <button onClick={onNew} className="w-6 h-6 rounded-md bg-secondary hover:bg-claude/10 hover:text-claude flex items-center justify-center"><Plus size={13}/></button>
        </div>
        {items.length === 0 ? (
          <div className="px-3 py-6 text-center">
            <div className="text-[12px] text-zinc-400 mb-3">No entries yet.</div>
            <button onClick={onNew} className="text-[12px] text-claude hover:underline">+ New entry</button>
          </div>
        ) : items.map(e => {
          const dt = new Date(e.updatedAt || e.createdAt);
          return (
            <div key={e.id} onClick={()=>setActiveId(e.id)}
              className={`px-3 py-2 rounded-lg cursor-pointer mb-1 group flex items-start justify-between gap-2 ${activeId===e.id ? 'bg-secondary' : 'hover:bg-secondary/60'}`}>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] text-zinc-400 font-mono-display uppercase tracking-wider">{dt.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'})}</div>
                <div className="text-[13px] truncate">{e.title || 'Untitled entry'}</div>
              </div>
              <button onClick={(ev)=>{ev.stopPropagation();onDelete(e.id);}} className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-sell"><Trash2 size={12}/></button>
            </div>
          );
        })}
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 p-8 overflow-y-auto">
        {!active ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="font-display text-[20px] mb-2">Start journaling</div>
            <div className="text-[13px] text-zinc-500 mb-6 max-w-sm">Capture what you saw, felt, and learned. The patterns surface in retrospect.</div>
            <button onClick={onNew} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary inline-flex items-center gap-1.5"><Plus size={13}/> New entry</button>
          </div>
        ) : (
          <JournalEditor key={active.id} entry={active}/>
        )}
      </div>
    </div>
  );
};

const JournalEditor = ({ entry }) => {
  const [title, setTitle] = React.useState(entry.title);
  const [body, setBody] = React.useState(entry.body);
  const [tagText, setTagText] = React.useState((entry.tags||[]).join(', '));
  const dirty = title !== entry.title || body !== entry.body || tagText !== (entry.tags||[]).join(', ');

  React.useEffect(() => {
    if (!dirty) return;
    const id = setTimeout(() => {
      window.updateEntry(entry.id, {
        title, body,
        tags: tagText.split(',').map(t => t.trim()).filter(Boolean),
      });
    }, 600);
    return () => clearTimeout(id);
  }, [title, body, tagText, dirty, entry.id]);

  const dt = new Date(entry.updatedAt || entry.createdAt);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-4 font-mono-display uppercase tracking-wider">
        <Calendar size={12}/> {dt.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}
        {dirty && <span className="text-claude ml-2">· saving…</span>}
      </div>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Entry title"
        className="font-display text-[32px] font-semibold w-full outline-none bg-transparent placeholder:text-zinc-300"/>
      <input value={tagText} onChange={e=>setTagText(e.target.value)} placeholder="tags, comma separated"
        className="text-[12px] text-zinc-500 w-full outline-none bg-transparent placeholder:text-zinc-300 mt-2"/>
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="What happened today? What did you see, feel, learn?"
        className="w-full mt-6 outline-none bg-transparent text-[14px] text-zinc-700 leading-relaxed resize-none placeholder:text-zinc-300"
        rows={20}/>
    </div>
  );
};

window.JournalView = JournalView;
