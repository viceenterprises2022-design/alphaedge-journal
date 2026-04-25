// App.jsx — app kit composition with page switcher
const AppKit = () => {
  const [activePage, setActivePage] = React.useState(() => localStorage.getItem('tj-page') || 'calendar');
  React.useEffect(() => { localStorage.setItem('tj-page', activePage); }, [activePage]);
  const views = {
    calendar: <CalendarView/>,
    history: <div className="text-zinc-400 text-sm italic">Trade history view — follows the same calendar-banner-shadow table pattern. (Placeholder)</div>,
    statistics: <StatisticsView/>,
    'trade-ai': <TradeAIView/>,
    playbook: <PlaybookView/>,
    strategies: <StrategiesView/>,
    journal: <JournalView/>,
  };
  return (
    <>
      <Shell activePage={activePage} setActivePage={setActivePage}>
        {views[activePage]}
      </Shell>
      <TradeDialog/>
      <StrategyEditor/>
    </>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<AppKit/>);
