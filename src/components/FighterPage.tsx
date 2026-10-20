"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Fighter, HeroLayout } from "@/data/types";
import { themeToCssVars } from "@/lib/theme";
import { Hero } from "./Hero";
import { Reveal } from "./Reveal";
import { TraitRadar } from "./TraitRadar";

const LAYOUT_LABEL: Record<HeroLayout, string> = {
  fullbleed: "Full-bleed",
  converge: "Converging lines",
  split: "Split with range rings",
  diagonal: "Diagonal, mirrored",
  switch: "Stance toggle mirrors the page",
};

// Display sizes scale with the theme's --ds, so condensed faces run larger.
const ds = (px: number) => `calc(${px}px * var(--ds))`;

const wrap = "mx-auto box-border max-w-[1280px] px-4 md:px-10";
const sectionLine = "border-t border-line/10";

function Header({ fighter }: { fighter: Fighter }) {
  return (
    <header className="flex h-[72px] items-center justify-between gap-4 border-b border-line/10 bg-bg px-4 md:px-10">
      <div className="flex items-center gap-7">
        <Link href="/" className="flex min-h-11 items-center whitespace-nowrap font-[family-name:var(--font-anton)] text-[17px] tracking-[0.12em] md:text-[26px] md:tracking-[0.14em]">
          SWEET SCIENCE
        </Link>
        <Link href="/" className="label hidden min-h-11 items-center text-[15px] text-muted sm:flex">
          &larr; All fighters
        </Link>
      </div>
      <nav className="label flex items-center gap-3 text-[15px]">
        <Link href={`/compare?a=${fighter.slug}`} className="flex min-h-11 items-center border border-line/40 px-4 md:px-5">
          Compare
        </Link>
        <Link href="/login" className="flex min-h-11 items-center gap-2 bg-button px-4 text-on-button md:px-5">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.7 1.1 4.6 2.7h2C13.9 6.1 15.6 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z" fill="currentColor" />
          </svg>
          Save
        </Link>
      </nav>
    </header>
  );
}

