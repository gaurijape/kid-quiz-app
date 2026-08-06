import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase is optional — the app works fine on localStorage alone.
// If env vars aren't set, we just skip cloud sync.
export const supabase = url && key ? createClient(url, key) : null

// Save a player's stars/streak to the `progress` table.
// Table schema (run once in the Supabase SQL editor):
//
// create table progress (
//   player text primary key,
//   stars int not null default 0,
//   best_streak int not null default 0,
//   updated_at timestamp with time zone default now()
// );
// alter table progress enable row level security;
// create policy "anyone can read/write their own row"
//   on progress for all using (true) with check (true);
//
// (This app is meant for a single family, so we keep the policy simple.
// Tighten it if you ever add real user accounts.)
export async function saveProgress(player, stars, bestStreak) {
  if (!supabase || !player) return
  await supabase
    .from('progress')
    .upsert({ player, stars, best_streak: bestStreak, updated_at: new Date().toISOString() })
}

export async function loadProgress(player) {
  if (!supabase || !player) return null
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('player', player)
    .maybeSingle()
  if (error) return null
  return data
}
