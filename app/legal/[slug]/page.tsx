import { notFound } from "next/navigation";
import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_PAGES, LEGAL_PAGE_IDS } from "@/data/legalContent.js";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LEGAL_PAGE_IDS.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = LEGAL_PAGES[slug as keyof typeof LEGAL_PAGES];
  if (!page) return { title: "Legal — Pax Health" };
  return {
    title: `${page.title} — Pax Health`,
    description: String(page.intro || "").slice(0, 160),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!LEGAL_PAGE_IDS.includes(slug) || !LEGAL_PAGES[slug as keyof typeof LEGAL_PAGES]) {
    notFound();
  }

  return <LegalPage pageId={slug} />;
}
