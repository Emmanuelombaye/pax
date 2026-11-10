import TreatmentsCatalog from "@/components/pages/TreatmentsCatalog";
import { listTreatments } from "@/lib/vco";

export const metadata = {
  title: "Treatments — Pax Health",
  description: "Every Pax treatment open for live clinical intake, prescribed after a licensed review.",
};

export default async function Page() {
  return <TreatmentsCatalog treatments={await listTreatments()} />;
}
