import { useState, useMemo } from 'react';
import type { Camp, FiltersState } from './types/camp';
import { camps as allCamps, childProfile as defaultChildProfile } from './data/camps';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import StatCard from './components/StatCard';
import CampList from './components/CampList';
import CampMap from './components/CampMap';
import CampCalendar from './components/CampCalendar';
import RankingSection from './components/RankingSection';
import FriendsSection from './components/FriendsSection';
import ChildProfileSection from './components/ChildProfile';
import ComparePanel from './components/ComparePanel';

const defaultFilters: FiltersState = {
  category: 'Tots',
  maxCost: 600,
  conciliation: 'Qualsevol',
  ageRange: '',
  onlyWithFriends: false,
  compatibleAllergies: [],
  minRating: 0,
  searchText: '',
};

function matchesCamp(camp: Camp, filters: FiltersState): boolean {
  if (filters.category !== 'Tots' && !camp.type.includes(filters.category)) return false;
  if (camp.cost > filters.maxCost) return false;
  if (filters.onlyWithFriends && camp.friends.length === 0) return false;
  if (camp.childRating < filters.minRating) return false;

  if (filters.ageRange) {
    const [min, max] = filters.ageRange.split('-').map(Number);
    const campMin = parseInt(camp.ageRange.split('-')[0]);
    const campMax = parseInt(camp.ageRange.split('-')[1]);
    if (campMax < min || campMin > max) return false;
  }

  if (filters.compatibleAllergies.length > 0) {
    const hasAll = filters.compatibleAllergies.every(a =>
      camp.allergyOptions.includes(a)
    );
    if (!hasAll) return false;
  }

  const conciliationMap: Record<string, boolean> = {
    'Acollida matinal': camp.hasMorningCare,
    'Menjador': camp.hasLunch,
    'Sortida flexible': camp.hasFlexiblePickup,
    'Transport': camp.hasTransport,
    'Pernocta': camp.hasOvernight,
  };
  if (filters.conciliation !== 'Qualsevol' && !conciliationMap[filters.conciliation]) return false;

  if (filters.searchText) {
    const t = filters.searchText.toLowerCase();
    const searchable = [
      camp.name, camp.locationName, ...camp.services,
      ...camp.hobbies, ...camp.friends, ...camp.type, ...camp.allergyOptions,
    ].map(s => s.toLowerCase());
    if (!searchable.some(s => s.includes(t))) return false;
  }

  return true;
}

export default function App() {
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [showMap, setShowMap] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [calendarIds, setCalendarIds] = useState<string[]>([]);

  const filteredCamps = useMemo(() => {
    return allCamps.filter(c => matchesCamp(c, filters));
  }, [filters]);

  const compareCamps = useMemo(() => {
    return compareIds.map(id => allCamps.find(c => c.id === id)!).filter(Boolean);
  }, [compareIds]);

  const calendarCamps = useMemo(() => {
    return calendarIds.map(id => allCamps.find(c => c.id === id)!).filter(Boolean);
  }, [calendarIds]);

  const avgCost = useMemo(() => {
    if (filteredCamps.length === 0) return 0;
    return Math.round(filteredCamps.reduce((s, c) => s + c.cost, 0) / filteredCamps.length);
  }, [filteredCamps]);

  const campsWithFriends = useMemo(() => {
    return filteredCamps.filter(c => c.friends.length > 0).length;
  }, [filteredCamps]);

  const bestRating = useMemo(() => {
    if (filteredCamps.length === 0) return 0;
    return Math.max(...filteredCamps.map(c => c.childRating));
  }, [filteredCamps]);

  const handleToggleCompare = (camp: Camp) => {
    setCompareIds(prev => {
      if (prev.includes(camp.id)) return prev.filter(id => id !== camp.id);
      if (prev.length >= 3) return prev;
      return [...prev, camp.id];
    });
  };

  const handleAddToCalendar = (camp: Camp) => {
    setCalendarIds(prev => {
      if (prev.includes(camp.id)) return prev;
      return [...prev, camp.id];
    });
    setShowCalendar(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        showMap={showMap}
        showRanking={showRanking}
        showCalendar={showCalendar}
        onToggleMap={() => setShowMap(!showMap)}
        onToggleRanking={() => setShowRanking(!showRanking)}
        onToggleCalendar={() => setShowCalendar(!showCalendar)}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Casals trobats" value={filteredCamps.length} icon="🏕️" />
          <StatCard label="Cost mitjà" value={`${avgCost}€`} icon="💰" />
          <StatCard label="Casals amb amics" value={campsWithFriends} icon="👫" />
          <StatCard label="Millor valoració" value={bestRating.toFixed(1)} icon="⭐" />
        </div>

        <SearchBar
          value={filters.searchText}
          onChange={text => setFilters(prev => ({ ...prev, searchText: text }))}
        />

        <Filters
          filters={filters}
          onChange={setFilters}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <CampList
              camps={filteredCamps}
              childProfile={defaultChildProfile}
              compareIds={compareIds}
              onToggleCompare={handleToggleCompare}
              onAddToCalendar={handleAddToCalendar}
            />
          </div>

          <aside className="space-y-6 lg:col-span-1">
            {showMap && <CampMap camps={filteredCamps} />}
            {showRanking && <RankingSection camps={filteredCamps} />}
            {showCalendar && <CampCalendar calendars={calendarCamps} />}

            <ChildProfileSection profile={defaultChildProfile} camps={filteredCamps} />

            <FriendsSection camps={filteredCamps} />

            <ComparePanel
              camps={compareCamps}
              childProfile={defaultChildProfile}
              onRemove={camp => handleToggleCompare(camp)}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
