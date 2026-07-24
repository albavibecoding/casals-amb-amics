import { useMemo } from 'react';
import type { Camp, ChildProfile } from '../types/camp';
import { calculateHobbyMatch, getRecommendation } from '../utils/scoring';
import AllergyBadges from './AllergyBadges';

interface ComparePanelProps {
  camps: Camp[];
  childProfile: ChildProfile | null;
  onRemove: (camp: Camp) => void;
}

export default function ComparePanel({ camps, childProfile, onRemove }: ComparePanelProps) {
  const recommendations = useMemo(() => getRecommendation(camps), [camps]);

  if (camps.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Comparador</h2>
        <p className="text-sm text-slate-400 text-center py-8">
          Selecciona fins a 3 casals per comparar-los
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h2 className="text-lg font-bold text-slate-800 mb-3">
        Comparador ({camps.length}/3)
      </h2>

      {recommendations.bestConciliation && camps.length >= 2 && (
        <div className="space-y-1 mb-4">
          {recommendations.bestConciliation && (
            <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg font-medium">
              Millor per conciliació: {recommendations.bestConciliation.name}
            </p>
          )}
          {recommendations.bestRated && (
            <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg font-medium">
              Millor valorat pels nens: {recommendations.bestRated.name}
            </p>
          )}
          {recommendations.bestFriends && (
            <p className="text-xs text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg font-medium">
              Millor si hi vol anar amb amics: {recommendations.bestFriends.name}
            </p>
          )}
          {recommendations.bestValue && (
            <p className="text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg font-medium">
              Millor relació qualitat/preu: {recommendations.bestValue.name}
            </p>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 pr-3 text-slate-400 font-medium">Característica</th>
              {camps.map(camp => (
                <th key={camp.id} className="text-center px-2 py-2 min-w-[140px]">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-slate-700 truncate">{camp.name}</span>
                    <button
                      onClick={() => onRemove(camp)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                      aria-label={`Treu ${camp.name} del comparador`}
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Cost</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center font-bold text-sky-600">
                  {camp.cost} €
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Horari</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center text-slate-600">{camp.schedule}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Dates</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center text-slate-600">{camp.dates}</td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Conciliació</td>
              {camps.map(camp => {
                const total = [
                  camp.hasMorningCare, camp.hasLunch,
                  camp.hasFlexiblePickup, camp.hasTransport, camp.hasOvernight,
                ].filter(Boolean).length;
                return (
                  <td key={camp.id} className="py-2 px-2 text-center text-slate-600">{total}/5 serveis</td>
                );
              })}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Valoració</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center">
                  <span className="text-amber-500 font-bold">{camp.childRating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">/5</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Hi tornarien</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center font-medium text-emerald-600">
                  {camp.wouldReturnPercentage}%
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Amics</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center text-slate-600">
                  {camp.friends.length > 0 ? camp.friends.join(', ') : '—'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Places</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center">
                  <span className={`font-medium ${camp.availablePlaces < 15 ? 'text-orange-600' : 'text-slate-600'}`}>
                    {camp.availablePlaces}
                  </span>
                </td>
              ))}
            </tr>
            {childProfile && (
              <tr>
                <td className="py-2 pr-3 text-slate-500 font-medium">Aficions</td>
                {camps.map(camp => {
                  const match = calculateHobbyMatch(camp, childProfile);
                  return (
                    <td key={camp.id} className="py-2 px-2 text-center">
                      <span className="font-medium text-purple-600">{match.matchCount}</span>
                      <span className="text-slate-400 text-xs"> coincidències</span>
                    </td>
                  );
                })}
              </tr>
            )}
            <tr>
              <td className="py-2 pr-3 text-slate-500 font-medium">Al·lèrgies</td>
              {camps.map(camp => (
                <td key={camp.id} className="py-2 px-2 text-center text-xs">
                  {camp.allergyOptions.length > 0
                    ? camp.allergyOptions.join(', ')
                    : 'Sense informació'
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
