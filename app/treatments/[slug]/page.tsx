import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VialDetail from "@/components/pages/VialDetail";
import JsonLd from "@/components/JsonLd";
import { getTreatment, listTreatments } from "@/lib/vco";
import { BRAND, SITE, breadcrumbs } from "@/lib/seo";

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
  const url = `${SITE}/treatments/${product.slug}`;
  const image = product.image?.startsWith("http") ? product.image : `${SITE}${product.image}`;
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.name,
    description: product.seo.description || product.summary,
    image,
    url,
    brand: { "@type": "Brand", name: BRAND },
    category: product.category,
    ...(typeof product.price === "number"
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: "USD",
            price: product.price,
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
  return (
    <>
      <JsonLd data={productLd} />
      <JsonLd
        data={breadcrumbs([
          ["Home", "/"],
          ["Treatments", "/treatments"],
          [product.title || product.name, `/treatments/${product.slug}`],
        ])}
      />
      <VialDetail item={product} others={others} />
    </>
  );
}
