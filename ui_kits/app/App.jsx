// App.jsx — app kit composition with page switcher
const AppKit = () => {
  const [activePage, setActivePage] = React.useState(() => localStorage.getItem('tj-page') || 'calendar');
  React.useEffect(() => { localStorage.setItem('tj-page', activePage); }, [activePage]);
  const views = {
    calendar: <CalendarView/>,
    history: <HistoryView/>,
    statistics: <StatisticsView/>,
    'trade-ai': <TradeAIView/>,
    playbook: <PlaybookView/>,
    strategies: <StrategiesView/>,
    journal: <JournalView/>,
    settings: <SettingsView/>,
  };
  return (
    <>
      <Shell activePage={activePage} setActivePage={setActivePage}>
        {views[activePage]}
      </Shell>
      <TradeDialog/>
      <StrategyEditor/>
      <ToastHost/>
    </>
  );
};
ReactDOM.createRoot(document.getElementById('root')).render(<AppKit/>);
