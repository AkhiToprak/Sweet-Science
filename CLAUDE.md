# CLAUDE.md

Sweet Science: pick a fighter, get a breakdown of their style on a page designed around that fighter, plus tutorials on adopting their techniques. The design is the main selling point.

Status: planning and design. The app is not built yet. Source of truth for the design is the mockup set (Main = selection screen, one board per fighter) and `Fighter-Styles-Site-Plan.md` (design, stack, SQL, 4-week plan, AI-use rules).

## Stack

Next.js (App Router) + TypeScript, Tailwind + CSS variables, Framer Motion, Recharts (radar), Supabase (Postgres, Auth, RLS), YouTube embeds, `next/font`, Vercel.

## Design system

One shared layout engine, five fighter themes. A theme is one DB row (accent, background, foreground, display font, texture, hero layout, motion preset, mirrored) read into CSS variables. Adding a fighter means adding data, not code.

Shared look:
- Dark, cinematic base with grain/scanline texture and huge display names overlapping the hero. Bivol is the one light theme.
- 1440px canvas, 40px gutters, 80-96px section padding, 12-column grid, 8px spacing scale.
- Body: Barlow. Labels, eyebrows, tags, buttons: Barlow Condensed, uppercase, wide tracking (0.14-0.22em). Display: per-fighter font.
- Flat components: 1px hairline borders, no rounded corners, no shadows. Min 44px tap targets.
- One accent colour per page. Text contrast at least 4.5:1.
- No logos, sponsor marks or brand names as design elements.
- Video only on hero and technique pages. Hero clips start muted, with a still-image fallback.
- Respect `prefers-reduced-motion`.

| Fighter | Display font | Accent | Hero layout | Motion |
| --- | --- | --- | --- | --- |
| Tyson | Anton | silver `#D5D9E0` on black | full-bleed video, huge overlapping name | Slam |
| Golovkin | Big Shoulders Display | gold `#E3B23C` on deep red/bone | converging lines | Stalk |
| Bivol | Space Grotesk | royal blue `#2450C8` + red `#D4202A` on white | range rings, measurement grid | Measure |
| Lomachenko | Syne | yellow `#FFD500` on navy | diagonal sections (~-5deg), mirrored (southpaw) | Pivot |
| Crawford | Chakra Petch | gold `#E8B923` on black | split page, stance toggle mirrors the page | Switch |

Palettes are trunk-inspired guesses from memory, not verified.

## Page structure

Fighter page section order (same for every fighter): hero; style in one sentence + trait radar; how he fights (range, defence, offence); signature technique cards; adopt this style (3 levels, 01/02/03); watch (2-3 embeds); compare and favourite.

Home: 5 full-height vertical panels, one per fighter; hover widens and plays the muted loop, click expands to the fighter page. Phone: swipeable carousel.

Other pages: technique, compare, find-your-style quiz, account/favourites, about and credits.

## Data and logic

- Content tables (fighters, themes, traits, techniques, videos, quiz) are public read-only; only `favourites` is per-user. Enable RLS on every table.
- Traits (1-10): pressure, footwork, defence, power, counter. Feeds radar, compare and quiz.
- Quiz result is computed in code: sum option points over the five traits, pick the fighter with the smallest Euclidean distance.
- Never put the Supabase service role key in the app. Keep the project URL and public key in env vars.
- Seed data lives in one SQL file in the repo.

## Content and facts rules

- Embed fight footage from YouTube. Exception (owner decision): short hover clips on the home panels are hosted in `public/fighters/<slug>/hover.mp4` (converted from the owner's GIFs). Nowhere else hosts footage.
- Images: Wikimedia Commons with licence and author credit, or original illustrations. No press photos.
- Only write career facts that can be sourced; list sources on the About page. Style analysis is opinion and is labelled as such.
- Tutorials cover fundamentals and are not a replacement for a coach.

## Working agreements

- The owner wants to write the theme-to-CSS-variables function, quiz matching, Supabase queries and RLS policy themselves. Do not write these unless asked; explain and review instead.
- Fine to draft: fighter/technique text (the owner fact-checks), Tailwind variations, config, seed SQL, test data.
- One feature per branch; keep diffs small and explainable.
- Scope: 5 fighters, no comments, no admin panel, no other sports, no mobile app. Put new ideas on a "later" list.
- Do not push this branch or open a PR unless asked: the branch is meant to stay private.
