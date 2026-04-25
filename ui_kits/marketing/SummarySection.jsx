// SummarySection.jsx — 3-up feature strip
const SummarySection = () => (
  <section className="py-24 px-6 md:px-16">
    <div className="max-w-6xl mx-auto">
      <span className="eyebrow">Summary</span>
      <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 max-w-2xl leading-tight tracking-tight">
        Every trade, every decision, every lesson.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {[
          { t: "Log a trade in 8 seconds", d: "Symbol, direction, entry, exit, strategy — done. Optional screenshots and notes.", c: "#9999ff" },
          { t: "See patterns automatically", d: "Correlations between strategy, session, emotion and P/L surface in your dashboard.", c: "#fac666" },
          { t: "Ship better rules", d: "Archive rules that didn't work. Promote the ones that do. Your strategy is a living document.", c: "#e16540" },
        ].map(f => (
          <div key={f.t} className="bg-secondary rounded-2xl p-6 border border-zinc-200/80">
            <div className="w-8 h-8 rounded-lg mb-6" style={{ background: f.c, opacity: 0.7 }}></div>
            <div className="font-display text-[18px] font-semibold">{f.t}</div>
            <div className="text-[13px] text-zinc-500 mt-2 leading-relaxed">{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
window.SummarySection = SummarySection;
