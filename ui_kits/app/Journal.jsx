// Journal.jsx — in-app journal with sidebar of entries
const JournalView = () => (
  <div className="grid grid-cols-[240px_1fr] gap-6 h-[calc(100vh-180px)]">
    <div className="bg-white rounded-xl border border-zinc-200 p-3 overflow-y-auto">
      <div className="flex items-center justify-between px-2 mb-2">
        <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono-display">Entries</div>
        <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center"><Plus size={13}/></div>
      </div>
      {[
        { d: "Mon · Mar 9", t: "Opening range day", active: true },
        { d: "Fri · Mar 6", t: "Held too long on NVDA" },
        { d: "Thu · Mar 5", t: "FOMC prep notes" },
        { d: "Wed · Mar 4", t: "Clean morning session" },
        { d: "Tue · Mar 3", t: "Revenge trade debrief" },
        { d: "Mon · Mar 2", t: "Weekly plan" },
      ].map((e,i) => (
        <div key={i} className={`px-3 py-2 rounded-lg cursor-pointer mb-1 ${e.active ? 'bg-secondary' : 'hover:bg-secondary/60'}`}>
          <div className="text-[10px] text-zinc-400 font-mono-display uppercase tracking-wider">{e.d}</div>
          <div className="text-[13px] truncate">{e.t}</div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-xl border border-zinc-200 p-8 overflow-y-auto">
      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-4 font-mono-display uppercase tracking-wider">
        <Calendar size={12}/> Monday, March 9 · 2026
      </div>
      <h2 className="font-display text-[32px] font-semibold">Opening range day.</h2>
      <div className="flex gap-2 mt-3">
        <span className="px-2 py-0.5 rounded text-[10px] bg-secondary text-zinc-500">#psychology</span>
        <span className="px-2 py-0.5 rounded text-[10px] bg-secondary text-zinc-500">#review</span>
        <span className="px-2 py-0.5 rounded text-[10px] bg-claudeBackground text-claude">#strategy/ORB</span>
      </div>
      <div className="mt-6 space-y-4 text-[13px] text-zinc-700 leading-relaxed max-w-2xl">
        <div className="p-4 rounded-lg bg-claudeBackground border border-claude/20 text-[#3d3929]">
          💡 <strong>Note to self:</strong> Don't chase the opening range breakout today. Wait for the retest.
        </div>
        <p>Market opened with a gap up. Feeling a bit FOMO but sticking to the plan. Noticed strong volume on the tech sector.</p>
        <p><strong>10:30 AM.</strong> Took a long position on SPY. Setup looked clean, risk/reward is 1:3. Stop below the 5-min low.</p>
        <p><strong>11:45 AM.</strong> Exited at 2R. The retest held exactly where I wanted it. Logged the trade as ORB-38.</p>
        <div className="pl-4 border-l-2 border-zinc-200 italic text-zinc-500">
          "The goal of a successful trader is to make the best trades. Money is secondary."
        </div>
        <p>Afterthought: the three best trades this week were all on the retest, not the breakout. Going to adjust the rule priority in ORB to require a retest flag.</p>
      </div>
      <div className="mt-10 pt-6 border-t border-zinc-100 text-[11px] text-zinc-500 font-mono-display uppercase tracking-wider">
        Linked trades: <span className="text-claude">ORB-38 · ORB-39 · VWAP-12</span>
      </div>
    </div>
  </div>
);
window.JournalView = JournalView;
