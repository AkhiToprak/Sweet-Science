import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "About and credits" };

export default function Page() {
  return (
    <ComingSoon eyebrow="About and credits" title="Sources and credits">
      <p className="m-0">
        Image and video credits, sources for career facts, and the safety note will live here. Style analysis on this site
        is opinion. Tutorials cover fundamentals and do not replace a coach.
      </p>
    </ComingSoon>
  );
}
