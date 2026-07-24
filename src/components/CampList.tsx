import type { Camp, ChildProfile } from '../types/camp';
import CampCard from './CampCard';

interface CampListProps {
  camps: Camp[];
  childProfile: ChildProfile | null;
  compareIds: string[];
  onToggleCompare: (camp: Camp) => void;
  onAddToCalendar: (camp: Camp) => void;
}

export default function CampList({ camps, childProfile, compareIds, onToggleCompare, onAddToCalendar }: CampListProps) {
  if (camps.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-lg font-medium text-slate-600">No s'han trobat casals</p>
        <p className="text-sm text-slate-400 mt-1">Prova de modificar els filtres</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {camps.map(camp => (
        <CampCard
          key={camp.id}
          camp={camp}
          childProfile={childProfile}
          isCompareSelected={compareIds.includes(camp.id)}
          onToggleCompare={onToggleCompare}
          onAddToCalendar={onAddToCalendar}
        />
      ))}
    </div>
  );
}
