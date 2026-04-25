// ReviewsSection.jsx — two drifting marquees
const reviews = [
  { n: "Alex R.", h: "Trader, 4 yrs", t: "Finally a journal that's actually free and doesn't nag me about a trial. The calendar alone is worth it." },
  { n: "Priya K.", h: "Swing trader", t: "The AI report pointed out I was 63% better on mornings than afternoons. Changed my whole schedule." },
  { n: "Marco D.", h: "Prop desk", t: "We push ~40 trades/day and this holds up. The German-locale numbers are a nice touch." },
  { n: "Sienna T.", h: "Options trader", t: "Strategy rules with priorities is exactly how my checklist works on paper. Zero learning curve." },
  { n: "Jonah P.", h: "Crypto", t: "Journaling on the same page as my trade log means I actually do it. Don't underestimate that." },
  { n: "Yui S.", h: "FX intraday", t: "Clean. Fast. The color palette feels like reading a book, not staring at a Bloomberg terminal." },
];
const ReviewCard = ({ r }) => (
  <div className="w-[320px] shrink-0 bg-white rounded-xl border border-zinc-200 p-5 shadow-md">
    <div className="flex gap-1 text-amber-400 mb-3">{[...Array(5)].map((_,i)=> <Star key={i} size={13}/>)}</div>
    <p className="text-[13px] text-[#3d3929] leading-relaxed">{r.t}</p>
    <div className="mt-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-customBlue to-customOrange"></div>
      <div>
        <div className="text-[13px] font-semibold">{r.n}</div>
        <div className="text-[11px] text-zinc-500">{r.h}</div>
      </div>
    </div>
  </div>
);
const ReviewsSection = () => (
  <section className="py-24 overflow-hidden">
    <div className="text-center px-6 mb-14">
      <span className="eyebrow">Reviews</span>
      <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 tracking-tight">Loved by traders, globally.</h2>
    </div>
    <div className="relative space-y-6">
      <div className="fading-gradient"/>
      <div className="flex gap-6 animate-slide-right">
        {[...reviews, ...reviews].map((r,i) => <ReviewCard key={i} r={r}/>)}
      </div>
      <div className="flex gap-6 animate-slide-left">
        {[...reviews.slice().reverse(), ...reviews].map((r,i) => <ReviewCard key={i} r={r}/>)}
      </div>
    </div>
  </section>
);
window.ReviewsSection = ReviewsSection;
