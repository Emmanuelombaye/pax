"use client";

import Link from "next/link";
import { useLang } from "@/i18n";
import { canStartIntake, joinCategories, priceLabel } from "@/brand/productMap.js";

/** Site-wide strip for every treatment VCO lists on the Pax website. */
export default function LiveTreatments({ treatments = [], className = "" }) {
  const { t } = useLang();
  if (treatments.length === 0) return null;

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
          {t("Live treatments.")}{" "}
          <em className="italic text-terracotta">{t("Hosted intake.")}</em>
        </h2>
        <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-ink/70 md:text-lg">
          {t("Connected to VirtualClinicOS for")} {joinCategories(treatments, t)}.{" "}
          {t("Choose one to open secure clinical intake.")}
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {treatments.map((item) => (
            <li key={item.slug} className="flex flex-col border-t border-ink/15 pt-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">
                {t(item.category)}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink md:text-3xl">{t(item.name)}</h3>
              <p className="mt-2 font-serif text-base text-terracotta">{priceLabel(item, t)}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                {canStartIntake(item) ? (
                  <a
                    href={item.intakeUrl}
                    className="text-xs uppercase tracking-[0.22em] text-forest transition hover:text-terracotta"
                  >
                    {t("Start intake →")}
                  </a>
                ) : null}
                <Link
                  href={`/treatments/${item.slug}`}
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
