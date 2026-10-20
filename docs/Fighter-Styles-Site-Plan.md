# Fighter Styles Site: Design and Build Plan

Oct 19, 2026 · @Toprak

## Concept and scope

Ringcraft (a working name) is a website where you pick a fighter and get a breakdown of their style on a page designed around that fighter, plus tutorials on how to adopt the techniques that define them. The design is the main selling point, so every fighter page has its own colours, type, motion and layout, all built from one shared system.

It is for boxing fans and beginners who want to understand how great fighters actually fight, and for recruiters who will judge the project from one demo link.

**MVP (four weeks, about 10 hours a week):**

- A fighter selection screen: a full-screen carousel of 5 fighters, each with a looping video behind them
- 5 fighter pages, each with its own theme, a written style breakdown, a trait radar chart, signature techniques and an embedded video
- Technique tutorials with steps, common mistakes, a drill and a video, for 2-3 techniques per fighter
- Compare mode for any two fighters
- A "find your style" quiz that matches you to a fighter
- Login and favourites with Supabase

**Not yet:** more than 5 fighters, comments, an admin panel, other combat sports, a mobile app.

## Design direction

The site uses one design system with five themes: the layout engine is shared, but each fighter overrides colour, typeface, texture, motion and hero layout, so each page feels made for that fighter and the code stays small.

**Shared system (the same on every page):**

- A dark, cinematic base with large video, big type and a film-grain overlay.
- A 12-column grid, an 8 px spacing scale, and one component set: hero, trait radar, technique card, video player, step list and compare bar.
- Scroll-driven reveals and page transitions with Framer Motion, switched off for visitors who prefer reduced motion.

**The selection screen:** full-height vertical panels, one per fighter. Hovering a panel widens it and plays that fighter's video in their colours, and clicking one expands it into the fighter page with a shared-element transition. On a phone the panels become a swipeable carousel.

**Each fighter's theme** is one row of values in the database (accent colour, background, display font, texture, hero layout and motion preset), and the page reads them into CSS variables. The five starting themes:

| Fighter | Style idea | Palette | Display font | Hero layout | Motion preset |
| --- | --- | --- | --- | --- | --- |
| Mike Tyson | Pressure and head movement | Black trunks, steel white | Anton | Full-bleed video with a huge name overlapping it | Slam: heavy scale-ins and a screen shake on impact |
| Gennady Golovkin | Calm, relentless pressure that cuts off the ring | Deep red, gold, bone | Big Shoulders Display | Lines converge on the fighter, like the ring closing in | Stalk: slow, steady movement toward the viewer, then a body-shot pulse |
| Dmitry Bivol | Controlled distance and a precise jab | White, royal blue, red | Space Grotesk | Split screen with range rings and measurement marks | Measure: metronome-steady, linear reveals |
| Vasyl Lomachenko | Angles and footwork | Dark navy, Ukrainian blue, yellow | Syne | Diagonal sections cut at an angle, with the whole layout mirrored because he is a southpaw | Pivot: rotations and diagonal wipes |
| Terence Crawford | A switch-hitter who adapts mid-fight | Black, gold, warm white | Chakra Petch | A stance toggle that mirrors the whole page live | Switch: mirror flips and quick stance cuts |

A few rules keep it looking professional: one accent colour per page, text contrast of at least 4.5:1, no logos or brand marks, and video only on the hero and technique pages so the site stays fast.

## Pages and features

The site has seven pages, and the first three carry the project. Build in this order, and cut from the bottom of the table if you fall behind.

| Page | What it does | Priority |
| --- | --- | --- |
| Home (selection screen) | Full-height fighter panels that play video on hover and expand into the fighter page | Must |
| Fighter page | A themed hero, a one-sentence style summary, the trait radar, a written breakdown, signature techniques, an "adopt this style" drill path and videos | Must |
| Technique page | Steps, common mistakes, a drill, a video, and the fighters who use it | Must |
| About and credits | Image and video credits, sources, and the safety note | Must |
| Compare | Two fighters side by side, with their radars overlaid and the shared and different techniques listed | Should |
| Style quiz | 8-10 questions, then a matched fighter with a match score and a link to their page | Should |
| Account and favourites | Login with Supabase Auth, and saved fighters and techniques | Should |

