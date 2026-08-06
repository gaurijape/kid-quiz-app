import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase is optional — the app works fine on localStorage alone.
// If env vars aren't set, we just skip cloud sync.
export const supabase = url && key ? createClient(url, key) : null

// If this app gets shared with friends, two different kids could type the
// same first name ("Emma" + "Emma"). To stop their cloud progress from
// overwriting each other, every browser gets a small random device id the
// first time it's used, and that id is folded into the cloud row's key.
// The kid never sees this — they only ever see their typed name.
const DEVICE_ID_KEY = 'brainburst_device_id'

function getDeviceId() {
  let id = localStorage.getItem(DEVICE_ID_KEY)
  if (!id) {
    id = Math.random().toString(36).slice(2, 8)
    localStorage.setItem(DEVICE_ID_KEY, id)
  }
  return id
}

function makeRowKey(player) {
  return `${player.trim().toLowerCase()}__${getDeviceId()}`
}

// Save a player's stars/streak to the `progress` table.
// Table schema (run once in the Supabase SQL editor):
//
// create table progress (
//   row_key text primary key,
//   display_name text not null,
//   stars int not null default 0,
//   best_streak int not null default 0,
//   updated_at timestamp with time zone default now()
// );
// alter table progress enable row level security;
// create policy "anyone can read/write their own row"
//   on progress for all using (true) with check (true);
//
// (No login system here — this is a simple family/friends app, so the
// policy is wide open. row_key keeps different kids' rows from colliding
// even if they share a first name; display_name is what shows in the UI.)
export async function saveProgress(player, stars, bestStreak) {
  if (!supabase || !player) return
  await supabase.from('progress').upsert({
    row_key: makeRowKey(player),
    display_name: player,
    stars,
    best_streak: bestStreak,
    updated_at: new Date().toISOString(),
  })
}

export async function loadProgress(player) {
  if (!supabase || !player) return null
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('row_key', makeRowKey(player))
    .maybeSingle()
  if (error) return null
  return data
}
