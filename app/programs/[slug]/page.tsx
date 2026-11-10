import { notFound, permanentRedirect } from "next/navigation";
import ProgramVials from "@/components/pages/ProgramVials";
import { groupByCategory } from "@/brand/productMap.js";
import { listTreatments } from "@/lib/vco";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const LEGACY = { weight: "weight-management" };

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (LEGACY[slug]) permanentRedirect(`/programs/${LEGACY[slug]}`);
  const program = groupByCategory(await listTreatments()).find((group) => group.slug === slug);
  if (!program) notFound();
  return <ProgramVials program={program} />;
}
