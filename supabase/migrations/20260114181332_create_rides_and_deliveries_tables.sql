/*
  # Create rides and deliveries tables

  1. New Tables
    - `rides` (trajets de covoiturage)
      - `id` (uuid, primary key)
      - `driver_id` (uuid, references profiles)
      - `departure` (text)
      - `destination` (text)
      - `departure_time` (timestamptz)
      - `seats_available` (integer)
      - `price_per_seat` (integer, in FCFA)
      - `status` (text: pending, active, completed, cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `packages` (colis à envoyer)
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `receiver_name` (text)
      - `receiver_phone` (text)
      - `pickup_location` (text)
      - `delivery_location` (text)
      - `description` (text)
      - `weight` (numeric, in kg)
      - `price` (integer, in FCFA)
      - `status` (text: pending, in_transit, delivered, cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `deliveries` (livraisons express)
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references profiles)
      - `driver_id` (uuid, references profiles)
      - `pickup_location` (text)
      - `delivery_location` (text)
      - `description` (text)
      - `price` (integer, in FCFA)
      - `status` (text: pending, assigned, in_progress, delivered, cancelled)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Create their own rides/packages/deliveries
      - View all active listings
      - Update/delete only their own items

  3. Indexes
    - Add indexes for frequently queried columns (status, departure_time, etc.)
*/

-- Create rides table
CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  departure text NOT NULL,
  destination text NOT NULL,
  departure_time timestamptz NOT NULL,
  seats_available integer NOT NULL DEFAULT 1,
  price_per_seat integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_seats CHECK (seats_available >= 0 AND seats_available <= 8),
  CONSTRAINT valid_price CHECK (price_per_seat >= 0),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'active', 'completed', 'cancelled'))
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_name text NOT NULL,
  receiver_phone text NOT NULL,
  pickup_location text NOT NULL,
  delivery_location text NOT NULL,
  description text,
  weight numeric NOT NULL DEFAULT 1.0,
  price integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_weight CHECK (weight > 0),
  CONSTRAINT valid_price CHECK (price >= 0),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'in_transit', 'delivered', 'cancelled'))
);

-- Create deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  driver_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  pickup_location text NOT NULL,
  delivery_location text NOT NULL,
  description text,
  price integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_price CHECK (price >= 0),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'assigned', 'in_progress', 'delivered', 'cancelled'))
);

-- Enable RLS
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- Rides policies
CREATE POLICY "Anyone can view active rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (status IN ('pending', 'active'));

CREATE POLICY "Drivers can create rides"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Drivers can update their own rides"
  ON rides
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = driver_id)
  WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Drivers can delete their own rides"
  ON rides
  FOR DELETE
  TO authenticated
  USING (auth.uid() = driver_id);

-- Packages policies
CREATE POLICY "Anyone can view active packages"
  ON packages
  FOR SELECT
  TO authenticated
  USING (status IN ('pending', 'in_transit'));

CREATE POLICY "Users can create packages"
  ON packages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Senders can update their own packages"
  ON packages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id)
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Senders can delete their own packages"
  ON packages
  FOR DELETE
  TO authenticated
  USING (auth.uid() = sender_id);

-- Deliveries policies
CREATE POLICY "Anyone can view active deliveries"
  ON deliveries
  FOR SELECT
  TO authenticated
  USING (status IN ('pending', 'assigned', 'in_progress'));

CREATE POLICY "Users can create deliveries"
  ON deliveries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Senders and drivers can update deliveries"
  ON deliveries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = driver_id)
  WITH CHECK (auth.uid() = sender_id OR auth.uid() = driver_id);

CREATE POLICY "Senders can delete their own deliveries"
  ON deliveries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = sender_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rides_status ON rides(status);
CREATE INDEX IF NOT EXISTS idx_rides_departure_time ON rides(departure_time);
CREATE INDEX IF NOT EXISTS idx_rides_driver_id ON rides(driver_id);

CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
CREATE INDEX IF NOT EXISTS idx_packages_sender_id ON packages(sender_id);

CREATE INDEX IF NOT EXISTS idx_deliveries_status ON deliveries(status);
CREATE INDEX IF NOT EXISTS idx_deliveries_sender_id ON deliveries(sender_id);
CREATE INDEX IF NOT EXISTS idx_deliveries_driver_id ON deliveries(driver_id);

-- Update triggers for updated_at
DROP TRIGGER IF EXISTS on_ride_updated ON rides;
CREATE TRIGGER on_ride_updated
  BEFORE UPDATE ON rides
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_package_updated ON packages;
CREATE TRIGGER on_package_updated
  BEFORE UPDATE ON packages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_delivery_updated ON deliveries;
CREATE TRIGGER on_delivery_updated
  BEFORE UPDATE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
