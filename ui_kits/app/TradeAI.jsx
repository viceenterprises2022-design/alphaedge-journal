// TradeAI.jsx — chat with Claude using real trade data as context
const TradeAIView = () => {
  const trades = window.useTrades();
  const { all: allStrategies } = window.useStrategies();
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const buildContext = () => {
    if (trades.length === 0) return 'The user has not logged any trades yet.';
    const wins = trades.filter(t => (t.pnl||0) > 0);
    const losses = trades.filter(t => (t.pnl||0) < 0);
    const net = trades.reduce((a,t)=>a+(t.pnl||0),0);
    const stratName = (id) => allStrategies.find(s => s.id === id)?.name || 'No strategy';
    const recent = trades.slice(0, 30).map(t => ({
      date: new Date(t.loggedAt).toISOString().slice(0,10),
      time: new Date(t.loggedAt).toTimeString().slice(0,5),
      symbol: t.symbol,
      direction: t.direction,
      qty: t.qty,
      entry: t.entry,
      exit: t.exit,
      pnl: t.pnl,
      strategy: stratName(t.strategyId),
      mistakes: Object.keys(t.mistakes||{}).filter(k => t.mistakes[k]).map(k => window.BibleData.mistakes[parseInt(k)]).filter(Boolean),
      rulesFollowed: Object.values(t.rulesFollowed||{}).filter(v=>v===true).length,
      rulesBroken: Object.values(t.rulesFollowed||{}).filter(v=>v===false).length,
      learning: t.learning || null,
    }));
    return `User's trade journal summary:
- Total trades: ${trades.length} (${wins.length} winners, ${losses.length} losers)
- Net P/L: ${window.fmtMoney(net,{signed:true})}
- Win rate: ${(wins.length/trades.length*100).toFixed(1)}%

Most recent trades (up to 30):
${JSON.stringify(recent, null, 2)}`;
  };

  const send = async (q) => {
    const question = (q || input).trim();
    if (!question || busy) return;
    setMessages(m => [...m, { role: 'user', content: question }]);
    setInput('');
    setBusy(true);
    try {
      const ctx = buildContext();
      const reply = await window.claude.complete({
        messages: [{
          role: 'user',
          content: `You are AlphaEdge, a personal trading analyst. Be concise, specific, and reference the actual numbers. Use plain text (no markdown headers). Format money with the user's currency symbol.\n\n${ctx}\n\nUser question: ${question}`
        }]
      });
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', content: 'Sorry, I had trouble reaching Claude. Please try again.' }]);
    } finally {
      setBusy(false);
    }
  };

  const suggestions = trades.length === 0
    ? ['How should I structure my journal?', 'What makes a good trading strategy?', 'How do I find my edge?']
    : ['Which strategy is pulling most of my P/L?', 'What is my worst recurring mistake?', 'When should I trade — what hour is best?'];

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-160px)]">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h1 className="font-display text-[28px] font-semibold flex items-center gap-2">Trade AI <ClaudeMark size={24}/></h1>
          <div className="text-[12px] text-zinc-500 mt-1">Your personal trading analyst · Powered by Claude · {trades.length} trade{trades.length!==1?'s':''} in context</div>
        </div>
        {messages.length > 0 && <button onClick={()=>setMessages([])} className="button-shadow-white rounded-md px-3 py-1.5 text-[12px]">New report</button>}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2 space-y-5 leading-7 text-[14px]">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <div className="font-display text-[18px] mb-2">Ask anything about your trades</div>
            <div className="text-[13px] text-zinc-500 mb-6 max-w-md mx-auto">
              {trades.length === 0 ? "Once you log trades, I'll analyse them for you." : "I have access to all your logged trades, strategies, and tagged mistakes."}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map(s => (
                <button key={s} onClick={()=>send(s)} className="bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-[12px] hover:border-claude/40 hover:bg-claude/5">{s}</button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m,i) => (
          m.role === 'user' ? (
            <div key={i} className="flex justify-end">
              <div className="bg-darkPrimary rounded-2xl py-2.5 px-5 max-w-[70%]">
                <p className="text-[13px] text-zinc-700">{m.content}</p>
              </div>
            </div>
          ) : (
            <div key={i} className="text-zinc-700 whitespace-pre-wrap">{m.content}</div>
          )
        ))}
        {busy && (
          <div className="flex gap-1.5 pt-2">
            <span className="dot" style={{animationDelay:'0s'}}></span>
            <span className="dot" style={{animationDelay:'0.2s'}}></span>
            <span className="dot" style={{animationDelay:'0.4s'}}></span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="bg-white rounded-2xl border border-zinc-200 p-3 shadow-md flex items-center gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
            placeholder="Ask a follow-up question…" className="flex-1 bg-transparent outline-none text-[13px] px-3"/>
          <button onClick={()=>send()} disabled={busy||!input.trim()} className="button-shadow rounded-lg px-3 py-2 text-primary disabled:opacity-40"><ArrowRight size={14}/></button>
        </div>
      </div>
    </div>
  );
};
window.TradeAIView = TradeAIView;
