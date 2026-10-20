import Link from "next/link";

const NAV = [
  { href: "/", label: "Fighters", desktopOnly: true },
  { href: "/compare", label: "Compare" },
  { href: "/quiz", label: "Find your style" },
];

export function SiteHeader({ current = "/" }: { current?: string }) {
  return (
    <header className="flex min-h-[72px] flex-wrap items-center justify-between gap-x-6 border-b border-white/10 px-4 md:px-10">
      <Link href="/" className="flex min-h-11 items-center gap-4">
        <span className="font-[family-name:var(--font-anton)] text-[24px] tracking-[0.14em] md:text-[28px]">RINGCRAFT</span>
        <span className="label hidden text-[13px] tracking-[0.22em] text-muted lg:inline">Fight styles, explained</span>
      </Link>
      <nav className="label -mx-2 flex items-center text-[13px] md:text-[15px]">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={current === n.href ? "page" : undefined}
            className={`min-h-11 items-center px-2 md:px-3.5 ${n.desktopOnly ? "hidden md:flex" : "flex"} ${current === n.href ? "text-fg" : "text-muted hover:text-fg"}`}
          >
            {n.label}
          </Link>
        ))}
        <Link href="/login" className="ml-2 flex min-h-11 items-center border border-white/40 px-4 md:ml-3 md:px-5">
          Log in
        </Link>
      </nav>
    </header>
  );
}