export function FighterPage({ fighter: f, next }: { fighter: Fighter; next?: Fighter }) {
  const t = f.theme;
  const [mirrored, setMirrored] = useState(t.mirrored);

  return (
    <div data-mirrored={mirrored} style={themeToCssVars(t)} className="min-h-screen bg-bg font-sans text-fg">
      <Header fighter={f} />
      <main>
        <Hero fighter={f} mirrored={mirrored} onStanceChange={setMirrored} />

        {/* Style in one sentence + radar */}
        <section className={`bg-bg ${sectionLine}`}>
          <Reveal className={`${wrap} mirror-row flex flex-wrap items-center gap-12 py-16 md:py-24`}>
            <div className="min-w-0 flex-[1_1_560px]">
              <h2 className="eyebrow m-0">Style in one sentence</h2>
              <p className="display mb-0 mt-5 leading-[1.1]" style={{ fontSize: `clamp(28px, 5vw, ${ds(50)})` }}>
                {f.summary}
              </p>
              <ul className="label m-0 mt-7 flex list-none flex-wrap gap-3 p-0 text-[14px]">
                {f.tags.map((tag) => (
                  <li key={tag} className="border border-line/40 px-3.5 py-2">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-0 flex-[0_1_400px] justify-center">
              <TraitRadar name={f.displayName} traits={f.traits} theme={t} />
            </div>
          </Reveal>
        </section>

        {/* How he fights */}
        <section className={`bg-surface ${sectionLine}`}>
          <Reveal className={`${wrap} py-14 md:py-20`}>
            <h2 className="eyebrow m-0">How he fights</h2>
            <div className="mirror-row mt-9 flex flex-wrap gap-10">
              {(["range", "defence", "offence"] as const).map((k) => (
                <div key={k} className="min-w-0 flex-[1_1_300px] border-t-[3px] border-rule pt-5">
                  <h3 className="display m-0" style={{ fontSize: ds(34) }}>
                    {k[0].toUpperCase() + k.slice(1)}
                  </h3>
                  <p className="mb-0 mt-3 text-[18px] leading-[1.55] text-muted">{f.breakdown[k]}</p>
                </div>
              ))}
            </div>
            <p className="mb-0 mt-7 text-[14px] text-subtle">Style analysis by Sweet Science. It is an opinion, not a statistic.</p>
          </Reveal>
        </section>

        {/* Signature techniques */}
        <section className={`bg-bg ${sectionLine}`}>
          <Reveal className={`${wrap} py-14 md:py-20`}>
            <h2 className="eyebrow m-0">Signature techniques</h2>
            <div className="mirror-row mt-9 flex flex-wrap gap-8">
              {f.techniques.map((tech) => (
                <Link key={tech.slug} href={`/techniques/${tech.slug}`} className="group block min-w-0 flex-[1_1_300px] border border-line/10 bg-surface">
                  <div className={`art-${t.heroLayout} relative h-[200px]`}>
                    <div aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg transition-transform group-hover:scale-110">
                      <svg width="22" height="22" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="label text-[13px] tracking-[0.2em] text-signal">{tech.level}</div>
                    <h3 className="display mb-0 mt-2" style={{ fontSize: ds(30) }}>
                      {tech.name}
                    </h3>
                    <p className="mb-0 mt-2.5 text-[17px] leading-normal text-muted">{tech.summary}</p>
                    <div className="label mt-[18px] text-[15px] font-bold">Open tutorial &rarr;</div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Adopt this style */}
        <section className="bg-adopt-bg text-adopt-fg">
          <Reveal className={`${wrap} py-14 md:py-20`}>
            <h2 className="label mirror-text m-0 text-[14px] font-bold tracking-[0.22em]">Adopt this style</h2>
            <ol className="mirror-row m-0 mt-9 flex list-none flex-wrap gap-10 p-0">
              {f.adopt.map((step) => (
                <li key={step.level} className="min-w-0 flex-[1_1_300px]">
                  <div className="display leading-none" style={{ fontSize: ds(96) }} aria-hidden="true">
                    {String(step.level).padStart(2, "0")}
                  </div>
                  <h3 className="display mb-0 mt-2" style={{ fontSize: ds(30) }}>
                    {step.title}
                  </h3>
                  <p className="mb-0 mt-2.5 text-[18px] leading-[1.55]">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Watch */}
        <section className="bg-bg">
          <Reveal className={`${wrap} py-14 md:py-20`}>
            <h2 className="eyebrow m-0">Watch</h2>
            <div className="mirror-row mt-9 flex flex-wrap gap-8">
              {f.videos.map((v, i) => (
                <figure key={i} className="m-0 min-w-0 flex-[1_1_300px]">
                  {v.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}${v.startSeconds ? `?start=${v.startSeconds}` : ""}`}
                      title={v.title}
                      loading="lazy"
                      allow="encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="block aspect-video w-full border border-line/15"
                    />
                  ) : (
                    <div className="media-placeholder relative aspect-video w-full border border-line/15 md:aspect-auto md:h-[200px]">
                      <div className="label absolute left-3.5 top-3 text-[12px] tracking-[0.18em]" style={{ color: "#F4F6FA" }}>
                        Clip slot {i + 1}
                      </div>
                    </div>
                  )}
                  <figcaption className="mt-3.5 text-[17px] leading-normal text-muted">
                    <span className="font-semibold text-fg">What to look for:</span> {v.whatToWatch}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Compare and favourite */}
        <section className={`bg-surface ${sectionLine}`}>
          <div className={`${wrap} mirror-row flex flex-wrap items-center justify-between gap-6 py-14`}>
            <h2 className="display m-0" style={{ fontSize: `clamp(28px, 4vw, ${ds(40)})` }}>
              How does {f.displayName} compare?
            </h2>
            <div className="label flex flex-wrap gap-3 text-[16px] font-bold">
              <Link href={`/compare?a=${f.slug}`} className="flex min-h-12 items-center bg-button px-7 text-on-button">
                Compare fighters
              </Link>
              <Link href={next ? `/fighters/${next.slug}` : "/"} className="flex min-h-12 items-center border border-line/40 px-7">
                {next ? <>Next: {next.displayName} &rarr;</> : <>Back to all fighters &rarr;</>}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className={`bg-bg ${sectionLine}`}>
        <div className={`${wrap} mirror-row flex flex-wrap items-center justify-between gap-6 py-10`}>
          <div className="label flex flex-wrap items-center gap-5 text-[13px] text-subtle">
            <span>Theme</span>
            <span className="flex gap-1.5" aria-hidden="true">
              {[t.background, t.surface, t.accent, t.foreground, t.muted].map((c, i) => (
                <span key={i} className="h-6 w-6 border border-line/30" style={{ background: c } as CSSProperties} />
              ))}
            </span>
            <span>Display: {t.displayFont}</span>
            <span>Layout: {LAYOUT_LABEL[t.heroLayout]}</span>
            <span>Motion: {t.motionPreset}</span>
          </div>
          <div className="max-w-[560px] text-[14px] leading-normal text-subtle">
            Tutorials cover fundamentals and do not replace a coach. Fight footage is embedded from YouTube and credited on the{" "}
            <Link href="/about" className="underline underline-offset-2">
              About page
            </Link>
            .{f.heroImageCredit && <> Hero image: {f.heroImageCredit}.</>}
          </div>
        </div>
      </footer>
    </div>
  );
}
