import type { Camp } from '../types/camp';

interface FriendsSectionProps {
  camps: Camp[];
}

export default function FriendsSection({ camps }: FriendsSectionProps) {
  const campsWithFriends = camps.filter(c => c.friends.length > 0);
  const allCampsFriends = campsWithFriends.flatMap(c => c.friends);
  const uniqueFriends = [...new Set(allCampsFriends)];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-lg font-bold text-slate-800 mb-3">Amics</h3>

      {uniqueFriends.length > 0 && (
        <p className="text-sm text-slate-500 mb-3">
          {uniqueFriends.length} amics apuntats a casals
        </p>
      )}

      {campsWithFriends.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">
          No hi ha casals amb amics apuntats
        </p>
      ) : (
        <div className="space-y-3">
          {campsWithFriends.map(camp => (
            <div key={camp.id} className="bg-orange-50 rounded-xl p-3 border border-orange-100">
              <p className="font-semibold text-slate-700 text-sm mb-1.5">{camp.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {camp.friends.map(friend => (
                  <span key={friend} className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                    {friend}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
