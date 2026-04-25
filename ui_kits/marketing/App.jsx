// App.jsx — composes all marketing sections
const MarketingApp = () => (
  <>
    <Nav/>
    <Hero/>
    <ChartsParallax/>
    <SummarySection/>
    <AISection/>
    <CalendarSection/>
    <JournalSection/>
    <ReviewsSection/>
    <Footer/>
  </>
);
ReactDOM.createRoot(document.getElementById('root')).render(<MarketingApp/>);
