// Nav.jsx — sticky pill nav with logo + claude mark + links
const Nav = () => {
  return (
    <div className="sticky top-0 md:top-4 px-3 lg:px-48 z-50 w-full">
      <nav className="mx-auto w-full md:w-[85%] lg:w-[70%] bg-primary/80 backdrop-blur-md rounded-2xl border border-zinc-200 mobile-navbar-shadow">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <img src="../../assets/logo.svg" alt="logo" className="w-8 h-8" />
            <span className="font-semibold text-[15px] text-[#3d3929]">AlphaEdge Journal</span>
            <span className="text-zinc-400 mx-1">&</span>
            <ClaudeMark size={22} />
          </div>
          <div className="hidden md:flex items-center gap-1">
            <a className="nav-link text-[13px]">Calendar</a>
            <a className="nav-link text-[13px]">History</a>
            <a className="nav-link text-[13px]">Statistics</a>
            <a className="nav-link text-[13px]">Trade AI</a>
            <a className="nav-link text-[13px]">Strategies</a>
          </div>
          <div className="flex gap-2">
            <button className="button-shadow-white rounded-[10px] text-[13px] px-4 py-2 text-[#4a4340]">Log in</button>
            <button className="button-shadow rounded-[10px] text-[13px] px-4 py-2 text-primary flex items-center gap-1.5">
              Get started <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
window.Nav = Nav;
