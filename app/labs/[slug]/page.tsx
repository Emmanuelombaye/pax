import { notFound } from "next/navigation";
import LabPanel from "@/components/pages/LabPanel";
import { findLabPanel, labPanelSlugs } from "@/data/labPanels.js";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return labPanelSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const panel = findLabPanel(slug);
  if (!panel) return { title: "Labs — Pax Health" };
  return {
    title: `${panel.title} — Pax Health`,
    description: panel.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!findLabPanel(slug)) notFound();
  return <LabPanel />;
}
