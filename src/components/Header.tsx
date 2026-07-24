interface HeaderProps {
  onToggleMap: () => void;
  onToggleRanking: () => void;
  onToggleCalendar: () => void;
  showMap: boolean;
  showRanking: boolean;
  showCalendar: boolean;
}

export default function Header({
  onToggleMap, onToggleRanking, onToggleCalendar,
  showMap, showRanking, showCalendar,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-sky-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <div>
            <h1 className="text-xl font-bold text-sky-800">Casals amb Amics</h1>
            <p className="text-xs text-slate-500">Troba el casal perfecte</p>
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap" aria-label="Panells">
          <button
            onClick={onToggleMap}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 ${
              showMap ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Mapa
          </button>
          <button
            onClick={onToggleRanking}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              showRanking ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rànquing
          </button>
          <button
            onClick={onToggleCalendar}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              showCalendar ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Calendari
          </button>
        </nav>
      </div>
    </header>
  );
}
