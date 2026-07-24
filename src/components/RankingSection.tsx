import { useMemo } from 'react';
import type { Camp } from '../types/camp';

interface RankingSectionProps {
  camps: Camp[];
}

export default function RankingSection({ camps }: RankingSectionProps) {
  const ranked = useMemo(() => {
    return [...camps].sort((a, b) => {
      if (b.childRating !== a.childRating) return b.childRating - a.childRating;
      if (b.wouldReturnPercentage !== a.wouldReturnPercentage) return b.wouldReturnPercentage - a.wouldReturnPercentage;
      return b.surveyCount - a.surveyCount;
    });
  }, [camps]);

  const getMedal = (pos: number): string => {
    if (pos === 0) return '🥇';
    if (pos === 1) return '🥈';
    if (pos === 2) return '🥉';
    return '';
  };

  const getRecommendationLabel = (camp: Camp): string | null => {
    if (camp.wouldReturnPercentage >= 95) return 'Molt recomanat';
    if (camp.childRating >= 4.8) return 'Excel·lent';
    if (camp.childRating >= 4.5) return 'Molt bo';
    if (camp.childRating >= 4.0) return 'Recomanat';
    return null;
  };

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4" role="region" aria-label="Rànquing infantil">
      <h2 className="text-lg font-bold text-slate-800 mb-3">Rànquing infantil</h2>
      {ranked.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-8">No hi ha casals per classificar</p>
      ) : (
        <div className="space-y-2">
          {ranked.map((camp, index) => {
            const medal = getMedal(index);
            const label = getRecommendationLabel(camp);
            const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(camp.childRating));
            return (
              <div
                key={camp.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  medal ? 'bg-amber-50 border border-amber-100' : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="text-lg font-bold text-slate-400 w-6 text-center shrink-0">
                  {medal || `${index + 1}`}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-700 text-sm truncate">{camp.name}</p>
                    {label && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                        {label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5">
                      {stars.map((filled, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${filled ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-slate-500">{camp.childRating.toFixed(1)}</span>
                    <span className="text-xs text-slate-400">({camp.surveyCount})</span>
                    <span className="text-xs font-medium text-emerald-600">{camp.wouldReturnPercentage}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
