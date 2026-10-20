"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import type { Fighter } from "@/data/types";
import { setHandoff } from "@/lib/expandHandoff";
import { themeToCssVars } from "@/lib/theme";
import { HeroMedia } from "./HeroMedia";
import { TRAIT_ORDER } from "./TraitRadar";

// Clicking a panel expands it to fill the screen before the fighter page opens.
export const EXPAND_MS = 700;
const EXPAND = "duration-700 ease-[cubic-bezier(0.65,0,0.25,1)]"; // Tailwind needs the literal class
const EASE = "cubic-bezier(0.65,0,0.25,1)";

// "freeze" pins every panel at its measured size for one frame, so "go" has
// pixel values to transition from.
export type ExpandPhase = "idle" | "freeze" | "go";

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

export function panelStyle(f: Fighter): CSSProperties {
  return { ...themeToCssVars(f.theme), ...PANEL_BG[f.theme.heroLayout], "--fit-w": "calc(100cqw - 24px)" } as CSSProperties;
}

// Folds its content away while a panel expands.
function Collapse({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-rows-[1fr] transition-[grid-template-rows,opacity] ${EXPAND} group-data-[expand=go]:grid-rows-[0fr] group-data-[expand=go]:opacity-0 ${className}`}>
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

// Everything inside a panel. ExpandCover draws it again on the fighter page in
// the "go" phase, so the page starts on the frame the home screen ended on.
// Needs a .group parent carrying data-active and data-expand.
export function PanelBody({ fighter: f, total, active, phase }: { fighter: Fighter; total: number; active: boolean; phase: ExpandPhase }) {
  const t = f.theme;
  const num = String(f.position).padStart(2, "0");
  const go = phase === "go";

  return (
    <>
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
        <Collapse>
          <div className="label flex justify-between text-[14px] tracking-[0.2em]">
            <span>
              {num} / {String(total).padStart(2, "0")}
            </span>
            <span className="max-sm:hidden">Select a fighter</span>
          </div>
        </Collapse>
        {/* The clip gets the space left over by the text, so the two never overlap.
            While expanding it grows out to the panel edges and the text folds away. */}
        <div
          className={`relative mt-5 min-h-[140px] flex-1 border border-line/15 transition-[margin,border-color] ${EXPAND} group-data-[expand=go]:-mx-6 group-data-[expand=go]:-mt-6 group-data-[expand=go]:border-transparent md:group-data-[expand=go]:-mx-9 md:group-data-[expand=go]:-mt-7`}
        >
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
          <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-0 transition-opacity ${EXPAND} group-data-[expand=go]:opacity-100`} />
        </div>
        <div className="mt-5 shrink-0">
          {/* Grows into a hero-sized name that overlaps the bottom of the clip */}
          <div
            className="display fit-name relative -ml-1"
            style={
              {
                "--chars": f.displayName.length,
                "--name-max": go ? "400px" : "170px",
                "--overlap": go ? 1 : 0,
                marginTop: "calc(-0.55em * var(--overlap))",
                lineHeight: 0.9,
                transition: `--name-max ${EXPAND_MS}ms ${EASE}, --overlap ${EXPAND_MS}ms ${EASE}`,
              } as CSSProperties
            }
          >
            {f.displayName}
          </div>
          <div className="label mt-4 text-[18px] font-bold tracking-[0.22em] text-signal md:text-[20px]">{f.styleLabel}</div>
          <Collapse>
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
          </Collapse>
        </div>
      </div>
    </>
  );
}

// Measured when a panel is clicked. The clicked panel grows to the row's full
// size while every panel shifts left by its offset, so the panels before it
// slide off one side and the ones after it are pushed off the other.
type Expand = { index: number; go: boolean; widths: number[]; startH: number; rowH: number; x: number; y: number; w: number; h: number };

export function FighterPanels({ fighters }: { fighters: Fighter[] }) {
  const [active, setActive] = useState(0);
  const [expand, setExpand] = useState<Expand | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const router = useRouter();
  const reduce = useReducedMotion();

  function onClick(e: MouseEvent, i: number) {
    // New-tab clicks and reduced motion keep the plain link.
    if (reduce || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const row = rowRef.current;
    const panel = panelRefs.current[i];
    if (expand || !row || !panel) return;
    const r = row.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    setActive(i);
    setExpand({
      index: i,
      go: false,
      widths: panelRefs.current.map((el) => el?.getBoundingClientRect().width ?? 0),
      startH: p.height,
      rowH: r.height,
      x: p.left - r.left,
      y: p.top - r.top,
      w: row.clientWidth,
      h: Math.max(window.innerHeight - r.top, p.height),
    });
  }

  useEffect(() => {
    if (!expand) return;
    if (!expand.go) {
      // Two frames: let the frozen sizes paint before transitioning away from them.
      let id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => setExpand((e) => e && { ...e, go: true }));
      });
      return () => cancelAnimationFrame(id);
    }
    const slug = fighters[expand.index].slug;
    const id = setTimeout(() => {
      const clip = panelRefs.current[expand.index]?.querySelector("video");
      setHandoff({ slug, clipTime: clip?.currentTime ?? 0 });
      router.push(`/fighters/${slug}`);
    }, EXPAND_MS);
    return () => clearTimeout(id);
  }, [expand, fighters, router]);

  return (
    <div
      ref={rowRef}
      style={expand ? { height: expand.go ? expand.h : expand.rowH } : undefined}
      className={`flex w-full gap-3 px-4 py-4 md:h-[calc(100svh-72px)] md:min-h-[640px] md:gap-0 md:overflow-hidden md:p-0 ${
        expand ? `overflow-hidden transition-[height] ${EXPAND}` : "overflow-x-auto max-md:snap-x max-md:snap-mandatory"
      }`}
    >
      {fighters.map((f, i) => {
        const isActive = i === active;
        const phase: ExpandPhase = !expand || expand.index !== i ? "idle" : expand.go ? "go" : "freeze";
        const style: CSSProperties = { ...panelStyle(f), "--grow": isActive ? 4.2 : 1 } as CSSProperties;
        if (expand) {
          const grown = expand.go && expand.index === i;
          Object.assign(style, {
            flex: "none",
            width: grown ? expand.w : expand.widths[i],
            transform: expand.go ? `translate(${-expand.x}px, ${-expand.y}px)` : undefined,
            ...(expand.index === i && { height: grown ? expand.h : expand.startH }),
          });
        }
        return (
          <Link
            key={f.slug}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            href={`/fighters/${f.slug}`}
            data-active={isActive}
            data-expand={phase === "idle" ? undefined : phase}
            onMouseEnter={() => !expand && setActive(i)}
            onFocus={() => !expand && setActive(i)}
            onClick={(e) => onClick(e, i)}
            aria-label={`${f.name}: ${f.panelLabel}. Open the profile.`}
            className={`fit-box group relative block min-w-0 flex-none snap-center overflow-hidden bg-bg text-fg max-md:h-[min(720px,calc(100svh-120px))] max-md:w-[86vw] md:h-full md:border-l md:border-white/10 md:first:border-l-0 md:[flex:var(--grow)_1_0%] ${
              expand ? `transition-[width,height,transform] ${EXPAND}` : "md:transition-[flex-grow] md:duration-500 md:ease-out"
            }`}
            style={style}
          >
            <PanelBody fighter={f} total={fighters.length} active={isActive} phase={phase} />
          </Link>
        );
      })}
    </div>
  );
}
