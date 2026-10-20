"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Fighter } from "@/data/types";
import { clearHandoff, peekHandoff } from "@/lib/expandHandoff";
import { PanelBody, panelStyle } from "./FighterPanels";

// When the page was opened by expanding a home panel, draws that panel's last
// frame over the hero (clip at the same moment) and fades it out. It ignores
// the pointer, so the page can be scrolled straight away.
export function ExpandCover({ fighter, total }: { fighter: Fighter; total: number }) {
  const [handoff] = useState(() => peekHandoff(fighter.slug));
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clearHandoff();
    const clip = ref.current?.querySelector("video");
    if (clip && handoff) clip.currentTime = handoff.clipTime;
  }, [handoff]);

  if (!handoff || done) return null;
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      data-active="true"
      data-expand="go"
      className="fit-box group pointer-events-none fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-hidden bg-bg text-fg"
      style={panelStyle(fighter)}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={() => setDone(true)}
    >
      <PanelBody fighter={fighter} total={total} active phase="go" />
    </motion.div>
  );
}
