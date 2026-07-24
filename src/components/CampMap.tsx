import { useState } from 'react';
import type { Camp } from '../types/camp';
import { getGoogleMapsDirectionsUrl } from '../utils/maps';

interface CampMapProps {
  camps: Camp[];
}

export default function CampMap({ camps }: CampMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = camps.find(c => c.id === selectedId) || null;

  const lats = camps.map(c => c.lat);
  const lngs = camps.map(c => c.lng);
  const padding = 0.15;
  const minLat = Math.min(...lats) - padding;
  const maxLat = Math.max(...lats) + padding;
  const minLng = Math.min(...lngs) - padding;
  const maxLng = Math.max(...lngs) + padding;

  const toX = (lng: number) => ((lng - minLng) / (maxLng - minLng)) * 100;
  const toY = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * 100;

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4" role="region" aria-label="Mapa de casals">
      <h2 className="text-lg font-bold text-slate-800 mb-3">Mapa</h2>

      <div className="relative w-full aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100" height="100" fill="#e2e8f0" />
            <line x1="20" y1="0" x2="20" y2="100" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="40" y1="0" x2="40" y2="100" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="0" y1="20" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="#cbd5e1" strokeWidth="0.3" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#cbd5e1" strokeWidth="0.3" />
          </svg>
        </div>

        {camps.map(camp => {
          const x = toX(camp.lng);
          const y = toY(camp.lat);
          const isSelected = camp.id === selectedId;
          return (
            <button
              key={camp.id}
              onClick={() => setSelectedId(isSelected ? null : camp.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full"
              style={{ left: `${x}%`, top: `${y}%`, zIndex: isSelected ? 10 : 1 }}
              aria-label={`${camp.name} - ${camp.locationName}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md transition-transform ${
                isSelected ? 'scale-150 ring-2 ring-white' : 'hover:scale-125'
              }`}
                style={{ backgroundColor: camp.imageColor }}
              >
                {camp.name.charAt(0)}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-3 p-3 bg-sky-50 rounded-xl border border-sky-100">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-800">{selected.name}</h3>
              <p className="text-sm text-slate-600">{selected.locationName}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {selected.lat.toFixed(4)}, {selected.lng.toFixed(4)}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {selected.type.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-sky-100 text-sky-600">{t}</span>
              ))}
            </div>
          </div>
          <a
            href={getGoogleMapsDirectionsUrl(selected)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white rounded-lg text-xs font-medium hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Com arribar
          </a>
        </div>
      )}
    </aside>
  );
}
