// Hand-off between a home panel and the fighter page it expands into. The panel
// leaves a note here before navigating; the fighter page reads it, draws the
// panel's last frame over its hero and fades it out. A plain module variable is
// enough: it survives client-side navigation and is empty on a fresh load.

export type Handoff = { slug: string; clipTime: number };

let pending: Handoff | null = null;

export function setHandoff(h: Handoff) {
  pending = h;
}

export function peekHandoff(slug: string): Handoff | null {
  return pending?.slug === slug ? pending : null;
}

export function clearHandoff() {
  pending = null;
}
