"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import type { Theme, TraitKey, Traits } from "@/data/types";

export const TRAIT_ORDER: TraitKey[] = ["pressure", "footwork", "defence", "power", "counter"];

export function TraitRadar({ name, traits, theme }: { name: string; traits: Traits; theme: Theme }) {
  const data = TRAIT_ORDER.map((k) => ({ trait: k, value: traits[k] }));
  const label = `${name} trait radar: ${TRAIT_ORDER.map((k) => `${k} ${traits[k]}`).join(", ")}`;
  const grid = `rgb(${theme.line} / 0.2)`;

  return (
    <div role="img" aria-label={label} className="aspect-[4/3] w-full max-w-[400px]">
      <div aria-hidden="true" className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%" margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
            <PolarGrid stroke={grid} gridType="polygon" />
            <PolarRadiusAxis domain={[0, 10]} tickCount={5} tick={false} axisLine={false} />
            <PolarAngleAxis
              dataKey="trait"
              tickLine={false}
              tick={({ x, y, payload, textAnchor }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  dominantBaseline="central"
                  fill={theme.muted}
                  style={{ fontFamily: "var(--font-barlow-condensed)", fontWeight: 600, fontSize: 12, letterSpacing: 1.5 }}
                >
                  {`${String(payload.value).toUpperCase()} ${traits[payload.value as TraitKey]}`}
                </text>
              )}
            />
            <Radar
              dataKey="value"
              stroke={theme.radarStroke}
              strokeWidth={2.5}
              fill={theme.accent}
              fillOpacity={0.35}
              dot={{ r: 4, fill: theme.radarDot, stroke: "none" }}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
