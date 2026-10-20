import type { CSSProperties } from "react";
import { DISPLAY_FONTS } from "@/app/fonts";
import type { Theme } from "@/data/types";

// Turns one theme row into the CSS variables every component reads.
// CLAUDE.md lists this as a piece the owner wants to write: this version exists
// so the mockups run, and is meant to be rewritten.
export function themeToCssVars(theme: Theme): CSSProperties {
  return {
    "--accent": theme.accent,
    "--on-accent": theme.onAccent,
    "--bg": theme.background,
    "--fg": theme.foreground,
    "--surface": theme.surface,
    "--muted": theme.muted,
    "--subtle": theme.subtle,
    "--line": theme.line,
    "--signal": theme.signal,
    "--button": theme.button,
    "--on-button": theme.onButton,
    "--rule": theme.rule,
    "--media-from": theme.mediaFrom,
    "--media-to": theme.mediaTo,
    "--adopt-bg": theme.adoptBg,
    "--adopt-fg": theme.adoptFg,
    "--font-display": DISPLAY_FONTS[theme.displayFont] ?? "var(--font-anton)",
    "--display-case": theme.displayCase === "upper" ? "uppercase" : "none",
    "--display-weight": String(theme.displayWeight),
    "--display-tracking": theme.displayTracking,
    "--display-width": String(theme.displayWidth),
    "--ds": String(theme.displayScale),
  } as CSSProperties;
}
