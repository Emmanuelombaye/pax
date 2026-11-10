import { redirect } from "next/navigation";
import Intake from "@/components/pages/Intake";
import { canStartIntake } from "@/brand/productMap.js";
import { getTreatment } from "@/lib/vco";

type PageProps = {
  searchParams: Promise<{ treatment?: string }>;
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const slug = String((await searchParams).treatment || "").trim().toLowerCase();
  if (!slug) redirect("/treatments");
  const product = await getTreatment(slug);
  if (canStartIntake(product)) redirect(product.intakeUrl);
  return <Intake productName={product?.name || null} />;
}
