// Footer.jsx — signature 40rem dark CTA block + footer nav
const Footer = () => (
  <footer className="p-3">
    <div className="bg-[#1a1a1a] text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-[11px]">
        <span className="relative inline-flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
        </span>
        Join for free today
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-semibold mt-6 max-w-3xl leading-[1.05] tracking-tight">
        Join thousands of smart traders. <span className="text-white/40">Start your journal today.</span>
      </h2>
      <div className="mt-10 flex gap-3">
        <button className="bg-white text-[#1a1a1a] rounded-[12px] text-[14px] px-6 py-3 font-medium flex items-center gap-2">
          Get started — for free <ArrowRight size={14}/>
        </button>
        <button className="border border-white/20 rounded-[12px] text-[14px] px-6 py-3 text-white/80 hover:bg-white/5">
          Talk to us
        </button>
      </div>
      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-[12px] text-white/50">
        <div className="flex items-center gap-2">
          <img src="../../assets/logo.svg" className="w-7 h-7" alt="logo"/>
          <span>AlphaEdge Journal & <ClaudeMark size={14} color="#da7756"/> Claude — 2026</span>
        </div>
        <div className="flex gap-6">
          <a className="hover:text-white">Docs</a>
          <a className="hover:text-white">Privacy</a>
          <a className="hover:text-white">Terms</a>
          <a className="hover:text-white flex items-center gap-1.5">GitHub <Github size={12}/></a>
          <a className="hover:text-white flex items-center gap-1.5">X <Twitter size={11}/></a>
        </div>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;
