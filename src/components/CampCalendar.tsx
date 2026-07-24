import type { Camp } from '../types/camp';

interface CampCalendarProps {
  calendars: Camp[];
}

export default function CampCalendar({ calendars }: CampCalendarProps) {
  if (calendars.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Calendari familiar</h2>
        <p className="text-sm text-slate-400 text-center py-8">
          No hi ha casals al calendari. Fes clic a "Afegir al calendari" des d'una targeta.
        </p>
      </div>
    );
  }

  const getReminders = (camp: Camp): string[] => {
    const reminders: string[] = [];
    if (camp.hasMorningCare) reminders.push('Entrada amb acollida');
    if (camp.hasLunch) reminders.push('Dia amb menjador');
    if (camp.hasFlexiblePickup) reminders.push('Recollida flexible');
    if (camp.hasOvernight) reminders.push('Colònies amb pernocta');
    if (camp.allergyOptions.length === 0) reminders.push('Revisar al·lèrgies');
    return reminders;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h2 className="text-lg font-bold text-slate-800 mb-3">Calendari familiar</h2>
      <div className="space-y-4">
        {calendars.map(camp => {
          const reminders = getReminders(camp);
          return (
            <div key={camp.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 p-3" style={{ backgroundColor: camp.imageColor + '15' }}>
                <div className="w-1 h-12 rounded-full" style={{ backgroundColor: camp.imageColor }} />
                <div>
                  <h3 className="font-bold text-slate-800">{camp.name}</h3>
                  <p className="text-xs text-slate-500">{camp.dates}</p>
                </div>
              </div>
              <div className="p-3 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-xs">Horari</span>
                    <p className="font-medium text-slate-700">{camp.schedule}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-xs">Edats</span>
                    <p className="font-medium text-slate-700">{camp.ageRange} anys</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium text-center ${camp.hasMorningCare ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                    Acollida
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium text-center ${camp.hasLunch ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                    Menjador
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium text-center ${camp.hasFlexiblePickup ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                    Flex
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium text-center ${camp.hasTransport ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                    Transport
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs font-medium text-center ${camp.hasOvernight ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                    Pernocta
                  </div>
                </div>

                {reminders.length > 0 && (
                  <div className="space-y-1">
                    {reminders.map(r => (
                      <div key={r} className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        {r}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{camp.startDate}</span>
                  <span>→</span>
                  <span>{camp.endDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
