// TradeAI.jsx — AI report chat-style view
const TradeAIView = () => (
  <div className="max-w-3xl mx-auto">
    <div className="flex items-baseline justify-between mb-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold flex items-center gap-2">Trade AI <ClaudeMark size={24}/></h1>
        <div className="text-[12px] text-zinc-500 mt-1">Your personal trading analyst · Powered by Claude</div>
      </div>
      <button className="button-shadow-white rounded-md px-3 py-1.5 text-[12px]">New report</button>
    </div>
    <div className="space-y-6 leading-7 text-[14px]">
      <p className="text-zinc-700"><span className="font-semibold">Summary.</span> Over the last 30 days you closed 64 trades — 42 winners, 22 losers. Net P/L: <span className="font-mono-display text-buy">+3.140,80 €</span>. Your win rate (65,6%) is healthy, but almost all your edge comes from a single strategy and session.</p>
      <div className="flex justify-end">
        <div className="bg-darkPrimary rounded-full py-2.5 px-5 max-w-[70%]">
          <p className="text-[13px] text-zinc-700">Which strategy is pulling most of the P/L?</p>
        </div>
      </div>
      <div>
        <p className="text-zinc-700">Opening Range Breakout accounts for <span className="font-semibold">71%</span> of gross profit across just <span className="font-semibold">38%</span> of trades. VWAP Reversion is flat to slightly negative this month — win rate held, but your average loser grew 22%.</p>
        <div className="bg-secondary rounded-xl p-4 mt-3 border border-zinc-200/60">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono-display mb-2">Observation</div>
          <p className="text-[13px] text-zinc-700">Losers in VWAP Reversion cluster in the 13:00–15:00 window, after the London close. Consider restricting the strategy to 09:30–12:00 NY or paper-trading the afternoon setup for two weeks.</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-darkPrimary rounded-full py-2.5 px-5 max-w-[70%]">
          <p className="text-[13px] text-zinc-700">What about my worst day?</p>
        </div>
      </div>
      <div>
        <p className="text-zinc-700">March 11 was your worst day this month: <span className="font-mono-display text-sell">-420,00 €</span> across 5 trades, all in the News Fade strategy following the CPI release. Three of five entries violated your "Setup confirmed by a 5-min close" rule.</p>
      </div>
      <div className="flex gap-1.5 pt-4">
        <span className="dot" style={{animationDelay:'0s'}}></span>
        <span className="dot" style={{animationDelay:'0.2s'}}></span>
        <span className="dot" style={{animationDelay:'0.4s'}}></span>
      </div>
    </div>
    {/* composer */}
    <div className="sticky bottom-4 mt-8">
      <div className="bg-white rounded-2xl border border-zinc-200 p-3 shadow-md flex items-center gap-2">
        <input placeholder="Ask a follow-up question…" className="flex-1 bg-transparent outline-none text-[13px] px-3"/>
        <button className="button-shadow rounded-lg px-3 py-2 text-primary"><ArrowRight size={14}/></button>
      </div>
    </div>
  </div>
);
window.TradeAIView = TradeAIView;
