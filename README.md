# BrainBurst 🚀

A bright, kid-friendly quiz app for math (multiplication & division) and
science facts, built for 2nd–5th grade. Made for one kid to log in with just
a first name, pick a subject, and practice with instant, visual feedback.

## What's inside

- **Math**: multiplication and division practice, with tiered times-table
  levels (Starter → Times Table Master) so your kid can build up from
  2s/5s/10s instead of jumping straight into the full 1–12 grid. Wrong
  answers show a dot-array visual (rows × columns) so the answer isn't just
  handed over — it's shown.
- **Science**: multiple-choice fun facts for grades 2–5, grouped by topic
  (plants/animals, habitats, matter, weather, life cycles, energy,
  ecosystems, space, etc.) — the same general topic areas used in
  California's NGSS-based curriculum (which Fremont Unified follows via its
  Amplify Science program).
- **Stars & streaks**: 1 star per correct answer, bonus stars for finishing
  a round strong, and a "best streak" counter to chase.
- Bright green/blue, rounded, playful UI with a bouncy "pop" feel on
  buttons — built with Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## Optional: sync progress with Supabase

The app works fine with zero setup — progress is saved to the browser's
local storage automatically. If you want progress to sync across devices
using your existing Supabase project:

1. In the Supabase SQL editor, run:

   ```sql
   create table progress (
     player text primary key,
     stars int not null default 0,
     best_streak int not null default 0,
     updated_at timestamp with time zone default now()
   );
   alter table progress enable row level security;
   create policy "anyone can read/write their own row"
     on progress for all using (true) with check (true);
   ```

   (This is a simple single-family app with no login system, so the policy
   is wide open. If you ever add real accounts, tighten this.)

2. Copy `.env.example` to `.env` and fill in your project's URL and anon key
   from Supabase → Project Settings → API.

3. Restart `npm run dev` (or redeploy) — the app will pick up the env vars
   automatically.

## Deploy

This is a standard Vite + React app, so it deploys the same way as your
other projects: push this folder to your git repo, then connect it to your
usual host (Vercel/Netlify/etc.) with:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (only
  if you're using Supabase sync — see above)

## Growing it later

- Add more grades/topics by editing `src/data/scienceData.js`.
- Adjust which times tables count as "easy" in `src/data/mathData.js`
  (`MULTIPLICATION_TIERS`).
- Swap in real images instead of emoji by adding an `image` field to
  science questions and rendering it in `src/components/Quiz.jsx`.
