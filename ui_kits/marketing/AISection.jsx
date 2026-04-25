// AISection.jsx — Claude report teaser
const AISection = () => (
  <section className="px-3 py-10">
    <div className="bg-white relative rounded-3xl border border-zinc-200 overflow-hidden">
      <div className="relative py-32 md:py-40 px-6 text-center">
        <div className="absolute top-10 left-0 right-0 flex justify-center gap-8 opacity-50">
          {["#9999ff","#fac666","#76b562","#e16540","#da7756"].map((c,i)=>(
            <div key={i} className="w-24 h-2 rounded-full" style={{ background: c }}/>
          ))}
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 opacity-50 rotate-180">
          {["#9999ff","#fac666","#76b562","#e16540","#da7756"].map((c,i)=>(
            <div key={i} className="w-24 h-2 rounded-full" style={{ background: c }}/>
          ))}
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold max-w-3xl mx-auto leading-tight tracking-tight">
          The best AI trading journal.
        </h2>
        <p className="text-[14px] text-zinc-500 max-w-lg mx-auto mt-6 leading-relaxed">
          Stop guessing why some trades succeed while others fail. AlphaEdge Journal's advanced AI pattern recognition can identify hidden factors affecting your performance that might otherwise go unnoticed.
        </p>
        <div className="mt-10 inline-flex flex-col items-center gap-2 group cursor-pointer">
          <span className="flex gap-2 items-center text-[#3d3929]">Get report <MoveUpRight size={14}/></span>
          <span className="block h-px w-0 bg-emerald-400 group-hover:w-full transition-all duration-300"/>
        </div>
        <div className="mt-20 flex items-center justify-center gap-2 text-[#3d3929]">
          <span className="text-[15px]">Powered by Claude</span>
          <ClaudeMark size={22} />
        </div>
      </div>
    </div>
  </section>
);
window.AISection = AISection;
