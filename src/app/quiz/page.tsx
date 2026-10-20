import { ComingSoon } from "@/components/ComingSoon";

export const metadata = { title: "Find your style" };

export default function Page() {
  return (
    <ComingSoon eyebrow="Find your style" title="Which fighter are you?" current="/quiz">
      A short quiz that matches you to the fighter whose traits are closest to yours. Planned for week 3.
    </ComingSoon>
  );
}
