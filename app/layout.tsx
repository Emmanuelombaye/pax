import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { RouteChrome } from "@/components/RouteChrome";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.paxlongevity.com"),
  title: "Pax Health — Longevity & Concierge Wellness",
  description:
    "Pax Health is a longevity and concierge wellness sanctuary in Miami. Begin your intake assessment for personalized prescription programs.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />        <link rel="preload" as="image" href="/assets/hero-BUD68560.jpg" type="image/jpeg" fetchPriority="high" />
      </head>
      <body>
        <Providers>
          {children}
          <RouteChrome />
        </Providers>
      </body>
    </html>
  );
}
