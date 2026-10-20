"use client";

import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import type { Fighter, MotionPreset } from "@/data/types";
import { HeroMedia } from "./HeroMedia";

type Props = {
  fighter: Fighter;
  mirrored: boolean;
  onStanceChange?: (mirrored: boolean) => void;
};

type NameMotion = { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };

// The five motion presets, applied to the hero name on load.
function nameMotion(preset: MotionPreset): NameMotion {
  switch (preset) {
    case "slam":
      return { initial: { scale: 1.3, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: "spring", stiffness: 520, damping: 24 } };
    case "stalk":
      return { initial: { y: 60, scale: 0.94, opacity: 0 }, animate: { y: 0, scale: 1, opacity: 1 }, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } };
    case "measure":
      return { initial: { x: -80, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.9, ease: "linear" } };
    case "pivot":
      return { initial: { rotate: -25, x: 120, opacity: 0 }, animate: { rotate: -5, x: 0, opacity: 1 }, transition: { type: "spring", stiffness: 140, damping: 18 } };
    case "switch":
      return { initial: { scaleX: -1, opacity: 0 }, animate: { scaleX: 1, opacity: 1 }, transition: { duration: 0.5, ease: "easeOut" } };
  }
}

function Name({ fighter, max, className = "", style, motionKey }: { fighter: Fighter; max: number; className?: string; style?: CSSProperties; motionKey?: string }) {
  const reduce = useReducedMotion();
  const m = nameMotion(fighter.theme.motionPreset);
  const base = fighter.theme.motionPreset === "pivot" ? { rotate: -5 } : {};
  return (
    <motion.h1
      key={motionKey}
      className={`display fit-name m-0 ${className}`}
      style={{ "--chars": fighter.displayName.length, "--name-max": `${max}px`, ...style } as CSSProperties}
      initial={reduce ? { ...m.animate, ...base } : m.initial}
      animate={{ ...m.animate, ...base }}
      transition={m.transition}
    >
      {fighter.displayName}
    </motion.h1>
  );
}

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`label absolute top-6 text-[15px] tracking-[0.22em] md:top-10 ${className}`}>{children}</div>;
}

const heroHeight = "h-[560px] md:h-[clamp(600px,52.8vw,760px)]";

function media(f: Fighter, alt = `${f.name} hero clip`) {
  return { videoId: f.heroVideoId, start: f.heroStart, end: f.heroEnd, imageUrl: f.heroImageUrl, clipUrl: f.hoverClipUrl, alt };
}

function stanceText(f: Fighter) {
  return `Stance: ${f.stance}`;
}

