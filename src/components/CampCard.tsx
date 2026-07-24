import { useState } from 'react';
import type { Camp, ChildProfile } from '../types/camp';
import { calculateHobbyMatch } from '../utils/scoring';
import { getGoogleMapsDirectionsUrl } from '../utils/maps';
import WhatsAppShareButton from './WhatsAppShareButton';
import AllergyBadges from './AllergyBadges';

interface CampCardProps {
  camp: Camp;
  childProfile: ChildProfile | null;
  isCompareSelected: boolean;
  onToggleCompare: (camp: Camp) => void;
  onAddToCalendar: (camp: Camp) => void;
}

export default function CampCard({ camp, childProfile, isCompareSelected, onToggleCompare, onAddToCalendar }: CampCardProps) {
  const [interested, setInterested] = useState(false);
  const hobbyMatch = childProfile ? calculateHobbyMatch(camp, childProfile) : null;

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(camp.childRating));

  const conciliationServices: { label: string; active: boolean }[] = [
    { label: 'Acollida matinal', active: camp.hasMorningCare },
    { label: 'Menjador', active: camp.hasLunch },
    { label: 'Sortida flexible', active: camp.hasFlexiblePickup },
    { label: 'Transport', active: camp.hasTransport },
    { label: 'Pernocta', active: camp.hasOvernight },
  ];

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-sky-400"
      style={{ borderTopColor: camp.imageColor, borderTopWidth: 4 }}
    >
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-800 truncate">{camp.name}</h3>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {camp.locationName}
            </p>
          </div>
          <div className="text-right ml-3">
            <p className="text-2xl font-bold text-sky-600">{camp.cost}€</p>
            <p className="text-xs text-slate-500">/ casal</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {camp.type.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-600 border border-sky-100">
              {t}
            </span>
          ))}
          {camp.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-500 border border-slate-100">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-slate-600">{camp.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm bg-slate-50 rounded-xl p-3">
          <div>
            <span className="text-slate-400 text-xs">Edats</span>
            <p className="font-medium text-slate-700">{camp.ageRange} anys</p>
          </div>
          <div>
            <span className="text-slate-400 text-xs">Places</span>
            <p className="font-medium text-slate-700">{camp.availablePlaces} lliures</p>
          </div>
          <div>
            <span className="text-slate-400 text-xs">Dates</span>
            <p className="font-medium text-slate-700">{camp.dates}</p>
          </div>
          <div>
            <span className="text-slate-400 text-xs">Horari</span>
            <p className="font-medium text-slate-700">{camp.schedule}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Conciliació
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {conciliationServices.map(s => (
              <span
                key={s.label}
                className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                  s.active
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-100'
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Aficions</h4>
          <div className="flex flex-wrap gap-1.5">
            {camp.hobbies.map(hobby => (
              <span key={hobby} className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600 border border-purple-100">
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {hobbyMatch && (
          <div className={`px-3 py-2 rounded-xl text-sm font-medium ${
            hobbyMatch.percentage > 0 ? 'bg-purple-50 text-purple-700' : 'bg-slate-50 text-slate-400'
          }`}>
            {hobbyMatch.text} ({hobbyMatch.percentage}%)
          </div>
        )}

        {camp.friends.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Amics apuntats ({camp.friends.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {camp.friends.map(friend => (
                <span key={friend} className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100">
                  {friend}
                </span>
              ))}
            </div>
          </div>
        )}

        <AllergyBadges camp={camp} />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {stars.map((filled, i) => (
              <svg key={i} className={`w-5 h-5 ${filled ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-slate-600">{camp.childRating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">({camp.surveyCount} enquestes)</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-emerald-600 font-semibold">{camp.wouldReturnPercentage}%</span>
          <span className="text-slate-500">hi tornarien</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setInterested(!interested)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 ${
              interested
                ? 'bg-sky-500 text-white'
                : 'bg-sky-50 text-sky-600 hover:bg-sky-100'
            }`}
          >
            {interested ? 'Ja t\'interessa' : 'M\'interessa'}
          </button>
          <WhatsAppShareButton camp={camp} />
          <a
            href={getGoogleMapsDirectionsUrl(camp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Com arribar
          </a>
          <button
            onClick={() => onAddToCalendar(camp)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Afegir al calendari
          </button>
          <button
            onClick={() => onToggleCompare(camp)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              isCompareSelected
                ? 'bg-purple-500 text-white'
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
            }`}
          >
            {isCompareSelected ? 'Treu del comparador' : 'Comparar'}
          </button>
        </div>
      </div>
    </article>
  );
}
