import type { Camp } from '../types/camp';
import { getGoogleMapsDirectionsUrl } from '../utils/maps';

interface GoogleMapsButtonProps {
  camp: Camp;
}

export default function GoogleMapsButton({ camp }: GoogleMapsButtonProps) {
  return (
    <a
      href={getGoogleMapsDirectionsUrl(camp)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Com arribar
    </a>
  );
}
