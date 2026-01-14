export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Ride {
  id: string;
  driver_id: string;
  departure: string;
  destination: string;
  departure_time: string;
  seats_available: number;
  price_per_seat: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  sender_id: string;
  receiver_name: string;
  receiver_phone: string;
  pickup_location: string;
  delivery_location: string;
  description: string | null;
  weight: number;
  price: number;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Delivery {
  id: string;
  sender_id: string;
  driver_id: string | null;
  pickup_location: string;
  delivery_location: string;
  description: string | null;
  price: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      rides: {
        Row: Ride;
        Insert: Omit<Ride, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Ride, 'id' | 'created_at' | 'updated_at'>>;
      };
      packages: {
        Row: Package;
        Insert: Omit<Package, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Package, 'id' | 'created_at' | 'updated_at'>>;
      };
      deliveries: {
        Row: Delivery;
        Insert: Omit<Delivery, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Delivery, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
