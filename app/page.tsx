import Home from "@/components/pages/Home";
import { listTreatments } from "@/lib/vco";

export default async function Page() {
  return <Home treatments={await listTreatments()} />;
}
