import type { Fighter } from "./types";

// Copy and colours come from the mockups in design/mockups. Trait scores are the
// draft values from the plan. Palettes are trunk-inspired guesses, not verified.
// Style text is opinion and still needs fact-checking.

const tyson: Fighter = {
  slug: "tyson",
  name: "Mike Tyson",
  displayName: "Tyson",
  stance: "orthodox",
  styleLabel: "Pressure & head movement",
  panelLabel: "Pressure & head movement",
  teaser:
    "Closes the distance behind a tight guard and constant head movement, then ends exchanges with short, explosive hooks.",
  summary:
    "Tyson closes the distance behind a tight guard and constant head movement, then ends exchanges with short, explosive hooks and uppercuts.",
  tags: ["High guard", "Bob and weave", "Short hooks"],
  breakdown: {
    range:
      "Tyson fights at close range. Quick forward steps and head movement take him inside, where his hooks and uppercuts are short and hard to see coming.",
    defence:
      "The peek-a-boo guard keeps both gloves tight to the face while the head bobs and weaves. Each slip also loads the next punch, so defence and offence become one motion.",
    offence:
      "Combinations arrive in bursts of hooks and uppercuts to the head and body, thrown with the whole body behind them instead of just the arms.",
  },
  heroVideoId: null,
  heroImageUrl: null,
  heroImageCredit: null,
  position: 1,
  theme: {
    accent: "#D5D9E0",
    background: "#0B0B0C",
    foreground: "#F4F1EA",
    displayFont: "Anton",
    texture: "grain",
    heroLayout: "fullbleed",
    motionPreset: "slam",
    mirrored: false,
    surface: "#141416",
    muted: "#CFC8BD",
    subtle: "#A9A298",
    line: "255 255 255",
    onAccent: "#0B0B0C",
    signal: "#FFFFFF",
    button: "#D5D9E0",
    onButton: "#0B0B0C",
    rule: "#D5D9E0",
    mediaFrom: "#111114",
    mediaTo: "#26262B",
    adoptBg: "#D5D9E0",
    adoptFg: "#0B0B0C",
    radarStroke: "#FFFFFF",
    radarDot: "#FFFFFF",
    displayCase: "upper",
    displayWeight: 400,
    displayTracking: "0.01em",
    displayWidth: 0.48,
    displayScale: 1,
  },
  traits: { pressure: 10, footwork: 6, defence: 8, power: 10, counter: 4 },
  techniques: [
    { slug: "peek-a-boo-guard", name: "Peek-a-boo guard", level: "beginner", summary: "Gloves at the cheekbones, elbows in, chin down." },
    { slug: "bob-and-weave", name: "Bob and weave", level: "intermediate", summary: "Dip under a punch and come up on the other side." },
    { slug: "hook-to-the-body", name: "Hook to the body", level: "intermediate", summary: "Bend the knees, turn the hips, and drive into the ribs." },
  ],
  adopt: [
    { level: 1, title: "Build the guard", body: "Stand in a compact stance with the gloves at the cheekbones. Practise small slips in front of a mirror for three rounds of two minutes." },
    { level: 2, title: "Move under the line", body: "Tie a string at shoulder height and bob under it, then come up with a hook. Keep the knees bent and the chin tucked." },
    { level: 3, title: "Explode out", body: "Add a forward step to the bob and weave, and finish with a hook and uppercut. Practise with a coach when you can." },
  ],
  videos: [
    { youtubeId: null, title: "Clip 1", whatToWatch: "the head leaves the centre line before every punch." },
    { youtubeId: null, title: "Clip 2", whatToWatch: "how the gloves stay high while he moves forward." },
    { youtubeId: null, title: "Clip 3", whatToWatch: "the hook that follows a slip, thrown from the hips." },
  ],
};