**Every fighter page follows the same section order**, so you only write the page once and the theme does the rest:

1. Hero: name, one-line style label, looping video
2. Style in one sentence, then the trait radar
3. How he fights: range, defence and offence, in two or three short paragraphs
4. Signature techniques: cards that link to technique pages
5. Adopt this style: a three-step drill path from beginner to advanced
6. Watch: two or three embedded fight clips with a note on what to look for
7. Compare and favourite buttons

**How the quiz matches you:** each answer adds points to the five traits (pressure, footwork, defence, power, counter-punching). The result is the fighter whose trait scores are closest to yours, measured as the straight-line distance between the two sets of five numbers. This is simple to code, easy to explain in an interview, and it reuses the data behind the radar charts.

## Tech stack

Use Next.js with TypeScript, Tailwind and Framer Motion, with Supabase behind it and Vercel for hosting. It is a common stack in junior job listings, and it gives you a public link to put on your resume.

| Part | Choice | Why | When |
| --- | --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | One page file serves every fighter by its slug, and it deploys to Vercel with no setup | Week 1 |
| Styling | Tailwind CSS + CSS variables | Fast to build, and a fighter theme is just a set of CSS variables | Week 1 |
| Animation | Framer Motion | Shared-element transitions, scroll reveals and the five motion presets | Week 2 |
| Charts | Recharts (radar chart) | Draws the trait radar and overlays two fighters for compare mode | Week 2 |
| Database and login | Supabase (Postgres, Auth) | Real SQL, row level security, and login for favourites | Week 2 |
| Video | YouTube embeds with start and end times | Footage from fights is copyrighted, so you embed it instead of hosting it | Week 1 |
| Fonts | `next/font` with Google Fonts | Loads the five display fonts without layout jumps | Week 1 |
| Images | Wikimedia Commons (CC licences) or your own illustrations | Safe to publish, with credits on the About page | Week 1 |
| Hosting | Vercel | Free tier, a public URL, and a preview link for every pull request | Week 1 |

You have not built with Next.js on your own, so treat week 1 as the learning week. Learn the App Router basics (pages, layouts, dynamic routes) and Tailwind first, and add the other libraries one at a time.

## Database plan

Use Supabase Postgres from the start. The content tables (fighters, themes, traits, techniques, videos, quiz) can be read by everyone, and only `favourites` belongs to a logged-in user. A fighter is one row, and the page you see is built from that row plus its related rows, so adding a sixth fighter later means adding data, not code.

