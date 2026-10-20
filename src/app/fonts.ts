import {
  Anton,
  Barlow,
  Barlow_Condensed,
  Big_Shoulders,
  Chakra_Petch,
  Space_Grotesk,
  Syne,
} from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const barlow = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });
const barlowCondensed = Barlow_Condensed({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-barlow-condensed", display: "swap" });
// Google now ships "Big Shoulders Display" as "Big Shoulders".
const bigShoulders = Big_Shoulders({ weight: ["800", "900"], subsets: ["latin"], variable: "--font-big-shoulders", display: "swap", adjustFontFallback: false });
const spaceGrotesk = Space_Grotesk({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const syne = Syne({ weight: ["700", "800"], subsets: ["latin"], variable: "--font-syne", display: "swap" });
const chakraPetch = Chakra_Petch({ weight: ["600", "700"], subsets: ["latin"], variable: "--font-chakra-petch", display: "swap" });

export const fontVariables = [anton, barlow, barlowCondensed, bigShoulders, spaceGrotesk, syne, chakraPetch]
  .map((f) => f.variable)
  .join(" ");

// Theme rows store the font's name; this maps it to the loaded CSS variable.
export const DISPLAY_FONTS: Record<string, string> = {
  Anton: "var(--font-anton)",
  "Big Shoulders Display": "var(--font-big-shoulders)",
  "Space Grotesk": "var(--font-space-grotesk)",
  Syne: "var(--font-syne)",
  "Chakra Petch": "var(--font-chakra-petch)",
};
