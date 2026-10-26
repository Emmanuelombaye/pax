import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { RouteChrome } from "@/components/RouteChrome";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Pax Health — Longevity & Concierge Wellness",
  description:
    "Pax Health is a longevity and concierge wellness sanctuary in Miami. Begin your intake assessment for personalized prescription programs.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
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
