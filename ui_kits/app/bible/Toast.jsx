// Toast.jsx — minimal toast queue. fire via window.toast(message, kind?)
const { useState: useTo, useEffect: useToEffect } = React;

const ToastHost = () => {
  const [items, setItems] = useTo([]);
  useToEffect(() => {
    const onToast = (e) => {
      const id = Math.random().toString(36).slice(2);
      const msg = e.detail.message;
      const kind = e.detail.kind || 'info';
      setItems(list => [...list, { id, msg, kind }]);
      setTimeout(() => setItems(list => list.filter(x => x.id !== id)), 3200);
    };
    window.addEventListener('tj-toast', onToast);
    return () => window.removeEventListener('tj-toast', onToast);
  }, []);
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[70] flex flex-col items-center gap-2 pointer-events-none">
      {items.map(it => {
        const tone =
          it.kind === 'success' ? 'bg-buy/95 text-white border-buy/30' :
          it.kind === 'error' ? 'bg-sell/95 text-white border-sell/30' :
          'bg-[#3d3929]/95 text-primary border-zinc-700/30';
        const Ico = it.kind === 'success' ? Check : (it.kind === 'error' ? X : Book);
        return (
          <div key={it.id}
            className={`pointer-events-auto rounded-full pl-3 pr-4 py-2 border shadow-2xl shadow-zinc-900/20 flex items-center gap-2 text-[13px] backdrop-blur-md ${tone}`}
            style={{ animation: 'tj-toast-in .25s ease-out' }}>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"><Ico size={11}/></span>
            <span>{it.msg}</span>
          </div>
        );
      })}
      <style>{`@keyframes tj-toast-in { from { opacity:0; transform: translateY(-8px) } to { opacity:1; transform: translateY(0) } }`}</style>
    </div>
  );
};
window.toast = (message, kind='info') => window.dispatchEvent(new CustomEvent('tj-toast', { detail: { message, kind }}));
window.ToastHost = ToastHost;
