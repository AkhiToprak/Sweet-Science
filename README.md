# Sweet Science

Pick a fighter and get a breakdown of how they fight, on a page designed around that fighter, plus tutorials on how to adopt the techniques that define their style.

The design is the main selling point: every fighter page has its own colours, type, motion and layout, all built from one shared design system.

> **Status:** planning and design. A mockup exists; the app is not built yet.

## Features (MVP)

- **Fighter selection:** a full-screen carousel of 5 fighters, each with a looping video behind them
- **Fighter pages:** a per-fighter theme, a written style breakdown, a trait radar chart, signature techniques and embedded video
- **Technique tutorials:** steps, common mistakes, a drill and a video for 2-3 techniques per fighter
- **Compare mode:** any two fighters side by side with overlaid radars
- **Find your style quiz:** matches you to the fighter whose traits are closest to yours
- **Login and favourites** with Supabase

Not in scope yet: more than 5 fighters, comments, an admin panel, other combat sports, a mobile app.

## Fighters and themes

One shared layout engine; each fighter overrides colour, typeface, texture, motion and hero layout.

| Fighter | Style | Display font | Motion preset |
| --- | --- | --- | --- |
| Mike Tyson | Pressure and head movement | Anton | Slam |
| Gennady Golovkin | Calm, relentless ring-cutting pressure | Big Shoulders Display | Stalk |
| Dmitry Bivol | Controlled distance and a precise jab | Space Grotesk | Measure |
| Vasyl Lomachenko | Angles and footwork | Syne | Pivot |
| Terence Crawford | Switch-hitter who adapts mid-fight | Chakra Petch | Switch |

A theme is a single database row (accent, background, display font, texture, hero layout, motion preset) that the page reads into CSS variables, so adding a fighter means adding data, not code.

## Planned tech stack

| Part | Choice |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion |
| Charts | Recharts (trait radar) |
| Database and auth | Supabase (Postgres, Auth, row level security) |
| Video | YouTube embeds with start and end times |
| Fonts | `next/font` with Google Fonts |
| Hosting | Vercel |

## Data model

Content tables (fighters, themes, traits, techniques, videos, quiz) are public read-only; only `favourites` belongs to a logged-in user and is protected by row level security. Quiz results are computed in code: the answers' points are summed over five traits (pressure, footwork, defence, power, counter) and the fighter with the nearest trait vector wins.

## Media and content rules

- Fight footage is embedded from YouTube, never downloaded or hosted.
- Images come from Wikimedia Commons (with licence and author credit) or original illustrations.
- No logos or brand marks.
- Career facts are sourced; style analysis is labelled as opinion.
- Tutorials cover fundamentals and are not a replacement for a coach.

## Roadmap

1. **Week 1:** one fully themed fighter page, deployed
2. **Week 2:** selection screen, Supabase data, first motion presets
3. **Week 3:** technique pages, compare mode, quiz, remaining fighters
4. **Week 4:** login and favourites, mobile layout, performance and accessibility pass, credits page

## Design mockup

Mockups cover the selection screen and one page per fighter. Colours are trunk-inspired guesses and fighter photos have not been added yet.
