import HowItWorks from "@/components/pages/HowItWorks";
import { listTreatments } from "@/lib/vco";

export default async function Page() {
  return <HowItWorks treatments={await listTreatments()} />;
}
