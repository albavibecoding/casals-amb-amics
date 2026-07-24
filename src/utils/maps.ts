import type { Camp } from '../types/camp';

export function getGoogleMapsDirectionsUrl(camp: Camp): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${camp.lat},${camp.lng}`;
}

export function getGoogleMapsLink(camp: Camp): string {
  return `https://www.google.com/maps?q=${camp.lat},${camp.lng}`;
}
