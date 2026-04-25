// Shell.jsx — app chrome: dark desk + floating paper sheet + top nav + sidebar
const { useState } = React;

const Shell = ({ children, activePage, setActivePage }) => {
  const nav = [
    { id: 'calendar', l: 'Calendar', i: Calendar },
    { id: 'history', l: 'History', i: FileText },
    { id: 'statistics', l: 'Statistics', i: ArrowRight },
    { id: 'trade-ai', l: 'Trade AI', i: Book },
    { id: 'playbook', l: 'Playbook', i: Book },
    { id: 'strategies', l: 'Strategies', i: CheckCircle2 },
    { id: 'journal', l: 'Journal', i: PenLine },
  ];
  return (
    <div className="min-h-screen bg-darkPrimary p-2">
      <div className="bg-white rounded-t-3xl border border-zinc-200">
        <header className="px-6 py-3 flex items-center justify-between border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <img src="../../assets/logo.svg" className="w-7 h-7" alt="logo"/>
            <span className="font-semibold text-[15px]">AlphaEdge Journal</span>
            <span className="text-zinc-400">&</span>
            <ClaudeMark size={20}/>
          </div>
          <div className="flex items-center gap-1">
            {nav.map(n => (
              <a key={n.id} onClick={() => setActivePage(n.id)} className={`px-3 py-1.5 rounded-md text-[13px] cursor-pointer flex items-center gap-1.5 ${activePage===n.id ? 'bg-darkPrimary text-[#3d3929]' : 'text-zinc-600 hover:bg-secondary'}`}>
                {n.l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input placeholder="Search trades…" className="bg-secondary rounded-md pl-8 pr-3 py-1.5 text-[12px] w-52 border border-transparent focus:border-zinc-200 outline-none" />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"><Search size={13}/></span>
            </div>
            <button onClick={() => window.dispatchEvent(new Event('tj-open-trade-dialog'))} className="button-shadow rounded-[8px] text-[12px] px-3 py-1.5 text-primary flex items-center gap-1.5">
              <Plus size={13}/> Log a trade
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-customBlue to-customOrange"></div>
          </div>
        </header>
        <div className="flex">
          <aside className="w-56 border-r border-zinc-100 p-3 bg-secondary/40 min-h-[calc(100vh-110px)]">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 py-2 font-mono-display">Workspace</div>
            {nav.map(n => {
              const I = n.i;
              return (
                <div key={n.id} onClick={() => setActivePage(n.id)} className={`sidebar-item ${activePage===n.id ? 'active' : ''}`}>
                  <I size={15}/><span>{n.l}</span>
                </div>
              );
            })}
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 px-3 py-2 mt-4 font-mono-display">Account</div>
            <div className="sidebar-item"><Settings size={15}/><span>Settings</span></div>
            <div className="sidebar-item"><ExternalLink size={15}/><span>Feedback</span></div>
          </aside>
          <main className="flex-1 p-8 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
window.Shell = Shell;
