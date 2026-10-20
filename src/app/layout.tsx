import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ringcraft: fight styles, explained", template: "%s · Ringcraft" },
  description: "Pick a fighter and get a breakdown of how they fight, on a page designed around that fighter.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
