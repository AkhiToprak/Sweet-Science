import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { allTechniqueSlugs, findTechnique } from "@/data/fighters";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allTechniqueSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = findTechnique((await params).slug);
  return t ? { title: t.name } : {};
}

export default async function Page({ params }: Params) {
  const t = findTechnique((await params).slug);
  if (!t) notFound();
  return (
    <ComingSoon eyebrow={`Technique · ${t.level}`} title={t.name}>
      <p className="m-0">{t.summary}</p>
      <p>The full tutorial (steps, common mistakes, a drill and a video) is planned for week 3.</p>
    </ComingSoon>
  );
}
