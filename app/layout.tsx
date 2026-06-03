import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RegisterSW } from "@/components/pwa/RegisterSW";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "учим russian",
  title: "учим russian",
  description: "Learn conversational Russian, the comic way.",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "учим" },
  icons: { icon: "/icon-192.png", apple: "/apple-icon-180.png" },
};

export const viewport: Viewport = {
  themeColor: "#f3ede0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-paper2 bg-halftone bg-dots font-body text-ink antialiased">
        {/* Unbounded for display, Golos Text for body, both carry full Cyrillic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Golos+Text:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
