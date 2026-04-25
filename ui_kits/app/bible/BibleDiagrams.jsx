// BibleDiagrams.jsx — clean SVG illustrations for each strategy card.
// Paper-and-ink aesthetic: warm bg, soft axes, ochre price, Claude-orange trigger.

const BibleDiagrams = (() => {
  const COL = {
    paper: "#fbfaf9",
    ink: "#3d3929",
    muted: "#c0bfbc",
    soft: "#e8e7e5",
    bull: "#5c8d63",
    bear: "#c0593e",
    accent: "#da7756",
    vwap: "#7a6a55",
  };

  const Frame = ({ children, title }) => (
    <svg viewBox="0 0 260 140" width="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="260" height="140" fill={COL.paper}/>
      <rect x="0" y="0" width="260" height="140" fill="none" stroke={COL.soft} strokeWidth="1"/>
      {/* grid */}
      {[30, 55, 80, 105].map(y => (
        <line key={y} x1="10" y1={y} x2="250" y2={y} stroke={COL.soft} strokeWidth="0.5" strokeDasharray="2 3"/>
      ))}
      {children}
      <text x="10" y="132" fill={COL.muted} fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="0.5">{title}</text>
    </svg>
  );

  // Candlestick helper
  const C = ({ x, o, c, h, l, w=6 }) => {
    const up = c < o; // SVG y inverted; "up" visually means close above open → c smaller
    const top = Math.min(o, c), bot = Math.max(o, c);
    const fill = up ? COL.bull : COL.bear;
    return (
      <g>
        <line x1={x} y1={h} x2={x} y2={l} stroke={fill} strokeWidth="1"/>
        <rect x={x - w/2} y={top} width={w} height={Math.max(1, bot-top)} fill={fill}/>
      </g>
    );
  };

  // VWAP pullback
  const vwap = (
    <Frame title="VWAP pullback · 5-min · CE above VWAP + ST">
      {/* VWAP line */}
      <line x1="10" y1="80" x2="250" y2="60" stroke={COL.vwap} strokeWidth="1" strokeDasharray="3 2"/>
      <text x="230" y="55" fill={COL.vwap} fontSize="8">VWAP</text>
      {/* SuperTrend line */}
      <line x1="10" y1="92" x2="250" y2="74" stroke={COL.accent} strokeWidth="0.8" strokeDasharray="1 2" opacity="0.6"/>
      {/* Candles */}
      <C x="25" o={90} c={100} h={88} l={102}/>
      <C x="40" o={100} c={92} h={90} l={103}/>
      <C x="55" o={92} c={85} h={82} l={94}/>
      <C x="70" o={85} c={78} h={75} l={86}/>
      <C x="85" o={78} c={72} h={70} l={80}/>
      <C x="100" o={72} c={78} h={70} l={80}/>
      <C x="115" o={78} c={85} h={76} l={86}/>
      {/* pullback */}
      <C x="130" o={85} c={72} h={70} l={86}/>
      <C x="145" o={72} c={68} h={66} l={74}/>
      {/* entry */}
      <C x="160" o={68} c={55} h={53} l={70}/>
      <C x="175" o={55} c={48} h={46} l={57}/>
      <C x="190" o={48} c={40} h={38} l={50}/>
      <C x="205" o={40} c={34} h={32} l={42}/>
      {/* Entry marker */}
      <circle cx="160" cy="55" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="166" y="53" fill={COL.accent} fontSize="8" fontWeight="600">BUY</text>
      {/* SL */}
      <line x1="140" y1="72" x2="215" y2="72" stroke={COL.bear} strokeWidth="0.6" strokeDasharray="2 2"/>
      <text x="218" y="74" fill={COL.bear} fontSize="7">SL</text>
    </Frame>
  );

  // O=H opening high
  const oh = (
    <Frame title="O = H · opening candle equals day high">
      <line x1="10" y1="40" x2="250" y2="40" stroke={COL.accent} strokeWidth="0.7" strokeDasharray="3 3"/>
      <text x="215" y="37" fill={COL.accent} fontSize="8">Open = High</text>
      {/* opening candle — big red with top at 40 */}
      <C x="30" o={40} c={75} h={40} l={77} w={10}/>
      <text x="20" y="90" fill={COL.muted} fontSize="7">9:15</text>
      <C x="55" o={75} c={70} h={68} l={77}/>
      <C x="75" o={70} c={72} h={66} l={75}/>
      <C x="95" o={72} c={78} h={70} l={82}/>
      <C x="115" o={78} c={85} h={77} l={88}/>
      <C x="135" o={85} c={92} h={83} l={95}/>
      {/* pullback + entry on PE side */}
      <C x="155" o={92} c={88} h={85} l={95}/>
      <C x="175" o={88} c={97} h={86} l={100}/>
      <C x="195" o={97} c={103} h={95} l={106}/>
      <C x="215" o={103} c={110} h={101} l={112}/>
      <circle cx="175" cy="92" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="181" y="90" fill={COL.accent} fontSize="8" fontWeight="600">PE</text>
    </Frame>
  );

  // 2-candle theory
  const twocandle = (
    <Frame title="2-candle theory · 3-min · 10:15 – 2:30">
      <line x1="10" y1="60" x2="250" y2="60" stroke={COL.vwap} strokeWidth="0.8" strokeDasharray="3 2"/>
      <text x="230" y="56" fill={COL.vwap} fontSize="8">VWAP</text>
      <C x="50" o={80} c={92} h={78} l={95}/>
      <C x="70" o={85} c={75} h={73} l={88}/>
      <C x="90" o={75} c={82} h={72} l={84}/>
      {/* Two green candles */}
      <C x="120" o={72} c={55} h={53} l={74} w={10}/>
      <text x="112" y="115" fill={COL.muted} fontSize="7">1</text>
      <C x="145" o={55} c={38} h={35} l={58} w={10}/>
      <text x="138" y="115" fill={COL.muted} fontSize="7">2</text>
      {/* Entry on break of 2nd high */}
      <line x1="157" y1="35" x2="230" y2="35" stroke={COL.accent} strokeWidth="0.7" strokeDasharray="3 3"/>
      <C x="170" o={38} c={28} h={26} l={40}/>
      <C x="190" o={28} c={22} h={20} l={30}/>
      <circle cx="170" cy="35" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="176" y="32" fill={COL.accent} fontSize="8" fontWeight="600">BUY</text>
    </Frame>
  );

  // W-M pattern
  const wm = (
    <Frame title="W pattern breakout · double bottom">
      {/* line chart W */}
      <polyline
        points="15,40 35,70 55,95 75,75 95,90 115,60 135,85 155,95 175,70 195,40 215,25 235,15"
        fill="none" stroke={COL.ink} strokeWidth="1.3" strokeLinejoin="round"
      />
      <line x1="15" y1="60" x2="235" y2="60" stroke={COL.accent} strokeWidth="0.7" strokeDasharray="4 3"/>
      <text x="5" y="57" fill={COL.accent} fontSize="7">neck</text>
      {/* bottoms */}
      <circle cx="55" cy="95" r="3" fill={COL.bear}/>
      <circle cx="155" cy="95" r="3" fill={COL.bear}/>
      {/* breakout */}
      <circle cx="195" cy="40" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="200" y="38" fill={COL.accent} fontSize="8" fontWeight="600">BUY CE</text>
    </Frame>
  );

  // Trend line breakout
  const tl = (
    <Frame title="Trend-line breakout">
      <line x1="20" y1="40" x2="240" y2="105" stroke={COL.ink} strokeWidth="1" strokeDasharray="3 3"/>
      <C x="35" o={50} c={45} h={42} l={55}/>
      <C x="55" o={48} c={55} h={45} l={57}/>
      <C x="75" o={55} c={60} h={52} l={62}/>
      <C x="95" o={60} c={65} h={58} l={68}/>
      <C x="115" o={65} c={72} h={62} l={74}/>
      <C x="135" o={72} c={78} h={70} l={80}/>
      {/* breakdown candle */}
      <C x="160" o={80} c={95} h={78} l={97} w={10}/>
      <circle cx="160" cy="92" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="167" y="92" fill={COL.accent} fontSize="8" fontWeight="600">SELL</text>
      <C x="185" o={95} c={105} h={93} l={107}/>
      <C x="210" o={105} c={115} h={103} l={117}/>
    </Frame>
  );

  // S&R breakout
  const sr = (
    <Frame title="Support / Resistance breakout">
      <line x1="10" y1="30" x2="250" y2="30" stroke={COL.bear} strokeWidth="0.8"/>
      <text x="10" y="27" fill={COL.bear} fontSize="8">R</text>
      <line x1="10" y1="100" x2="250" y2="100" stroke={COL.bull} strokeWidth="0.8"/>
      <text x="10" y="113" fill={COL.bull} fontSize="8">S</text>
      <C x="35" o={60} c={80} h={55} l={85}/>
      <C x="55" o={80} c={60} h={58} l={85}/>
      <C x="75" o={60} c={45} h={40} l={62}/>
      <C x="95" o={45} c={50} h={38} l={55}/>
      <C x="115" o={50} c={35} h={33} l={55}/>
      <C x="135" o={35} c={28} h={26} l={40}/>
      {/* breakout of R */}
      <C x="160" o={28} c={18} h={16} l={32} w={10}/>
      <circle cx="160" cy="22" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="167" y="20" fill={COL.accent} fontSize="8" fontWeight="600">BUY</text>
      <C x="185" o={18} c={12} h={10} l={22}/>
    </Frame>
  );

  // 10AM strategy
  const tenam = (
    <Frame title="10 AM BankNifty · range break">
      <rect x="20" y="50" width="100" height="45" fill={COL.soft} opacity="0.6"/>
      <text x="22" y="48" fill={COL.muted} fontSize="8">9:15 – 10:00 range</text>
      <line x1="120" y1="50" x2="240" y2="50" stroke={COL.bear} strokeWidth="0.6" strokeDasharray="2 2"/>
      <line x1="120" y1="95" x2="240" y2="95" stroke={COL.bull} strokeWidth="0.6" strokeDasharray="2 2"/>
      <C x="30" o={78} c={65} h={62} l={80}/>
      <C x="50" o={65} c={80} h={60} l={85}/>
      <C x="70" o={80} c={70} h={68} l={82}/>
      <C x="90" o={70} c={58} h={55} l={72}/>
      <C x="110" o={58} c={70} h={55} l={75}/>
      {/* break candle */}
      <C x="140" o={60} c={40} h={38} l={62} w={10}/>
      <circle cx="140" cy="45" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="147" y="43" fill={COL.accent} fontSize="8" fontWeight="600">BUY CE</text>
      <C x="165" o={40} c={30} h={28} l={45}/>
      <C x="190" o={30} c={20} h={18} l={35}/>
      <C x="215" o={20} c={15} h={13} l={25}/>
    </Frame>
  );

  // Zigzag
  const zigzag = (
    <Frame title="20:20 (zig-zag)">
      <polyline points="20,90 45,65 70,75 95,50 120,60 145,35 170,45 195,20 220,30 240,15"
        fill="none" stroke={COL.accent} strokeWidth="1.3" strokeLinejoin="round"/>
      {[
        [45,65],[95,50],[145,35],[195,20]
      ].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={COL.accent}/>))}
      {[
        [70,75],[120,60],[170,45],[220,30]
      ].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={COL.vwap}/>))}
      <text x="10" y="20" fill={COL.muted} fontSize="8">Each swing ≈ 20 pts</text>
    </Frame>
  );

  // Traffic light
  const traffic = (
    <Frame title="Traffic light · 9:16 onwards">
      <text x="10" y="20" fill={COL.muted} fontSize="8">ignore 9:15 candle</text>
      <C x="25" o={70} c={75} h={66} l={78}/>
      {/* pair */}
      <C x="50" o={75} c={55} h={52} l={78} w={10}/>
      <text x="42" y="108" fill={COL.muted} fontSize="7">G</text>
      <C x="75" o={55} c={78} h={52} l={82} w={10}/>
      <text x="70" y="108" fill={COL.muted} fontSize="7">R</text>
      {/* Range markers */}
      <line x1="40" y1="52" x2="230" y2="52" stroke={COL.bear} strokeWidth="0.6" strokeDasharray="2 2"/>
      <text x="233" y="55" fill={COL.bear} fontSize="7">High</text>
      <line x1="40" y1="82" x2="230" y2="82" stroke={COL.bull} strokeWidth="0.6" strokeDasharray="2 2"/>
      <text x="233" y="85" fill={COL.bull} fontSize="7">Low</text>
      <C x="100" o={78} c={70} h={68} l={80}/>
      <C x="120" o={70} c={75} h={68} l={80}/>
      {/* break high */}
      <C x="145" o={70} c={42} h={40} l={74} w={10}/>
      <circle cx="145" cy="46" r="4" fill="none" stroke={COL.accent} strokeWidth="1.5"/>
      <text x="152" y="44" fill={COL.accent} fontSize="8" fontWeight="600">BUY</text>
      <C x="175" o={42} c={30} h={28} l={46}/>
      <C x="200" o={30} c={22} h={20} l={34}/>
    </Frame>
  );

  return { vwap, oh, twocandle, wm, tl, sr, tenam, zigzag, traffic };
})();

window.BibleDiagrams = BibleDiagrams;
