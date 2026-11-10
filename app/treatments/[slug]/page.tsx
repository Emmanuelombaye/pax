import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VialDetail from "@/components/pages/VialDetail";
import { getTreatment, listTreatments } from "@/lib/vco";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return (await listTreatments()).map((item) => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getTreatment((await params).slug);
  if (!product) return { title: "Treatments — Pax Health" };
  const description = product.seo.description || product.summary;
  const images = product.seo.image ? [product.seo.image] : [product.image];
  return {
    title: product.seo.title,
    description,
    alternates: { canonical: `/treatments/${product.slug}` },
    openGraph: { title: product.seo.title, description, images },
  };
}

export default async function Page({ params }: PageProps) {
  const product = await getTreatment((await params).slug);
  if (!product) notFound();
  const others = (await listTreatments()).filter((item) => item.slug !== product.slug);
  return <VialDetail item={product} others={others} />;
}