const golovkin: Fighter = {
  slug: "golovkin",
  name: "Gennady Golovkin",
  displayName: "Golovkin",
  stance: "orthodox",
  styleLabel: "Calm pressure",
  panelLabel: "Cut off the ring",
  teaser:
    "Walks opponents down behind a heavy jab, cuts off the ring, then breaks them with body shots.",
  summary:
    "Golovkin walks opponents down with a heavy jab and balanced footwork, cutting off the ring before he breaks them with body shots.",
  tags: ["Stiff jab", "Cut the ring", "Body shots"],
  breakdown: {
    range:
      "Golovkin stays within jab range and keeps stepping forward. Balanced steps shrink the ring, so there is rarely a place for the opponent to retreat to.",
    defence:
      "A tight guard and a steady jab keep opponents at the end of his reach. He relies more on cutting off their exits than on dodging punches.",
    offence:
      "The jab sets the range and opens the door for heavy hooks, with the left hook to the body wearing opponents down over the rounds.",
  },
  heroVideoId: null,
  heroImageUrl: null,
  heroImageCredit: null,
  position: 2,
  theme: {
    accent: "#E3B23C",
    background: "#140808",
    foreground: "#EFE7D8",
    displayFont: "Big Shoulders Display",
    texture: "grain",
    heroLayout: "converge",
    motionPreset: "stalk",
    mirrored: false,
    surface: "#200D0F",
    muted: "#CFC4B0",
    subtle: "#A89F8E",
    line: "239 231 216",
    onAccent: "#140808",
    signal: "#E3B23C",
    button: "#E3B23C",
    onButton: "#140808",
    rule: "#E3B23C",
    mediaFrom: "#330E11",
    mediaTo: "#5A1519",
    adoptBg: "#E3B23C",
    adoptFg: "#140808",
    radarStroke: "#E3B23C",
    radarDot: "#E3B23C",
    displayCase: "upper",
    displayWeight: 900,
    displayTracking: "0.02em",
    displayWidth: 0.52,
    displayScale: 1.18,
  },
  traits: { pressure: 9, footwork: 7, defence: 5, power: 9, counter: 5 },
  techniques: [
    { slug: "stiff-jab", name: "Stiff jab", level: "beginner", summary: "Extend, snap it back, and keep the rear hand at home." },
    { slug: "cutting-off-the-ring", name: "Cutting off the ring", level: "intermediate", summary: "Step toward the side your opponent wants to escape to." },
    { slug: "left-hook-to-the-body", name: "Left hook to the body", level: "intermediate", summary: "Bend the knees, turn the hips, and keep the elbow tucked." },
  ],
  adopt: [
    { level: 1, title: "Find the jab", body: "Stand balanced with your weight even on both feet. Throw slow, controlled jabs for three rounds, snapping each one back." },
    { level: 2, title: "Walk them down", body: "Mark a small ring with tape and shadow-box in it. Step to the side your imaginary opponent wants to escape to, without crossing your feet." },
    { level: 3, title: "Break the body", body: "Add the left hook to the body behind the jab, then step out. Keep the rhythm steady rather than rushed, and practise with a coach when you can." },
  ],
  videos: [
    { youtubeId: null, title: "Clip 1", whatToWatch: "the jab pushes the opponent toward the ropes before any combination." },
    { youtubeId: null, title: "Clip 2", whatToWatch: "his feet stay under him as he steps forward." },
    { youtubeId: null, title: "Clip 3", whatToWatch: "the body hook lands after the jab changes where the guard sits." },
  ],
};

const bivol: Fighter = {
  slug: "bivol",
  name: "Dmitry Bivol",
  displayName: "Bivol",
  stance: "orthodox",
  styleLabel: "Control the range",
  panelLabel: "Control the range",
  teaser: "Calm footwork and a stiff jab keep every exchange on his terms.",
  summary:
    "Bivol controls the range with a stiff jab and calm footwork, then scores in tidy, high-volume bursts without taking unnecessary risks.",
  tags: ["Stiff jab", "Range control", "Composed"],
  breakdown: {
    range:
      "Bivol manages distance with the jab and small, measured steps. He stays just outside his opponent's reach and steps in only to score.",
    defence:
      "He avoids trouble by never offering a clean target: a compact guard, shoulder turns, and a step out of range after each exchange.",
    offence:
      "Everything starts with the jab and flows into the right hand and short combinations, thrown in tidy bursts at a steady rate.",
  },
  heroVideoId: null,
  heroImageUrl: null,
  heroImageCredit: null,
  position: 3,
  theme: {
    accent: "#2450C8",
    background: "#F4F6FA",
    foreground: "#14307E",
    displayFont: "Space Grotesk",
    texture: "none",
    heroLayout: "split",
    motionPreset: "measure",
    mirrored: false,
    surface: "#FFFFFF",
    muted: "#3B4B8A",
    subtle: "#5A6AA8",
    line: "20 48 126",
    onAccent: "#FFFFFF",
    signal: "#D4202A",
    button: "#D4202A",
    onButton: "#FFFFFF",
    rule: "#14307E",
    mediaFrom: "#2450C8",
    mediaTo: "#0F1E52",
    adoptBg: "#14307E",
    adoptFg: "#F4F6FA",
    radarStroke: "#2450C8",
    radarDot: "#D4202A",
    displayCase: "none",
    displayWeight: 700,
    displayTracking: "-0.02em",
    displayWidth: 0.47,
    displayScale: 0.88,
  },
  traits: { pressure: 6, footwork: 8, defence: 8, power: 6, counter: 7 },
  techniques: [
    { slug: "stiff-jab", name: "Stiff jab", level: "beginner", summary: "Measure the distance, extend, and return to guard." },
    { slug: "range-control", name: "Range control", level: "intermediate", summary: "Small steps in and out to stay just beyond reach." },
    { slug: "jab-to-right-hand", name: "Jab to right hand", level: "beginner", summary: "The straight one-two, with the hips turning over." },
  ],
  adopt: [
    { level: 1, title: "Measure the distance", body: "Stand an arm's length from a wall or a bag and find the point where your jab just reaches it. Repeat until the distance feels natural." },
    { level: 2, title: "Step in, step out", body: "Throw a jab, then take a small step back before resetting. Stay on the balls of the feet and keep the stance narrow." },
    { level: 3, title: "Score and leave", body: "Link a jab and a right hand, then pivot out of range. Aim for tidy, repeatable combinations rather than power, and practise with a coach when you can." },
  ],
  videos: [
    { youtubeId: null, title: "Clip 1", whatToWatch: "how often the jab is thrown just to keep the distance." },
    { youtubeId: null, title: "Clip 2", whatToWatch: "the small step back after each exchange." },
    { youtubeId: null, title: "Clip 3", whatToWatch: "the right hand that follows a jab, and how quickly he resets." },
  ],
};

