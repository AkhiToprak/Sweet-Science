"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Fighter } from "@/data/types";
import { themeToCssVars } from "@/lib/theme";
import { HeroMedia } from "./HeroMedia";
import { TRAIT_ORDER } from "./TraitRadar";

// Collapsed-panel backgrounds, one per hero layout (from design/mockups/Main.dc.html).
const PANEL_BG: Record<string, CSSProperties> = {
  fullbleed: {
    backgroundImage:
      "radial-gradient(120% 70% at 30% 100%,rgb(120 124 134/.85) 0%,rgb(120 124 134/0) 62%),repeating-linear-gradient(0deg,rgb(255 255 255/.04) 0,rgb(255 255 255/.04) 1px,transparent 1px,transparent 4px)",
  },
  converge: {
    backgroundImage:
      "linear-gradient(115deg,transparent 48%,color-mix(in srgb,var(--accent) 40%,transparent) 48.4%,transparent 49%),linear-gradient(65deg,transparent 51%,color-mix(in srgb,var(--accent) 40%,transparent) 51.4%,transparent 52%),linear-gradient(120deg,transparent 40%,color-mix(in srgb,var(--accent) 12%,transparent) 40.4%,transparent 41%),linear-gradient(60deg,transparent 59%,color-mix(in srgb,var(--accent) 12%,transparent) 59.4%,transparent 60%)",
  },
  split: {
    backgroundImage:
      "repeating-radial-gradient(circle at 50% 78%,transparent 0,transparent 58px,color-mix(in srgb,var(--accent) 20%,transparent) 58px,color-mix(in srgb,var(--accent) 20%,transparent) 59px),linear-gradient(color-mix(in srgb,var(--accent) 10%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--accent) 10%,transparent) 1px,transparent 1px)",
    backgroundSize: "auto,40px 40px,40px 40px",
  },
  diagonal: {
    backgroundImage:
      "linear-gradient(115deg,transparent 0,transparent 46%,rgb(31 123 255/.55) 46%,rgb(31 123 255/.55) 58%,var(--accent) 58%,var(--accent) 59%,transparent 59%)",
  },
  switch: {
    backgroundImage:
      "linear-gradient(90deg,color-mix(in srgb,var(--accent) 22%,transparent) 0,color-mix(in srgb,var(--accent) 22%,transparent) 50%,transparent 50%),linear-gradient(90deg,transparent 49.5%,var(--accent) 49.5%,var(--accent) 50.5%,transparent 50.5%)",
  },
};

function Panel({ fighter: f, active, total, onActivate }: { fighter: Fighter; active: boolean; total: number; onActivate: () => void }) {
  const t = f.theme;
  const num = String(f.position).padStart(2, "0");

  return (
    <Link
      href={`/fighters/${f.slug}`}
      data-active={active}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-label={`${f.name}: ${f.panelLabel}. Open the profile.`}
      className="fit-box group relative block min-w-0 flex-none snap-center md:[flex:var(--grow)_1_0%] overflow-hidden bg-bg text-fg max-md:h-[min(720px,calc(100svh-120px))] max-md:w-[86vw] md:h-full md:border-l md:border-white/10 md:first:border-l-0 md:transition-[flex-grow] md:duration-500 md:ease-out"
      style={{ ...themeToCssVars(t), ...PANEL_BG[t.heroLayout], "--grow": active ? 4.2 : 1, "--fit-w": "calc(100cqw - 24px)" } as CSSProperties}
    >
      {/* Collapsed: vertical name (desktop only) */}
      <div aria-hidden="true" className="absolute inset-0 transition-opacity duration-300 max-md:hidden group-data-[active=true]:pointer-events-none group-data-[active=true]:opacity-0">
        <span className="label absolute left-6 top-7 text-[14px] tracking-[0.2em]">{num}</span>
        <span
          className="display absolute bottom-11 left-5 leading-none [writing-mode:vertical-rl]"
          style={{ transform: "rotate(180deg)", fontSize: `min(92px, calc(620px / ${f.displayName.length} / var(--display-width)))` }}
        >
          {f.displayName}
        </span>
        <span className="label absolute bottom-11 right-5 text-[13px] tracking-[0.2em] text-signal [writing-mode:vertical-rl]" style={{ transform: "rotate(180deg)" }}>
          {f.panelLabel}
        </span>
        <span className="absolute inset-x-0 bottom-0 h-1 bg-signal" />
      </div>

      {/* Expanded: always shown on phones, on hover or focus on desktop */}
      <div className="absolute inset-0 flex flex-col px-6 py-6 transition-opacity duration-500 md:px-9 md:py-7 md:group-data-[active=false]:pointer-events-none md:group-data-[active=false]:opacity-0">
        <div className="label flex justify-between text-[14px] tracking-[0.2em]">
          <span>
            {num} / {String(total).padStart(2, "0")}
          </span>
          <span className="max-sm:hidden">Select a fighter</span>
        </div>
        {/* The clip gets the space left over by the text, so the two never overlap */}
        <div className="relative mt-5 min-h-[140px] flex-1 border border-line/15">
          <HeroMedia
            videoId={f.heroVideoId}
            start={f.heroStart}
            end={f.heroEnd}
            imageUrl={f.heroImageUrl}
            clipUrl={f.hoverClipUrl}
            alt={`${f.name} clip`}
            playing={active}
            playSize={72}
            className={`art-${t.heroLayout}`}
          />
        </div>
        <div className="mt-5 shrink-0">
          <div
            className="display fit-name -ml-1"
            style={{ "--chars": f.displayName.length, "--name-max": "170px", lineHeight: 0.9 } as CSSProperties}
          >
            {f.displayName}
          </div>
          <div className="label mt-4 text-[18px] font-bold tracking-[0.22em] text-signal md:text-[20px]">{f.styleLabel}</div>
          <p className="mb-0 mt-3 max-w-[520px] text-[17px] leading-[1.45] text-muted md:text-[19px]">{f.teaser}</p>
          <div className="mt-6 flex gap-4 max-sm:hidden">
            {TRAIT_ORDER.map((k) => (
              <div key={k} className="min-w-0 flex-1">
                <div className="label flex justify-between text-[13px] tracking-[0.14em] text-muted">
                  <span>{k}</span>
                  <span className="text-fg">{f.traits[k]}</span>
                </div>
                <div className="mt-2 h-1 bg-line/15">
                  <div className="h-1 bg-accent" style={{ width: `${f.traits[k] * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
          <span className="label mt-6 inline-flex min-h-12 items-center bg-button px-7 text-[18px] font-bold text-on-button">Enter the profile &rarr;</span>
        </div>
      </div>
    </Link>
  );
}

export function FighterPanels({ fighters }: { fighters: Fighter[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex w-full gap-3 overflow-x-auto px-4 py-4 max-md:snap-x max-md:snap-mandatory md:h-[calc(100svh-72px)] md:min-h-[640px] md:gap-0 md:overflow-hidden md:p-0">
      {fighters.map((f, i) => (
        <Panel key={f.slug} fighter={f} active={i === active} total={fighters.length} onActivate={() => setActive(i)} />
      ))}
    </div>
  );
}
