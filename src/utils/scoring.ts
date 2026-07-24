import type { Camp, ChildProfile } from '../types/camp';

export function calculateHobbyMatch(camp: Camp, profile: ChildProfile): {
  matchCount: number;
  percentage: number;
  text: string;
} {
  const matchCount = camp.hobbies.filter(hobby =>
    profile.hobbies.some(h => h.toLowerCase() === hobby.toLowerCase())
  ).length;
  const percentage = profile.hobbies.length > 0
    ? Math.round((matchCount / profile.hobbies.length) * 100)
    : 0;
  const text = matchCount > 0
    ? `Coincideix amb ${matchCount} aficions`
    : 'No coincideix amb cap afició';

  return { matchCount, percentage, text };
}

export function getRecommendation(camps: Camp[]): {
  bestConciliation: Camp | null;
  bestRated: Camp | null;
  bestFriends: Camp | null;
  bestValue: Camp | null;
} {
  if (camps.length === 0) {
    return { bestConciliation: null, bestRated: null, bestFriends: null, bestValue: null };
  }

  const conciliationScore = (c: Camp): number =>
    [c.hasMorningCare, c.hasLunch, c.hasFlexiblePickup, c.hasTransport, c.hasOvernight]
      .filter(Boolean).length;

  return {
    bestConciliation: [...camps].sort((a, b) => conciliationScore(b) - conciliationScore(a))[0],
    bestRated: [...camps].sort((a, b) => b.childRating - a.childRating)[0],
    bestFriends: [...camps].sort((a, b) => b.friends.length - a.friends.length)[0],
    bestValue: [...camps].sort((a, b) => {
      const valueA = a.childRating / (a.cost || 1);
      const valueB = b.childRating / (b.cost || 1);
      return valueB - valueA;
    })[0],
  };
}