const lomachenko: Fighter = {
  slug: "lomachenko",
  name: "Vasyl Lomachenko",
  displayName: "Lomachenko",
  stance: "southpaw",
  styleLabel: "Find the angle",
  panelLabel: "Find the angle",
  teaser:
    "Steps off the line and pivots, so his punches arrive from angles the opponent cannot see.",
  summary:
    "Lomachenko turns every exchange into a geometry problem, stepping off the line and pivoting to punch from angles his opponent cannot see.",
  tags: ["Southpaw", "Pivots", "Angles"],
  breakdown: {
    range:
      "Lomachenko rarely stays in front of his opponent. He steps off the centre line so each exchange happens at an angle where he can punch and they cannot.",
    defence:
      "His best defence is position. By turning and stepping away from the line of attack, punches miss before he needs to block or slip them.",
    offence:
      "Quick combinations arrive from unusual angles, several punches at a time, and he pivots out before the reply comes.",
  },
  heroVideoId: null,
  heroImageUrl: null,
  heroImageCredit: null,
  position: 4,
  theme: {
    accent: "#FFD500",
    background: "#070B1A",
    foreground: "#F4F7FF",
    displayFont: "Syne",
    texture: "grain",
    heroLayout: "diagonal",
    motionPreset: "pivot",
    mirrored: true,
    surface: "#0E1530",
    muted: "#B8C2E0",
    subtle: "#9AA6C8",
    line: "244 247 255",
    onAccent: "#070B1A",
    signal: "#FFD500",
    button: "#FFD500",
    onButton: "#070B1A",
    rule: "#FFD500",
    mediaFrom: "#1B3A8A",
    mediaTo: "#0E1530",
    adoptBg: "#FFD500",
    adoptFg: "#070B1A",
    radarStroke: "#FFD500",
    radarDot: "#FFD500",
    displayCase: "none",
    displayWeight: 800,
    displayTracking: "-0.02em",
    displayWidth: 1.06,
    displayScale: 0.85,
  },
  traits: { pressure: 6, footwork: 10, defence: 7, power: 6, counter: 7 },
  techniques: [
    { slug: "triangle-footwork", name: "Triangle footwork", level: "advanced", summary: "Move around the opponent in a triangle and punch from each corner." },
    { slug: "pivot-step", name: "Pivot step", level: "intermediate", summary: "Turn on the ball of the front foot to open a new angle." },
    { slug: "step-off-the-line", name: "Step off the line", level: "beginner", summary: "A small step to the side, so the punch has nothing to hit." },
  ],
  adopt: [
    { level: 1, title: "Step off the line", body: "Draw a line on the floor and stand on it. Take a small step to the side after each jab, so you never finish where you started." },
    { level: 2, title: "Pivot", body: "Plant the front foot and turn the body around it to face a new angle. Go slowly first, then add a punch as you turn." },
    { level: 3, title: "Trace the triangle", body: "Tape a triangle on the floor and move from corner to corner, throwing a short combination from each one. Practise with a coach when you can." },
  ],
  videos: [
    { youtubeId: null, title: "Clip 1", whatToWatch: "how often his feet change the angle between punches." },
    { youtubeId: null, title: "Clip 2", whatToWatch: "the pivot that ends most combinations." },
    { youtubeId: null, title: "Clip 3", whatToWatch: "punches that arrive from the side instead of straight ahead." },
  ],
};

