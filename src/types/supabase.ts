export interface Database {
  public: {
    Tables: {
      camps: {
        Row: {
          id: string;
          name: string;
          type: string[];
          age_range: string;
          location_name: string;
          address: string;
          lat: number;
          lng: number;
          dates: string;
          start_date: string;
          end_date: string;
          schedule: string;
          has_morning_care: boolean;
          has_lunch: boolean;
          has_flexible_pickup: boolean;
          has_transport: boolean;
          has_overnight: boolean;
          cost: number;
          services: string[];
          hobbies: string[];
          friends: string[];
          allergy_options: string[];
          medical_notes: string;
          child_rating: number;
          survey_count: number;
          would_return_percentage: number;
          available_places: number;
          tags: string[];
          description: string;
          image_color: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['camps']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['camps']['Insert']>;
      };
      child_profiles: {
        Row: {
          id: string;
          name: string;
          age: number;
          hobbies: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['child_profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['child_profiles']['Insert']>;
      };
    };
  };
}
