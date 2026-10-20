import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";

// Placeholder for pages that are planned but have no mockup yet.
export function ComingSoon({ eyebrow, title, children, current }: { eyebrow: string; title: string; children?: ReactNode; current?: string }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteHeader current={current} />
      <main className="mx-auto max-w-[1280px] px-4 py-20 md:px-10 md:py-24">
        <p className="eyebrow m-0">{eyebrow}</p>
        <h1 className="display mb-0 mt-5 text-[clamp(48px,9vw,120px)] leading-[0.9]">{title}</h1>
        <div className="mt-8 max-w-[640px] text-[18px] leading-[1.55] text-muted">{children}</div>
        <Link href="/" className="label mt-10 inline-flex min-h-12 items-center bg-button px-7 text-[16px] font-bold text-on-button">
          &larr; All fighters
        </Link>
      </main>
    </div>
  );
}
