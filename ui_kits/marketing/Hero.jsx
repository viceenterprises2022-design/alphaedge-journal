// Hero.jsx — full-bleed hero with PixiJS soft color-strip backdrop + trust pill
const { useEffect, useRef } = React;

const PixiBackdrop = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.PIXI) return;
    const app = new PIXI.Application({ resizeTo: ref.current, backgroundAlpha: 0, antialias: true });
    ref.current.appendChild(app.view);
    const colors = [0x9999ff, 0xfac666, 0xe16540, 0x76b562, 0xda7756];
    const bars = [];
    for (let i = 0; i < 18; i++) {
      const g = new PIXI.Graphics();
      const c = colors[i % colors.length];
      g.beginFill(c, 0.12);
      g.drawRoundedRect(0, 0, 120 + Math.random() * 160, 16, 8);
      g.endFill();
      g.x = (i % 6) * 240 + Math.random() * 40;
      g.y = 80 + Math.floor(i / 6) * 80 + Math.random() * 30;
      g.__drift = 0.15 + Math.random() * 0.25;
      app.stage.addChild(g);
      bars.push(g);
    }
    let t = 0;
    app.ticker.add(() => {
      t += 0.01;
      bars.forEach((b, i) => {
        b.x += Math.sin(t + i) * b.__drift;
      });
    });
    return () => { app.destroy(true, { children: true }); };
  }, []);
  return <div ref={ref} className="absolute inset-0 overflow-hidden" />;
};

const Hero = () => (
  <section className="relative overflow-hidden pt-14 md:pt-24 pb-28">
    <PixiBackdrop />
    <div className="relative z-10 flex flex-col items-center text-center px-6">
      <div className="flex items-center gap-2 border border-zinc-200 bg-white rounded-full px-4 py-1.5 text-[12px] text-zinc-600 shadow-sm mb-8">
        <span className="relative inline-flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></span>
          <span className="relative inline-block w-2 h-2 rounded-full bg-green-500"></span>
        </span>
        Trusted by over 1,000 traders worldwide
      </div>
      <h1 className="main-text text-[56px] md:text-[88px] leading-[1.02] tracking-tight max-w-5xl">
        AlphaEdge Journal
      </h1>
      <div className="text-[28px] md:text-[42px] mt-3 font-semibold font-display text-[#3d3929]">
        Trade like a <mark className="bg-gradient-to-r from-orange-500/60 via-orange-500/80 to-amber-400/60 text-[#3d3929] px-2 rounded">professional</mark>.
      </div>
      <p className="mt-8 max-w-xl text-[14px] text-zinc-500 leading-relaxed">
        Simple and intuitive way to collect, visualise and reason about your trades. Free forever, powered by Claude.
      </p>
      <div className="flex gap-3 mt-8">
        <button className="button-shadow rounded-[12px] text-[14px] px-6 py-3 text-primary flex items-center gap-2">
          Get started — for free <ArrowRight size={16} />
        </button>
        <button className="button-shadow-white rounded-[12px] text-[14px] px-6 py-3 text-[#4a4340]">
          Watch the demo
        </button>
      </div>
      {/* avatar strip */}
      <div className="flex items-center gap-3 mt-8">
        <div className="flex -space-x-2">
          {["#76b562","#fac666","#9999ff","#e16540"].map((c,i) => (
            <div key={i} className="w-7 h-7 rounded-full ring-2 ring-white" style={{background:c}}></div>
          ))}
        </div>
        <span className="text-[12px] text-zinc-500">Join 1,240+ traders journaling this week</span>
      </div>
    </div>
  </section>
);
window.Hero = Hero;
