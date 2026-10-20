import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FighterPage } from "@/components/FighterPage";
import { fighters, getFighter, nextFighter } from "@/data/fighters";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fighters.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const f = getFighter((await params).slug);
  return f ? { title: f.name, description: f.summary } : {};
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const fighter = getFighter(slug);
  if (!fighter) notFound();
  return <FighterPage fighter={fighter} next={nextFighter(slug)} />;
}
