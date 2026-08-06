# BrainBurst 🚀

A bright, kid-friendly quiz app for math (multiplication & division) and
science facts, built for 2nd–5th grade. Made for one kid to log in with just
a first name, pick a subject, and practice with instant, visual feedback.

## What's inside

- **Math**: addition, subtraction, multiplication, and division, all
  generated on the fly so questions never run out. Multiplication has
  tiered times-table levels (Starter → Times Table Master) so your kid can
  build up from 2s/5s/10s instead of jumping straight into the full 1–12
  grid. Wrong answers show a dot-array visual (rows × columns) so the
  answer isn't just handed over — it's shown.
- **Science**: multiple-choice fun facts for grades 2–5 (12 questions per
  grade), grouped by topic (plants/animals, habitats, matter, weather, life
  cycles, energy, ecosystems, space, etc.) — the same general topic areas
  used in California's NGSS-based curriculum (which Fremont Unified follows
  via its Amplify Science program). Add more anytime in
  `src/data/scienceData.js`.
- **Geography**: World Capitals and US States & Capitals, also generated on
  the fly from a name/capital list, so this doesn't run dry either.
- **Stars & streaks**: 1 star per correct answer, bonus stars for finishing
  a round strong, and a "best streak" counter to chase.
- **Switch player**: a "Not you? Switch player" link on the home screen lets
  a different kid log in with their own name on the same device.
- Bright green/blue/pink, rounded, playful UI with a bouncy "pop" feel on
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
     row_key text primary key,
     display_name text not null,
     stars int not null default 0,
     best_streak int not null default 0,
     updated_at timestamp with time zone default now()
   );
   alter table progress enable row level security;
   create policy "anyone can read/write their own row"
     on progress for all using (true) with check (true);
   ```

   `row_key` combines the kid's typed name with a random id generated for
   their browser, so if you share this with friends, two kids who happen to
   type the same first name won't overwrite each other's stars.
   `display_name` is what actually shows up if you ever build a leaderboard.

   > **Already created a `progress` table with a `player` column from an
   > earlier version?** Drop it and re-run the SQL above (`drop table
   > progress;` first) — the old rows were just this one kid's test data
   > anyway.

   ⚠️ **Heads up on sharing:** there's no login system here, just a typed
   name. The anon key that talks to this table ships inside the app's code,
   which is normal for a simple app like this but does mean anyone
   technically inclined could read the whole `progress` table. That's fine
   for first names and star counts, just don't store anything sensitive in
   it.

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
