import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "Compare" };

export default function Page() {
  return (
    <ComingSoon eyebrow="Compare" title="Side by side" current="/compare">
      Two fighters with their radars overlaid, plus the techniques they share. Planned for week 3.
    </ComingSoon>
  );
}
