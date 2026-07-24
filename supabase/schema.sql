-- Casals amb Amics - Database Schema
-- Execute this SQL in your Supabase SQL Editor to set up the database.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table: camps
-- ============================================
CREATE TABLE camps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT[] NOT NULL DEFAULT '{}',
  age_range TEXT NOT NULL,
  location_name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  dates TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  schedule TEXT NOT NULL,
  has_morning_care BOOLEAN NOT NULL DEFAULT false,
  has_lunch BOOLEAN NOT NULL DEFAULT false,
  has_flexible_pickup BOOLEAN NOT NULL DEFAULT false,
  has_transport BOOLEAN NOT NULL DEFAULT false,
  has_overnight BOOLEAN NOT NULL DEFAULT false,
  cost INTEGER NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  hobbies TEXT[] NOT NULL DEFAULT '{}',
  friends TEXT[] NOT NULL DEFAULT '{}',
  allergy_options TEXT[] NOT NULL DEFAULT '{}',
  medical_notes TEXT DEFAULT '',
  child_rating NUMERIC(3,1) NOT NULL DEFAULT 0,
  survey_count INTEGER NOT NULL DEFAULT 0,
  would_return_percentage INTEGER NOT NULL DEFAULT 0,
  available_places INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  description TEXT DEFAULT '',
  image_color TEXT NOT NULL DEFAULT '#0ea5e9',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX idx_camps_cost ON camps(cost);
CREATE INDEX idx_camps_child_rating ON camps(child_rating DESC);
CREATE INDEX idx_camps_name ON camps(name);

-- ============================================
-- Table: child_profiles
-- ============================================
CREATE TABLE child_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  hobbies TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Row Level Security (optional, for auth)
-- ============================================
ALTER TABLE camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to camps
CREATE POLICY "Allow anonymous read camps"
  ON camps FOR SELECT
  USING (true);

-- Allow anonymous read/write to child_profiles
CREATE POLICY "Allow anonymous read child_profiles"
  ON child_profiles FOR SELECT
  USING (true);

CREATE POLICY "Allow anonymous insert child_profiles"
  ON child_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update child_profiles"
  ON child_profiles FOR UPDATE
  USING (true)
  WITH CHECK (true);
