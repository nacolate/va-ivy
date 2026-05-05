import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VA Ivy Mission Control",
  description: "US College Application Mission Control for Dương Vũ Anh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
