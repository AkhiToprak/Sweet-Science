// Shapes follow the tables in docs/Fighter-Styles-Site-Plan.md so this local
// data can be swapped for Supabase queries later. Fields marked "extra" are not
// in the SQL yet; the mockups needed them.

export type Stance = "orthodox" | "southpaw" | "switch";
export type HeroLayout = "fullbleed" | "converge" | "split" | "diagonal" | "switch";
export type MotionPreset = "slam" | "stalk" | "measure" | "pivot" | "switch";
export type Texture = "grain" | "halftone" | "paper" | "none";
export type Level = "beginner" | "intermediate" | "advanced";

export type TraitKey = "pressure" | "footwork" | "defence" | "power" | "counter";
export type Traits = Record<TraitKey, number>;

// fighter_themes row. Everything after `mirrored` is extra.
export type Theme = {
  accent: string;
  background: string;
  foreground: string;
  displayFont: string; // a key of DISPLAY_FONTS in src/app/fonts.ts
  texture: Texture;
  heroLayout: HeroLayout;
  motionPreset: MotionPreset;
  mirrored: boolean;

  surface: string; // alternate section background
  muted: string; // body copy
  subtle: string; // small print
  line: string; // hairline colour as "r g b", used with an alpha
  onAccent: string; // text on accent fills
  signal: string; // eyebrows and labels
  button: string; // primary button fill
  onButton: string;
  rule: string; // top rule on "how he fights" columns
  mediaFrom: string; // placeholder media gradient
  mediaTo: string;
  adoptBg: string;
  adoptFg: string;
  radarStroke: string;
  radarDot: string;
  displayCase: "upper" | "none";
  displayWeight: number;
  displayTracking: string; // letter-spacing for display text
  displayWidth: number; // average glyph width in em, used to fit huge names
  displayScale: number; // display sizes relative to Tyson's (condensed faces run larger)
};

export type Technique = {
  slug: string;
  name: string;
  summary: string;
  level: Level; // extra
};

export type AdoptStep = { level: 1 | 2 | 3; title: string; body: string };

export type Video = {
  youtubeId: string | null; // null = slot not picked yet
  title: string;
  startSeconds?: number;
  whatToWatch: string;
};

export type Fighter = {
  slug: string;
  name: string;
  displayName: string; // extra: the huge name on the hero
  stance: Stance;
  styleLabel: string;
  panelLabel: string; // extra: short label on the collapsed home panel
  teaser: string; // extra: short line for the home panel and hero
  summary: string;
  tags: string[]; // extra
  breakdown: { range: string; defence: string; offence: string };
  heroVideoId: string | null;
  heroStart?: number;
  heroEnd?: number;
  heroImageUrl: string | null; // still fallback, e.g. "/fighters/tyson/hero.jpg"
  heroImageCredit: string | null; // author and licence, shown under the hero
  hoverClipUrl: string | null; // extra: GIF or MP4 that plays while the home panel is hovered
  position: number;
  theme: Theme;
  traits: Traits;
  techniques: Technique[];
  adopt: AdoptStep[];
  videos: Video[];
};
