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
  applicationName: "Pax Health",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    siteName: "Pax Health",
    title: "Pax Health — Longevity & Concierge Wellness",
    description:
      "Physician-guided longevity, hormone, and recovery programs from Miami. Begin your intake assessment.",
    url: "https://www.paxlongevity.com",
    images: [{ url: "/Gemini_Generated_Image_8yg7dm8yg7dm8yg7.jpg", width: 928, height: 1152, alt: "Cycling on Ocean Drive, Miami Beach" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pax Health — Longevity & Concierge Wellness",
    description: "Physician-guided longevity, hormone, and recovery programs from Miami.",
    images: ["/Gemini_Generated_Image_8yg7dm8yg7dm8yg7.jpg"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://www.paxlongevity.com/#organization",
      name: "Pax Health",
      url: "https://www.paxlongevity.com",
      logo: "https://www.paxlongevity.com/icon-512.png",
      description:
        "Pax Health is a telehealth clinic for longevity, hormone, recovery, and weight care based in Miami. Independent U.S.-licensed clinicians review each member; Pax is not a pharmacy.",
      areaServed: "US",
      medicalSpecialty: ["Endocrine", "PreventiveMedicine"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.paxlongevity.com/#website",
      url: "https://www.paxlongevity.com",
      name: "Pax Health",
      publisher: { "@id": "https://www.paxlongevity.com/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:wght@300..600&display=swap"
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
