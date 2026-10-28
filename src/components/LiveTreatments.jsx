"use client";

import Link from "next/link";
import { useLang } from "@/i18n";
import { intakeHref } from "@/brand/productMap.js";
import { LIVE_PRODUCT_CARDS } from "@/data/designCatalog.js";

/**
 * Site-wide strip for the 3 live VCO treatments with designed card imagery.
 */
export default function LiveTreatments({ className = "" }) {
  const { t } = useLang();

  return (
    <section
      id="live-treatments"
      className={`w-full border-y border-ink/10 bg-dune/25 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
          {t("Available for clinical intake")}
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-ink md:text-5xl">
          {t("Three live treatments.")}{" "}
          <em className="italic text-terracotta">{t("Hosted intake.")}</em>
        </h2>
        <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-ink/70 md:text-lg">
          {t(
            "Semaglutide, Tirzepatide, and NAD+ — designed product cards with secure clinical intake.",
          )}
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {LIVE_PRODUCT_CARDS.map((item) => (
            <li key={item.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-sand">
              <Link href={item.href} className="block aspect-square overflow-hidden bg-[#ece4d8]">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </Link>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  {t(item.category)}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{t(item.name)}</h3>
                <div className="mt-5 flex flex-wrap gap-4">
                  <Link
                    href={intakeHref(item.intakeId)}
                    className="text-xs uppercase tracking-[0.22em] text-forest transition hover:text-terracotta"
                  >
                    {t("Start intake →")}
                  </Link>
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-[0.22em] text-ink/55 transition hover:text-terracotta"
                  >
                    {t("Learn more")}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/treatments" className="text-xs uppercase tracking-[0.22em] text-terracotta transition hover:text-ink">
            {t("Browse all designed cards →")}
          </Link>
        </div>
      </div>
    </section>
  );
}
