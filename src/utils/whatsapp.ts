import type { Camp } from '../types/camp';
import { getGoogleMapsDirectionsUrl } from './maps';

export function getWhatsAppShareUrl(camp: Camp): string {
  const mapsUrl = getGoogleMapsDirectionsUrl(camp);
  const friendsList = camp.friends.length > 0 ? camp.friends.join(', ') : 'Cap amic apuntat';
  const rating = camp.childRating.toFixed(1);

  const text = [
    'Hola! Hem trobat aquest casal d\'estiu:',
    '',
    `${camp.name}`,
    `Ubicació: ${camp.locationName}`,
    `Dates: ${camp.dates}`,
    `Horari: ${camp.schedule}`,
    `Cost: ${camp.cost} €`,
    `Amics que hi van: ${friendsList}`,
    `Valoració dels nens: ${rating}/5`,
    `Com arribar: ${mapsUrl}`,
    '',
    'Què us sembla si el mirem?',
  ].join('\n');

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
