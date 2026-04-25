// JournalSection.jsx — journaling feature, mock window
const JournalSection = () => (
  <section className="py-24 px-6 md:px-16 bg-primary">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claudeBackground text-claude text-[12px] font-medium">
          <Book size={12}/><span>New feature</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-tight tracking-tight">
          Master your psychology with <span className="text-claude">Daily Journaling</span>
        </h2>
        <p className="text-[14px] text-zinc-500 mt-6 max-w-md leading-relaxed">
          The difference between a gambler and a trader is documentation. Keep track of your thoughts,
          emotions, and market observations to identify patterns in your behavior.
        </p>
        <div className="space-y-3 mt-8">
          {["Rich text editor with markdown support","Calendar view for easy navigation","Link entries to specific trades"].map(l => (
            <div key={l} className="flex items-center gap-3 text-[13px]"><CheckCircle2 size={16} className="text-buy"/><span>{l}</span></div>
          ))}
        </div>
        <button className="mt-8 button-shadow rounded-[12px] text-[14px] px-5 py-2.5 text-primary flex items-center gap-2">Start journaling <ArrowRight size={14}/></button>
      </div>
      <div className="flex-1 w-full max-w-xl">
        <div className="relative rounded-2xl bg-white shadow-2xl shadow-zinc-200 border border-zinc-200 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100 bg-zinc-50/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80"/>
              <div className="w-3 h-3 rounded-full bg-amber-400/80"/>
              <div className="w-3 h-3 rounded-full bg-green-400/80"/>
            </div>
            <div className="ml-4 flex items-center gap-2 text-[11px] text-zinc-400 bg-white px-3 py-1 rounded-md border border-zinc-100">
              <Calendar size={12}/><span>Today's Entry</span>
            </div>
          </div>
          <div className="p-8 space-y-6 min-h-[420px] relative">
            <div>
              <h3 className="text-2xl font-semibold text-zinc-800">Monday, March 9</h3>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-500">#psychology</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-500">#review</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-claudeBackground border border-claude/20 text-[#3d3929] text-[12px]">
              💡 <strong>Note to self:</strong> Don't chase the opening range breakout today. Wait for the retest.
            </div>
            <div className="space-y-2 text-[13px] text-zinc-600">
              <p>Market opened with a gap up. Feeling a bit FOMO but sticking to the plan. Noticed strong volume on the tech sector.</p>
              <p><strong>10:30 AM:</strong> Took a long position on SPY. Setup looked clean, risk/reward is 1:3.</p>
            </div>
            <div className="pl-4 border-l-2 border-zinc-200 italic text-zinc-500 text-[12px]">
              "The goal of a successful trader is to make the best trades. Money is secondary."
            </div>
            <div className="absolute bottom-6 right-6 h-12 w-12 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg text-white">
              <PenLine size={18}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
window.JournalSection = JournalSection;
