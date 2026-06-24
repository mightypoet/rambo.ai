# Rambo.ai Supabase Setup Guide

This platform uses Supabase for authentication and database management. To fully activate these features, you must configure a Supabase project.

## 1. Create a Supabase Project
1. Go to [database.new](https://database.new) and create a new project.
2. Navigate to **Project Settings > API** to find your `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

## 2. Environment Setup
Add these to your `.env` or application configuration:
\`\`\`
VITE_SUPABASE_URL="your-project-url"
VITE_SUPABASE_ANON_KEY="your-anon-key"
\`\`\`

## 3. Database Schema

Run the following SQL in the Supabase **SQL Editor**:

\`\`\`sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (Synced with Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Brands table
create table public.brands (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  brand_name text not null,
  industry text,
  website text,
  brand_voice text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Campaigns table
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  brand_id uuid references public.brands(id) on delete set null,
  prompt text,
  headline text,
  body_copy text,
  hashtags text,
  image_prompt text,
  generated_image_url text,
  status text default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Settings (Securely store encrypted keys here if needed, or use local client storage)
create table public.user_settings (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  gemini_api_key text,
  huggingface_api_key text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
\`\`\`

## 4. Row Level Security (RLS)

Enable RLS on all tables to ensure users only access their own data:

\`\`\`sql
alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.campaigns enable row level security;
alter table public.user_settings enable row level security;

-- Policies for Profiles
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Policies for Brands
create policy "Users can view own brands." on brands for select using (auth.uid() = user_id);
create policy "Users can create own brands." on brands for insert with check (auth.uid() = user_id);
create policy "Users can update own brands." on brands for update using (auth.uid() = user_id);
create policy "Users can delete own brands." on brands for delete using (auth.uid() = user_id);

-- Policies for Campaigns
create policy "Users can view own campaigns." on campaigns for select using (auth.uid() = user_id);
create policy "Users can create own campaigns." on campaigns for insert with check (auth.uid() = user_id);
create policy "Users can update own campaigns." on campaigns for update using (auth.uid() = user_id);
create policy "Users can delete own campaigns." on campaigns for delete using (auth.uid() = user_id);

-- Policies for User Settings
create policy "Users can view own settings." on user_settings for select using (auth.uid() = user_id);
create policy "Users can update own settings." on user_settings for insert with check (auth.uid() = user_id);
create policy "Users can update own settings." on user_settings for update using (auth.uid() = user_id);
\`\`\`
