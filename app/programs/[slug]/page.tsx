import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ProgramVials from "@/components/pages/ProgramVials";
import { groupByCategory } from "@/brand/productMap.js";
import { listTreatments } from "@/lib/vco";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const LEGACY = { weight: "weight-management" };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = groupByCategory(await listTreatments().catch(() => [])).find((group) => group.slug === slug);
  if (!program) return { title: "Treatments — Pax Health" };
  return {
    title: `${program.name} — Pax Health`,
    description: `${program.name} options from Pax Health, prescribed only after a licensed U.S. provider reviews your intake.`,
    alternates: { canonical: `/programs/${slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (LEGACY[slug]) permanentRedirect(`/programs/${LEGACY[slug]}`);
  const program = groupByCategory(await listTreatments()).find((group) => group.slug === slug);
  if (!program) notFound();
  return <ProgramVials program={program} />;
}
