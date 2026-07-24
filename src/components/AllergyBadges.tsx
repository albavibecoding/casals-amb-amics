import type { Camp } from '../types/camp';

interface AllergyBadgesProps {
  camp: Camp;
}

const allergyColors: Record<string, string> = {
  'Sense gluten': 'bg-amber-100 text-amber-700 border-amber-200',
  'Sense lactosa': 'bg-sky-100 text-sky-700 border-sky-200',
  'Fruits secs': 'bg-orange-100 text-orange-700 border-orange-200',
  'Vegetarià': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Vegà': 'bg-purple-100 text-purple-700 border-purple-200',
  'Menú adaptat': 'bg-slate-100 text-slate-700 border-slate-200',
};

export default function AllergyBadges({ camp }: AllergyBadgesProps) {
  const hasInfo = camp.allergyOptions.length > 0;

  return (
    <div>
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Al·lèrgies / Intoleràncies
      </h4>
      {hasInfo ? (
        <div className="flex flex-wrap gap-1.5">
          {camp.allergyOptions.map(allergy => (
            <span
              key={allergy}
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${allergyColors[allergy] || 'bg-slate-100 text-slate-600 border-slate-200'}`}
            >
              {allergy}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-xs text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-lg">
          Cal confirmar informació d'al·lèrgies amb l'organització.
        </span>
      )}
      {camp.medicalNotes && (
        <p className="text-xs text-slate-500 mt-1 italic">{camp.medicalNotes}</p>
      )}
    </div>
  );
}
