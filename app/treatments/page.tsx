import Link from "next/link";
import { LIVE_TREATMENTS, intakeHref } from "@/brand/productMap.js";

export const metadata = {
  title: "Treatments — Pax Health",
  description: "Live clinical intake for Semaglutide, Tirzepatide, and NAD+.",
};

export default function TreatmentsIndex() {
  return (
    <main className="min-h-screen bg-sand px-6 py-20 text-ink md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Live treatments</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl">
          Three treatments. <em className="italic text-terracotta">Hosted intake.</em>
        </h1>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {LIVE_TREATMENTS.map((item) => (
            <li key={item.id} className="border-t border-ink/15 pt-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">{item.category}</p>
              <h2 className="mt-2 font-serif text-3xl">{item.name}</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={`/treatments/${item.vialSlug}`}
                  className="text-xs uppercase tracking-[0.22em] text-forest hover:text-terracotta"
                >
                  Learn more
                </Link>
                <Link
                  href={intakeHref(item.id)}
                  className="text-xs uppercase tracking-[0.22em] text-ink/55 hover:text-terracotta"
                >
                  Start intake
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
