"use client";

import Link from "next/link";
import { useLang } from "@/i18n";
import { LIVE_TREATMENTS, intakeHref } from "@/brand/productMap.js";

/**
 * Site-wide strip for the 3 live VCO treatments.
 * Keeps marketing catalog elsewhere; this is the only start-care catalog.
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
            "Semaglutide, Tirzepatide, and NAD+ are connected to VirtualClinicOS. Choose one to open secure clinical intake.",
          )}
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {LIVE_TREATMENTS.map((item) => (
            <li key={item.sku} className="flex flex-col border-t border-ink/15 pt-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                {t(item.category)}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{t(item.name)}</h3>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={intakeHref(item.id)}
                  className="text-xs uppercase tracking-[0.22em] text-forest transition hover:text-terracotta"
                >
                  {t("Start intake →")}
                </Link>
                <Link
                  href={`/treatments/${item.vialSlug}`}
                  className="text-xs uppercase tracking-[0.22em] text-ink/55 transition hover:text-terracotta"
                >
                  {t("Learn more")}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