```sql
-- FIGHTERS AND THEMES
create table fighters (
  slug            text primary key,             -- 'ali'
  name            text not null,
  nickname        text,
  country         text,
  stance          text not null,                -- orthodox | southpaw | switch
  style_label     text not null,                -- 'Out-boxer: float and sting'
  summary         text not null,                -- one sentence
  breakdown_md    text not null,                -- range, defence, offence
  hero_video_id   text,                         -- YouTube id
  hero_start      integer,                      -- seconds
  hero_end        integer,
  hero_image_url  text,                         -- fallback still, with credit
  position        integer not null              -- order on the selection screen
);

create table fighter_themes (
  fighter_slug  text primary key references fighters(slug),
  accent        text not null,                  -- '#2F5BFF'
  background    text not null,
  foreground    text not null,
  display_font  text not null,                  -- 'DM Serif Display'
  texture       text,                           -- grain | halftone | paper | none
  hero_layout   text not null,                  -- split | fullbleed | converge | diagonal | switch
  motion_preset text not null,                  -- measure | slam | stalk | pivot | switch
  mirrored      boolean not null default false  -- true for southpaws; switch-hitters get a toggle
);

create table fighter_traits (                   -- feeds the radar, compare and quiz
  fighter_slug text primary key references fighters(slug),
  pressure     smallint not null check (pressure between 1 and 10),
  footwork     smallint not null check (footwork between 1 and 10),
  defence      smallint not null check (defence between 1 and 10),
  power        smallint not null check (power between 1 and 10),
  counter      smallint not null check (counter between 1 and 10)
);

-- TECHNIQUES AND LINKS
create table techniques (
  slug       text primary key,                  -- 'shoulder-roll'
  name       text not null,
  summary    text not null,
  steps      text[] not null,                   -- ordered steps
  mistakes   text[] not null,
  drill      text not null,
  video_id   text,
  video_start integer
);

create table fighter_techniques (
  fighter_slug   text references fighters(slug),
  technique_slug text references techniques(slug),
  note           text,                          -- how this fighter uses it
  position       integer not null,
  primary key (fighter_slug, technique_slug)
);

create table adopt_steps (                      -- the 'adopt this style' path
  fighter_slug text references fighters(slug),
  level        smallint check (level between 1 and 3),
  title        text not null,
  body         text not null,
  primary key (fighter_slug, level)
);

create table fighter_videos (
  id             bigint generated always as identity primary key,
  fighter_slug   text not null references fighters(slug),
  youtube_id     text not null,
  title          text not null,
  start_seconds  integer,
  what_to_watch  text
);

-- QUIZ
create table quiz_questions (
  id        smallint primary key,
  position  smallint not null,
  prompt    text not null
);

create table quiz_options (
  id          bigint generated always as identity primary key,
  question_id smallint not null references quiz_questions(id),
  label       text not null,
  pressure smallint not null default 0, footwork smallint not null default 0,
  defence  smallint not null default 0, power    smallint not null default 0,
  counter  smallint not null default 0          -- points added to the user's profile
);

-- USER DATA
create table favourites (
  user_id    uuid not null references auth.users(id),
  kind       text not null check (kind in ('fighter', 'technique')),
  item_slug  text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, kind, item_slug)
);

alter table favourites enable row level security;
create policy "own favourites" on favourites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

**Notes:**

- Turn on row level security for every table. The content tables get a select-only policy, so the app can read them but not change them.
- The quiz result is calculated in code, not stored: add up the points from the chosen options, then pick the fighter whose traits are nearest.
- Keep the project URL and the public key in environment variables, and never put the service role key in the app.
- Write the seed data as one SQL file in the repo, so you can rebuild the whole database in a minute.

## Content plan

Content is the biggest time cost, so budget about 12 of your 40 hours for it and ship 3 fighters first, then add the other 2 in week 3. The five fighters were chosen to contrast, which makes the radar charts, compare mode and quiz more interesting.

**Starting trait scores (1-10).** These are draft values from general knowledge, written as your own analysis. Change them after you have watched the footage, and explain each score in the breakdown text.

| Fighter | Pressure | Footwork | Defence | Power | Counter |
| --- | --- | --- | --- | --- | --- |
| Mike Tyson | 10 | 6 | 8 | 10 | 4 |
| Gennady Golovkin | 9 | 7 | 5 | 9 | 5 |
| Dmitry Bivol | 6 | 8 | 8 | 6 | 7 |
| Vasyl Lomachenko | 6 | 10 | 7 | 6 | 7 |
| Terence Crawford | 7 | 8 | 8 | 8 | 9 |

**Each fighter needs (about 1.5 hours with AI drafting and you checking):**

- A style label and a one-sentence summary
- A breakdown of 150-250 words covering range, defence and offence
- The five trait scores above
- Three signature techniques, each linked to a technique page
- A three-level "adopt this style" drill path, from beginner to advanced
- One hero clip and two more clips, each with a note on what to watch for
- One image with its credit, or an illustration
- A theme row from the design section

**Each technique needs (about 30 minutes):** a summary, 4-6 steps, 2-3 common mistakes, one drill and a video. Expect about 10 techniques in total, because some are shared between fighters (the jab, for example).

**Rules for media and facts:**

- Embed fight footage from YouTube and never download or host it. Check that embedding is allowed before you pick a clip, and keep a still image as a fallback in case a video is removed.
- Use images from Wikimedia Commons with their licence and author credit, or illustrate your own silhouettes in each theme's palette. Do not use press photos.
- Do not use logos, sponsor marks or brand names as design elements.
- Write only career facts you can source (records, dates, titles), and put the sources on the About page. Style analysis is your opinion, so label it as such.
- Add a note that the tutorials cover fundamentals and are not a replacement for a coach.

## Four-week milestones

Each week ends with something live on a public URL, and the order is built so that a themed fighter page works by the end of week 1. If you fall behind, cut in this order: favourites and login, compare mode, then fighters 4 and 5 (ship with three).

| Week | Build | Learn | Done when |
| --- | --- | --- | --- |
| 1. One themed page | Create the Next.js + TypeScript + Tailwind project and deploy it to Vercel on day one. Build the theme system (a theme object turned into CSS variables). Build the Tyson page from a local data file: hero, summary, radar chart, technique cards | App Router, dynamic routes, Tailwind, CSS variables, Recharts basics | The Tyson page is live, and changing the theme object in the data file restyles the whole page |
| 2. Selection screen and real data | Build the selection screen with hover video and the expand transition. Create the Supabase project and tables, seed 3 fighters, and load pages from the database. Add 3 motion presets with Framer Motion | SQL and Postgres basics, supabase-js, Framer Motion, shared-element transitions | You can pick Tyson, Bivol or Lomachenko from the home screen, each page looks and moves differently, and the data comes from Supabase |
| 3. Techniques, compare and quiz | Build technique pages and the "adopt this style" path. Add fighters 4 and 5 as data. Build compare mode with overlaid radars. Build the quiz and the nearest-fighter match | Dynamic data in Next.js, state in React, simple scoring logic | Compare shows two radars on one chart, and the quiz returns a fighter that links to their page |
| 4. Polish and show it | Login and favourites, mobile layout, performance and accessibility pass, the About and credits page. Write the README with screenshots and a 60-second demo video, and add resume bullets | Supabase Auth and row level security, Lighthouse, writing for a first-time visitor | A recruiter understands the project in 60 seconds from the README, and the site works on a phone |

## AI use and review rules

Use AI heavily for content drafts and repetitive code, and write the core logic yourself, so you can finish in a month and still explain every important part in an interview.

- **Week 1:** write the theme system and the Tyson page yourself, and use AI only to explain errors and review your code. These are the pieces an interviewer will ask about first.
- **Weeks 2-4:** let AI draft code on a branch, one feature per pull request. Read the diff, run it, and merge only what you can explain.
- **Fine to hand to AI:** first drafts of fighter and technique text, Tailwind styling variations, config files, seed SQL and test data.
- **Write yourself:** the function that turns a theme into CSS variables, the quiz matching function, the Supabase queries and the row level security policy.
- **Fact-check all fighter text.** AI can sound sure and still be wrong about fights, so check each breakdown against footage and a reliable source.
- **Before merging:** explain each changed file in 2-3 sentences in your dev log. If you cannot, have AI explain it until you can, or do not merge.
- **Once a week:** make one small change by hand, such as adding a trait, restyling a theme or changing the quiz scoring. If that is hard, the code is not yet yours.
- **Interview test:** walk through the theme system, the quiz match, one Supabase query and one row level security policy without notes. Recruiters rarely mind AI use, and what they test is whether you can explain your code.

## Risks and open decisions

The biggest risks are content time and video, not code, so check both in the first two days.

| Risk or question | Why it matters | What to do |
| --- | --- | --- |
| Content takes longer than planned | Five fighters plus about 10 techniques is roughly 12 hours of writing and checking | Ship 3 fighters first, and use AI drafts that you then verify |
| Videos cannot be embedded | Many official fight uploads block embedding, and clips can be removed later | Test the embed for each clip on day one, and keep a still-image fallback |
| Autoplay is blocked | Browsers only autoplay muted video, and phones can restrict it | Start every hero clip muted, and fall back to the still image |
| Copyright on images | Press photos cannot be published | Use Wikimedia Commons with credits, or your own illustrations |
| Wrong facts | A recruiter or fan who spots an error loses trust in the whole site | Source every career fact, and label the style analysis as your opinion |
| Heavy pages feel slow | Big videos and animation hurt performance, especially on phones | Limit video to hero and technique pages, lazy-load embeds, and test with Lighthouse in week 4 |
| Animation overload | Five motion presets can turn into chaos | Build one preset first, respect reduced motion, and tune the other four after the system works |
| Scope creep | Every extra fighter or feature delays the demo | Put new ideas on a "later" list until week 4 is done |
| Name and branding | "Ringcraft" is a working name and may already be used | Search for it before you buy a domain, and switch the name if needed |


> Palette note: colours are inspired by each fighter's trunks in well-known fights, from memory and not verified. Fighter photos are not yet in the mockup: they need Wikimedia Commons files with a checked licence and author, or original silhouettes.
