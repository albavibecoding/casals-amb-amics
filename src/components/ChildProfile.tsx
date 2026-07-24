import type { Camp, ChildProfile } from '../types/camp';
import { calculateHobbyMatch } from '../utils/scoring';

interface ChildProfileProps {
  profile: ChildProfile;
  camps: Camp[];
}

export default function ChildProfileSection({ profile, camps }: ChildProfileProps) {
  const matches = camps.map(camp => ({
    camp,
    match: calculateHobbyMatch(camp, profile),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-lg font-bold text-slate-800 mb-3">Perfil d'aficions</h3>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
          {profile.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-slate-700">{profile.name}</p>
          <p className="text-sm text-slate-500">{profile.age} anys</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {profile.hobbies.map(hobby => (
          <span key={hobby} className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            {hobby}
          </span>
        ))}
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {matches
          .filter(m => m.match.matchCount > 0)
          .sort((a, b) => b.match.percentage - a.match.percentage)
          .slice(0, 5)
          .map(({ camp, match }) => (
            <div key={camp.id} className="flex items-center justify-between bg-purple-50 rounded-xl px-3 py-2">
              <span className="text-sm font-medium text-slate-700">{camp.name}</span>
              <span className="text-xs font-bold text-purple-600">{match.percentage}%</span>
            </div>
          ))}
      </div>
    </div>
  );
}
