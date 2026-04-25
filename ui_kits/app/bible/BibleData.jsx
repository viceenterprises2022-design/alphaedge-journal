// BibleData.jsx — Structured content from the user's trading bible (lightly polished).
// Voice preserved: "Discipline Bhagwan che!", "Trade with Shanti se", personal framing.

const BibleData = {
  affirmations: [
    "I am an intelligent trader.",
    "I deserve to make a lot of money.",
    "I follow all trading rules to make money.",
    "I follow risk management for every trade I take.",
    "I am fearless and graceful in admitting my defeat.",
    "I am humble in my victories.",
    "My confidence in trading is growing each day.",
    "I attract a lot of trading opportunities.",
    "I enjoy freedom of time in my trading profession.",
    "I am a complete trader.",
    "I strictly follow stop loss for each trade — max 20-25 points. This is the main thumb rule.",
    "I follow a daily trading journal & analyse the mistakes I made.",
    "To be a successful trader is not easy — each day you fight within.",
    "Money management, psychology, risk management, setups — focus here. 90% lose because they don't. 5% live their dream life.",
  ],
  goals: [
    "Freedom of money.",
    "Freedom of time — just 5 hrs/day, 5 days/week.",
    "Make 1% a day.",
    "Maintain the journal. Analyse mistakes so they don't repeat.",
  ],

  // Pre-market ritual — distilled from Preparation + Mindset sheets
  ritual: [
    { t: "Meditate, 20 min", d: "Clear the RAM. Be cool. Trade with Shanti se." },
    { t: "Read affirmations", d: "Re-wire the mindset before the bell." },
    { t: "Mark levels", d: "PDH, PDL, VWAP, 200 EMA, key S/R, trendlines." },
    { t: "Set the daily plan", d: "Max loss = ₹50k or yesterday's profit. Target = 1%." },
    { t: "Pick setups", d: "Only trade what matches your playbook. Everything else is a pass." },
  ],

  // Execution rules from Execution sheet
  execution: [
    "Plan the trade like a fresh start. Follow every discipline / rule / setup / money-mgmt.",
    "Take a trade only on your setup. No setup → no trade.",
    "Place actual SL in the system the moment entry fills. (25-30 pts system SL if planning 20 pts mental SL.)",
    "Be mentally aware of monetary risk before entry: SL pts × quantity.",
    "Never trade without an SL and without a setup. That blows accounts.",
    "Real losses come from mental SLs — greed to recover grows them. Be the algo. Take small losses.",
    "Quantity: 1k-3k with pyramiding.",
    "Max daily loss: ₹50k OR yesterday's profit. Whichever is smaller. No exceptions.",
    "Exiting at SL is in your hand. Big loss is your choice.",
    "Break 3-5 min every 30-45 min. Clears bias.",
    "Cap at 40-50 trades/day. Forces setup-only entries and controls brokerage.",
    "Don't trade all day. Full-day screen time = stressed mind = revenge trades.",
    "CE or PE: whichever side of VWAP on the 5-min. Draw trendlines continuously.",
    "Be consistent. Lose small. Wait for a good entry. Trail 20-30 pts. Sync with the market. Expect little, survive long.",
  ],

  // Discipline
  discipline: [
    "Discipline Bhagwan che — discipline is the key.",
    "Exit strictly at SL. Wait for the next opportunity.",
    "Never sit in a trade below SL. SL loss is recoverable; below-SL loss is not.",
    "Trade only until the daily target (5% / 1% — whatever you set). Don't convert profits into losses.",
    "Big loss day? Stay cool. A single banknifty candle recovers everything. Patience.",
    "When 3 trades hit SL OR cumulative loss = ₹50k → STOP. No more trades.",
    "Stress stays off the family. Target done → shut the screen → go to office work.",
    "Negative days are part of the game. Just 1-2 good days bring it back — if capital is preserved.",
  ],

  // Trading rules + expiry rules
  rules: [
    { grp: "Daily rules", items: [
      "Never carry overnight positions. Pure intraday. Overnight cuts 30% of losses instantly.",
      "Journal every trade. Time, type, setup, mistake, learning.",
      "Homework before open: bias, levels, event check.",
      "3 SL in a row → stop for the day.",
    ]},
    { grp: "Expiry day rules", items: [
      "Expiry is volatile. Start with small quantity. Wait for clean opportunities after 12:30.",
      "No big quantity after 12:30. Small qty (200-300) with strict SL only.",
      "On expiry, trade at least 200-point ITM strike. High premium is fine.",
      "No ad-hoc trades on expiry. Capital is precious.",
      "Do NOT trade after 2:30 PM on expiry. Movement becomes illogical. Settlement noise.",
    ]},
  ],

  // 49 mistakes
  mistakes: [
    "Quick jump to morning / opening trades",
    "Not exiting with loss, thinking market will reverse",
    "Deploying full capital",
    "Averaging loss-making trades",
    "Averaging = higher position, exit at bottom",
    "Left with no capital to trade further",
    "Staying in trade against the trend",
    "Not cutting losses",
    "Not booking reasonable profits, expecting more",
    "Trading OTM strikes because of cheap premium",
    "Can't handle expiry days",
    "Not following SL in system — only in mind",
    "Trading all day",
    "Hanging on until 3:20 PM",
    "Entering on O=H when strike is below VWAP / SuperTrend",
    "Unable to trail in profits",
    "Holding winners but exiting in small profit",
    "Can't flip direction quickly when chart changes",
    "Revenge trading",
    "Chasing the market",
    "Not waiting for opportunity",
    "Stuck in event-day volatility",
    "Changing setups frequently",
    "Pouring more capital to recover losses",
    "Setting mind to 'recovery mode'",
    "Can't tune mind to small profit after a big loss",
    "Comparing P&L to other people's screenshots",
    "Not realising OTM premium decay",
    "Full capital on a single broker account",
    "Judging opening as trend of the day",
    "Building to full position size too quickly",
    "Market orders on huge qty after 1-2 candles",
    "Not waiting for breakout / breakdown",
    "Giving back morning profit in the afternoon",
    "Itchy fingers — trading every candle",
    "Aggressive trades",
    "Unable to ride the trend",
    "Assuming previous day's pattern continues",
    "No defined style — scalp or positional",
    "Huge overnight positions → sleepless",
    "Not checking multiple timeframes",
    "Emotional distraction — family watching the screen",
    "Not learning support & resistance",
    "Not rejecting bad trades",
    "Too much screen time",
    "Loving loss-making trades",
    "Not fixing targets",
    "Not maintaining the trading journal",
    "Not learning from earlier mistakes",
  ],

  // Mindset principles (Mindset Management sheet, distilled)
  mindset: [
    {
      t: "The Holy Grail",
      b: "\"The key to trading success is emotional discipline. If intelligence were the key, there would be a lot more people making money trading.\"",
    },
    {
      t: "Be the algo",
      b: "Algos have no emotion, no greed. They buy at their level, sell at their level. Be the tortoise. Slow, steady, sure.",
    },
    {
      t: "Value of money",
      b: "₹10-15k a day is a handsome income. Which business gives that? Decide: today I close in green only.",
    },
    {
      t: "Believe in process",
      b: "Successful people set a process, follow it, and become billionaires. Strategy alone isn't enough — you need psychology to match.",
    },
    {
      t: "Emotion & greed",
      b: "Emotion and greed are the real enemy. You are here to make profit, not love a position. Love your spouse. Not your CE/PE.",
    },
    {
      t: "Consistency",
      b: "Consistency in rules, setup, psychology, money management. Once it becomes your core, the game is simple — just add size.",
    },
    {
      t: "Patience",
      b: "Wait for the trade. Wait for the move. Believe your analysis. Patience compounds.",
    },
    {
      t: "Revenge",
      b: "Trade for recovery once, and you'll trade for recovery your whole life. Today was not my day. Run away. Come back tomorrow.",
    },
    {
      t: "No fear",
      b: "Entering, exiting, trailing — all in your hands. Corrective action keeps capital safe. So why fear?",
    },
  ],

  // Trading setup (instruments, indicators, timeframes)
  setup: {
    system: [
      "Two monitors minimum: chart + option chain.",
      "TradingView + broker terminal side by side.",
      "OI Pulse app for open interest scans.",
      "Phone on DND. No social media on trading laptop.",
    ],
    indicators: [
      "VWAP (daily, anchored). Primary.",
      "SuperTrend.",
      "EMA 20 / 50 / 100 / 200.",
      "MACD (12, 26, 9).",
      "Stochastic (14, 3, 3).",
      "Camarilla pivots (intraday S/R).",
    ],
    timeframes: [
      "3-min for scalp entries.",
      "5-min for setup confirmation.",
      "15-min for bias & structure.",
      "1-hour for trend / macro view.",
    ],
  },

  // Thakare Sir price-action observations (condensed, the best 30)
  priceAction: [
    "Ideal trend day: higher-highs & higher-lows (or LH & LL) every 30 minutes.",
    "On trend day always check VWAP and EMAs.",
    "If PDL is not breached after a gap-down and doesn't close below PDL → consider a CE trade (pair with O=H).",
    "Bullish setup: gap-down open inside previous day's range, struggles to close below PDL, O=H confirms. Chances of going up.",
    "Breakout trades: wide-body candle with follow-up. Cross-check DOW and DAX for alignment.",
    "Break day low with volume → expect a follow-up. No follow-up? Book quickly — retracement will be fast.",
    "Range market: scalp 10-20 points. Do NOT hold.",
    "Significant point (EMA, day high/low, VWAP, 200 EMA) broken with wide-body candle after base → consider entry. Best if retrace within the candle.",
    "Avoid range markets. They whipsaw.",
    "Twizzer bottom at VWAP / 200 EMA after small fall → smart money trapping sellers. Expect upmove.",
    "Sideways range? VIX is usually negative.",
    "3-candle pattern (RED-GREEN-RED): third red breaks prior candle low → short.",
    "Doji / wick at a breakout point → avoid.",
    "Gap-up, dojis struggling up, then wide red → market doesn't want to go up.",
    "Rally → base of 3 dojis → wide green = rally continues.",
    "Doji base above MAs (algos loading) → expect upmove.",
    "Sudden move after hours of consolidation = algo spurt. Risk a trade.",
    "Narrowing red candles → pinbar → long opportunity.",
    "Consolidation near VWAP / 200 EMA / key zone → breakout worth 20-30 pts.",
    "Wide red candle broke all EMAs → expect follow-up.",
    "Down move + rising VIX → follow-up likely.",
    "Price hits a psychological level → sharp bounce probable.",
    "Event day, gap-up & closes at day low → strong bearish.",
    "Event day, gap-down & closes at day high → strong bullish.",
    "Opening gap-up fills & pinbar → upside + O=H potential.",
    "Depth ratio 1:3 works better on gap up/down days.",
    "Range big + low of day broken after base → good trade.",
    "No follow-up, red-green-red in a range → avoid.",
    "H&S breaks against the shoulder → opposite move likely.",
    "VIX + market: lower VIX + higher market = bullish. Rising VIX + falling market = bearish.",
  ],

  // Journal fields — per-trade schema user wanted
  journalFields: [
    "Time", "Type (Buy/Sell)", "Instrument", "Quantity",
    "Avg. Price", "Buy Value", "Sell Value", "Profit / Loss",
    "Cumulative P/L", "ROI (on capital used)",
    "Setup used", "Mistakes made", "Learning",
  ],
};

window.BibleData = BibleData;
