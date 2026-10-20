import { FighterPanels } from "@/components/FighterPanels";
import { SiteHeader } from "@/components/SiteHeader";
import { fighters } from "@/data/fighters";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteHeader current="/" />
      <main className="flex-1">
        <h1 className="sr-only">Select a fighter</h1>
        <FighterPanels fighters={fighters} />
      </main>
    </div>
  );
}