const crawford: Fighter = {
  slug: "crawford",
  name: "Terence Crawford",
  displayName: "Crawford",
  stance: "switch",
  styleLabel: "Switch and adapt",
  panelLabel: "Switch and adapt",
  teaser:
    "Switches stances mid-fight to change the angles, then counters once he has read the rhythm.",
  summary:
    "Crawford solves opponents in real time, switching stances to change the angles and the timing of his punches.",
  tags: ["Switch-hitter", "Ring IQ", "Counter timing"],
  breakdown: {
    range:
      "Crawford adjusts his distance to whatever his opponent does. He starts patiently at long range and closes in once he has read the rhythm.",
    defence:
      "A calm, responsive guard and constant small movements make opponents miss, and each miss becomes the start of a counter.",
    offence:
      "Switching between orthodox and southpaw changes which hand leads and which angles are open, so punches arrive from places the opponent has not prepared for.",
  },
  heroVideoId: null,
  heroImageUrl: null,
  heroImageCredit: null,
  position: 5,
  theme: {
    accent: "#E8B923",
    background: "#0C0C0E",
    foreground: "#FFF4E8",
    displayFont: "Chakra Petch",
    texture: "grain",
    heroLayout: "switch",
    motionPreset: "switch",
    mirrored: false,
    surface: "#17171B",
    muted: "#D8D2C4",
    subtle: "#A59E8C",
    line: "255 244 232",
    onAccent: "#0C0C0E",
    signal: "#E8B923",
    button: "#E8B923",
    onButton: "#0C0C0E",
    rule: "#E8B923",
    mediaFrom: "#3A3322",
    mediaTo: "#17171B",
    adoptBg: "#E8B923",
    adoptFg: "#0C0C0E",
    radarStroke: "#E8B923",
    radarDot: "#E8B923",
    displayCase: "none",
    displayWeight: 700,
    displayTracking: "0.005em",
    displayWidth: 0.56,
    displayScale: 0.86,
  },
  traits: { pressure: 7, footwork: 8, defence: 8, power: 8, counter: 9 },
  techniques: [
    { slug: "stance-switch", name: "Stance switch", level: "intermediate", summary: "Change lead foot and hand mid-exchange without losing balance." },
    { slug: "counter-timing", name: "Counter timing", level: "intermediate", summary: "Let the punch come, move off the line, and answer at once." },
    { slug: "feint-to-read-the-reaction", name: "Feint to read the reaction", level: "advanced", summary: "Fake a punch, watch how the opponent reacts, then use it." },
  ],
  adopt: [
    { level: 1, title: "Learn both stances", body: "Shadow-box a round in your natural stance, then a round in the opposite one. Keep the weight balanced and the guard high in both." },
    { level: 2, title: "Switch on the move", body: "Practise changing the lead foot with a small hop between punches. Start slowly and keep the feet about shoulder-width apart." },
    { level: 3, title: "Counter on purpose", body: "Have a partner throw a slow jab, step off the line, and answer. Repeat in both stances, and practise with a coach when you can." },
  ],
  videos: [
    { youtubeId: null, title: "Clip 1", whatToWatch: "the moment he switches stance and what changes after it." },
    { youtubeId: null, title: "Clip 2", whatToWatch: "a counter that follows a slip or a step off the line." },
    { youtubeId: null, title: "Clip 3", whatToWatch: "how long he watches before he commits to an attack." },
  ],
};

export const fighters: Fighter[] = [tyson, golovkin, bivol, lomachenko, crawford].sort(
  (a, b) => a.position - b.position,
);

export function getFighter(slug: string): Fighter | undefined {
  return fighters.find((f) => f.slug === slug);
}

export function nextFighter(slug: string): Fighter | undefined {
  const i = fighters.findIndex((f) => f.slug === slug);
  return fighters[i + 1];
}

export function findTechnique(slug: string) {
  for (const f of fighters) {
    const t = f.techniques.find((t) => t.slug === slug);
    if (t) return t;
  }
  return undefined;
}

export const allTechniqueSlugs = Array.from(
  new Set(fighters.flatMap((f) => f.techniques.map((t) => t.slug))),
);