export function Hero({ fighter: f, mirrored, onStanceChange }: Props) {
  const reduce = useReducedMotion();
  const number = `${String(f.position).padStart(2, "0")} / Fighter profile`;
  const shake = f.theme.motionPreset === "slam" && !reduce;

  switch (f.theme.heroLayout) {
    case "fullbleed":
      return (
        <motion.section
          className={`fit-box relative overflow-hidden ${heroHeight}`}
          style={{
            backgroundColor: "var(--bg)",
            backgroundImage:
              "linear-gradient(115deg,transparent 52%,color-mix(in srgb,var(--accent) 28%,transparent) 52%,color-mix(in srgb,var(--accent) 28%,transparent) 66%,transparent 66%),radial-gradient(90% 80% at 70% 30%,var(--media-to) 0%,var(--media-from) 45%,var(--bg) 100%),repeating-linear-gradient(0deg,rgb(var(--line)/.035) 0,rgb(var(--line)/.035) 1px,transparent 1px,transparent 4px)",
          }}
          animate={shake ? { x: [0, -10, 8, -5, 3, 0] } : undefined}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="absolute inset-0 bottom-[32%]">
            <HeroMedia {...media(f)} className="" playSize={96} />
          </div>
          {(f.heroImageUrl || f.heroVideoId) && <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />}
          <Eyebrow className="left-4 md:left-10">{number}</Eyebrow>
          <Name fighter={f} max={470} className="absolute bottom-2 left-4 md:left-6 md:[--fit-w:calc(100cqw-360px)]" />
          <div className="absolute left-4 top-16 md:left-auto md:right-10 md:top-auto md:bottom-16 md:text-right">
            <div className="label text-[18px] font-bold tracking-[0.22em] text-signal md:text-[22px]">{f.styleLabel}</div>
            <div className="label mt-2 text-[15px] tracking-[0.2em] text-muted">{stanceText(f)}</div>
          </div>
        </motion.section>
      );

    case "converge":
      return (
        <section
          className={`fit-box relative overflow-hidden ${heroHeight}`}
          style={{
            backgroundColor: "var(--bg)",
            backgroundImage:
              "linear-gradient(to bottom right,transparent calc(50% - 1px),color-mix(in srgb,var(--accent) 50%,transparent) 50%,transparent calc(50% + 1px)),linear-gradient(to bottom left,transparent calc(50% - 1px),color-mix(in srgb,var(--accent) 50%,transparent) 50%,transparent calc(50% + 1px)),linear-gradient(to bottom right,transparent calc(50% - 1px),color-mix(in srgb,var(--accent) 22%,transparent) 50%,transparent calc(50% + 1px)),linear-gradient(to bottom left,transparent calc(50% - 1px),color-mix(in srgb,var(--accent) 22%,transparent) 50%,transparent calc(50% + 1px)),radial-gradient(70% 60% at 50% 100%,color-mix(in srgb,var(--accent) 22%,transparent) 0%,transparent 70%),repeating-linear-gradient(0deg,rgb(var(--line)/.03) 0,rgb(var(--line)/.03) 1px,transparent 1px,transparent 4px)",
            backgroundSize: "50% 100%,50% 100%,36% 100%,36% 100%,100% 100%,100% 100%",
            backgroundPosition: "left top,right top,14% top,86% top,0 0,0 0",
            backgroundRepeat: "no-repeat,no-repeat,no-repeat,no-repeat,no-repeat,repeat",
          }}
        >
          <Eyebrow className="left-4 md:left-10">{number}</Eyebrow>
          <div
            className="absolute left-1/2 top-[22%] h-[44%] w-[min(760px,92%)] -translate-x-1/2 md:top-[12.6%] md:h-[55%]"
            style={{ clipPath: "polygon(0 0,100% 0,80% 100%,20% 100%)" }}
          >
            <HeroMedia {...media(f)} />
          </div>
          <Name fighter={f} max={340} className="absolute inset-x-0 bottom-6 text-center md:bottom-[84px]" />
          <div className="label absolute left-4 top-14 text-[18px] font-bold tracking-[0.22em] text-signal md:left-10 md:top-auto md:bottom-8 md:text-[20px]">{f.styleLabel}</div>
          <div className="label absolute right-4 top-6 text-[15px] tracking-[0.2em] text-muted md:right-10 md:top-auto md:bottom-8">{stanceText(f)}</div>
        </section>
      );

    case "split":
      return (
        <section className={`relative flex flex-col overflow-hidden md:h-[clamp(600px,52.8vw,760px)] md:flex-row`}>
          <div
            className="fit-box relative flex flex-1 flex-col px-4 pb-8 pt-6 md:w-1/2 md:flex-none md:px-10 md:pb-12 md:pt-10"
            style={{
              backgroundColor: "var(--bg)",
              backgroundImage: "linear-gradient(rgb(var(--line)/.08) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--line)/.08) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            <div className="label text-[15px] tracking-[0.22em]">{number}</div>
            <Name fighter={f} max={190} className="-ml-2 mt-16 md:mt-[78px]" style={{ letterSpacing: "-0.06em", lineHeight: 0.9 }} />
            <div className="label mt-6 text-[20px] font-bold tracking-[0.22em] text-signal md:text-[24px]">{f.styleLabel}</div>
            <p className="mt-4 max-w-[520px] text-[19px] leading-normal text-muted md:text-[21px]">{f.teaser}</p>
            <motion.div
              aria-hidden="true"
              className="mt-10 h-[14px] origin-left border-b border-fg md:mt-auto"
              style={{ backgroundImage: "repeating-linear-gradient(90deg,var(--fg) 0,var(--fg) 1px,transparent 1px,transparent 24px)" }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "linear", delay: 0.3 }}
            />
            <div className="label mt-5 text-[15px] tracking-[0.2em] text-muted">{stanceText(f)}</div>
          </div>
          <div
            className="relative h-[320px] overflow-hidden md:h-auto md:w-1/2"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%,transparent 0,transparent 99px,rgb(244 246 250/.3) 99px,rgb(244 246 250/.3) 100px),linear-gradient(160deg,var(--media-from),var(--fg) 60%,var(--media-to))",
            }}
          >
            <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-white/30" />
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
            <div className="absolute left-1/2 top-1/2 h-[160px] w-[280px] -translate-x-1/2 -translate-y-1/2 border border-white/60 md:h-[210px] md:w-[360px]">
              <HeroMedia {...media(f)} className="bg-[linear-gradient(135deg,#4A74D8,var(--fg)_70%)] text-[#F4F6FA]" playSize={72} />
            </div>
            {[
              ["Pocket", 124],
              ["Jab range", 224],
              ["Out of reach", 324],
            ].map(([t, off]) => (
              <div
                key={t}
                aria-hidden="true"
                className="label absolute left-1/2 ml-2.5 text-[13px] tracking-[0.2em] text-[#F4F6FA]"
                style={{ top: `calc(50% - ${off}px)` }}
              >
                {t}
              </div>
            ))}
          </div>
        </section>
      );

    case "diagonal":
      return (
        <section
          className={`fit-box relative overflow-hidden ${heroHeight}`}
          style={{
            backgroundColor: "var(--bg)",
            backgroundImage:
              "linear-gradient(245deg,transparent 0,transparent 46%,rgb(31 123 255/.5) 46%,rgb(31 123 255/.5) 58%,var(--accent) 58%,var(--accent) 59%,transparent 59%),repeating-linear-gradient(0deg,rgb(var(--line)/.03) 0,rgb(var(--line)/.03) 1px,transparent 1px,transparent 4px)",
          }}
        >
          <Eyebrow className="right-4 md:right-10">{number}</Eyebrow>
          <div
            className="absolute left-4 top-16 h-[40%] w-[calc(100%-32px)] md:left-10 md:top-[88px] md:h-[58%] md:w-[min(700px,52%)]"
            style={{ clipPath: "polygon(0 0,100% 0,82% 100%,0 100%)" }}
          >
            <HeroMedia {...media(f)} />
          </div>
          <Name
            fighter={f}
            max={150}
            className="absolute bottom-[150px] right-4 md:right-10"
            style={{ transformOrigin: "right bottom", lineHeight: 0.9, letterSpacing: "-0.03em" }}
          />
          <div className="label absolute bottom-[76px] right-4 text-[20px] font-bold tracking-[0.22em] text-signal md:bottom-[92px] md:right-10 md:text-[24px]">{f.styleLabel}</div>
          <div className="label absolute bottom-10 right-4 text-[15px] tracking-[0.2em] text-muted md:bottom-12 md:right-10">{stanceText(f)}</div>
        </section>
      );

    case "switch":
      return (
        <section
          className={`fit-box relative overflow-hidden ${heroHeight}`}
          style={{
            backgroundColor: "var(--bg)",
            backgroundImage:
              "radial-gradient(70% 60% at 50% 55%,color-mix(in srgb,var(--accent) 18%,transparent) 0%,transparent 70%),repeating-linear-gradient(0deg,rgb(var(--line)/.03) 0,rgb(var(--line)/.03) 1px,transparent 1px,transparent 4px)",
          }}
        >
          <div
            aria-hidden="true"
            className={`absolute inset-y-0 w-1/2 transition-[left] duration-500 ${mirrored ? "left-1/2" : "left-0"}`}
            style={{ background: "color-mix(in srgb,var(--accent) 14%,transparent)" }}
          />
          <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -ml-px w-0.5 bg-accent" />
          <Eyebrow className={mirrored ? "right-4 md:right-10" : "left-4 md:left-10"}>{number}</Eyebrow>
          <div className="absolute left-1/2 top-[96px] h-[28%] w-[min(560px,calc(100%-32px))] -translate-x-1/2 border border-fg/50 md:top-[92px] md:h-[39.5%]">
            <HeroMedia {...media(f)} />
          </div>
          <Name fighter={f} max={200} motionKey={String(mirrored)} className="absolute inset-x-0 top-[47%] text-center md:top-[39.5%]" style={{ lineHeight: 1 }} />
          <div
            aria-hidden="true"
            className="display fit-name absolute inset-x-0 top-[62%] text-center text-accent opacity-[0.22] md:top-[65.8%]"
            style={{ "--chars": f.displayName.length, "--name-max": "200px", lineHeight: 1, transform: "scaleY(-1)" } as CSSProperties}
          >
            {f.displayName}
          </div>
          <div className={`label absolute top-14 text-[18px] font-bold tracking-[0.22em] text-signal md:top-auto md:bottom-12 md:text-[22px] ${mirrored ? "right-4 md:right-10" : "left-4 md:left-10"}`}>
            {f.styleLabel}
          </div>
          <div role="group" aria-label="Stance" className="label absolute bottom-6 left-1/2 flex h-[52px] w-[300px] max-w-[calc(100%-32px)] -translate-x-1/2 border-2 border-accent text-[16px] font-bold md:bottom-9">
            {(["orthodox", "southpaw"] as const).map((s) => {
              const pressed = (s === "southpaw") === mirrored;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => onStanceChange?.(s === "southpaw")}
                  className={`label flex-1 cursor-pointer text-[16px] font-bold transition-colors ${pressed ? "bg-accent text-on-accent" : "text-fg hover:bg-accent/15"}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className={`label absolute bottom-12 hidden text-[15px] tracking-[0.2em] text-muted lg:block ${mirrored ? "left-10" : "right-10"}`}>
            Switch stance to mirror the page
          </div>
        </section>
      );
  }
}
