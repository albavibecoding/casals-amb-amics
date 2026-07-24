import type { Camp, ChildProfile } from '../types/camp';
import { supabase, isSupabaseReady } from './supabase';
import { camps as mockCamps, childProfile as mockChildProfile } from '../data/camps';

function mapRowToCamp(row: any): Camp {
  return {
    id: row.id,
    name: row.name,
    type: row.type ?? [],
    ageRange: row.age_range,
    locationName: row.location_name,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    dates: row.dates,
    startDate: row.start_date,
    endDate: row.end_date,
    schedule: row.schedule,
    hasMorningCare: row.has_morning_care,
    hasLunch: row.has_lunch,
    hasFlexiblePickup: row.has_flexible_pickup,
    hasTransport: row.has_transport,
    hasOvernight: row.has_overnight,
    cost: row.cost,
    services: row.services ?? [],
    hobbies: row.hobbies ?? [],
    friends: row.friends ?? [],
    allergyOptions: row.allergy_options ?? [],
    medicalNotes: row.medical_notes ?? '',
    childRating: row.child_rating,
    surveyCount: row.survey_count,
    wouldReturnPercentage: row.would_return_percentage,
    availablePlaces: row.available_places,
    tags: row.tags ?? [],
    description: row.description ?? '',
    imageColor: row.image_color,
  };
}

export async function fetchCamps(): Promise<Camp[]> {
  if (!isSupabaseReady || !supabase) {
    return mockCamps;
  }

  const { data, error } = await supabase
    .from('camps')
    .select('*')
    .order('name');

  if (error) {
    console.warn('Supabase fetch error, falling back to mock data:', error.message);
    return mockCamps;
  }

  return (data ?? []).map(mapRowToCamp);
}

export async function fetchCampById(id: string): Promise<Camp | null> {
  if (!isSupabaseReady || !supabase) {
    return mockCamps.find(c => c.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from('camps')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.warn('Supabase fetch error, falling back to mock data:', error.message);
    return mockCamps.find(c => c.id === id) ?? null;
  }

  return data ? mapRowToCamp(data) : null;
}

export async function fetchChildProfile(): Promise<ChildProfile | null> {
  if (!isSupabaseReady || !supabase) {
    return mockChildProfile;
  }

  const { data, error } = await supabase
    .from('child_profiles')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.warn('Supabase fetch error, falling back to mock profile:', error.message);
    return mockChildProfile;
  }

  return data
    ? { name: data.name, age: data.age, hobbies: data.hobbies ?? [] }
    : mockChildProfile;
}

export async function updateChildProfile(profile: ChildProfile): Promise<boolean> {
  if (!isSupabaseReady || !supabase) return false;

  const { error } = await supabase
    .from('child_profiles')
    .upsert({ name: profile.name, age: profile.age, hobbies: profile.hobbies })
    .eq('name', profile.name);

  if (error) {
    console.error('Supabase update error:', error.message);
    return false;
  }
  return true;
}

export { isSupabaseReady };
