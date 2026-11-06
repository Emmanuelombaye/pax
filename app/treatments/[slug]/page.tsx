import { notFound } from "next/navigation";
import VialDetail from "@/components/pages/VialDetail";
import { allVialSlugs, findVial } from "@/data/vial-programs.js";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allVialSlugs().map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = findVial(slug);
  if (!item) return { title: "Treatments — Pax Health" };
  return {
    title: `${item.title} — Pax Health`,
    description: item.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!findVial(slug)) notFound();
  return <VialDetail />;
}
