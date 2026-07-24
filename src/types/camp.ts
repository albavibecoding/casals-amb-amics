export interface Camp {
  id: string;
  name: string;
  type: string[];
  ageRange: string;
  locationName: string;
  address: string;
  lat: number;
  lng: number;
  dates: string;
  startDate: string;
  endDate: string;
  schedule: string;
  hasMorningCare: boolean;
  hasLunch: boolean;
  hasFlexiblePickup: boolean;
  hasTransport: boolean;
  hasOvernight: boolean;
  cost: number;
  services: string[];
  hobbies: string[];
  friends: string[];
  allergyOptions: string[];
  medicalNotes: string;
  childRating: number;
  surveyCount: number;
  wouldReturnPercentage: number;
  availablePlaces: number;
  tags: string[];
  description: string;
  imageColor: string;
}

export interface ChildProfile {
  name: string;
  age: number;
  hobbies: string[];
}

export interface FiltersState {
  category: string;
  maxCost: number;
  conciliation: string;
  ageRange: string;
  onlyWithFriends: boolean;
  compatibleAllergies: string[];
  minRating: number;
  searchText: string;
}

export interface CompareSelection {
  camps: Camp[];
}
